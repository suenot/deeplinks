import { Observable, defer, from, map, combineLatest } from 'rxjs';
import BroadcastChannelSender from '../../../../../backend/channels/BroadcastChannelSender';
import { broadcastStatus } from '../../../../../backend/channels/broadcastStatus';
import { EntryType } from '../../../../../CozoDb/types/entities';
import { SyncStatusDto } from '../../../../../CozoDb/types/dto';
import { QueuePriority } from '../../../../../QueueManager/types';

import DbApi from '../../../dataSource/indexedDb/dbApiWrapper';

import { ServiceDeps } from '../types';
import { fetchCyberlinksAndResolveParticles } from '../utils/links';
import { createLoopObservable } from '../utils/rxjs';
import { PARTICLES_SYNC_INTERVAL } from '../consts';
import ParticlesResolverQueue from '../ParticlesResolverQueue/ParticlesResolverQueue';
import { changeSyncStatus } from '../../utils';
import { SyncServiceParams } from '../../types';
import { serializeError } from 'serialize-error';

class SyncParticlesLoop {
  private isInitialized$: Observable<boolean>;

  private db: DbApi | undefined;

  private particlesResolver: ParticlesResolverQueue | undefined;

  private params: SyncServiceParams | undefined;

  private statusApi = broadcastStatus('particle', new BroadcastChannelSender());

  private _loop$: Observable<any> | undefined;

  public get loop$(): Observable<any> | undefined {
    return this._loop$;
  }

  constructor(deps: ServiceDeps, particlesResolver: ParticlesResolverQueue) {
    if (!deps.params$) {
      throw new Error('params$ is not defined');
    }

    deps.dbInstance$.subscribe((db) => {
      this.db = db;
    });

    deps.params$.subscribe((params) => {
      this.params = params;
    });

    this.particlesResolver = particlesResolver;

    this.isInitialized$ = combineLatest([
      deps.dbInstance$,
      deps.ipfsInstance$,
      deps.params$,
      particlesResolver.isInitialized$,
    ]).pipe(
      map(
        ([dbInstance, ipfsInstance, params, syncQueueInitialized]) =>
          !!ipfsInstance &&
          !!dbInstance &&
          !!syncQueueInitialized &&
          !!params.cyberIndexUrl &&
          !!params.myAddress
      )
    );
  }

  private async syncParticles() {
    try {
      // fetch observable particles from db
      const result = await this.db!.findSyncStatus({
        entryType: EntryType.particle,
      });

      // TODO: Sync one-by-one | batch
      const syncStatusEntities = (
        await Promise.all(
          result.map(async (syncStatus) => {
            const { id, timestampUpdate } = syncStatus;
            const links = await fetchCyberlinksAndResolveParticles(
              this.params!.cyberIndexUrl!,
              id as string,
              timestampUpdate as number,
              this.particlesResolver!,
              QueuePriority.MEDIUM
            );

            return links.length > 0
              ? changeSyncStatus(syncStatus, links)
              : undefined;
          })
        )
      ).filter((i) => !!i) as SyncStatusDto[];

      syncStatusEntities.length > 0 &&
        (await this.db!.putSyncStatus(syncStatusEntities));
    } catch (e) {
      const serializedError = serializeError(e);
      console.log('>>> SyncParticlesLoop error:', JSON.stringify(serializedError, null, 2));
      throw e;
    }
  }

  start() {
    this._loop$ = createLoopObservable(
      PARTICLES_SYNC_INTERVAL,
      this.isInitialized$,
      defer(() => from(this.syncParticles())),
      () => this.statusApi.sendStatus('in-progress')
    );

    this._loop$.subscribe({
      next: (result) => this.statusApi.sendStatus('idle'),
      error: (err) => this.statusApi.sendStatus('error', err.toString()),
    });

    return this;
  }
}

export default SyncParticlesLoop;

import {
  EnqueuedIpfsResult,
  QueuePriority,
} from '../../../QueueManager/types';
import { NeuronAddress, ParticleCid } from '../../types/base';

export type SyncServiceParams = {
  myAddress: NeuronAddress | null;
  followings: NeuronAddress[];
  cyberIndexUrl?: string;
};

export type FetchIpfsFunc = (
  cid: ParticleCid,
  priority: QueuePriority
) => Promise<EnqueuedIpfsResult>;

export type LinkDirection = 'from' | 'to';

export type ParticleResult = {
  timestamp: number;
  direction: LinkDirection;
  from: ParticleCid;
  to: ParticleCid;
};

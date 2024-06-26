import { IpfsNode, IPFSContent } from '../../../../ipfs/ipfs';
import { asyncIterableBatchProcessor } from '../../../../utils/async/iterable';

import { mapParticleToEntity } from '../../../../CozoDb/mapping';

import { LsResult } from 'ipfs-core-types/src/pin';

import DbApi from '../indexedDb/dbApiWrapper';
import { serializeError } from 'serialize-error';

const fetchPins = async (node: IpfsNode) => {
  const pins: LsResult[] = [];
  await asyncIterableBatchProcessor(
    node.ls(),
    async (pinsBatch) => {
      // filter only root pins
      pins.push(
        ...pinsBatch.filter(
          (p) => p.type === 'direct' || p.type === 'recursive'
        )
      );
    },
    10
  );

  return pins;
};

const importParicleContent = async (particle: IPFSContent, dbApi: DbApi) => {
  try {
    const entity = mapParticleToEntity(particle);
    const result = await dbApi!.putParticles(entity);
    return result;
  } catch (e) {
    const serializedError = serializeError(e);
    console.error('importParicleContent', JSON.stringify(serializedError, null, 2), !!dbApi);
    return false;
  }
};

export { fetchPins, importParicleContent };

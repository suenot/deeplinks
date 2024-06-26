import { Keplr } from '@keplr-wallet/types';
// import { CYBER } from './config';

export const getKeplr = async (): Promise<Keplr | undefined> => {
  // @ts-ignore
  if (window.keplr) {
  // @ts-ignore
    return window.keplr;
  }

  if (document.readyState === 'complete') {
  // @ts-ignore
    return window.keplr;
  }

  return new Promise((resolve) => {
    const documentStateChange = (event: Event) => {
      if (
        event.target &&
        (event.target as Document).readyState === 'complete'
      ) {
        // @ts-ignore
        resolve(window.keplr);
        document.removeEventListener('readystatechange', documentStateChange);
      }
    };

    document.addEventListener('readystatechange', documentStateChange);
  });
};

const configKeplr = async (prefix) => {
  const cyber = (await import('./config')).CYBER
  return {
  
    // Chain-id of the Cosmos SDK chain.
    chainId: cyber.CHAIN_ID,
    // The name of the chain to be displayed to the user.
    chainName: cyber.CHAIN_ID,
    // RPC endpoint of the chain.
    rpc: cyber.CYBER_NODE_URL_API,
    rest: cyber.CYBER_NODE_URL_LCD,
    stakeCurrency: {
      coinDenom: cyber.DENOM_CYBER.toUpperCase(),
      coinMinimalDenom: cyber.DENOM_CYBER,
      coinDecimals: 0,
    },
    bip44: {
      // You can only set the coin type of BIP44.
      // 'Purpose' is fixed to 44.
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: prefix,
      bech32PrefixAccPub: `${prefix}pub`,
      bech32PrefixValAddr: `${prefix}valoper`,
      bech32PrefixValPub: `${prefix}valoperpub`,
      bech32PrefixConsAddr: `${prefix}valcons`,
      bech32PrefixConsPub: `${prefix}valconspub`,
    },
    currencies: [
      {
        coinDenom: cyber.DENOM_CYBER.toUpperCase(),
        coinMinimalDenom: cyber.DENOM_CYBER,
        coinDecimals: 0,
      },
      {
        coinDenom: 'L',
        coinMinimalDenom: 'liquidpussy',
        coinDecimals: 0,
      },
      {
        coinDenom: 'V',
        coinMinimalDenom: 'millivolt',
        coinDecimals: 3,
      },
      {
        coinDenom: 'A',
        coinMinimalDenom: 'milliampere',
        coinDecimals: 3,
      },
    ],
    // List of coin/tokens used as a fee token in this chain.
    feeCurrencies: [
      {
        // Coin denomination to be displayed to the user.
        coinDenom: cyber.DENOM_CYBER.toUpperCase(),
        // Actual denom (i.e. uatom, uscrt) used by the blockchain.
        coinMinimalDenom: cyber.DENOM_CYBER,
        // # of decimal points to convert minimal denomination to user-facing denomination.
        coinDecimals: 0,
      },
    ],
    coinType: 118,
    gasPriceStep: {
      low: 0,
      average: 0,
      high: 0.01,
    },
    features: ['stargate', 'ibc-transfer'],
  };
};

export default configKeplr;

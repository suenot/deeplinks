import { Networks } from './types/networks';

const HUB_CONTRACTS = {
  TOKENS: 'bostrom15phze6xnvfnpuvvgs2tw58xnnuf872wlz72sv0j2yauh6zwm7cmqqpmc42',
  NETWORKS:
    'bostrom1lpn69a74ftv04upfej8f9ay56pe2zyk48vzlk49kp3grysc7u56qq363nr',
  CHANNELS:
    'bostrom15tx5z779rdks07sg774ufn8q0a9x993c9uwmr6ycec78z6lfrmkqyjnfge',
  PROTOCOLS:
    'bostrom12yqsxh82qy3dz6alnmjhupyk85skgeqznzxv92q99hqtyu7vvdsqgwjgv',
};

const LOCALSTORAGE_CHAIN_ID = localStorage.getItem('chainId');

const CHAIN_PARAMS_LOCALSTORAGE = localStorage.getItem('CHAIN_PARAMS');

let CHAIN_PARAMS = {
  CHAIN_ID: process.env.CHAIN_ID || Networks.BOSTROM,
  DENOM_CYBER: 'boot',
  DENOM_LIQUID_TOKEN: 'hydrogen',
  DENOM_CYBER_G: `GBOOT`,
  CYBER_NODE_URL_API:
    process.env.CYBER_NODE_URL_API || 'https://rpc.bostrom.cybernode.ai',
  CYBER_WEBSOCKET_URL:
    process.env.CYBER_WEBSOCKET_URL ||
    'wss://rpc.bostrom.cybernode.ai/websocket',
  CYBER_NODE_URL_LCD:
    process.env.CYBER_NODE_URL_LCD || 'https://lcd.bostrom.cybernode.ai',
  CYBER_INDEX_HTTPS:
    process.env.CYBER_INDEX_HTTPS ||
    'https://index.bostrom.cybernode.ai/v1/graphql',
  CYBER_INDEX_WEBSOCKET:
    process.env.CYBER_INDEX_WEBSOCKET ||
    'wss://index.bostrom.cybernode.ai/v1/graphql',
  BECH32_PREFIX_ACC_ADDR_CYBER: 'bostrom',
  BECH32_PREFIX_ACC_ADDR_CYBERVALOPER: 'bostromvaloper',
  MEMO_KEPLR: '[bostrom] cyb.ai, using keplr',
};

if (LOCALSTORAGE_CHAIN_ID === 'space-pussy') {
  CHAIN_PARAMS = {
    CHAIN_ID: Networks.SPACE_PUSSY,
    DENOM_CYBER: 'pussy',
    DENOM_LIQUID_TOKEN: 'liquidpussy',
    DENOM_CYBER_G: `GPUSSY`,
    CYBER_NODE_URL_API: 'https://rpc.space-pussy.cybernode.ai/',
    CYBER_WEBSOCKET_URL: 'wss://rpc.space-pussy.cybernode.ai/websocket',
    CYBER_NODE_URL_LCD: 'https://lcd.space-pussy.cybernode.ai',
    CYBER_INDEX_HTTPS: 'https://index.space-pussy.cybernode.ai/v1/graphql',
    CYBER_INDEX_WEBSOCKET: 'wss://index.space-pussy.cybernode.ai/v1/graphql',

    BECH32_PREFIX_ACC_ADDR_CYBER: 'pussy',
    BECH32_PREFIX_ACC_ADDR_CYBERVALOPER: `pussyvaloper`,
    MEMO_KEPLR: '[space-pussy] cyb.ai, using keplr',
  };
}

if (CHAIN_PARAMS_LOCALSTORAGE !== null && LOCALSTORAGE_CHAIN_ID !== null) {
  const CHAIN_PARAMS_LOCALSTORAGE_DATA = JSON.parse(CHAIN_PARAMS_LOCALSTORAGE);
  if (CHAIN_PARAMS_LOCALSTORAGE_DATA[LOCALSTORAGE_CHAIN_ID]) {
    CHAIN_PARAMS = { ...CHAIN_PARAMS_LOCALSTORAGE_DATA[LOCALSTORAGE_CHAIN_ID] };
  }
}

const CYBER = {
  CYBER_CONGRESS_ADDRESS: 'bostrom1xszmhkfjs3s00z2nvtn7evqxw3dtus6yr8e4pw',
  DIVISOR_CYBER_G: 10 ** 9,
  HYDROGEN: 'H',

  ...CHAIN_PARAMS,

  // CHAIN_ID: 'dev',
  // CYBER_NODE_URL_API: 'http://localhost:26657',
  // CYBER_WEBSOCKET_URL: 'ws://localhost:26657/websocket',
  // CYBER_NODE_URL_LCD: 'http://localhost:1317',

  CYBER_GATEWAY:
    process.env.CYBER_GATEWAY || 'https://gateway.ipfs.cybernode.ai',
};

const DEFAULT_GAS_LIMITS = 200000;

const GAS_LIMITS = {
  send: 200000,
  cyberlink: 256000,
  investmint: 160000,
  createRoute: 128000,
  editRoute: 128000,
  editRouteAlias: 128000,
  deleteRoute: 128000,
};

const LEDGER = {
  STAGE_INIT: 0,
  STAGE_SELECTION: 1,
  STAGE_LEDGER_INIT: 2,
  STAGE_READY: 3,
  STAGE_WAIT: 4,
  STAGE_GENERATED: 5,
  STAGE_SUBMITTED: 6,
  STAGE_CONFIRMING: 7,
  STAGE_CONFIRMED: 8,
  STAGE_ERROR: 15,
  LEDGER_VERSION_REQ: [1, 1, 1],
  HDPATH: [44, 118, 0, 0, 0],
  LEDGER_OK: 36864,
  LEDGER_NOAPP: 28160,
  MEMO: 'cyb.ai, using Ledger',
};

const PROPOSAL_STATUS = {
  /** PROPOSAL_STATUS_UNSPECIFIED - PROPOSAL_STATUS_UNSPECIFIED defines the default propopsal status. */
  PROPOSAL_STATUS_UNSPECIFIED: 0,
  /**
   * PROPOSAL_STATUS_DEPOSIT_PERIOD - PROPOSAL_STATUS_DEPOSIT_PERIOD defines a proposal status during the deposit
   * period.
   */
  PROPOSAL_STATUS_DEPOSIT_PERIOD: 1,
  /**
   * PROPOSAL_STATUS_VOTING_PERIOD - PROPOSAL_STATUS_VOTING_PERIOD defines a proposal status during the voting
   * period.
   */
  PROPOSAL_STATUS_VOTING_PERIOD: 2,
  /**
   * PROPOSAL_STATUS_PASSED - PROPOSAL_STATUS_PASSED defines a proposal status of a proposal that has
   * passed.
   */
  PROPOSAL_STATUS_PASSED: 3,
  /**
   * PROPOSAL_STATUS_REJECTED - PROPOSAL_STATUS_REJECTED defines a proposal status of a proposal that has
   * been rejected.
   */
  PROPOSAL_STATUS_REJECTED: 4,
  /**
   * PROPOSAL_STATUS_FAILED - PROPOSAL_STATUS_FAILED defines a proposal status of a proposal that has
   * failed.
   */
  PROPOSAL_STATUS_FAILED: 5,
  UNRECOGNIZED: -1,
};

const VOTE_OPTION = {
  /** VOTE_OPTION_UNSPECIFIED - VOTE_OPTION_UNSPECIFIED defines a no-op vote option. */
  VOTE_OPTION_UNSPECIFIED: 0,
  /** VOTE_OPTION_YES - VOTE_OPTION_YES defines a yes vote option. */
  VOTE_OPTION_YES: 1,
  /** VOTE_OPTION_ABSTAIN - VOTE_OPTION_ABSTAIN defines an abstain vote option. */
  VOTE_OPTION_ABSTAIN: 2,
  /** VOTE_OPTION_NO - VOTE_OPTION_NO defines a no vote option. */
  VOTE_OPTION_NO: 3,
  /** VOTE_OPTION_NO_WITH_VETO - VOTE_OPTION_NO_WITH_VETO defines a no with veto vote option. */
  VOTE_OPTION_NO_WITH_VETO: 4,
  UNRECOGNIZED: -1,
};

const BOND_STATUS = {
  BOND_STATUS_UNSPECIFIED: 0,
  /** BOND_STATUS_UNBONDED - UNBONDED defines a validator that is not bonded. */
  BOND_STATUS_UNBONDED: 1,
  /** BOND_STATUS_UNBONDING - UNBONDING defines a validator that is unbonding. */
  BOND_STATUS_UNBONDING: 2,
  /** BOND_STATUS_BONDED - BONDED defines a validator that is bonded. */
  BOND_STATUS_BONDED: 3,
};

const CID_AVATAR = 'Qmf89bXkJH9jw4uaLkHmZkxQ51qGKfUPtAMxA8rTwBrmTs';
const CID_TWEET = 'QmbdH2WBamyKLPE5zu4mJ9v49qvY8BFfoumoVPMR5V4Rvx';

const PATTERN = new RegExp(
  `^0x[a-fA-F0-9]{40}$|^${CYBER.BECH32_PREFIX_ACC_ADDR_CYBER}valoper[a-zA-Z0-9]{39}$|^${CYBER.BECH32_PREFIX_ACC_ADDR_CYBER}[a-zA-Z0-9]{39}$|^cosmos[a-zA-Z0-9]{39}$`,
  'g'
);
const PATTERN_CYBER = new RegExp(
  `^${CYBER.BECH32_PREFIX_ACC_ADDR_CYBER}[a-zA-Z0-9]{39}$`,
  'g'
);
const PATTERN_CYBER_CONTRACT = new RegExp(
  `^${CYBER.BECH32_PREFIX_ACC_ADDR_CYBER}[a-zA-Z0-9]{59}$`,
  'g'
);
const PATTERN_CYBER_VALOPER = new RegExp(
  `^${CYBER.BECH32_PREFIX_ACC_ADDR_CYBER}valoper[a-zA-Z0-9]{39}$`,
  'g'
);
const PATTERN_COSMOS = /^cosmos[a-zA-Z0-9]{39}$/g;
const PATTERN_OSMOS = /^osmo[a-zA-Z0-9]{39}$/g;
const PATTERN_TERRA = /^terra[a-zA-Z0-9]{39}$/g;
const PATTERN_ETH = /^0x[a-fA-F0-9]{40}$/g;
const PATTERN_TX = /[0-9a-fA-F]{64}$/g;
const PATTERN_IPFS_HASH = /^Qm[a-zA-Z0-9]{44}$/g;
const PATTERN_BLOCK = /^[0-9]+$/g;
const PATTERN_HTTP = /^https:\/\/|^http:\/\//g;
const PATTERN_HTML = /<\/?[\w\d]+>/gi;

export {
  CYBER,
  LEDGER,
  PATTERN,
  PATTERN_CYBER,
  PATTERN_CYBER_CONTRACT,
  PATTERN_CYBER_VALOPER,
  PATTERN_TX,
  PATTERN_IPFS_HASH,
  PATTERN_COSMOS,
  PATTERN_ETH,
  PATTERN_TERRA,
  PATTERN_OSMOS,
  PATTERN_BLOCK,
  PATTERN_HTTP,
  PATTERN_HTML,
  GAS_LIMITS,
  DEFAULT_GAS_LIMITS,
  PROPOSAL_STATUS,
  VOTE_OPTION,
  BOND_STATUS,
  CID_AVATAR,
  CID_TWEET,
  HUB_CONTRACTS,
};

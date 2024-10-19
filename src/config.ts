// import { ChainId } from '@pancakeswap-libs/sdk';
// import { ChainId } from '@uniswap/sdk';
import { Configuration } from './tomb-finance/config';
import { BankInfo } from './tomb-finance';

const ChainId = {
  MAINNET : 1,
  ROPSTEN: 3,
  RINKEBY: 4,
  GÖRLI: 5,
  KOVAN: 42,
  FTMTESTNET: 4002,
  FANTOM_MAINNET: 250
}

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: ChainId.FTMTESTNET,
    networkName: 'Fantom Opera Testnet',
    ftmscanUrl: 'https://testnet.ftmscan.com',
    defaultProvider: 'https://rpc.testnet.fantom.network/',
    deployments: require('./tomb-finance/deployments/deployments.testing.json'),
    externalTokens: {
      WFTM: ['0xf1277d1ed8ad466beddf92ef448a132661956621', 18],
      FUSDT: ['0xb7f24e6e708eabfaa9e64b40ee21a5adbffb51d6', 6],
      WETH: ['0x14f0C98e6763a5E13be5CE014d36c2b69cD94a1e', 18],
      TOMB: ['0x2317610e609674e53D9039aaB85D8cAd8485A7c5', 0],
      MIM: ['0x39523112753956d19A3d6a30E758bd9FF7a8F3C0', 9],
      'USDT-FTM-LP': ['0xE7e3461C2C03c18301F66Abc9dA1F385f45047bA', 18],
      '2OMB-FTM-LP': ['0x13Fe199F19c8F719652985488F150762A5E9c3A8', 18],
      '2SHARE-FTM-LP': ['0x20bc90bB41228cb9ab412036F80CE4Ef0cAf1BD5', 18],
      '2OMB-2SHARE-LP': ['0xd9B5f00d183df52D717046521152303129F088DD', 18],
    },
    baseLaunchDate: new Date('2021-06-02 13:00:00Z'),
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'),
    masonryLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 10000,
  },
  production: {
    chainId: ChainId.FANTOM_MAINNET,
    networkName: 'Fantom Opera Mainnet',
    ftmscanUrl: 'https://ftmscan.com',
    defaultProvider: 'https://rpc.ftm.tools/',
    deployments: require('./tomb-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      WFTM: ['0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83', 18],
      FUSDT: ['0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', 6], // This is actually usdc on mainnet not fusdt
      WETH: ['0x74b23882a30290451A17c44f4F05243b6b58C76d', 18], // BOO: 0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE 18
      TOMB: ['0x6c021ae822bea943b2e66552bde1d2696a53fbb7', 18], // ZOO: 0x09e145a1d53c0045f41aeef25d8ff982ae74dd56 0
      MIM: ['0x82f0b8b456c1a451378467398982d4834b6829c1', 18], // SHIBA: 0x9ba3e4f84a34df4e08c112e1a0ff148b81655615 9
      'USDT-FTM-LP': ['0x2b4C76d0dc16BE1C31D4C1DC53bF9B45987Fc75c', 18],
      '2OMB-FTM-LP': ['0xbdc7dfb7b88183e87f003ca6b5a2f81202343478', 18], // 
      '2SHARE-FTM-LP': ['0x6398ACBBAB2561553a9e458Ab67dCFbD58944e52', 18],
      '2OMB-2SHARE-LP': ['0xd9B5f00d183df52D717046521152303129F088DD', 18],
    },
    baseLaunchDate: new Date('2021-06-02 13:00:00Z'),
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'),
    masonryLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 10000,
  },
};

export const genesisDefinitions: { [contractName: string]: BankInfo } = {
  /*
  Explanation:
  name: description of the card
  poolId: the poolId assigned in the contract
  sectionInUI: way to distinguish in which of the 3 pool groups it should be listed
        - 0 = Single asset stake pools
        - 1 = LP asset staking rewarding TOMB
        - 2 = LP asset staking rewarding TSHARE
  contract: the contract name which will be loaded from the deployment.environmnet.json
  depositTokenName : the name of the token to be deposited
  earnTokenName: the rewarded token
  finished: will disable the pool on the UI if set to true
  sort: the order of the pool
  */
  TombFtmRewardPool: {
    name: 'Stake WFTM, earn 2OMB',
    poolId: 0,
    sectionInUI: 0,
    contract: 'TombFtmRewardPool',
    depositTokenName: 'WFTM',
    earnTokenName: '2OMB',
    multiplier: "100x",
    finished: false,
    sort: 1,
    closedForStaking: false,
  },
  TombWethRewardPool: {
    name: 'Stake wETH, earn 2OMB',
    poolId: 1,
    sectionInUI: 0,
    contract: 'TombWethGenesisRewardPool',
    depositTokenName: 'WETH',
    earnTokenName: '2OMB',
    multiplier: "50x",
    finished: false,
    sort: 2,
    closedForStaking: false,
  },
  TombShibaRewardPool: {
    name: 'Stake MIM, earn 2OMB',
    poolId: 2,
    sectionInUI: 0,
    contract: 'TombShibaGenesisRewardPool',
    depositTokenName: 'MIM',
    earnTokenName: '2OMB',
    multiplier: "25x",
    finished: false,
    sort: 3,
    closedForStaking: false,
  },
  TombTombRewardPool: {
    name: 'Stake TOMB, earn 2OMB',
    poolId: 3,
    sectionInUI: 0,
    contract: 'TombTombGenesisRewardPool',
    depositTokenName: 'TOMB',
    earnTokenName: '2OMB',
    multiplier: "100x",
    finished: false,
    sort: 4,
    closedForStaking: false,
  },
}

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  /*
  Explanation:
  name: description of the card
  poolId: the poolId assigned in the contract
  sectionInUI: way to distinguish in which of the 3 pool groups it should be listed
        - 0 = Single asset stake pools
        - 1 = LP asset staking rewarding TOMB
        - 2 = LP asset staking rewarding TSHARE
  contract: the contract name which will be loaded from the deployment.environmnet.json
  depositTokenName : the name of the token to be deposited
  earnTokenName: the rewarded token
  finished: will disable the pool on the UI if set to true
  sort: the order of the pool
  */
  TombFtmRewardPool: {
    name: 'Stake WFTM, earn 2OMB',
    poolId: 0,
    sectionInUI: 0,
    contract: 'TombFtmRewardPool',
    depositTokenName: 'WFTM',
    earnTokenName: '2OMB',
    multiplier: "100x",
    finished: false,
    sort: 1,
    closedForStaking: false,
    genesisFinished: true
  },
  TombWethRewardPool: {
    name: 'Stake wETH, earn 2OMB',
    poolId: 1,
    sectionInUI: 0,
    contract: 'TombWethGenesisRewardPool',
    depositTokenName: 'WETH',
    earnTokenName: '2OMB',
    multiplier: "50x",
    finished: false,
    sort: 2,
    closedForStaking: false,
    genesisFinished: true
  },
  TombShibaRewardPool: {
    name: 'Stake MIM, earn 2OMB',
    poolId: 2,
    sectionInUI: 0,
    contract: 'TombShibaGenesisRewardPool',
    depositTokenName: 'MIM',
    earnTokenName: '2OMB',
    multiplier: "25x",
    finished: false,
    sort: 3,
    closedForStaking: false,
    genesisFinished: true
  },
  TombTombRewardPool: {
    name: 'Stake TOMB, earn 2OMB',
    poolId: 3,
    sectionInUI: 0,
    contract: 'TombTombGenesisRewardPool',
    depositTokenName: 'TOMB',
    earnTokenName: '2OMB',
    multiplier: "100x",
    finished: false,
    sort: 4,
    closedForStaking: false,
    genesisFinished: true
  },
  TombFtmLPTombRewardPool: {
    name: 'Earn 2OMB by 2OMB-WFTM',
    poolId: 0,
    sectionInUI: 1,
    contract: 'TombFtmLpTombRewardPool',
    depositTokenName: '2OMB-FTM-LP',
    earnTokenName: '2OMB',
    multiplier: "1000x",
    finished: false,
    sort: 5,
    closedForStaking: false,
  },
  TombFtmLPTombRewardPoolOld: {
    name: 'Earn TOMB by TOMB-FTM LP',
    poolId: 0,
    sectionInUI: 1,
    contract: 'TombFtmLpTombRewardPoolOld',
    depositTokenName: '2OMB-FTM-LP',
    earnTokenName: 'TOMB',
    multiplier: "0",
    finished: true,
    sort: 11,
    closedForStaking: true,
  },
  TombFtmLPTShareRewardPool: {
    name: 'Earn 2SHARE by 2OMB-WFTM LP',
    poolId: 0,
    sectionInUI: 2,
    contract: 'TombFtmLPTShareRewardPool',
    depositTokenName: '2OMB-FTM-LP',
    earnTokenName: '2SHARE',
    multiplier: "3000x",
    finished: false,
    sort: 6,
    closedForStaking: false,
  },
  TshareFtmLPTShareRewardPool: {
    name: 'Earn 2SHARE by 2SHARE-WFTM LP',
    poolId: 1,
    sectionInUI: 2,
    contract: 'TshareFtmLPTShareRewardPool',
    depositTokenName: '2SHARE-FTM-LP',
    earnTokenName: '2SHARE',
    multiplier: "2400x",
    finished: false,
    sort: 7,
    closedForStaking: false,
  },
  TombTsharePTShareRewardPool: {
    name: 'Earn 2SHARE by 2OMB-2SHARE LP',
    poolId: 2,
    sectionInUI: 2,
    contract: 'TombTshareLPTShareRewardPool',
    depositTokenName: '2OMB-2SHARE-LP',
    earnTokenName: '2SHARE',
    multiplier: "550x",
    finished: false,
    sort: 8,
    closedForStaking: false,
  },
  // TshareDividends: {
  //   name: 'Earn USDC dividends by staking 2SHARES',
  //   poolId: 0,
  //   sectionInUI: 3,
  //   contract: 'TombTshareLPTShareRewardPool',
  //   depositTokenName: '2SHARES',
  //   earnTokenName: 'USDC',
  //   multiplier: "0x",
  //   finished: false,
  //   sort: 9,
  //   closedForStaking: false,
  // },
};

export const ERC20ABI = [	{"anonymous": false,"inputs": [	{"indexed": true,"internalType": "address","name": "owner","type": "address"	},	{"indexed": true,"internalType": "address","name": "spender","type": "address"	},	{"indexed": false,"internalType": "uint256","name": "value","type": "uint256"	}],"name": "Approval","type": "event"	},	{"anonymous": false,"inputs": [	{"indexed": true,"internalType": "address","name": "from","type": "address"	},	{"indexed": true,"internalType": "address","name": "to","type": "address"	},	{"indexed": false,"internalType": "uint256","name": "value","type": "uint256"	}],"name": "Transfer","type": "event"	},	{"inputs": [	{"internalType": "address","name": "owner","type": "address"	},	{"internalType": "address","name": "spender","type": "address"	}],"name": "allowance","outputs": [	{"internalType": "uint256","name": "","type": "uint256"	}],"stateMutability": "view","type": "function"	},	{"inputs": [	{"internalType": "address","name": "spender","type": "address"	},	{"internalType": "uint256","name": "amount","type": "uint256"	}],"name": "approve","outputs": [	{"internalType": "bool","name": "","type": "bool"	}],"stateMutability": "nonpayable","type": "function"	},	{"inputs": [	{"internalType": "address","name": "account","type": "address"	}],"name": "balanceOf","outputs": [	{"internalType": "uint256","name": "","type": "uint256"	}],"stateMutability": "view","type": "function"	},	{"inputs": [	{"internalType": "uint256","name": "amount","type": "uint256"	}],"name": "burn","outputs": [],"stateMutability": "nonpayable","type": "function"	},	{"inputs": [	{"internalType": "address","name": "account","type": "address"	},	{"internalType": "uint256","name": "amount","type": "uint256"	}],"name": "burnFrom","outputs": [],"stateMutability": "nonpayable","type": "function"	},	{"inputs": [],"name": "decimals","outputs": [	{"internalType": "uint8","name": "","type": "uint8"	}],"stateMutability": "view","type": "function"	},	{"inputs": [	{"internalType": "address","name": "spender","type": "address"	},	{"internalType": "uint256","name": "subtractedValue","type": "uint256"	}],"name": "decreaseAllowance","outputs": [	{"internalType": "bool","name": "","type": "bool"	}],"stateMutability": "nonpayable","type": "function"	},	{"inputs": [	{"internalType": "address","name": "spender","type": "address"	},	{"internalType": "uint256","name": "addedValue","type": "uint256"	}],"name": "increaseAllowance","outputs": [	{"internalType": "bool","name": "","type": "bool"	}],"stateMutability": "nonpayable","type": "function"	},	{"inputs": [],"name": "name","outputs": [	{"internalType": "string","name": "","type": "string"	}],"stateMutability": "view","type": "function"	},	{"inputs": [],"name": "symbol","outputs": [	{"internalType": "string","name": "","type": "string"	}],"stateMutability": "view","type": "function"	},	{"inputs": [],"name": "totalSupply","outputs": [	{"internalType": "uint256","name": "","type": "uint256"	}],"stateMutability": "view","type": "function"	},	{"inputs": [	{"internalType": "address","name": "to","type": "address"	},	{"internalType": "uint256","name": "amount","type": "uint256"	}],"name": "transfer","outputs": [	{"internalType": "bool","name": "","type": "bool"	}],"stateMutability": "nonpayable","type": "function"	},	{"inputs": [	{"internalType": "address","name": "from","type": "address"	},	{"internalType": "address","name": "to","type": "address"	},	{"internalType": "uint256","name": "amount","type": "uint256"	}],"name": "transferFrom","outputs": [	{"internalType": "bool","name": "","type": "bool"	}],"stateMutability": "nonpayable","type": "function"	}]

export const Tokens = [
    {
        name: "USDC",
        address: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75"
    },
    {
        name: "3OMB",
        address: "0x14def7584a6c52f470ca4f4b9671056b22f4ffde"
    },
    {
        name: "3Share",
        address: "0x6437adac543583c4b31bf0323a0870430f5cc2e7"
    },
    {
        name: "2OMB",
        address: "0x7a6e4e3cc2ac9924605dca4ba31d1831c84b44ae"
    },
    {
        name: "2Share",
        address: "0xc54a1684fd1bef1f077a336e6be4bd9a3096a6ca"
    },
]

export const FTMGAS = 2 * 10**18;

export default configurations['production'];
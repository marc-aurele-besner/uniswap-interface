import { ChainId } from 'test-dex-sdk-core'
import { SupportedInterfaceChain } from 'constants/chains'

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY
if (typeof INFURA_KEY === 'undefined') {
  throw new Error(`REACT_APP_INFURA_KEY must be a defined environment variable`)
}
const QUICKNODE_MAINNET_RPC_URL = process.env.REACT_APP_QUICKNODE_MAINNET_RPC_URL
if (typeof QUICKNODE_MAINNET_RPC_URL === 'undefined') {
  throw new Error(`REACT_APP_QUICKNODE_MAINNET_RPC_URL must be a defined environment variable`)
}
const QUICKNODE_ARBITRUM_RPC_URL = process.env.REACT_APP_QUICKNODE_ARBITRUM_RPC_URL
if (typeof QUICKNODE_ARBITRUM_RPC_URL === 'undefined') {
  throw new Error(`REACT_APP_QUICKNODE_ARBITRUM_RPC_URL must be a defined environment variable`)
}
const QUICKNODE_BNB_RPC_URL = process.env.REACT_APP_BNB_RPC_URL
if (typeof QUICKNODE_BNB_RPC_URL === 'undefined') {
  throw new Error(`REACT_APP_BNB_RPC_URL must be a defined environment variable`)
}

/**
 * Public JSON-RPC endpoints.
 * These are used if the integrator does not provide an endpoint, or if the endpoint does not work.
 *
 * MetaMask allows switching to any URL, but displays a warning if it is not on the "Safe" list:
 * https://github.com/MetaMask/metamask-mobile/blob/bdb7f37c90e4fc923881a07fca38d4e77c73a579/app/core/RPCMethods/wallet_addEthereumChain.js#L228-L235
 * https://chainid.network/chains.json
 *
 * These "Safe" URLs are listed first, followed by other fallback URLs, which are taken from chainlist.org.
 */
export const PUBLIC_RPC_URLS: Record<SupportedInterfaceChain, string[]> = {
  [ChainId.NOVA]: [
    // "Safe" URLs
    'https://nova-0.gemini-3h.subspace.network/ws',
    'https://nova-1.gemini-3h.subspace.network/ws',
  ],
  [ChainId.GOERLI]: [
    // "Safe" URLs
    'https://rpc.goerli.mudit.blog/',
    // "Fallback" URLs
    'https://rpc.ankr.com/eth_goerli',
  ],
  [ChainId.SEPOLIA]: [
    // "Safe" URLs
    'https://rpc.sepolia.dev/',
    // "Fallback" URLs
    'https://rpc.sepolia.org/',
    'https://rpc2.sepolia.org/',
    'https://rpc.sepolia.online/',
    'https://www.sepoliarpc.space/',
    'https://rpc-sepolia.rockx.com/',
    'https://rpc.bordel.wtf/sepolia',
  ],
  [ChainId.POLYGON_MUMBAI]: [
    // "Safe" URLs
    'https://matic-mumbai.chainstacklabs.com',
    'https://rpc-mumbai.maticvigil.com',
    'https://matic-testnet-archive-rpc.bwarelabs.com',
  ],
}

/**
 * Application-specific JSON-RPC endpoints.
 * These are URLs which may only be used by the interface, due to origin policies, &c.
 */
export const APP_RPC_URLS: Record<SupportedInterfaceChain, string[]> = {
  [ChainId.NOVA]: [`https://nova-1.gemini-3h.subspace.network/ws`],
  [ChainId.GOERLI]: [`https://goerli.infura.io/v3/${INFURA_KEY}`],
  [ChainId.SEPOLIA]: [`https://sepolia.infura.io/v3/${INFURA_KEY}`],
  [ChainId.POLYGON_MUMBAI]: [`https://polygon-mumbai.infura.io/v3/${INFURA_KEY}`],
}

export const INFURA_PREFIX_TO_CHAIN_ID: { [prefix: string]: ChainId } = {
  nova: ChainId.NOVA,
  goerli: ChainId.GOERLI,
  sepolia: ChainId.SEPOLIA,
  'polygon-mumbai': ChainId.POLYGON_MUMBAI,
}

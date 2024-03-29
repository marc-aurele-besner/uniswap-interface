import AppJsonRpcProvider from 'rpc/AppJsonRpcProvider'
import { ChainId } from 'test-dex-sdk-core'

import ConfiguredJsonRpcProvider from 'rpc/ConfiguredJsonRpcProvider'
import { CHAIN_IDS_TO_NAMES, SupportedInterfaceChain } from './chains'
import { APP_RPC_URLS } from './networks'

const providerFactory = (chainId: SupportedInterfaceChain, i = 0) =>
  new ConfiguredJsonRpcProvider(APP_RPC_URLS[chainId][i], { chainId, name: CHAIN_IDS_TO_NAMES[chainId] })

function getAppProvider(chainId: SupportedInterfaceChain) {
  return new AppJsonRpcProvider(
    APP_RPC_URLS[chainId].map(
      (url) => new ConfiguredJsonRpcProvider(url, { chainId, name: CHAIN_IDS_TO_NAMES[chainId] })
    )
  )
}

/** These are the only JsonRpcProviders used directly by the interface. */
export const RPC_PROVIDERS = {
  [ChainId.GOERLI]: getAppProvider(ChainId.GOERLI),
  [ChainId.NOVA]: getAppProvider(ChainId.NOVA),
  [ChainId.SEPOLIA]: getAppProvider(ChainId.SEPOLIA),
  [ChainId.POLYGON_MUMBAI]: getAppProvider(ChainId.POLYGON_MUMBAI),
} satisfies Record<SupportedInterfaceChain, AppJsonRpcProvider>

export const DEPRECATED_RPC_PROVIDERS = {
  [ChainId.GOERLI]: providerFactory(ChainId.GOERLI),
  [ChainId.NOVA]: getAppProvider(ChainId.NOVA),
  [ChainId.SEPOLIA]: providerFactory(ChainId.SEPOLIA),
  [ChainId.POLYGON_MUMBAI]: providerFactory(ChainId.POLYGON_MUMBAI),
} satisfies Record<SupportedInterfaceChain, ConfiguredJsonRpcProvider>

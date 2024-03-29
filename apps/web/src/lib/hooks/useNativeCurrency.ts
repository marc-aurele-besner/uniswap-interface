import { nativeOnChain } from 'constants/tokens'
import { useMemo } from 'react'
import { ChainId, NativeCurrency, Token } from 'test-dex-sdk-core'

export default function useNativeCurrency(chainId: ChainId | null | undefined): NativeCurrency | Token {
  return useMemo(
    () =>
      chainId
        ? nativeOnChain(chainId)
        : // display mainnet when not connected
          nativeOnChain(ChainId.MAINNET),
    [chainId]
  )
}

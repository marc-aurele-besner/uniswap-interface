import { screen } from '@testing-library/react'
import { useWeb3React } from '@web3-react/core'
import { DAI, USDC_MAINNET, WBTC } from 'constants/tokens'
import * as mockJSBI from 'jsbi'
import { Currency, CurrencyAmount as mockCurrencyAmount, Token as mockToken } from 'test-dex-sdk-core'
import { mocked } from 'test-utils/mocked'
import { render } from 'test-utils/render'

import CurrencyList, { CurrencyListRow } from '.'

const noOp = function () {
  // do nothing
}

const mockCurrencyAmt = {
  [DAI.address]: mockCurrencyAmount.fromRawAmount(DAI, mockJSBI.default.BigInt(100)),
  [USDC_MAINNET.address]: mockCurrencyAmount.fromRawAmount(USDC_MAINNET, mockJSBI.default.BigInt(10)),
  [WBTC.address]: mockCurrencyAmount.fromRawAmount(WBTC, mockJSBI.default.BigInt(1)),
}

jest.mock(
  'components/Logo/CurrencyLogo',
  () =>
    ({ currency }: { currency: Currency }) =>
      `CurrencyLogo currency=${currency.symbol}`
)

jest.mock('../../../state/connection/hooks', () => {
  return {
    useCurrencyBalance: (currency: Currency) => {
      return mockCurrencyAmt[(currency as mockToken)?.address]
    },
  }
})

it('renders loading rows when isLoading is true', () => {
  const component = render(
    <CurrencyList
      height={10}
      currencies={[]}
      onCurrencySelect={noOp}
      isLoading={true}
      searchQuery=""
      isAddressSearch=""
      balances={{}}
    />
  )
  expect(component.findByTestId('loading-rows')).toBeTruthy()
  expect(screen.queryByText('Wrapped BTC')).not.toBeInTheDocument()
  expect(screen.queryByText('DAI')).not.toBeInTheDocument()
  expect(screen.queryByText('USDC')).not.toBeInTheDocument()
})

it('renders currency rows correctly when currencies list is non-empty', () => {
  render(
    <CurrencyList
      height={10}
      currencies={[DAI, USDC_MAINNET, WBTC].map((token) => new CurrencyListRow(token, false))}
      onCurrencySelect={noOp}
      isLoading={false}
      searchQuery=""
      isAddressSearch=""
      balances={{}}
    />
  )
  expect(screen.getByText('Wrapped BTC')).toBeInTheDocument()
  expect(screen.getByText('DAI')).toBeInTheDocument()
  expect(screen.getByText('USDC')).toBeInTheDocument()
})

it('renders currency rows correctly with balances', () => {
  mocked(useWeb3React).mockReturnValue({
    account: '0x52270d8234b864dcAC9947f510CE9275A8a116Db',
    isActive: true,
  } as ReturnType<typeof useWeb3React>)
  render(
    <CurrencyList
      height={10}
      currencies={[DAI, USDC_MAINNET, WBTC].map((token) => new CurrencyListRow(token, false))}
      onCurrencySelect={noOp}
      isLoading={false}
      searchQuery=""
      isAddressSearch=""
      showCurrencyAmount
      balances={{
        [DAI.address.toLowerCase()]: { usdValue: 2, balance: 2 },
      }}
    />
  )
  expect(screen.getByText('Wrapped BTC')).toBeInTheDocument()
  expect(screen.getByText('DAI')).toBeInTheDocument()
  expect(screen.getByText('USDC')).toBeInTheDocument()
  expect(screen.getByText('2.00')).toBeInTheDocument()
})

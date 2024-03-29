import { DEFAULT_LOCALE, SupportedLocale } from 'constants/locales'
import JSBI from 'jsbi'
import formatLocaleNumber from 'lib/utils/formatLocaleNumber'
import { Currency, CurrencyAmount, Fraction } from 'test-dex-sdk-core'

export function formatCurrencyAmount(
  amount: CurrencyAmount<Currency> | undefined,
  sigFigs: number,
  locale: SupportedLocale = DEFAULT_LOCALE,
  fixedDecimals?: number
): string {
  if (!amount) {
    return '-'
  }

  if (JSBI.equal(amount.quotient, JSBI.BigInt(0))) {
    return '0'
  }

  if (amount.divide(amount.decimalScale).lessThan(new Fraction(1, 100000))) {
    return `<${formatLocaleNumber({ number: 0.00001, locale })}`
  }

  return formatLocaleNumber({ number: amount, locale, sigFigs, fixedDecimals })
}

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAmountForDisplay(
  amount: number,
  currency: string
): string {

  let numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol'
  })

  const formatedAmount = numberFormat.format(amount)

  return formatedAmount === '$NaN' ? '' : formatedAmount
}

export function formatAmountForStripe(
  amount: number,
  currency: string
): number {

  let numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol'
  })

  const parts = numberFormat.formatToParts(amount)
  let zeroDecimalCurrency: boolean = true

  for (let part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false
    }
  }

  return zeroDecimalCurrency ? amount : Math.round(amount * 100)
}
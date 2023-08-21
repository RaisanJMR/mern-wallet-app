export const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' }
export const optionsTime = {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true,
}

export const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
})

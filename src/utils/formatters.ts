/**
 * Utility functions for formatting numbers, currencies, and data
 */

/**
 * Format number with thousands separators
 * @param value - Number to format
 * @param decimals - Number of decimal places (default: 0)
 * @returns Formatted string with commas
 */
export const formatNumber = (value: number, decimals: number = 0): string => {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })
}

/**
 * Format currency (AED)
 * @param value - Amount to format
 * @param showCurrency - Whether to show AED symbol (default: true)
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number, showCurrency: boolean = true): string => {
  const formatted = formatNumber(value, 0)
  return showCurrency ? `AED ${formatted}` : formatted
}

/**
 * Format percentage with proper decimals
 * @param value - Percentage value (e.g., 5.4 for 5.4%)
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`
}

/**
 * Format large numbers with K/M suffixes
 * @param value - Number to format
 * @returns Formatted string with K/M suffix
 */
export const formatLargeNumber = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`
  }
  return formatNumber(value)
}

/**
 * Format square footage
 * @param value - Square footage value
 * @returns Formatted string with sqft suffix
 */
export const formatSqft = (value: number): string => {
  return `${formatNumber(value)} sqft`
}

/**
 * Format price per square foot
 * @param value - Price per sqft value
 * @returns Formatted currency per sqft
 */
export const formatPricePerSqft = (value: number): string => {
  return `AED ${formatNumber(value)}/sqft`
}

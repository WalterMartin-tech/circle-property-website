// API Client for Beechford Estate Office Smart Plans Backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'

export class ApiError extends Error {
  constructor(public status: number, message: string, public details?: any) {
    super(message)
    this.name = 'ApiError'
  }
}

async function fetchAPI<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }))
      throw new ApiError(
        response.status,
        error.message || error.detail || response.statusText,
        error
      )
    }

    return response.json()
  } catch (err) {
    if (err instanceof ApiError) {
      throw err
    }
    // Network or other errors
    throw new ApiError(0, err instanceof Error ? err.message : 'Network error')
  }
}

export const api = {
  // Health check
  health: () => fetchAPI('/health'),

  // Deal Picker Optimization
  optimizeDealPicker: (data: {
    budget: number
    objective: 'cash_yield' | 'risk_adjusted' | 'target_yield'
    risk_penalty?: number
    target_yield?: number | null
    deals: Array<{
      deal_id: string
      ask_price: number
      expected_noi: number
      sector: string
      city: string
      risk_score: number
      must_buy: boolean
    }>
  }) =>
    fetchAPI('/optimize/deal-picker', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Debt Stack Optimization
  optimizeDebtStack: (data: {
    asset_value: number
    annual_noi: number
    max_ltv: number
    min_dscr: number
    min_fixed_share: number
    equity_cap: number
    tranches: Array<{
      name: string
      rate: number
      spread: number
      max_ltv: number
      io_months: number
      requires_fixed: boolean
    }>
  }) =>
    fetchAPI('/optimize/debt-stack', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // CapEx Phasing Optimization
  optimizeCapEx: (data: {
    monthly_cash: number
    noi_uplift_rate: number
    projects: Array<{
      project_id: string
      min_spend: number
      max_spend: number
      earliest_month: number
      latest_month: number
    }>
  }) =>
    fetchAPI('/optimize/capex-phasing', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Leasing Mix Optimization
  optimizeLeasingMix: (data: {
    total_units: number
    vacant_now: number
    occupancy_target: number
    incentive_budget: number
    min_wault: number
    max_share_per_package: number
    packages: Array<{
      package_name: string
      duration_months: number
      annual_rent: number
      incentive_cost: number
    }>
  }) =>
    fetchAPI('/optimize/leasing-mix', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Download files
  downloadFile: async (fileUrl: string): Promise<Blob> => {
    const url = `${API_BASE_URL}${fileUrl}`
    const response = await fetch(url)
    if (!response.ok) {
      throw new ApiError(response.status, 'File download failed')
    }
    return response.blob()
  },
}

// Helper for checking if API is available
export async function checkApiHealth(): Promise<boolean> {
  try {
    const health = await api.health()
    return health.status === 'ok'
  } catch {
    return false
  }
}

export default api


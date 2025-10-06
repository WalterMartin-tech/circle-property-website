/**
 * Development Token Logger
 * Tracks AI token consumption during development in Cursor
 * This helps track YOUR costs during the optimization module development
 */

interface TokenLog {
  timestamp: string
  module: string
  action: string
  estimatedTokens: number
  notes: string
}

type ActionType = keyof typeof DevTokenLogger.ACTION_COSTS

export class DevTokenLogger {
  private static logs: TokenLog[] = []
  
  // Token estimates for common development actions
  static readonly ACTION_COSTS = {
    'component-generation': 500,
    'code-review': 200,
    'refactoring': 300,
    'debugging': 150,
    'documentation': 400,
    'optimization-solver-code': 800,
    'api-integration': 350,
    'ui-design': 250,
    'testing': 200,
  }

  static log(module: string, action: ActionType, notes: string = '') {
    const log: TokenLog = {
      timestamp: new Date().toISOString(),
      module,
      action,
      estimatedTokens: this.ACTION_COSTS[action] || 100,
      notes
    }
    
    this.logs.push(log)
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🪙 Token Usage:', {
        action,
        tokens: log.estimatedTokens,
        module,
        totalSoFar: this.getTotalTokens()
      })
    }
    
    // Save to localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('dev_token_logs', JSON.stringify(this.logs))
    }
  }

  static getTotalTokens(): number {
    return this.logs.reduce((sum, log) => sum + log.estimatedTokens, 0)
  }

  static getLogsByModule(module: string): TokenLog[] {
    return this.logs.filter(log => log.module === module)
  }

  static exportLogs(): string {
    return JSON.stringify(this.logs, null, 2)
  }

  static getReport(): {
    total: number
    byModule: Record<string, number>
    byAction: Record<string, number>
    recentLogs: TokenLog[]
  } {
    const byModule: Record<string, number> = {}
    const byAction: Record<string, number> = {}
    
    this.logs.forEach(log => {
      byModule[log.module] = (byModule[log.module] || 0) + log.estimatedTokens
      byAction[log.action] = (byAction[log.action] || 0) + log.estimatedTokens
    })
    
    return {
      total: this.getTotalTokens(),
      byModule,
      byAction,
      recentLogs: this.logs.slice(-10)
    }
  }

  static reset() {
    this.logs = []
    if (typeof window !== 'undefined') {
      localStorage.removeItem('dev_token_logs')
    }
  }

  static loadFromStorage() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('dev_token_logs')
      if (stored) {
        try {
          this.logs = JSON.parse(stored)
        } catch (e) {
          console.error('Failed to load token logs:', e)
        }
      }
    }
  }
}

// Auto-load on import
if (typeof window !== 'undefined') {
  DevTokenLogger.loadFromStorage()
}

// Example usage:
// DevTokenLogger.log('deal-picker', 'component-generation', 'Created DealPickerForm component')
// DevTokenLogger.log('debt-stack', 'optimization-solver-code', 'Implemented LP solver')


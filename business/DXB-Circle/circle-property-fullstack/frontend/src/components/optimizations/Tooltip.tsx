'use client'

import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

interface TooltipProps {
  text: string
  position?: 'top' | 'bottom'
}

export default function Tooltip({ text, position = 'bottom' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="relative inline-block ml-1">
      <button
        type="button"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        className="text-slate-400 hover:text-slate-600 transition-colors"
      >
        <QuestionMarkCircleIcon className="w-4 h-4" />
      </button>
      
      {isVisible && (
        <>
          {position === 'bottom' ? (
            <div className="absolute z-50 top-full left-0 mt-2 w-64 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg shadow-lg">
              <div className="absolute bottom-full left-4 mb-[-1px] w-2 h-2 bg-slate-900 rotate-45"></div>
              {text}
            </div>
          ) : (
            <div className="absolute z-50 bottom-full left-0 mb-2 w-64 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg shadow-lg">
              {text}
              <div className="absolute top-full left-4 -mt-1 w-2 h-2 bg-slate-900 rotate-45"></div>
            </div>
          )}
        </>
      )}
    </div>
  )
}


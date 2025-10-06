'use client'

import { useEffect, useRef } from 'react'

interface LaTeXDisplayProps {
  formula: string
  display?: boolean // true for block display, false for inline
}

export default function LaTeXDisplay({ formula, display = true }: LaTeXDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const renderMath = async () => {
      try {
        // Dynamically import katex only on client side
        const katex = (await import('katex')).default
        
        if (containerRef.current) {
          katex.render(formula, containerRef.current, {
            displayMode: display,
            throwOnError: false,
            trust: true,
            strict: false,
            output: 'html'
          })
        }
      } catch (error) {
        // Fallback to plain text if KaTeX fails
        if (containerRef.current) {
          containerRef.current.textContent = formula
        }
      }
    }

    renderMath()
  }, [formula, display])

  return (
    <div 
      ref={containerRef}
      className={`${display ? 'my-4' : 'inline-block'} text-slate-800`}
      style={{ fontSize: display ? '1.1em' : '1em' }}
    />
  )
}


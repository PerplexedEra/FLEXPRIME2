import { cn } from '@/lib/utils'
import Link from 'next/link'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'whatsapp'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  children: React.ReactNode
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  href,
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out-expo rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed'

  const variants: Record<string, string> = {
    primary:
      'bg-primary text-white hover:bg-primary-hover active:scale-[0.98] shadow-card hover:shadow-card-hover',
    secondary:
      'bg-ground text-ink border border-hairline hover:bg-surface-alt active:scale-[0.98]',
    ghost:
      'bg-transparent text-primary hover:bg-primary-light active:scale-[0.98]',
    danger:
      'bg-danger text-white hover:opacity-90 active:scale-[0.98]',
    whatsapp:
      'bg-[#25D366] text-white hover:bg-[#20BD5A] active:scale-[0.98] shadow-card hover:shadow-card-hover',
  }

  const sizes: Record<string, string> = {
    sm: 'px-3.5 py-2 text-sm gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3.5 text-base gap-2.5',
  }

  const classes = cn(base, variants[variant], sizes[size], className)

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('https')
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button
      className={classes}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface border border-hairline-light rounded-lg shadow-card',
        hover && 'transition-shadow duration-200 ease-out-expo hover:shadow-card-hover',
        className
      )}
    >
      {children}
    </div>
  )
}

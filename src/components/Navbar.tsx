'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Button from './Button'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/apply', label: 'Apply' },
  { href: '/profile', label: 'My Account' },
  { href: '/referral', label: 'Referrals' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-200 ease-out-expo ${
        scrolled
          ? 'bg-surface/95 backdrop-blur-md shadow-card border-b border-hairline-light'
          : 'bg-surface border-b border-hairline-light'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Wordmark & Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg overflow-hidden shadow-sm group-hover:shadow transition-all duration-200 flex-shrink-0 bg-white flex items-center justify-center border border-hairline-light">
              <Image
                src="/images/PRIMELOGO.PNG"
                alt="PrimeFlex Logo"
                width={36}
                height={36}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <span className="text-xl font-bold text-ink tracking-tight font-sans">
              Prime<span className="text-primary font-bold">Flex</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-secondary hover:text-ink transition-colors duration-150 rounded-md hover:bg-ground"
              >
                {link.label}
              </Link>
            ))}
            <div className="ml-3 flex items-center gap-2">
              <Link
                href="/login"
                className="px-3.5 py-1.5 text-sm font-semibold text-secondary hover:text-ink transition-colors rounded-md hover:bg-ground"
              >
                Log In
              </Link>
              <Button href="/apply" size="sm">
                Apply Now
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-secondary hover:text-ink transition-colors rounded-md hover:bg-ground"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out-expo ${
          isOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-5 pt-2 space-y-0.5 border-t border-hairline-light bg-surface">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 text-[15px] font-medium text-secondary hover:text-ink hover:bg-ground rounded-lg transition-colors active:bg-ground"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 space-y-2.5">
            <Button href="/apply" className="w-full" size="md">
              Apply Now
            </Button>
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-4 py-3 text-[15px] font-semibold text-secondary hover:text-ink border border-hairline-light rounded-lg transition-colors active:bg-ground"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import { Phone, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 rounded-lg overflow-hidden shadow-sm flex-shrink-0 bg-white flex items-center justify-center border border-white/10">
                <Image
                  src="/images/PRIMELOGO.PNG"
                  alt="PrimeFlex Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-bold text-white tracking-tight font-sans">
                Prime<span className="text-accent font-bold">Flex</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-white/60 max-w-xs">
              Helping South Africans access short-term credit responsibly, with fast approvals and transparent terms.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: '/', label: 'Home' },
                { href: '/apply', label: 'Apply for a Loan' },
                { href: '/profile', label: 'My Account' },
                { href: '/referral', label: 'Referral Program' },
                { href: '/contact', label: 'Contact Us' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-white/40 flex-shrink-0" />
                <a
                  href="tel:+27646911623"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  064 691 1623
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle size={14} className="text-white/40 flex-shrink-0" />
                <a
                  href="https://wa.me/27646911623"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  WhatsApp Us
                </a>
              </li>
              <li className="text-sm text-white/60 mt-2">
                <span className="block">Mon–Fri: 8 am – 5 pm</span>
                <span className="block">Sat: 9 am – 1 pm</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
              Regulatory
            </h4>
            <div className="space-y-2.5 text-sm text-white/60">
              <p>
                <span className="text-white/40 text-xs uppercase tracking-wide">FSP</span>{' '}
                <span className="text-white/80">46378</span>
              </p>
              <p>
                <span className="text-white/40 text-xs uppercase tracking-wide">NCR CP</span>{' '}
                <span className="text-white/80">19963</span>
              </p>
              <p className="text-xs text-white/40 leading-relaxed pt-1">
                Authorised Financial Service Provider. Registered Credit Provider under the National Credit Act.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} PrimeFlex. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Kyasands, South Africa
          </p>
        </div>
      </div>
    </footer>
  )
}

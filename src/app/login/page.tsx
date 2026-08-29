'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import Card from '@/components/Card'
import { Phone, MessageSquare, PhoneCall, Lock, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [verifyMethod, setVerifyMethod] = useState<'sms' | 'call'>('sms')
  const [phoneNumber, setPhoneNumber] = useState('')

  const isValid = phoneNumber.length >= 9

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder: would trigger OTP send via SMS or call
  }

  return (
    <div className="min-h-screen flex flex-col bg-ground">
      <Navbar />

      <main className="flex-1 section py-10 sm:py-14 lg:py-20 flex items-center justify-center">
        <div className="w-full max-w-md">

          <Card className="p-6 sm:p-8" hover={false}>
            {/* Header */}
            <div className="mb-6">
              <h1 className="font-serif text-heading text-ink">
                {isLogin ? 'Sign in' : 'Sign up'}
              </h1>
              <p className="text-secondary text-sm mt-1.5 leading-relaxed">
                We need to send you a code. Please choose the most
                convenient option
              </p>
            </div>

            {/* SMS / Call toggle */}
            <div className="flex gap-3 mb-6">
              <button
                type="button"
                onClick={() => setVerifyMethod('sms')}
                className={`flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full text-sm font-semibold transition-all duration-150 border-2 ${
                  verifyMethod === 'sms'
                    ? 'border-primary bg-primary-light text-primary'
                    : 'border-hairline-light bg-white text-secondary hover:border-hairline'
                }`}
              >
                <MessageSquare size={16} />
                SMS
              </button>
              <button
                type="button"
                onClick={() => setVerifyMethod('call')}
                className={`flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full text-sm font-semibold transition-all duration-150 border-2 ${
                  verifyMethod === 'call'
                    ? 'border-primary bg-primary-light text-primary'
                    : 'border-hairline-light bg-white text-secondary hover:border-hairline'
                }`}
              >
                <PhoneCall size={16} />
                Call
              </button>
            </div>

            {/* Phone number input */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-secondary mb-1.5 uppercase tracking-wider">
                  Phone number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Phone size={16} className="text-tertiary" />
                  </div>
                  <div className="flex">
                    <span className="inline-flex items-center px-3.5 pl-10 border border-r-0 border-hairline rounded-l-md bg-ground text-ink text-sm font-medium select-none">
                      +27
                    </span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={10}
                      value={phoneNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '')
                        setPhoneNumber(val)
                      }}
                      placeholder="81 234 5678"
                      className="input rounded-l-none flex-1"
                      autoComplete="tel-national"
                    />
                  </div>
                </div>
              </div>

              {/* Continue button */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={!isValid}
              >
                Continue
                <ArrowRight size={18} />
              </Button>

              {/* Toggle sign in / sign up */}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="w-full py-3.5 rounded-md text-sm font-semibold text-primary border-2 border-primary/20 hover:border-primary/40 hover:bg-primary-light/30 transition-all duration-150"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </form>

            {/* Terms */}
            <p className="text-xs text-secondary/70 leading-relaxed mt-6">
              You acknowledge that you agree with to the{' '}
              <Link href="/terms" className="text-primary font-semibold hover:underline">
                Terms &amp; Conditions
              </Link>
              ,{' '}
              <Link href="/privacy" className="text-primary font-semibold hover:underline">
                Data privacy policy
              </Link>
              . You acknowledge that PrimeFlex Capital (Pty) Ltd has been
              appointed by you as your authorized representative to obtain
              your credit information from credit bureaus for the purpose
              of assessing your creditworthiness.
            </p>
          </Card>

          {/* Contact info below card */}
          <div className="mt-6 space-y-3 px-1">
            <div className="flex items-center gap-3 text-secondary">
              <div className="w-9 h-9 rounded-full bg-surface border border-hairline-light flex items-center justify-center flex-shrink-0">
                <Phone size={15} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">+27 64 691 1623</p>
                <p className="text-xs text-tertiary">Monday – Saturday</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-secondary">
              <div className="w-9 h-9 rounded-full bg-surface border border-hairline-light flex items-center justify-center flex-shrink-0">
                <Lock size={15} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-tertiary">
                  NCR Registered • FSP 46378 • Bank-level encryption
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}

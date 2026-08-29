'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import Card from '@/components/Card'
import {
  FileText,
  Banknote,
  CreditCard,
  ArrowRight,
  ShieldCheck,
  Clock,
  CheckCircle,
  MessageCircle,
  ChevronRight,
  Smartphone,
  Zap,
  Award,
  Lock,
  Wallet,
  Star,
  Minus,
  Plus,
} from 'lucide-react'

/* ── Reveal hook ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

function RevealSection({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}

/* ── Currency formatter ── */
const formatCurrency = (value: number) =>
  'R' + value.toLocaleString('en-ZA')

export default function Home() {
  const [loanAmount, setLoanAmount] = useState(2500)

  return (
    <div className="min-h-screen flex flex-col bg-ground">
      <Navbar />

      {/* ════════════════════════════════════════════
          HERO — Simplified Mobile View + Landscape Desktop View
          ════════════════════════════════════════════ */}
      
      {/* ── MOBILE HERO (< md) ── */}
      <section className="md:hidden bg-[#E6F4EA]/40 px-4 pt-6 pb-8">
        <div className="max-w-md mx-auto">
          {/* Top text */}
          <div className="mb-5">
            <h1 className="font-serif text-[28px] sm:text-3xl font-bold text-ink leading-[1.18] tracking-tight">
              Get your cash in as little as 15 minutes
            </h1>
            <p className="text-secondary text-sm mt-2 leading-relaxed">
              Get access to cash fast with money transferred to your account within as little as 5 minutes
            </p>
          </div>

          {/* Loan Card */}
          <div className="bg-white rounded-2xl p-5 shadow-elevated border border-hairline-light">
            <label className="block text-xs font-semibold text-secondary mb-3">
              Loan amount
            </label>

            {/* Stepper with minus/plus */}
            <div className="flex items-center justify-between bg-ground rounded-xl p-2.5 border border-hairline-light mb-4">
              <button
                type="button"
                onClick={() => setLoanAmount((prev) => Math.max(500, prev - (prev <= 1000 ? 100 : 250)))}
                disabled={loanAmount <= 500}
                aria-label="Decrease loan amount"
                className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center transition-transform active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              >
                <Minus size={18} />
              </button>

              <span className="currency text-2xl sm:text-3xl font-bold text-ink">
                {formatCurrency(loanAmount)}
              </span>

              <button
                type="button"
                onClick={() => setLoanAmount((prev) => Math.min(5000, prev + (prev < 1000 ? 100 : 250)))}
                disabled={loanAmount >= 5000}
                aria-label="Increase loan amount"
                className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center transition-transform active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              >
                <Plus size={18} />
              </button>
            </div>

            {/* Range Slider */}
            <div className="mb-5">
              <input
                type="range"
                min="500"
                max="5000"
                step="100"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-tertiary mt-1.5 font-medium">
                <span>R 500</span>
                <span>R 5,000</span>
              </div>
            </div>

            {/* CTA Button */}
            <Button href={`/apply?amount=${loanAmount}`} className="w-full" size="lg">
              Apply for a loan
              <ArrowRight size={18} />
            </Button>
          </div>

          {/* Customer Image below card on mobile */}
          <div className="relative w-full h-[280px] sm:h-[340px] mt-6 rounded-2xl overflow-hidden shadow-sm">
            <Image
              src="/images/HEROBACKMOBILE.PNG"
              alt="PrimeFlex Customer"
              fill
              priority
              className="object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* ── DESKTOP HERO (md+) ── */}
      <section className="hidden md:flex relative overflow-hidden bg-white min-h-[580px] lg:min-h-[640px] flex-col justify-center">
        {/* Desktop hero background */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/HEROBACK.PNG"
            alt="PrimeFlex Hero"
            fill
            priority
            className="object-cover object-bottom"
          />
          <div className="absolute inset-y-0 left-0 w-3/5 lg:w-1/2 bg-gradient-to-r from-white via-white/90 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 section py-12 lg:py-20">
          <div className="section-inner">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left: copy */}
              <div className="lg:col-span-6 xl:col-span-7 space-y-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 bg-primary-light/80 text-primary border border-primary/20 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
                    <ShieldCheck size={14} />
                    NCR Registered Credit Provider
                  </div>

                  <h1 className="font-serif text-display text-ink leading-[1.12]">
                    Short-term loans, <br className="hidden sm:inline" />
                    <span className="text-primary">approved in minutes.</span>
                  </h1>

                  <p className="text-lg text-secondary leading-relaxed max-w-lg">
                    Get between R500 and R5,000 with no hidden fees, no
                    paperwork queues. Funds paid directly to your account.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <Button href="/apply" size="lg">
                    Apply Now
                    <ArrowRight size={18} />
                  </Button>
                  <Button href="/referral" variant="secondary" size="lg">
                    Earn R200 per Referral
                  </Button>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
                  {[
                    { icon: ShieldCheck, text: 'Bank-Level Encryption' },
                    { icon: Award, text: 'FSP 46378' },
                    { icon: Zap, text: 'Same-Day Payout' },
                  ].map(({ icon: Icon, text }) => (
                    <div
                      key={text}
                      className="flex items-center gap-2 text-secondary"
                    >
                      <Icon size={16} className="text-primary flex-shrink-0" />
                      <span className="text-sm font-medium">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: quick amount selector */}
              <div className="lg:col-span-6 xl:col-span-5">
                <Card className="p-6 sm:p-8 bg-white/95 backdrop-blur-md shadow-elevated border border-hairline-light rounded-2xl" hover={false}>
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                        How much do you need?
                      </span>
                      <div className="flex justify-between items-baseline mt-1 mb-3">
                        <span className="text-sm font-medium text-secondary">
                          Loan Amount
                        </span>
                        <span className="currency text-3xl text-primary font-bold">
                          {formatCurrency(loanAmount)}
                        </span>
                      </div>
                      
                      <input
                        type="range"
                        min="500"
                        max="5000"
                        step="100"
                        value={loanAmount}
                        onChange={(e) =>
                          setLoanAmount(Number(e.target.value))
                        }
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-tertiary mt-2 font-medium">
                        <span>R500</span>
                        <span>R2,500</span>
                        <span>R5,000</span>
                      </div>
                    </div>

                    {/* Quick amount chips */}
                    <div className="grid grid-cols-4 gap-2">
                      {[1000, 2000, 3500, 5000].map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => setLoanAmount(amount)}
                          className={`py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                            loanAmount === amount
                              ? 'bg-primary text-white shadow-card'
                              : 'bg-ground text-secondary hover:bg-surface-alt border border-hairline-light'
                          }`}
                        >
                          {formatCurrency(amount)}
                        </button>
                      ))}
                    </div>

                    <Button href={`/apply?amount=${loanAmount}`} className="w-full" size="lg">
                      Apply for {formatCurrency(loanAmount)}
                      <ArrowRight size={18} />
                    </Button>

                    <div className="flex items-center justify-center gap-1.5 text-xs text-tertiary pt-1">
                      <Lock size={13} className="text-secondary flex-shrink-0" />
                      <span>100% secure • Fast approval • Direct bank payout</span>
                    </div>
                  </div>
                </Card>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          TRUST STATS DARK BAR
          ════════════════════════════════════════════ */}
      <div className="bg-[#0B1528] text-white py-6 border-y border-white/10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 items-center">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 bg-white/5">
                <ShieldCheck size={20} className="text-accent" />
              </div>
              <div>
                <p className="text-xs text-white/60">Trusted by</p>
                <p className="text-base font-bold text-white tracking-tight">
                  100,000+ <span className="font-normal text-white/80">Customers</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 bg-white/5">
                <Zap size={20} className="text-accent" />
              </div>
              <div>
                <p className="text-xs text-white/60">Approved in</p>
                <p className="text-base font-bold text-white tracking-tight">Minutes</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 bg-white/5">
                <Wallet size={20} className="text-accent" />
              </div>
              <div>
                <p className="text-xs text-white/60">Funds in your account</p>
                <p className="text-base font-bold text-white tracking-tight">Same day</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 bg-white/5">
                <Star size={20} className="text-accent" />
              </div>
              <div>
                <p className="text-base font-bold text-white tracking-tight">4.7/5</p>
                <p className="text-xs text-white/60">Customer rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          HOW IT WORKS
          ════════════════════════════════════════════ */}
      <section className="section py-20 lg:py-28 bg-surface">
        <RevealSection>
          <div className="section-inner">
            <div className="text-center mb-14">
              <p className="label label-primary mb-3">How It Works</p>
              <h2 className="font-serif text-heading text-ink">
                Three steps to your loan
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-10">
              {[
                {
                  step: '01',
                  icon: FileText,
                  title: 'Apply Online',
                  desc: 'Fill in your details and upload your payslip, bank statements, and ID document.',
                },
                {
                  step: '02',
                  icon: CheckCircle,
                  title: 'Get Approved',
                  desc: 'We review your application and send you a decision — usually within minutes.',
                },
                {
                  step: '03',
                  icon: Banknote,
                  title: 'Receive Funds',
                  desc: 'Once approved, funds are paid directly into your bank account.',
                },
              ].map(({ step, icon: Icon, title, desc }, i) => (
                <div key={step} className="relative">
                  {/* Connector line (desktop only) */}
                  {i < 2 && (
                    <div className="hidden md:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-hairline-light" />
                  )}
                  <div className="text-center">
                    <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-lg bg-primary-light mb-5">
                      <Icon size={32} className="text-primary" />
                      <span className="absolute -top-2 -right-2 w-7 h-7 bg-accent text-white text-xs font-bold rounded flex items-center justify-center">
                        {step}
                      </span>
                    </div>
                    <h3 className="text-subheading font-semibold text-ink mb-2">
                      {title}
                    </h3>
                    <p className="text-sm text-secondary leading-relaxed max-w-xs mx-auto">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button href="/apply" size="lg">
                Start Your Application
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ════════════════════════════════════════════
          WHAT YOU NEED
          ════════════════════════════════════════════ */}
      <section className="section py-20 lg:py-28 bg-ground">
        <RevealSection>
          <div className="section-inner">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <p className="label label-primary mb-3">Requirements</p>
                  <h2 className="font-serif text-heading text-ink mb-5">
                    What you need to apply
                  </h2>
                  <p className="text-secondary leading-relaxed mb-6">
                    Keep these documents ready and your application will take
                    just a few minutes to complete.
                  </p>
                </div>

                <div className="rounded-xl overflow-hidden shadow-card border border-hairline-light">
                  <img
                    src="/images/loan-requirements.png"
                    alt="Required Financial Documents"
                    className="w-full h-48 object-cover"
                  />
                </div>

                <div>
                  <Button href="/apply" variant="secondary" size="md">
                    Apply Now
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                {[
                  {
                    icon: FileText,
                    title: 'Latest Payslip',
                    desc: 'Your most recent proof of income',
                  },
                  {
                    icon: Banknote,
                    title: '3 Months Bank Statements',
                    desc: 'To verify your financial activity',
                  },
                  {
                    icon: CreditCard,
                    title: 'South African ID or Passport',
                    desc: 'For identity verification',
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <Card key={title} className="p-5 flex items-start gap-4">
                    <div className="w-11 h-11 rounded-lg bg-primary-light flex items-center justify-center flex-shrink-0">
                      <Icon size={22} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-ink mb-0.5">{title}</h3>
                      <p className="text-sm text-secondary">{desc}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ════════════════════════════════════════════
          WHY PRIMEFLEX
          ════════════════════════════════════════════ */}
      <section className="section py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

        <RevealSection>
          <div className="section-inner relative z-10">
            <div className="grid lg:grid-cols-12 gap-10 items-center mb-14">
              <div className="lg:col-span-7">
                <p className="label text-accent mb-3">Why PrimeFlex</p>
                <h2 className="font-serif text-heading text-white">
                  Built around what matters to&nbsp;you
                </h2>
                <p className="text-slate-300 mt-3 max-w-xl">
                  Institutional reliability combined with seamless digital evaluation.
                </p>
              </div>
              <div className="lg:col-span-5 hidden lg:block">
                <div className="rounded-xl overflow-hidden border border-white/10 shadow-elevated">
                  <img
                    src="/images/trust-security.png"
                    alt="Bank Level Financial Security"
                    className="w-full h-40 object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: Smartphone,
                  title: '100% Online',
                  desc: 'Apply from your phone or laptop — no branch visits, no paperwork queues.',
                },
                {
                  icon: Zap,
                  title: 'Fast Decisions',
                  desc: 'Get an answer quickly so you can plan ahead with confidence.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Secure & Confidential',
                  desc: 'Bank-level encryption protects your data at every step.',
                },
                {
                  icon: Clock,
                  title: 'Flexible Terms',
                  desc: 'Choose a repayment period of 1, 3, 6, or 12 months to suit your budget.',
                },
                {
                  icon: CheckCircle,
                  title: 'No Hidden Fees',
                  desc: 'Transparent pricing. The amount you see is the amount you pay.',
                },
                {
                  icon: MessageCircle,
                  title: 'Personal Support',
                  desc: 'Reach us on WhatsApp anytime for quick, human support.',
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="p-6 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] transition-colors duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-accent" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ════════════════════════════════════════════
          REFERRAL CTA
          ════════════════════════════════════════════ */}
      <section className="section py-20 lg:py-24 bg-surface">
        <RevealSection>
          <div className="section-inner">
            <div className="bg-gradient-to-br from-cyan-50/60 via-sky-50/40 to-white border border-accent/20 rounded-xl p-8 sm:p-12 lg:p-14 shadow-card">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4 text-left">
                  <p className="label text-accent font-bold">Referral Program</p>
                  <h2 className="font-serif text-heading text-ink">
                    Earn up to R200 per referral
                  </h2>
                  <p className="text-secondary leading-relaxed">
                    Refer a friend to PrimeFlex. When their loan is approved,
                    you earn R100 for loans under R1,000 or R200 for loans
                    over R1,000.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button href="/referral" size="lg">
                      Start Referring
                      <ArrowRight size={18} />
                    </Button>
                    <Button href="/referral" variant="secondary" size="lg">
                      Learn More
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="rounded-xl overflow-hidden shadow-card border border-hairline-light">
                    <img
                      src="/images/referral-rewards.png"
                      alt="Referral Rewards Program"
                      className="w-full h-48 sm:h-56 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ════════════════════════════════════════════
          CONTACT / WHATSAPP CTA
          ════════════════════════════════════════════ */}
      <section className="section py-16 lg:py-20 bg-ground border-t border-hairline-light">
        <div className="section-inner">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-serif text-heading text-ink mb-2">
                Questions?
              </h2>
              <p className="text-secondary">
                Chat with us on WhatsApp for a quick response.
              </p>
            </div>
            <Button
              href="https://wa.me/27646911623"
              variant="whatsapp"
              size="lg"
            >
              <MessageCircle size={20} />
              WhatsApp Us — 064 691 1623
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

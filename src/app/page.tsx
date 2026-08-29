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
  const [loanTerm, setLoanTerm] = useState(3)

  const monthlyPayment = loanAmount / loanTerm + (loanAmount * 0.15) / 12

  return (
    <div className="min-h-screen flex flex-col bg-ground">
      <Navbar />

      {/* ════════════════════════════════════════════
          HERO — Dual background: mobile portrait / desktop landscape
          ════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-white">
        {/* ── Mobile hero image (< md): portrait crop shown above content ── */}
        <div className="md:hidden relative w-full h-[340px] sm:h-[400px]">
          <Image
            src="/images/HEROBACKMOBILE.PNG"
            alt="PrimeFlex Hero"
            fill
            priority
            className="object-cover object-top"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* ── Desktop hero background (md+): landscape fills entire section ── */}
        <div className="hidden md:block absolute inset-0 pointer-events-none">
          <Image
            src="/images/HEROBACK.PNG"
            alt="PrimeFlex Hero"
            fill
            priority
            className="object-cover object-bottom"
          />
          <div className="absolute inset-y-0 left-0 w-3/5 lg:w-1/2 bg-gradient-to-r from-white via-white/90 to-transparent" />
        </div>

        {/* ── Content ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-16 lg:py-20 md:min-h-[520px] lg:min-h-[560px] md:flex md:items-center">
          <div className="w-full grid md:grid-cols-12 gap-6 md:gap-10 lg:gap-14 items-start md:items-center">
            
            {/* Left: copy */}
            <div className="md:col-span-6 xl:col-span-7 space-y-5">
              <div className="space-y-3 sm:space-y-4">
                <div className="inline-flex items-center gap-2 bg-primary-light/80 text-primary border border-primary/20 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
                  <ShieldCheck size={13} />
                  NCR Registered Credit Provider
                </div>

                <h1 className="font-serif text-[28px] sm:text-4xl md:text-[40px] lg:text-[46px] text-ink font-bold leading-[1.12] tracking-tight">
                  Short-term loans,{' '}
                  <br className="hidden sm:inline" />
                  <span className="text-primary">approved in minutes.</span>
                </h1>

                <p className="text-[15px] sm:text-lg text-secondary leading-relaxed max-w-lg">
                  Get between R500 and R10,000 with no hidden fees,
                  no paperwork queues. Funds paid directly to your account.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <Button href="/apply" size="lg">
                  Apply Now
                  <ArrowRight size={18} />
                </Button>
                <Button href="/referral" variant="secondary" size="lg">
                  Earn R200 per Referral
                </Button>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 pt-1">
                {[
                  { icon: ShieldCheck, text: 'Bank-Level Encryption' },
                  { icon: Award, text: 'FSP 46378' },
                  { icon: Zap, text: 'Same-Day Payout' },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-1.5 text-secondary"
                  >
                    <Icon size={14} className="text-primary flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: calculator */}
            <div className="md:col-span-6 xl:col-span-5">
              <Card className="p-5 sm:p-6 md:p-7 bg-white/95 backdrop-blur-md shadow-elevated border border-hairline-light rounded-2xl" hover={false}>
                <h2 className="text-lg font-bold text-ink mb-5">
                  Loan Calculator
                </h2>

                <div className="space-y-5">
                  {/* Loan amount */}
                  <div>
                    <div className="flex justify-between items-baseline mb-2.5">
                      <label className="text-xs sm:text-sm font-medium text-secondary">
                        Loan Amount
                      </label>
                      <span className="currency text-lg sm:text-xl text-ink font-bold">
                        {formatCurrency(loanAmount)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="10000"
                      step="100"
                      value={loanAmount}
                      onChange={(e) =>
                        setLoanAmount(Number(e.target.value))
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between text-[11px] text-tertiary mt-1.5 font-medium">
                      <span>R500</span>
                      <span>R10,000</span>
                    </div>
                  </div>

                  {/* Loan term */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-secondary mb-2.5">
                      Repayment Period
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 3, 6, 12].map((term) => (
                        <button
                          key={term}
                          onClick={() => setLoanTerm(term)}
                          className={`py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-150 ${
                            loanTerm === term
                              ? 'bg-primary text-white shadow-card'
                              : 'bg-ground text-secondary hover:bg-surface-alt border border-hairline-light'
                          }`}
                        >
                          {term} {term === 1 ? 'mo' : 'mos'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Result */}
                  <div className="bg-sky-50/70 rounded-xl p-4 border border-sky-100">
                    <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                      Estimated monthly payment
                    </span>
                    <p className="currency text-2xl sm:text-3xl text-primary font-bold mt-1">
                      {formatCurrency(Math.round(monthlyPayment))}
                    </p>
                    <p className="text-[11px] sm:text-xs text-secondary/80 mt-1.5">
                      Total repayable:{' '}
                      <span className="currency font-semibold text-ink">
                        {formatCurrency(Math.round(monthlyPayment * loanTerm))}
                      </span>
                    </p>
                  </div>

                  <Button href="/apply" className="w-full" size="lg">
                    Apply for {formatCurrency(loanAmount)}
                    <ArrowRight size={18} />
                  </Button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-tertiary">
                    <Lock size={12} className="text-secondary flex-shrink-0" />
                    <span>Your information is 100% secure and confidential.</span>
                  </div>
                </div>
              </Card>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          TRUST STATS DARK BAR
          ════════════════════════════════════════════ */}
      <div className="bg-[#0B1528] text-white py-4 sm:py-6 border-y border-white/10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-center">
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              <div className="w-9 sm:w-11 h-9 sm:h-11 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 bg-white/5">
                <ShieldCheck size={16} className="text-accent sm:hidden" />
                <ShieldCheck size={20} className="text-accent hidden sm:block" />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-white/60">Trusted by</p>
                <p className="text-[13px] sm:text-base font-bold text-white tracking-tight">
                  100,000+ <span className="font-normal text-white/80 hidden sm:inline">Customers</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3.5">
              <div className="w-9 sm:w-11 h-9 sm:h-11 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 bg-white/5">
                <Zap size={16} className="text-accent sm:hidden" />
                <Zap size={20} className="text-accent hidden sm:block" />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-white/60">Approved in</p>
                <p className="text-[13px] sm:text-base font-bold text-white tracking-tight">Minutes</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3.5">
              <div className="w-9 sm:w-11 h-9 sm:h-11 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 bg-white/5">
                <Wallet size={16} className="text-accent sm:hidden" />
                <Wallet size={20} className="text-accent hidden sm:block" />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-white/60">Funds in account</p>
                <p className="text-[13px] sm:text-base font-bold text-white tracking-tight">Same day</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3.5">
              <div className="w-9 sm:w-11 h-9 sm:h-11 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 bg-white/5">
                <Star size={16} className="text-accent sm:hidden" />
                <Star size={20} className="text-accent hidden sm:block" />
              </div>
              <div>
                <p className="text-[13px] sm:text-base font-bold text-white tracking-tight">4.7/5</p>
                <p className="text-[10px] sm:text-xs text-white/60">Customer rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          HOW IT WORKS
          ════════════════════════════════════════════ */}
      <section className="section py-12 sm:py-16 lg:py-28 bg-surface">
        <RevealSection>
          <div className="section-inner">
            <div className="text-center mb-8 sm:mb-14">
              <p className="label label-primary mb-2 sm:mb-3">How It Works</p>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-ink">
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
                    <div className="relative inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 rounded-lg bg-primary-light mb-4 sm:mb-5">
                      <Icon size={26} className="text-primary sm:hidden" />
                      <Icon size={32} className="text-primary hidden sm:block" />
                      <span className="absolute -top-2 -right-2 w-6 sm:w-7 h-6 sm:h-7 bg-accent text-white text-[11px] sm:text-xs font-bold rounded flex items-center justify-center">
                        {step}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-ink mb-1.5 sm:mb-2">
                      {title}
                    </h3>
                    <p className="text-[13px] sm:text-sm text-secondary leading-relaxed max-w-xs mx-auto">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8 sm:mt-12">
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
      <section className="section py-12 sm:py-16 lg:py-28 bg-ground">
        <RevealSection>
          <div className="section-inner">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
              <div className="lg:col-span-6 space-y-5 sm:space-y-6">
                <div>
                  <p className="label label-primary mb-2 sm:mb-3">Requirements</p>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-ink mb-4 sm:mb-5">
                    What you need to apply
                  </h2>
                  <p className="text-[15px] sm:text-base text-secondary leading-relaxed mb-4 sm:mb-6">
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
      <section className="section py-12 sm:py-16 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-60 sm:w-96 h-60 sm:h-96 bg-primary/10 rounded-full blur-3xl -mr-10 sm:-mr-20 -mt-10 sm:-mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 sm:w-96 h-60 sm:h-96 bg-accent/10 rounded-full blur-3xl -ml-10 sm:-ml-20 -mb-10 sm:-mb-20 pointer-events-none" />

        <RevealSection>
          <div className="section-inner relative z-10">
            <div className="grid lg:grid-cols-12 gap-6 sm:gap-10 items-center mb-8 sm:mb-14">
              <div className="lg:col-span-7">
                <p className="label text-accent mb-2 sm:mb-3">Why PrimeFlex</p>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white">
                  Built around what matters to&nbsp;you
                </h2>
                <p className="text-[15px] sm:text-base text-slate-300 mt-2 sm:mt-3 max-w-xl">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
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
                  className="p-4 sm:p-6 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] transition-colors duration-200"
                >
                  <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-3 sm:mb-4">
                    <Icon size={18} className="text-accent sm:hidden" />
                    <Icon size={20} className="text-accent hidden sm:block" />
                  </div>
                  <h3 className="text-[15px] sm:text-base font-semibold text-white mb-1.5 sm:mb-2">{title}</h3>
                  <p className="text-[13px] sm:text-sm text-white/60 leading-relaxed">
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
      <section className="section py-12 sm:py-16 lg:py-24 bg-surface">
        <RevealSection>
          <div className="section-inner">
            <div className="bg-gradient-to-br from-cyan-50/60 via-sky-50/40 to-white border border-accent/20 rounded-xl p-5 sm:p-8 lg:p-14 shadow-card">
              <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-left">
                  <p className="label text-accent font-bold">Referral Program</p>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-ink">
                    Earn up to R200 per referral
                  </h2>
                  <p className="text-[15px] sm:text-base text-secondary leading-relaxed">
                    Refer a friend to PrimeFlex. When their loan is approved,
                    you earn R100 for loans under R1,000 or R200 for loans
                    over R1,000.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-1 sm:pt-2">
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
                      className="w-full h-40 sm:h-48 md:h-56 object-cover"
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
      <section className="section py-10 sm:py-14 lg:py-20 bg-ground border-t border-hairline-light">
        <div className="section-inner">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-center sm:text-left">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-ink mb-1.5 sm:mb-2">
                Questions?
              </h2>
              <p className="text-[15px] sm:text-base text-secondary">
                Chat with us on WhatsApp for a quick response.
              </p>
            </div>
            <Button
              href="https://wa.me/27646911623"
              variant="whatsapp"
              size="lg"
              className="w-full sm:w-auto flex-shrink-0"
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

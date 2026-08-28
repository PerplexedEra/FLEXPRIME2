import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import Card from '@/components/Card'
import {
  Users,
  Share2,
  Copy,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'

export default function ReferralPage() {
  return (
    <div className="min-h-screen flex flex-col bg-ground">
      <Navbar />

      <main className="flex-1 section py-12 lg:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-serif text-heading text-ink mb-2">
              Referral Program
            </h1>
            <p className="text-secondary max-w-lg mx-auto">
              Earn real cash rewards by sharing PrimeFlex with your network.
            </p>
          </div>

          {/* Featured Editorial Visual Card */}
          <div className="rounded-xl overflow-hidden shadow-card border border-hairline-light mb-10 relative">
            <img
              src="/images/referral-rewards.png"
              alt="PrimeFlex Referral Rewards"
              className="w-full h-48 sm:h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-6">
              <div className="text-white max-w-xl">
                <span className="text-xs font-bold text-accent uppercase tracking-wider bg-slate-900/60 px-2.5 py-1 rounded">Unlimited Earnings</span>
                <p className="text-lg font-semibold text-white mt-2">Get paid directly when your friends get approved for a loan.</p>
              </div>
            </div>
          </div>

          {/* ── Commission Structure ── */}
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            <div className="bg-primary rounded-lg p-6 sm:p-8 text-white">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-3">
                Loans Under R1,000
              </p>
              <p className="text-4xl font-semibold currency mb-1">R100</p>
              <p className="text-sm text-white/70">
                Commission per approved referral
              </p>
            </div>
            <div className="bg-ink rounded-lg p-6 sm:p-8 text-white">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-3">
                Loans Over R1,000
              </p>
              <p className="text-4xl font-semibold currency mb-1">R200</p>
              <p className="text-sm text-white/60">
                Commission per approved referral
              </p>
            </div>
          </div>

          {/* ── How It Works ── */}
          <Card className="p-6 sm:p-8 mb-8" hover={false}>
            <h2 className="text-lg font-semibold text-ink flex items-center gap-2 mb-6">
              <Users size={20} className="text-primary" />
              How It Works
            </h2>

            <div className="grid sm:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  icon: Share2,
                  title: 'Share Your Link',
                  desc: 'Send your unique referral link to friends and family.',
                },
                {
                  step: '02',
                  icon: Users,
                  title: 'They Apply',
                  desc: 'Your referrals apply for a loan using your link.',
                },
                {
                  step: '03',
                  icon: CheckCircle,
                  title: 'You Earn',
                  desc: 'Get paid when their loan is approved.',
                },
              ].map(({ step, icon: Icon, title, desc }) => (
                <div key={step} className="text-center">
                  <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary-light mb-4">
                    <Icon size={24} className="text-primary" />
                    <span className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-accent text-white text-[10px] font-bold rounded flex items-center justify-center">
                      {step}
                    </span>
                  </div>
                  <h3 className="font-semibold text-ink mb-1">{title}</h3>
                  <p className="text-sm text-secondary">{desc}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* ── Your Referral Link ── */}
          <Card className="p-6 sm:p-8 mb-8" hover={false}>
            <h2 className="text-lg font-semibold text-ink flex items-center gap-2 mb-5">
              <Share2 size={20} className="text-primary" />
              Your Referral Link
            </h2>

            <div className="bg-ground rounded-lg p-4 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <code className="text-sm text-primary font-mono break-all">
                https://primeflex.co.za/ref/USER12345
              </code>
              <Button variant="secondary" size="sm">
                <Copy size={14} />
                Copy
              </Button>
            </div>

            <p className="text-sm text-secondary mb-5">
              Share this link with your friends. When they apply and get
              approved for a loan, you&apos;ll earn your commission.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                href="https://wa.me/?text=Check%20out%20PrimeFlex%20loans!"
                variant="whatsapp"
                className="flex-1"
              >
                <Share2 size={18} />
                Share on WhatsApp
              </Button>
              <Button
                href="https://facebook.com"
                variant="secondary"
                className="flex-1"
              >
                <Share2 size={18} />
                Share on Facebook
              </Button>
            </div>
          </Card>

          {/* ── Referral Stats ── */}
          <Card className="p-6 sm:p-8 mb-8" hover={false}>
            <h2 className="text-lg font-semibold text-ink flex items-center gap-2 mb-5">
              <CheckCircle size={20} className="text-primary" />
              Your Referral Stats
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { value: '12', label: 'Total Referrals', color: 'text-primary' },
                { value: '8', label: 'Approved', color: 'text-success' },
                { value: 'R 1,400', label: 'Total Earned', color: 'text-ink' },
                { value: '4', label: 'Pending', color: 'text-warning' },
              ].map(({ value, label, color }) => (
                <div
                  key={label}
                  className="text-center p-4 bg-ground rounded-lg"
                >
                  <p className={`text-2xl font-semibold currency ${color}`}>
                    {value}
                  </p>
                  <p className="text-xs text-secondary mt-1">{label}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* ── Become an Agent ── */}
          <div className="bg-primary-light border border-primary/10 rounded-xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-serif text-xl text-ink mb-2">
                Become a Referral Agent
              </h2>
              <p className="text-secondary text-sm max-w-md">
                Turn referrals into a steady income stream. Join our agent
                program and earn commissions on every approved loan.
              </p>
            </div>
            <Button size="lg" className="flex-shrink-0">
              Apply to Become an Agent
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

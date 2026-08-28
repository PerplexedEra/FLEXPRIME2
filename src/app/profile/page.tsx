'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Card from '@/components/Card'
import Button from '@/components/Button'
import {
  TrendingUp,
  Calendar,
  CheckCircle,
  AlertCircle,
  FileText,
} from 'lucide-react'

export default function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col bg-ground">
        <Navbar />
        <main className="flex-1 section py-20 flex items-center justify-center">
          <div className="max-w-sm w-full">
            <Card className="p-8 text-center" hover={false}>
              <h2 className="font-serif text-heading text-ink mb-2">
                Log in to continue
              </h2>
              <p className="text-secondary text-sm mb-6">
                Sign in to view your loan profile and payment&nbsp;history.
              </p>
              <Button
                onClick={() => setIsLoggedIn(true)}
                className="w-full"
                size="lg"
              >
                Log In
              </Button>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-ground">
      <Navbar />

      <main className="flex-1 section py-12 lg:py-20">
        <div className="section-inner">
          <div className="mb-10">
            <h1 className="font-serif text-heading text-ink mb-1">
              My Loan Profile
            </h1>
            <p className="text-secondary">
              Overview of your account, active loans, and payments.
            </p>
          </div>

          {/* ── Summary Cards ── */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              {
                label: 'Outstanding Balance',
                value: 'R 2,500',
                sub: 'Due in 15 days',
                accent: 'text-ink',
              },
              {
                label: 'Available Credit',
                value: 'R 7,500',
                sub: 'Of R 10,000 limit',
                accent: 'text-success',
              },
              {
                label: 'Credit Score',
                value: 'Good',
                sub: '650 – 749 range',
                accent: 'text-success',
              },
            ].map(({ label, value, sub, accent }) => (
              <Card key={label} className="p-5" hover={false}>
                <p className="text-sm text-secondary font-medium mb-3">
                  {label}
                </p>
                <p className={`text-2xl font-semibold currency ${accent}`}>
                  {value}
                </p>
                <p className="text-xs text-tertiary mt-1">{sub}</p>
              </Card>
            ))}
          </div>

          {/* ── Loan Qualification ── */}
          <Card className="p-6 sm:p-8 mb-6" hover={false}>
            <h2 className="text-lg font-semibold text-ink flex items-center gap-2 mb-5">
              <TrendingUp size={20} className="text-primary" />
              Loan Qualification
            </h2>

            <div className="bg-primary-light rounded-lg p-4 mb-5 flex items-center gap-3">
              <CheckCircle size={18} className="text-success flex-shrink-0" />
              <div>
                <span className="font-semibold text-ink text-sm">
                  You qualify for up to R 15,000
                </span>
                <p className="text-xs text-secondary mt-0.5">
                  Based on your income, payment history, and credit score
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Monthly Income', value: 'R 15,000' },
                {
                  label: 'Debt-to-Income Ratio',
                  value: '25% (Good)',
                  color: 'text-success',
                },
                {
                  label: 'Payment History',
                  value: '100% On-time',
                  color: 'text-success',
                },
              ].map(({ label, value, color }) => (
                <div
                  key={label}
                  className="flex items-center justify-between py-2 border-b border-hairline-light last:border-0"
                >
                  <span className="text-sm text-secondary">{label}</span>
                  <span
                    className={`text-sm font-semibold currency ${color || 'text-ink'}`}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <Button href="/apply" className="w-full">
                Apply for Additional Loan
              </Button>
            </div>
          </Card>

          {/* ── Active Loans ── */}
          <Card className="p-6 sm:p-8 mb-6" hover={false}>
            <h2 className="text-lg font-semibold text-ink flex items-center gap-2 mb-5">
              <FileText size={20} className="text-primary" />
              Active Loans
            </h2>

            <div className="border border-hairline-light rounded-lg p-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-ink text-sm">
                    Personal Loan #PF-2024-001
                  </h3>
                  <p className="text-xs text-tertiary mt-0.5">
                    Taken on Jan 15, 2024
                  </p>
                </div>
                <span className="badge badge-warning">Active</span>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                <div>
                  <p className="text-tertiary text-xs mb-0.5">Amount</p>
                  <p className="font-semibold currency text-ink">R 5,000</p>
                </div>
                <div>
                  <p className="text-tertiary text-xs mb-0.5">Repaid</p>
                  <p className="font-semibold currency text-success">
                    R 2,500
                  </p>
                </div>
                <div>
                  <p className="text-tertiary text-xs mb-0.5">Remaining</p>
                  <p className="font-semibold currency text-ink">R 2,500</p>
                </div>
              </div>

              <div>
                <div className="w-full bg-surface-alt rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: '50%' }}
                  />
                </div>
                <p className="text-xs text-tertiary mt-1.5">50% repaid</p>
              </div>
            </div>
          </Card>

          {/* ── Upcoming Payments ── */}
          <Card className="p-6 sm:p-8 mb-6" hover={false}>
            <h2 className="text-lg font-semibold text-ink flex items-center gap-2 mb-5">
              <Calendar size={20} className="text-primary" />
              Upcoming Payments
            </h2>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-danger-light border border-danger/10 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertCircle size={18} className="text-danger flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-ink">
                      Next Payment Due
                    </h4>
                    <p className="text-xs text-tertiary">Feb 15, 2024</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold currency text-ink">R 833</p>
                  <p className="text-xs text-danger">Due in 15 days</p>
                </div>
              </div>

              {[
                {
                  title: 'March Payment',
                  date: 'Mar 15, 2024',
                  amount: 'R 833',
                  days: '45 days',
                },
                {
                  title: 'Final Payment',
                  date: 'Apr 15, 2024',
                  amount: 'R 834',
                  days: '75 days',
                },
              ].map(({ title, date, amount, days }) => (
                <div
                  key={title}
                  className="flex items-center justify-between p-4 border border-hairline-light rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Calendar
                      size={18}
                      className="text-tertiary flex-shrink-0"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-ink">
                        {title}
                      </h4>
                      <p className="text-xs text-tertiary">{date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold currency text-ink">{amount}</p>
                    <p className="text-xs text-tertiary">Due in {days}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <Button variant="secondary" className="w-full">
                Make a Payment Now
              </Button>
            </div>
          </Card>

          {/* ── Payment History ── */}
          <Card className="p-6 sm:p-8" hover={false}>
            <h2 className="text-lg font-semibold text-ink flex items-center gap-2 mb-5">
              <CheckCircle size={20} className="text-primary" />
              Payment History
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-hairline-light">
                    <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { date: 'Jan 15, 2024', amount: 'R 833' },
                    { date: 'Dec 15, 2023', amount: 'R 833' },
                    { date: 'Nov 15, 2023', amount: 'R 833' },
                  ].map(({ date, amount }) => (
                    <tr
                      key={date}
                      className="border-b border-hairline-light last:border-0"
                    >
                      <td className="py-3 px-4 text-ink">{date}</td>
                      <td className="py-3 px-4 currency text-ink">{amount}</td>
                      <td className="py-3 px-4">
                        <span className="badge badge-success">Paid</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

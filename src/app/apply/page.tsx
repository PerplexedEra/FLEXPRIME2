'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import Card from '@/components/Card'
import { Upload, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react'

const steps = ['Personal Details', 'Employment & Loan', 'Documents']

export default function ApplyPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    idNumber: '',
    monthlyIncome: '',
    employmentStatus: '',
    loanAmount: '',
    loanTerm: '',
    payslip: null as File | null,
    bankStatements: null as File | null,
    idDocument: null as File | null,
  })

  const handleFileUpload = (field: string, file: File) => {
    setFormData({ ...formData, [field]: file })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(
      'Application submitted! We will review your application and get back to you soon.'
    )
  }

  const updateField = (field: string, value: string) =>
    setFormData({ ...formData, [field]: value })

  return (
    <div className="min-h-screen flex flex-col bg-ground">
      <Navbar />

      <main className="flex-1 section py-12 lg:py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-sky-100 text-primary px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <span>NCR CP 19963</span>
              <span className="w-1 h-1 rounded-full bg-primary" />
              <span>FSP 46378</span>
            </div>
            <h1 className="font-serif text-heading text-ink mb-2">
              Apply for a Loan
            </h1>
            <p className="text-secondary">
              Complete the steps below — fast, confidential & 100% online.
            </p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {steps.map((label, i) => {
              const s = i + 1
              const active = step === s
              const done = step > s
              return (
                <div key={label} className="flex items-center gap-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                        done
                          ? 'bg-success text-white'
                          : active
                            ? 'bg-primary text-white'
                            : 'bg-surface-alt text-tertiary border border-hairline-light'
                      }`}
                    >
                      {done ? <CheckCircle size={16} /> : s}
                    </div>
                    <span
                      className={`text-sm font-medium hidden sm:inline ${
                        active ? 'text-ink' : 'text-tertiary'
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-8 sm:w-12 h-px ${
                        done ? 'bg-success' : 'bg-hairline-light'
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>

          <Card className="p-6 sm:p-8" hover={false}>
            <form onSubmit={handleSubmit}>
              {/* ── Step 1 ── */}
              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="text-lg font-semibold text-ink mb-1">
                    Personal Information
                  </h2>
                  <p className="text-sm text-secondary mb-4">
                    Your legal name and contact information.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-ink mb-1.5">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        className="input"
                        value={formData.firstName}
                        onChange={(e) =>
                          updateField('firstName', e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink mb-1.5">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        className="input"
                        value={formData.lastName}
                        onChange={(e) =>
                          updateField('lastName', e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-ink mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        className="input"
                        value={formData.email}
                        onChange={(e) =>
                          updateField('email', e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        className="input"
                        value={formData.phone}
                        onChange={(e) =>
                          updateField('phone', e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink mb-1.5">
                      ID Number
                    </label>
                    <input
                      type="text"
                      required
                      className="input"
                      value={formData.idNumber}
                      onChange={(e) =>
                        updateField('idNumber', e.target.value)
                      }
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button onClick={() => setStep(2)}>
                      Next
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </div>
              )}

              {/* ── Step 2 ── */}
              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="text-lg font-semibold text-ink mb-1">
                    Employment &amp; Loan Details
                  </h2>
                  <p className="text-sm text-secondary mb-4">
                    Help us understand your financial situation.
                  </p>

                  <div>
                    <label className="block text-sm font-medium text-ink mb-1.5">
                      Employment Status
                    </label>
                    <select
                      required
                      className="input"
                      value={formData.employmentStatus}
                      onChange={(e) =>
                        updateField('employmentStatus', e.target.value)
                      }
                    >
                      <option value="">Select status</option>
                      <option value="employed">Employed</option>
                      <option value="self-employed">Self-employed</option>
                      <option value="pensioner">Pensioner</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink mb-1.5">
                      Monthly Income (ZAR)
                    </label>
                    <input
                      type="number"
                      required
                      className="input"
                      value={formData.monthlyIncome}
                      onChange={(e) =>
                        updateField('monthlyIncome', e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink mb-1.5">
                      Loan Amount (ZAR)
                    </label>
                    <input
                      type="number"
                      required
                      min="500"
                      max="10000"
                      className="input"
                      value={formData.loanAmount}
                      onChange={(e) =>
                        updateField('loanAmount', e.target.value)
                      }
                    />
                    <p className="text-xs text-tertiary mt-1">
                      Between R500 and R10,000
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink mb-1.5">
                      Loan Term
                    </label>
                    <select
                      required
                      className="input"
                      value={formData.loanTerm}
                      onChange={(e) =>
                        updateField('loanTerm', e.target.value)
                      }
                    >
                      <option value="">Select term</option>
                      <option value="1">1 month</option>
                      <option value="3">3 months</option>
                      <option value="6">6 months</option>
                      <option value="12">12 months</option>
                    </select>
                  </div>

                  <div className="flex justify-between pt-2">
                    <Button variant="secondary" onClick={() => setStep(1)}>
                      <ArrowLeft size={16} />
                      Back
                    </Button>
                    <Button onClick={() => setStep(3)}>
                      Next
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </div>
              )}

              {/* ── Step 3 ── */}
              {step === 3 && (
                <div className="space-y-5">
                  <h2 className="text-lg font-semibold text-ink mb-1">
                    Upload Documents
                  </h2>
                  <p className="text-sm text-secondary mb-4">
                    Upload clear copies of the required documents.
                  </p>

                  {[
                    {
                      id: 'payslip',
                      label: 'Latest Payslip',
                      file: formData.payslip,
                    },
                    {
                      id: 'bankStatements',
                      label: 'Last 3 Months Bank Statements',
                      file: formData.bankStatements,
                      multiple: true,
                    },
                    {
                      id: 'idDocument',
                      label: 'ID or Passport',
                      file: formData.idDocument,
                    },
                  ].map(({ id, label, file, multiple }) => (
                    <div key={id}>
                      <label className="block text-sm font-medium text-ink mb-1.5">
                        {label}
                      </label>
                      <div className="border border-dashed border-hairline rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer bg-ground/50">
                        <input
                          type="file"
                          required
                          multiple={multiple}
                          className="hidden"
                          id={id}
                          onChange={(e) =>
                            e.target.files &&
                            handleFileUpload(id, e.target.files[0])
                          }
                        />
                        <label htmlFor={id} className="cursor-pointer">
                          <Upload
                            className="mx-auto text-tertiary mb-2"
                            size={28}
                          />
                          <p className="text-sm text-secondary">
                            Click to upload
                          </p>
                          {file && (
                            <p className="text-sm text-primary font-medium mt-2 flex items-center justify-center gap-1.5">
                              <CheckCircle size={14} />
                              {file.name}
                            </p>
                          )}
                        </label>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-between pt-2">
                    <Button variant="secondary" onClick={() => setStep(2)}>
                      <ArrowLeft size={16} />
                      Back
                    </Button>
                    <Button type="submit">Submit Application</Button>
                  </div>
                </div>
              )}
            </form>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import Card from '@/components/Card'
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-ground">
      <Navbar />

      <main className="flex-1 section py-12 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-serif text-heading text-ink mb-2">
              Contact Us
            </h1>
            <p className="text-secondary">
              We&apos;re here to help. Reach out anytime.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact info — left */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6" hover={false}>
                <h2 className="text-lg font-semibold text-ink mb-5">
                  Get in Touch
                </h2>

                <div className="space-y-5">
                  {[
                    {
                      icon: Phone,
                      title: 'Phone',
                      content: (
                        <a
                          href="tel:+27646911623"
                          className="text-primary hover:underline"
                        >
                          064 691 1623
                        </a>
                      ),
                      sub: 'Mon–Fri: 8 am – 5 pm',
                    },
                    {
                      icon: MessageCircle,
                      title: 'WhatsApp',
                      content: (
                        <a
                          href="https://wa.me/27646911623"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          064 691 1623
                        </a>
                      ),
                      sub: 'Quick responses',
                    },
                    {
                      icon: Mail,
                      title: 'Email',
                      content: (
                        <span className="text-ink">info@primeflex.co.za</span>
                      ),
                      sub: 'We reply within 24 hours',
                    },
                    {
                      icon: MapPin,
                      title: 'Location',
                      content: <span className="text-ink">Kyasands, South Africa</span>,
                    },
                    {
                      icon: Clock,
                      title: 'Business Hours',
                      content: (
                        <div className="text-ink text-sm space-y-0.5">
                          <p>Monday – Friday: 8 am – 5 pm</p>
                          <p>Saturday: 9 am – 1 pm</p>
                          <p className="text-tertiary">Sunday: Closed</p>
                        </div>
                      ),
                    },
                  ].map(({ icon: Icon, title, content, sub }) => (
                    <div key={title} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary-light flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon size={18} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-ink mb-0.5">
                          {title}
                        </h3>
                        <div className="text-sm">{content}</div>
                        {sub && (
                          <p className="text-xs text-tertiary mt-0.5">
                            {sub}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick WhatsApp CTA */}
              <div className="bg-primary-light border border-primary/10 rounded-lg p-5">
                <h3 className="font-semibold text-ink text-sm mb-1.5">
                  Need Quick Help?
                </h3>
                <p className="text-sm text-secondary mb-3">
                  WhatsApp is the fastest way to reach&nbsp;us.
                </p>
                <Button
                  href="https://wa.me/27646911623"
                  variant="whatsapp"
                  size="md"
                  className="w-full"
                >
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                </Button>
              </div>
            </div>

            {/* Contact form — right */}
            <div className="lg:col-span-3">
              <Card className="p-6 sm:p-8" hover={false}>
                <h2 className="text-lg font-semibold text-ink mb-5">
                  Send Us a Message
                </h2>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-ink mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-ink mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        className="input"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="input"
                        placeholder="064 000 0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink mb-1.5">
                      Subject
                    </label>
                    <select className="input">
                      <option value="">Select a subject</option>
                      <option value="loan">Loan Application</option>
                      <option value="payment">Payment Inquiry</option>
                      <option value="referral">Referral Program</option>
                      <option value="complaint">Complaint</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      className="input"
                      placeholder="How can we help?"
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

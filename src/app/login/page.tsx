'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import Card from '@/components/Card'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen flex flex-col bg-ground">
      <Navbar />

      <main className="flex-1 section py-12 lg:py-20 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-serif text-heading text-ink mb-1">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h1>
            <p className="text-secondary text-sm">
              {isLogin
                ? 'Log in to view your loans and account details.'
                : 'Sign up to apply for a loan and track your account.'}
            </p>
          </div>

          <Card className="p-6 sm:p-8" hover={false}>
            <form className="space-y-4">
              {!isLogin && (
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
              )}

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
                  Password
                </label>
                <input
                  type="password"
                  className="input"
                  placeholder="••••••••"
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="input"
                    placeholder="••••••••"
                  />
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-hairline text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-secondary">Remember me</span>
                  </label>
                  <a
                    href="#"
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    Forgot password?
                  </a>
                </div>
              )}

              <Button type="submit" className="w-full" size="lg">
                {isLogin ? 'Log In' : 'Sign Up'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-secondary">
                {isLogin
                  ? "Don't have an account? "
                  : 'Already have an account? '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary hover:underline font-semibold"
                >
                  {isLogin ? 'Sign up' : 'Log in'}
                </button>
              </p>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-hairline-light" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-surface text-tertiary uppercase tracking-wider font-medium">
                    or continue with
                  </span>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <Button variant="secondary" className="w-full">
                  Google
                </Button>
                <Button variant="secondary" className="w-full">
                  Facebook
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

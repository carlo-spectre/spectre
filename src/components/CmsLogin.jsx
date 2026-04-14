import { useState } from 'react'
import { getCmsAuthMeta } from '../data/cmsAuth'

const CmsLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { emailHint, role } = getCmsAuthMeta()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    const success = await onLogin?.(email.trim(), password)
    setIsSubmitting(false)
    if (!success) {
      setError('Invalid credentials. Check email/password and try again.')
    }
  }

  return (
    <section className="min-h-[100dvh] bg-[#08080a] px-5 py-16 sm:px-8 md:px-12 xl:px-16">
      <div className="mx-auto w-full max-w-xl border border-white/[0.08] bg-black/20 p-6 sm:p-8 xl:p-10">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.26em] text-brand/90 sm:text-xs">
          CMS
        </p>
        <h1 className="text-2xl font-semibold text-white sm:text-3xl">Content Login</h1>
        <p className="mt-3 text-sm text-zinc-400 sm:text-base">
          Sign in to edit project cards and case-study content.
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500 sm:text-xs">
          Role: {role} · Email: {emailHint}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block">
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:text-xs">
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full border border-white/[0.12] bg-[#0d0d10] px-4 py-3 text-sm text-zinc-100 outline-none transition-colors focus:border-brand/80"
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:text-xs">
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full border border-white/[0.12] bg-[#0d0d10] px-4 py-3 text-sm text-zinc-100 outline-none transition-colors focus:border-brand/80"
              required
            />
          </label>

          {error ? <p className="text-sm text-brand">{error}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center border border-white/20 bg-white/[0.04] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-200 transition-colors hover:border-white/35 hover:text-white sm:text-xs"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default CmsLogin

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
  const sectionRef = useRef(null)
  const [isSending, setIsSending] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' })

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.contact-topbar', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
        },
        opacity: 0,
        y: 16,
        duration: 0.7,
        ease: 'power3.out',
      })

      gsap.from('.contact-aside', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
        },
        opacity: 0,
        y: 32,
        duration: 0.85,
        ease: 'power3.out',
      })

      gsap.from('.contact-panel', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        y: 36,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.06,
      })

      gsap.from('.contact-footer-strip', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
        opacity: 0,
        y: 20,
        duration: 0.75,
        ease: 'power3.out',
        delay: 0.12,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    setIsSending(true)
    setSubmitStatus({ type: '', message: '' })

    try {
      const response = await fetch('https://formsubmit.co/ajax/carloyung54@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      form.reset()
      setSubmitStatus({
        type: 'success',
        message: 'Message sent successfully. I will get back to you soon.',
      })
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'Unable to send right now. Please try again or email me directly.',
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="border-t border-white/[0.06] bg-[#060608] py-20 md:py-28 xl:py-36 min-[1920px]:py-44"
    >
      <div className="mx-auto w-full max-w-[min(96vw,1920px)] px-5 sm:px-8 md:px-12 xl:px-16 min-[1920px]:max-w-[min(94vw,2200px)] min-[1920px]:px-24">
        {/* Section index + rhythm */}
        <div className="contact-topbar mb-12 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-center sm:justify-between md:mb-16 xl:mb-20">
          <div className="flex items-baseline gap-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] sm:text-xs xl:text-sm">
              <span className="text-brand/90">03</span>
              <span className="text-zinc-600"> — Contact</span>
            </span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-white/[0.12] via-white/[0.06] to-transparent sm:mx-8" />
          <p className="max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-[0.22em] text-brand/70 sm:text-right sm:text-xs xl:max-w-md xl:text-sm">
            New inquiries &amp; collaborations
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 lg:items-start xl:gap-14 min-[1920px]:gap-20">
          {/* Left: editorial column — aligns top with form panel */}
          <aside className="contact-aside lg:col-span-5 xl:col-span-5">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl xl:text-5xl 2xl:text-6xl min-[1920px]:text-7xl">
              Get in Touch
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-zinc-500 sm:mt-6 sm:text-base xl:mt-8 xl:max-w-lg xl:text-lg min-[1920px]:max-w-xl min-[1920px]:text-xl">
              Tell me about your project, timeline, and budget range. I reply to every message — usually within a couple of business days.
            </p>

            <a
              href="mailto:carloyung54@gmail.com"
              className="mt-8 inline-flex items-center gap-2 border-b border-white/20 pb-1 font-mono text-sm text-white transition-colors hover:border-brand/60 hover:text-brand/90 sm:mt-10 xl:mt-12 xl:text-base min-[1920px]:text-lg"
            >
              carloyung54@gmail.com
              <span className="text-brand" aria-hidden>
                →
              </span>
            </a>

            <dl className="mt-10 space-y-6 border-t border-white/[0.08] pt-10 sm:mt-12 xl:mt-14 xl:space-y-8 xl:pt-12">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-brand/75 sm:text-xs">
                  Response
                </dt>
                <dd className="mt-1.5 text-sm text-zinc-400 sm:text-base">
                  Typically 24–48 hours, Mon–Fri
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-brand/75 sm:text-xs">
                  Based in
                </dt>
                <dd className="mt-1.5 text-sm text-zinc-400 sm:text-base">
                  Your city · Open to remote worldwide
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-brand/75 sm:text-xs">
                  Focus
                </dt>
                <dd className="mt-1.5 text-sm text-zinc-400 sm:text-base">
                  Product UI, creative sites, design systems
                </dd>
              </div>
            </dl>

            <nav className="contact-social mt-10 flex flex-col gap-3 sm:mt-12 xl:mt-14" aria-label="Social profiles">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-b border-white/[0.06] py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500 transition-colors hover:border-white/15 hover:text-white sm:text-xs"
              >
                <span>GitHub</span>
                <span className="text-zinc-600 transition-transform group-hover:translate-x-0.5 group-hover:text-brand">
                  ↗
                </span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-b border-white/[0.06] py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500 transition-colors hover:border-white/15 hover:text-white sm:text-xs"
              >
                <span>LinkedIn</span>
                <span className="text-zinc-600 transition-transform group-hover:translate-x-0.5 group-hover:text-brand">
                  ↗
                </span>
              </a>
              <a
                href="mailto:carloyung54@gmail.com"
                className="group flex items-center justify-between border-b border-white/[0.06] py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500 transition-colors hover:border-white/15 hover:text-white sm:text-xs"
              >
                <span>Email</span>
                <span className="text-zinc-600 transition-transform group-hover:translate-x-0.5 group-hover:text-brand">
                  ↗
                </span>
              </a>
            </nav>
          </aside>

          {/* Right: form panel — same vertical start as headline */}
          <div className="contact-panel lg:col-span-7 xl:col-span-7">
            <div className="border border-white/[0.1] bg-gradient-to-b from-white/[0.04] to-transparent p-6 sm:p-8 lg:p-10 xl:p-12 min-[1920px]:p-14">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.08] pb-6 sm:mb-10 xl:mb-12">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-brand/85 sm:text-xs">
                    Message form
                  </p>
                  <p className="mt-2 text-sm text-zinc-500 sm:text-base">
                    Fields marked below are required.
                  </p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                  Encrypted in transit
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 xl:space-y-7 min-[1920px]:space-y-8">
                <input type="hidden" name="_subject" value="New inquiry from spectredesign.studio" />
                <input type="hidden" name="_captcha" value="false" />
                <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:text-xs xl:text-sm"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full border border-white/[0.1] bg-[#08080a]/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-brand/40 focus:ring-1 focus:ring-brand/30 xl:px-5 xl:py-4 xl:text-base min-[1920px]:px-6 min-[1920px]:py-5 min-[1920px]:text-lg"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:text-xs xl:text-sm"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full border border-white/[0.1] bg-[#08080a]/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-brand/40 focus:ring-1 focus:ring-brand/30 xl:px-5 xl:py-4 xl:text-base min-[1920px]:px-6 min-[1920px]:py-5 min-[1920px]:text-lg"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:text-xs xl:text-sm"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full resize-y border border-white/[0.1] bg-[#08080a]/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-brand/40 focus:ring-1 focus:ring-brand/30 xl:min-h-[11rem] xl:px-5 xl:py-4 xl:text-base min-[1920px]:min-h-[12rem] min-[1920px]:px-6 min-[1920px]:py-5 min-[1920px]:text-lg"
                    placeholder="Project scope, links, timeline…"
                  />
                </div>
                <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs leading-relaxed text-zinc-600 sm:max-w-xs sm:text-sm">
                    By sending, you agree I may store your message to reply — no newsletters unless you ask.
                  </p>
                  <button
                    type="submit"
                    disabled={isSending}
                    className="shrink-0 border border-white/20 bg-white/[0.08] px-8 py-3.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white transition hover:border-brand/50 hover:bg-brand/15 sm:px-10 xl:py-4 xl:text-sm min-[1920px]:px-12 min-[1920px]:py-5 min-[1920px]:text-base"
                  >
                    {isSending ? 'Sending…' : 'Send message'}
                  </button>
                </div>
                {submitStatus.message ? (
                  <p
                    className={`text-sm ${
                      submitStatus.type === 'success' ? 'text-brand/90' : 'text-zinc-400'
                    }`}
                  >
                    {submitStatus.message}
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </div>

        <div className="contact-footer-strip mt-14 flex flex-col items-start justify-between gap-6 border-t border-white/[0.08] pt-10 sm:mt-16 sm:flex-row sm:items-center sm:pt-12 xl:mt-20 xl:pt-14">
          <p className="max-w-2xl text-xs leading-relaxed text-zinc-600 sm:text-sm xl:text-base">
            Prefer a call? Drop your availability in the message — include your time zone.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-brand/55 sm:text-xs">
            Spectre · Portfolio
          </p>
        </div>
      </div>
    </section>
  )
}

export default Contact

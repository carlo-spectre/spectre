import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.contact-heading', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 28,
        duration: 0.85,
        ease: 'power3.out',
      })

      gsap.from('.contact-form', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        y: 32,
        duration: 0.9,
        ease: 'power3.out',
      })

      gsap.from('.contact-social', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        opacity: 0,
        y: 16,
        duration: 0.75,
        ease: 'power3.out',
        delay: 0.08,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Thank you for your message! I'll get back to you soon.")
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-[#060608] py-24 md:py-32 xl:py-40 min-[1920px]:py-48"
    >
      <div className="mx-auto w-full max-w-[min(96vw,1920px)] px-5 sm:px-8 md:px-12 xl:px-16 min-[1920px]:max-w-[min(94vw,2200px)] min-[1920px]:px-24">
        <div className="contact-heading mb-14 md:mb-16 xl:mb-20 min-[1920px]:mb-24">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600 sm:text-xs xl:mb-4 xl:text-sm min-[1920px]:text-base">
            Contact
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl xl:text-5xl 2xl:text-6xl min-[1920px]:text-7xl">
            Let&apos;s talk
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-500 md:max-w-lg xl:mt-6 xl:max-w-2xl xl:text-base min-[1920px]:max-w-3xl min-[1920px]:text-lg">
            Have a project or collaboration in mind? Send a note — I read everything.
          </p>
        </div>

        <div className="contact-form mx-auto w-full max-w-xl xl:max-w-2xl min-[1920px]:max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-6 xl:space-y-8 min-[1920px]:space-y-10">
            <div>
              <label htmlFor="name" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:text-xs xl:mb-3 xl:text-sm min-[1920px]:text-base">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-primary-500/40 focus:ring-1 focus:ring-primary-500/30 xl:px-5 xl:py-4 xl:text-base min-[1920px]:px-6 min-[1920px]:py-5 min-[1920px]:text-lg"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:text-xs xl:mb-3 xl:text-sm min-[1920px]:text-base">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-primary-500/40 focus:ring-1 focus:ring-primary-500/30 xl:px-5 xl:py-4 xl:text-base min-[1920px]:px-6 min-[1920px]:py-5 min-[1920px]:text-lg"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:text-xs xl:mb-3 xl:text-sm min-[1920px]:text-base">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="w-full resize-none border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-primary-500/40 focus:ring-1 focus:ring-primary-500/30 xl:min-h-[12rem] xl:px-5 xl:py-4 xl:text-base min-[1920px]:min-h-[14rem] min-[1920px]:px-6 min-[1920px]:py-5 min-[1920px]:text-lg"
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              className="w-full border border-white/15 bg-white/[0.06] py-3.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white transition hover:border-primary-500/40 hover:bg-primary-500/10 xl:py-4 xl:text-sm min-[1920px]:py-5 min-[1920px]:text-base"
            >
              Send
            </button>
          </form>

          <div className="contact-social mt-12 flex justify-center gap-10 xl:mt-16 xl:gap-14 min-[1920px]:mt-20 min-[1920px]:gap-16">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 transition-colors hover:text-white"
            >
              <span className="sr-only">GitHub</span>
              <svg className="h-5 w-5 xl:h-6 xl:w-6 min-[1920px]:h-7 min-[1920px]:w-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 transition-colors hover:text-white"
            >
              <span className="sr-only">LinkedIn</span>
              <svg className="h-5 w-5 xl:h-6 xl:w-6 min-[1920px]:h-7 min-[1920px]:w-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="mailto:your.email@example.com"
              className="text-zinc-500 transition-colors hover:text-white"
            >
              <span className="sr-only">Email</span>
              <svg className="h-5 w-5 xl:h-6 xl:w-6 min-[1920px]:h-7 min-[1920px]:w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const rootRef = useRef(null)

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (!rootRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.hero-top', {
        opacity: 0,
        y: -12,
        duration: 1,
        ease: 'power3.out',
      })

      gsap.from('.hero-line', {
        opacity: 0,
        y: 48,
        duration: 1.15,
        ease: 'power4.out',
        stagger: 0.12,
        delay: 0.08,
      })

      gsap.from('.hero-meta', {
        opacity: 0,
        y: 20,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.45,
      })

      gsap.from('.hero-bottom', {
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 0.55,
      })

      gsap.to('.hero-glow', {
        opacity: 0.55,
        scale: 1.08,
        duration: 14,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      gsap.to('.hero-foreground', {
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
        yPercent: -6,
        opacity: 0.92,
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative min-h-[100dvh] overflow-hidden border-b border-white/[0.06]"
    >
      <div className="pointer-events-none absolute inset-0 grain" />
      <div className="hero-glow pointer-events-none absolute -left-1/4 top-1/4 h-[min(80vw,720px)] w-[min(80vw,720px)] rounded-full bg-primary-500/15 blur-[120px] opacity-40" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-600/10 blur-[100px]" />

      <div className="hero-foreground relative mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col px-5 pb-10 pt-8 sm:px-8 md:px-12 md:pb-14 md:pt-10">
        <header className="hero-top flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
              Spectre
            </span>
          </div>
          <nav className="flex items-center gap-8 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
            <button
              type="button"
              onClick={() => scrollTo('projects')}
              className="transition-colors hover:text-white"
            >
              Work
            </button>
            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className="transition-colors hover:text-white"
            >
              Contact
            </button>
          </nav>
        </header>

        <div className="flex flex-1 flex-col justify-center py-16 md:py-20">
          <p className="hero-meta mb-6 max-w-md font-mono text-[10px] uppercase leading-relaxed tracking-[0.3em] text-zinc-500">
            Portfolio — digital product &amp; interface
          </p>

          <h1 className="max-w-[14ch] text-[clamp(2.75rem,10vw,7rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-white md:max-w-none">
            <span className="hero-line block">Shape</span>
            <span className="hero-line block text-outline md:inline md:text-outline">
              silence
            </span>
            <span className="hero-line block md:inline md:pl-[0.15em]">into signal.</span>
          </h1>

          <div className="hero-meta mt-10 flex max-w-xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <p className="text-sm leading-relaxed text-zinc-400 md:text-base">
              Crafted interfaces, motion, and systems — built for clarity and presence.
            </p>
            <button
              type="button"
              onClick={() => scrollTo('projects')}
              className="group inline-flex w-fit items-center gap-3 border border-white/15 bg-white/[0.03] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
            >
              View work
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </button>
          </div>
        </div>

        <div className="hero-bottom flex flex-col justify-between gap-6 border-t border-white/[0.06] pt-8 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-600 sm:flex-row sm:items-center">
          <span>Scroll</span>
          <div className="hidden h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent sm:block" />
          <span className="text-zinc-500">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </section>
  )
}

export default Hero

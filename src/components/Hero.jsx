import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import logotypeWhite from '../assets/logotype-white.svg'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const rootRef = useRef(null)

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (!rootRef.current) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

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

      if (!reducedMotion) {
        gsap.to('.hero-bg-blob--1', {
          xPercent: 8,
          yPercent: -6,
          scale: 1.06,
          duration: 18,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
        gsap.to('.hero-bg-blob--2', {
          xPercent: -10,
          yPercent: 8,
          scale: 1.08,
          duration: 24,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 2,
        })
        gsap.to('.hero-bg-blob--3', {
          xPercent: 5,
          yPercent: 10,
          scale: 0.94,
          duration: 21,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 1,
        })
        gsap.to('.hero-bg-veil', {
          opacity: 0.55,
          duration: 12,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
      }

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
      className="relative min-h-[100dvh] overflow-hidden border-b border-white/[0.06] bg-[#08080a]"
    >
      {/* GSAP-animated ambient background — neutral only, no brand accent */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#08080a]" aria-hidden>
        <div className="hero-bg-blob hero-bg-blob--1 absolute -left-[20%] top-[10%] h-[min(85vw,48rem)] w-[min(85vw,48rem)] rounded-full bg-zinc-500/[0.07] blur-[100px] xl:blur-[120px]" />
        <div className="hero-bg-blob hero-bg-blob--2 absolute -right-[15%] bottom-[5%] h-[min(75vw,40rem)] w-[min(75vw,40rem)] rounded-full bg-zinc-400/[0.06] blur-[90px] xl:blur-[110px]" />
        <div className="hero-bg-blob hero-bg-blob--3 absolute left-[25%] top-[40%] h-[min(60vw,28rem)] w-[min(60vw,28rem)] -translate-x-1/2 rounded-full bg-white/[0.04] blur-[80px]" />
        <div className="hero-bg-veil pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#08080a]/40 to-[#08080a]/90 opacity-45" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] grain" />

      <div className="hero-foreground relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[min(96vw,1920px)] flex-col px-5 pb-12 pt-8 sm:px-8 sm:pb-14 sm:pt-10 md:px-12 md:pb-16 md:pt-12 xl:px-16 xl:pb-20 xl:pt-14 min-[1920px]:max-w-[min(94vw,2200px)] min-[1920px]:px-24 min-[1920px]:pb-24 min-[1920px]:pt-16">
        <header className="hero-top flex items-center justify-between gap-6">
          <a
            href="#home"
            className="hero-logo flex shrink-0 items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080a]"
            aria-label="Spectre — home"
          >
            <img
              src={logotypeWhite}
              alt=""
              width={558}
              height={281}
              className="h-7 w-auto max-w-[min(100%,11rem)] object-contain object-left sm:h-8 sm:max-w-[13rem] md:max-w-[15rem] xl:h-11 xl:max-w-[19rem] 2xl:h-12 2xl:max-w-[22rem] min-[1920px]:h-14 min-[1920px]:max-w-[26rem]"
            />
          </a>
          <nav className="flex items-center gap-8 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 sm:text-xs sm:gap-10 xl:gap-14 xl:text-sm min-[1920px]:gap-16 min-[1920px]:text-base">
            <button
              type="button"
              onClick={() => scrollTo('projects')}
              className="transition-colors hover:text-primary-400"
            >
              Work
            </button>
            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className="transition-colors hover:text-primary-400"
            >
              Contact
            </button>
          </nav>
        </header>

        <div className="flex flex-1 flex-col justify-center py-16 md:py-20 xl:py-24 min-[1920px]:py-28">
          <p className="hero-meta mb-6 max-w-md font-mono text-[10px] uppercase leading-relaxed tracking-[0.3em] sm:text-xs sm:mb-8 xl:mb-10 xl:max-w-xl xl:text-sm min-[1920px]:mb-12 min-[1920px]:max-w-2xl min-[1920px]:text-base">
            <span className="text-primary-400">Portfolio</span>
            <span className="text-zinc-500"> — digital product &amp; interface</span>
          </p>

          <h1 className="max-w-[14ch] text-[clamp(2.75rem,5vw+1.5rem,6.5rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-white md:max-w-none xl:text-[clamp(4rem,7vw+1rem,8.5rem)] min-[1920px]:text-[clamp(5.5rem,6vw+2rem,11rem)] min-[1920px]:tracking-[-0.045em]">
            <span className="hero-line block">Shape</span>
            <span className="hero-line block text-outline md:inline md:text-outline">
              silence
            </span>
            <span className="hero-line block md:inline md:pl-[0.15em]">into signal.</span>
          </h1>

          <div className="hero-meta mt-10 flex max-w-xl flex-col gap-4 sm:mt-12 sm:flex-row sm:items-end sm:justify-between xl:mt-14 xl:max-w-4xl min-[1920px]:mt-16 min-[1920px]:max-w-5xl">
            <p className="text-sm leading-relaxed text-zinc-400 md:text-base xl:text-lg xl:leading-relaxed min-[1920px]:max-w-3xl min-[1920px]:text-xl">
              Crafted interfaces, motion, and systems — built for clarity and presence.
            </p>
            <button
              type="button"
              onClick={() => scrollTo('projects')}
              className="group inline-flex w-fit shrink-0 items-center gap-3 border border-white/15 bg-white/[0.03] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:border-white/25 hover:bg-white/[0.06] hover:text-white sm:px-6 sm:py-3.5 sm:text-xs xl:px-8 xl:py-4 xl:text-sm min-[1920px]:px-10 min-[1920px]:py-5 min-[1920px]:text-base"
            >
              View work
              <span className="text-primary-400 transition-transform group-hover:translate-x-0.5">→</span>
            </button>
          </div>
        </div>

        <div className="hero-bottom flex flex-col justify-between gap-6 border-t border-white/[0.06] pt-8 font-mono text-[10px] uppercase tracking-[0.24em] sm:flex-row sm:items-center sm:pt-10 xl:pt-12 xl:text-xs min-[1920px]:pt-14 min-[1920px]:text-sm">
          <span className="text-primary-400/90">Scroll</span>
          <div className="hidden h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent sm:block" />
          <span className="text-zinc-600">
            © <span className="text-primary-400/90">{new Date().getFullYear()}</span>
          </span>
        </div>
      </div>
    </section>
  )
}

export default Hero

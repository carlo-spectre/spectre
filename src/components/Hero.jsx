import { lazy, Suspense, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import logotypeWhite from '../assets/logotype-white.svg'

const HeroWebGL = lazy(() => import('./HeroWebGL'))

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
      className="relative min-h-[100dvh] overflow-hidden border-b border-white/[0.06] bg-[#08080a]"
    >
      <Suspense
        fallback={
          <div
            className="pointer-events-none absolute inset-0 z-0 bg-[#08080a]"
            aria-hidden
          />
        }
      >
        <HeroWebGL />
      </Suspense>
      <div className="pointer-events-none absolute inset-0 z-[1] grain" />
      <div className="hero-glow pointer-events-none absolute -left-1/4 top-1/4 z-[1] h-[min(90vw,56rem)] w-[min(90vw,56rem)] rounded-full bg-primary-500/15 blur-[120px] opacity-40 xl:h-[min(100vw,64rem)] xl:w-[min(100vw,64rem)] xl:blur-[140px] min-[1920px]:h-[min(110vw,72rem)] min-[1920px]:w-[min(110vw,72rem)]" />
      <div className="pointer-events-none absolute bottom-0 right-0 z-[1] h-96 w-96 rounded-full bg-violet-600/10 blur-[100px] xl:h-[28rem] xl:w-[28rem] min-[1920px]:h-[36rem] min-[1920px]:w-[36rem]" />

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

        <div className="flex flex-1 flex-col justify-center py-16 md:py-20 xl:py-24 min-[1920px]:py-28">
          <p className="hero-meta mb-6 max-w-md font-mono text-[10px] uppercase leading-relaxed tracking-[0.3em] text-zinc-500 sm:text-xs sm:mb-8 xl:mb-10 xl:max-w-xl xl:text-sm min-[1920px]:mb-12 min-[1920px]:max-w-2xl min-[1920px]:text-base">
            Portfolio — digital product &amp; interface
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
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </button>
          </div>
        </div>

        <div className="hero-bottom flex flex-col justify-between gap-6 border-t border-white/[0.06] pt-8 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-600 sm:flex-row sm:items-center sm:pt-10 xl:pt-12 xl:text-xs min-[1920px]:pt-14 min-[1920px]:text-sm">
          <span>Scroll</span>
          <div className="hidden h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent sm:block" />
          <span className="text-zinc-500">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </section>
  )
}

export default Hero

import { useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import logotypeWhite from '../assets/logotype-white.svg'
import HeroLogomarkFx from './HeroLogomarkFx'

gsap.registerPlugin(ScrollTrigger)

const Hero = ({ onNavigate }) => {
  const rootRef = useRef(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const scrollTo = (id, options = {}) => {
    const { useTransition = true } = options
    setIsMobileMenuOpen(false)
    if (useTransition && onNavigate) {
      onNavigate(id)
      return
    }
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  useLayoutEffect(() => {
    if (!rootRef.current) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const introTl = gsap.timeline({ defaults: { overwrite: 'auto' } })
      const bgTl = gsap.timeline({ paused: true })

      gsap.set('.hero-top', { opacity: 0, y: -12 })
      gsap.set('.hero-line', { opacity: 0, y: 64, rotateX: -26, transformOrigin: '50% 100%' })
      gsap.set('.hero-headline-word', { opacity: 0, yPercent: 115 })
      gsap.set('.hero-meta', { opacity: 0, y: 20 })
      gsap.set('.hero-bottom', { opacity: 0 })

      introTl
        .to('.hero-top', {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
        })
        .to('.hero-line', {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.05,
          ease: 'power4.out',
          stagger: 0.09,
        }, '-=0.55')
        .to('.hero-headline-word', {
          opacity: 1,
          yPercent: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.025,
        }, '-=0.9')
        .to('.hero-meta', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
        }, '-=0.45')
        .to('.hero-bottom', {
          opacity: 1,
          duration: 0.85,
          ease: 'power2.out',
        }, '-=0.45')

      if (!reducedMotion) {
        bgTl.to('.hero-bg-blob--1', {
          xPercent: 8,
          yPercent: -6,
          scale: 1.06,
          duration: 18,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        }, 0)
        bgTl.to('.hero-bg-blob--2', {
          xPercent: -10,
          yPercent: 8,
          scale: 1.08,
          duration: 24,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 2,
        }, 0)
        bgTl.to('.hero-bg-blob--3', {
          xPercent: 5,
          yPercent: 10,
          scale: 0.94,
          duration: 21,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 1,
        }, 0)
        bgTl.to('.hero-bg-veil', {
          opacity: 0.55,
          duration: 12,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        }, 0)
        bgTl.to('.hero-bg-gradient-shift', {
          xPercent: 6,
          yPercent: -4,
          scale: 1.06,
          duration: 24,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        }, 0)

        introTl.eventCallback('onComplete', () => {
          bgTl.play(0)
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

  const mobileMenuPortal = isMobileMenuOpen && typeof document !== 'undefined'
    ? createPortal(
      <div className="fixed right-5 top-20 z-[400] flex min-w-[11rem] flex-col border border-white/[0.18] bg-[#09090c] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-md sm:hidden">
        <button
          type="button"
          onClick={() => scrollTo('projects', { useTransition: false })}
          className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:text-brand"
        >
          Work
        </button>
        <button
          type="button"
          onClick={() => scrollTo('contact', { useTransition: false })}
          className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:text-brand"
        >
          Contact
        </button>
      </div>,
      document.body,
    )
    : null

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative min-h-[100dvh] overflow-hidden border-b border-white/[0.06] bg-[#08080a]"
    >
      {/* GSAP-animated abstract background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#08080a]" aria-hidden>
        <div className="hero-bg-gradient-shift hero-anim-target absolute -inset-[18%] bg-[radial-gradient(1200px_700px_at_15%_20%,rgba(242,55,55,0.14),transparent_62%),radial-gradient(1000px_650px_at_85%_75%,rgba(255,255,255,0.08),transparent_66%),linear-gradient(120deg,#060608_0%,#0b0b0e_45%,#060608_100%)]" />
        <div className="hero-bg-blob hero-bg-blob--1 hero-anim-target absolute -left-[20%] top-[10%] h-[min(85vw,48rem)] w-[min(85vw,48rem)] rounded-full bg-zinc-500/[0.07] blur-[100px] xl:blur-[120px]" />
        <div className="hero-bg-blob hero-bg-blob--2 hero-anim-target absolute -right-[15%] bottom-[5%] h-[min(75vw,40rem)] w-[min(75vw,40rem)] rounded-full bg-zinc-400/[0.06] blur-[90px] xl:blur-[110px]" />
        <div className="hero-bg-blob hero-bg-blob--3 hero-anim-target absolute left-[25%] top-[40%] h-[min(60vw,28rem)] w-[min(60vw,28rem)] -translate-x-1/2 rounded-full bg-white/[0.04] blur-[80px]" />
        <HeroLogomarkFx />
        <div className="hero-bg-veil hero-anim-target pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#08080a]/40 to-[#08080a]/90 opacity-45" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] grain" />

      <div className="hero-foreground relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[min(96vw,1920px)] flex-col px-5 pb-12 pt-8 sm:px-8 sm:pb-14 sm:pt-10 md:px-12 md:pb-16 md:pt-12 xl:px-16 xl:pb-20 xl:pt-14 min-[1920px]:max-w-[min(94vw,2200px)] min-[1920px]:px-24 min-[1920px]:pb-24 min-[1920px]:pt-16">
        <header className="hero-top relative flex items-center justify-between gap-4 sm:gap-6">
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
              className="h-10 w-auto max-w-[min(100%,15.5rem)] object-contain object-left sm:h-9 sm:max-w-[14.5rem] md:h-10 md:max-w-[17rem] xl:h-[3.25rem] xl:max-w-[23rem] 2xl:h-[3.75rem] 2xl:max-w-[26rem] min-[1920px]:h-[4.25rem] min-[1920px]:max-w-[31rem]"
            />
          </a>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center border border-white/15 bg-white/[0.03] text-zinc-300 transition-colors hover:border-white/30 hover:text-white sm:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em]">≡</span>
          </button>

          <nav className="hidden items-center gap-5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:flex sm:gap-8 sm:text-xs sm:tracking-[0.22em] xl:gap-14 xl:text-sm min-[1920px]:gap-16 min-[1920px]:text-base">
            <button
              type="button"
              onClick={() => scrollTo('projects', { useTransition: false })}
              className="transition-colors hover:text-brand"
            >
              Work
            </button>
            <button
              type="button"
              onClick={() => scrollTo('contact', { useTransition: false })}
              className="transition-colors hover:text-brand"
            >
              Contact
            </button>
          </nav>

          {mobileMenuPortal}
        </header>

        <div className="flex flex-1 flex-col justify-center py-16 md:justify-start md:pt-[30rem] md:pb-20 lg:pt-[34rem] lg:pb-24 xl:justify-center xl:py-24 min-[1920px]:py-28">
          <p className="hero-meta mb-6 max-w-md font-mono text-[10px] uppercase leading-relaxed tracking-[0.3em] sm:text-xs sm:mb-8 xl:mb-10 xl:max-w-xl xl:text-sm min-[1920px]:mb-12 min-[1920px]:max-w-2xl min-[1920px]:text-base">
            <span className="text-brand">Portfolio</span>
            <span className="text-zinc-500"> — digital product &amp; interface</span>
          </p>

          <h1 className="max-w-[14ch] text-[clamp(6rem,18vw,8.8rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-white sm:text-[clamp(3.35rem,7.8vw+1.2rem,6.5rem)] md:max-w-none xl:text-[clamp(4rem,7vw+1rem,8.5rem)] min-[1920px]:text-[clamp(5.5rem,6vw+2rem,11rem)] min-[1920px]:tracking-[-0.045em]">
            <span className="hero-line block overflow-hidden">
              <span className="hero-headline-word inline-block">Shape</span>
            </span>
            <span className="hero-line block text-outline md:inline md:text-outline">
              <span className="hero-headline-word inline-block">silence</span>
            </span>
            <span className="hero-line block overflow-hidden md:inline md:pl-[0.15em]">
              <span className="hero-headline-word inline-block">into signal.</span>
            </span>
          </h1>

          <div className="hero-meta mt-10 flex max-w-xl flex-col gap-3 sm:mt-12 sm:flex-row sm:items-center sm:justify-start sm:gap-6 xl:mt-14 xl:max-w-4xl xl:gap-8 min-[1920px]:mt-16 min-[1920px]:max-w-5xl min-[1920px]:gap-10">
            <p className="text-xs leading-relaxed text-zinc-400 md:text-sm xl:text-base xl:leading-relaxed min-[1920px]:max-w-3xl min-[1920px]:text-lg">
              Crafted interfaces, motion, and systems —
              <br className="sm:hidden" />
              <br className="hidden md:block xl:hidden" />
              built for clarity and presence.
            </p>
            <button
              type="button"
              onClick={() => scrollTo('projects', { useTransition: false })}
              className="group inline-flex w-fit shrink-0 items-center gap-3 border border-white/15 bg-white/[0.03] px-6 py-4 font-mono text-xs uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:border-white/25 hover:bg-white/[0.06] hover:text-white sm:px-6 sm:py-3.5 sm:text-xs xl:px-8 xl:py-4 xl:text-sm min-[1920px]:px-10 min-[1920px]:py-5 min-[1920px]:text-base"
            >
              View work
              <span className="text-brand transition-transform group-hover:translate-x-0.5">→</span>
            </button>
          </div>
        </div>

        <div className="hero-bottom flex flex-row items-center justify-between gap-4 pt-6 font-mono text-[10px] uppercase tracking-[0.24em] sm:pt-8 xl:pt-10 xl:text-xs min-[1920px]:pt-12 min-[1920px]:text-sm">
          <span className="flex items-center gap-2 text-brand/90">
            Scroll
            <span className="hero-scroll-chevron inline-flex h-5 w-5 items-center justify-center text-base leading-none text-brand" aria-hidden>
              ˅
            </span>
          </span>
          <span className="text-zinc-600">
            © <span className="text-brand/90">{new Date().getFullYear()}</span>
          </span>
        </div>
      </div>
    </section>
  )
}

export default Hero

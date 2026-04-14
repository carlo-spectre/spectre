import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import logotypeWhite from '../assets/logotype-white.svg'
import logomarkDark from '../assets/logomark-dark.svg'

gsap.registerPlugin(ScrollTrigger)

const ProjectCaseStudy = ({ project, allProjects = [], onBack, onNavigateMain, onOpenProject }) => {
  const rootRef = useRef(null)
  const [useCompactLogo, setUseCompactLogo] = useState(false)
  const currentIndex = Math.max(
    0,
    allProjects.findIndex((item) => item.slug === project.slug),
  )
  const nextProject = allProjects[(currentIndex + 1) % Math.max(allProjects.length, 1)] || project
  const prevProject =
    allProjects[(currentIndex - 1 + Math.max(allProjects.length, 1)) % Math.max(allProjects.length, 1)] || project
  const carouselProjects = allProjects.length > 0
    ? [
      allProjects[(currentIndex + 1) % allProjects.length],
      allProjects[(currentIndex + 2) % allProjects.length],
      allProjects[(currentIndex + 3) % allProjects.length],
    ]
    : []
  const supportingImages = project.supportingImages || [
    'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=2000&q=80',
  ]
  const contextParagraphs = project.contextParagraphs?.length
    ? project.contextParagraphs
    : [
      'We treated this engagement as a UX case-study sprint focused on decision clarity: what users need to understand first, what they need to do next, and what confidence signals should be present at each step.',
      'The design direction prioritized strong hierarchy, progressive disclosure, and motion that supports comprehension rather than decoration. Early iterations intentionally over-communicated system state, then refined density based on validation feedback.',
    ]
  const rationaleParagraphs = project.rationaleParagraphs?.length
    ? project.rationaleParagraphs
    : [
      'The final system uses repeatable content blocks and a deliberate rhythm of dense and light sections. This creates pacing that helps readers scan quickly, then dive into details where needed.',
      'We also aligned copy structure to a case-study narrative: problem framing, measurable goals, process evidence, and outcome statements. That sequence makes both design intent and business value clear.',
    ]

  useEffect(() => {
    if (!rootRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.case-hero-item', {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
      })

      gsap.from('.case-section', {
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 70%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const threshold = 160
    const onScroll = () => {
      setUseCompactLogo(window.scrollY > threshold)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <article ref={rootRef} className="border-b border-white/[0.06] bg-[#08080a]">
      <div className="sticky top-0 z-40 bg-[#08080a]">
        <div className="mx-auto flex w-full max-w-[min(96vw,1920px)] items-center justify-between gap-4 px-5 py-4 sm:px-8 md:px-12 xl:px-16 min-[1920px]:max-w-[min(94vw,2200px)] min-[1920px]:px-24">
          <button
            type="button"
            onClick={() => onNavigateMain?.('home')}
            className="flex shrink-0 items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080a]"
            aria-label="Spectre — home"
          >
            <img
              src={useCompactLogo ? logomarkDark : logotypeWhite}
              alt=""
              width={558}
              height={281}
              className={`w-auto object-contain object-left transition-all duration-400 ${
                useCompactLogo
                  ? 'h-8 max-w-[2.25rem] sm:h-9 sm:max-w-[2.5rem]'
                  : 'h-7 max-w-[min(100%,12rem)] sm:h-8 sm:max-w-[14rem] md:h-9 md:max-w-[16rem] xl:h-10 xl:max-w-[18rem]'
              }`}
            />
          </button>

          <nav className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 sm:gap-8 sm:text-xs">
            <button
              type="button"
              onClick={() => onNavigateMain?.('projects')}
              className="transition-colors hover:text-brand"
            >
              Work
            </button>
            <button
              type="button"
              onClick={() => onNavigateMain?.('contact')}
              className="transition-colors hover:text-brand"
            >
              Contact
            </button>
          </nav>
        </div>
      </div>

      <section className="relative overflow-hidden border-b border-white/[0.08]">
        <img
          src={project.thumbnail}
          alt={`${project.title} hero visual`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/70 via-[#08080a]/75 to-[#08080a]" />
        <div className="relative z-10 mx-auto w-full max-w-[min(96vw,1920px)] px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-24 md:px-12 md:pb-24 md:pt-28 xl:px-16 xl:pb-28 xl:pt-32 min-[1920px]:max-w-[min(94vw,2200px)] min-[1920px]:px-24 min-[1920px]:pb-36 min-[1920px]:pt-40">
          <button
            type="button"
            onClick={onBack}
            className="case-hero-item mb-10 inline-flex items-center gap-3 border border-white/15 bg-black/30 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-200 transition-colors hover:border-white/30 hover:text-white sm:text-xs xl:px-5 xl:py-2.5 xl:text-sm"
          >
            ← Back to projects
          </button>

          <div className="max-w-4xl">
            <p className="case-hero-item mb-4 font-mono text-[10px] uppercase tracking-[0.26em] text-brand/90 sm:text-xs xl:text-sm">
              {project.tag} case study
            </p>
            <h1 className="case-hero-item text-4xl font-semibold tracking-tight text-white sm:text-5xl xl:text-6xl min-[1920px]:text-7xl">
              {project.title}
            </h1>
            <p className="case-hero-item mt-6 max-w-3xl text-sm leading-relaxed text-zinc-300 sm:text-base xl:text-lg">
              {project.summary}
            </p>
          </div>

          <dl className="case-hero-item mt-10 grid gap-6 border-t border-white/[0.08] pt-8 sm:grid-cols-3 xl:mt-14 xl:pt-10">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 sm:text-xs">
                Role
              </dt>
              <dd className="mt-2 text-sm text-zinc-200 xl:text-base">{project.role}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 sm:text-xs">
                Team
              </dt>
              <dd className="mt-2 text-sm text-zinc-200 xl:text-base">{project.team}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 sm:text-xs">
                Timeline
              </dt>
              <dd className="mt-2 text-sm text-zinc-200 xl:text-base">{project.timeframe}</dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[min(96vw,1920px)] px-5 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 xl:px-16 xl:py-28 min-[1920px]:max-w-[min(94vw,2200px)] min-[1920px]:px-24 min-[1920px]:py-32">
        <section className="case-section border-b border-white/[0.08] pb-12 xl:pb-16">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.24em] text-brand/90 sm:text-xs xl:text-sm">
            The challenge
          </h2>
          <p className="mt-5 max-w-4xl text-base leading-relaxed text-zinc-300 xl:text-xl">
            {project.challenge}
          </p>
        </section>

        <section className="case-section border-b border-white/[0.08] py-12 xl:py-16">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.24em] text-brand/90 sm:text-xs xl:text-sm">
            Context
          </h2>
          <div className="mt-5 max-w-4xl space-y-5 text-sm leading-relaxed text-zinc-300 sm:text-base xl:text-lg">
            {contextParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="case-section border-b border-white/[0.08] py-12 xl:py-16">
          <figure className="overflow-hidden border border-white/[0.08] bg-white/[0.02]">
            <img
              src={supportingImages[0]}
              alt={`${project.title} case study mockup 1`}
              className="h-[32vh] w-full object-cover sm:h-[40vh] xl:h-[52vh]"
              loading="lazy"
            />
          </figure>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-400 xl:text-base">
            Early wireframe direction explored information hierarchy and placement for critical decision blocks.
          </p>
        </section>

        <section className="case-section grid gap-10 border-b border-white/[0.08] py-12 xl:grid-cols-2 xl:gap-16 xl:py-16">
          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-[0.24em] text-brand/90 sm:text-xs xl:text-sm">
              Goals
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-zinc-300 xl:text-base">
              {project.goals.map((goal) => (
                <li key={goal} className="flex gap-3">
                  <span className="mt-1 text-brand">•</span>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-[0.24em] text-brand/90 sm:text-xs xl:text-sm">
              Process
            </h2>
            <ol className="mt-5 space-y-3 text-sm leading-relaxed text-zinc-300 xl:text-base">
              {project.process.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="mt-0.5 font-mono text-xs text-brand">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="case-section border-b border-white/[0.08] py-12 xl:py-16">
          <figure className="overflow-hidden border border-white/[0.08] bg-white/[0.02]">
            <img
              src={supportingImages[1]}
              alt={`${project.title} case study mockup 2`}
              className="h-[34vh] w-full object-cover sm:h-[42vh] xl:h-[56vh]"
              loading="lazy"
            />
          </figure>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-400 xl:text-base">
            Mid-fidelity explorations focused on interaction cues, visual pacing, and confidence states across steps.
          </p>
        </section>

        <section className="case-section border-b border-white/[0.08] py-12 xl:py-16">
          <figure className="overflow-hidden border border-white/[0.08] bg-white/[0.02]">
            <img
              src={supportingImages[2]}
              alt={`${project.title} case study mockup 3`}
              className="h-[32vh] w-full object-cover sm:h-[40vh] xl:h-[52vh]"
              loading="lazy"
            />
          </figure>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-400 xl:text-base">
            Final presentation visuals document the polished system, states, and component behavior across key flows.
          </p>
        </section>

        <section className="case-section border-b border-white/[0.08] py-12 xl:py-16">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.24em] text-brand/90 sm:text-xs xl:text-sm">
            Design rationale
          </h2>
          <div className="mt-5 max-w-4xl space-y-5 text-sm leading-relaxed text-zinc-300 sm:text-base xl:text-lg">
            {rationaleParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="case-section pt-12 xl:pt-16">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.24em] text-brand/90 sm:text-xs xl:text-sm">
            Outcome
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {project.outcome.map((item) => (
              <div key={item} className="border border-white/[0.08] bg-white/[0.02] p-5 xl:p-6">
                <p className="text-sm leading-relaxed text-zinc-200 xl:text-base">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="case-section mt-14 border-t border-white/[0.08] pt-12 xl:mt-16 xl:pt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.24em] text-brand/90 sm:text-xs xl:text-sm">
              Next projects
            </h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onOpenProject?.(prevProject.slug)}
                className="border border-white/[0.15] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-300 transition-colors hover:border-brand/50 hover:text-brand sm:text-xs"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={() => onOpenProject?.(nextProject.slug)}
                className="border border-white/[0.15] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-300 transition-colors hover:border-brand/50 hover:text-brand sm:text-xs"
              >
                Next
              </button>
            </div>
          </div>

          <div className="flex snap-x gap-4 overflow-x-auto pb-2">
            {carouselProjects.map((item) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => onOpenProject?.(item.slug)}
                className="group relative min-w-[78%] snap-start overflow-hidden border border-white/[0.1] bg-[#0d0d10] text-left sm:min-w-[45%] lg:min-w-[31%]"
              >
                <img
                  src={item.thumbnail}
                  alt={`${item.title} preview`}
                  className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:h-48"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
                <div className="relative z-10 px-4 pb-4 pt-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand/85">{item.tag}</p>
                  <p className="mt-1 text-sm text-white sm:text-base">{item.title}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </article>
  )
}

export default ProjectCaseStudy

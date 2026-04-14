import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const loadingCards = Array.from({ length: 9 }, (_, index) => ({ id: `loading-${index}` }))

const formatLastSynced = (value) => {
  if (!value) return null
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return null

  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

const Projects = ({ onOpenProject, projects, isLoading = false, lastSyncedAt = null }) => {
  const sectionRef = useRef(null)
  const lastSyncedLabel = formatLastSynced(lastSyncedAt)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.projects-intro', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
        },
        opacity: 0,
        y: 28,
        duration: 0.85,
        ease: 'power3.out',
      })

      gsap.from('.project-tile', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
        },
        opacity: 0,
        y: 36,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.06,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="border-b border-white/[0.06] bg-[#08080a] py-24 md:py-32 xl:py-40 min-[1920px]:py-48"
    >
      <div className="mx-auto w-full max-w-[min(96vw,1920px)] px-5 sm:px-8 md:px-12 xl:px-16 min-[1920px]:max-w-[min(94vw,2200px)] min-[1920px]:px-24">
        <div className="projects-intro mb-16 flex flex-col justify-between gap-8 md:mb-20 md:flex-row md:items-end xl:mb-24 min-[1920px]:mb-32">
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-brand/85 sm:text-xs xl:mb-4 xl:text-sm min-[1920px]:text-base">
              Selected work
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl xl:text-5xl 2xl:text-6xl min-[1920px]:text-7xl min-[1920px]:tracking-tight">
              Nine Pieces
            </h2>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600 sm:text-xs">
              {isLoading ? 'Syncing from Strapi...' : (lastSyncedLabel ? `Last synced ${lastSyncedLabel}` : 'Waiting for Strapi sync')}
            </p>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-zinc-500 md:max-w-md xl:max-w-xl xl:text-base min-[1920px]:max-w-2xl min-[1920px]:text-lg">
            Replace titles and tags with your real projects. Layout is three columns × three rows — flex, not grid.
          </p>
        </div>

        {/* 3×3 via flex wrap — no CSS grid */}
        <div className="flex flex-wrap border-t border-l border-white/[0.08]">
          {isLoading ? loadingCards.map((card, index) => (
            <div
              key={card.id}
              className="project-tile relative flex aspect-[4/3] w-full flex-col justify-between overflow-hidden border-r border-b border-white/[0.08] bg-gradient-to-b from-zinc-900/60 to-zinc-900/40 p-5 sm:w-1/2 sm:p-6 lg:w-1/3 lg:aspect-square lg:p-8 xl:p-10 min-[1920px]:aspect-[5/4] min-[1920px]:p-12"
              aria-hidden="true"
            >
              <div className="absolute inset-0 animate-pulse bg-white/[0.02]" />
              <div className="relative z-10 flex items-start justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:text-xs xl:text-sm min-[1920px]:text-base">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="h-3 w-16 rounded bg-white/[0.08] sm:h-3.5 sm:w-20" />
              </div>
              <div className="relative z-10">
                <span className="mb-2 block h-5 w-2/3 rounded bg-white/[0.12] sm:h-6" />
                <span className="block h-3 w-20 rounded bg-white/[0.08]" />
              </div>
              <div className="absolute right-4 top-4 h-5 w-5 animate-spin rounded-full border border-white/20 border-t-brand/80 sm:right-5 sm:top-5" />
            </div>
          )) : projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              onClick={() => onOpenProject?.(project.slug)}
              className="project-tile group relative flex aspect-[4/3] w-full cursor-pointer flex-col justify-between overflow-hidden border-r border-b border-white/[0.08] p-5 text-left sm:w-1/2 sm:p-6 lg:w-1/3 lg:aspect-square lg:p-8 xl:p-10 min-[1920px]:aspect-[5/4] min-[1920px]:p-12"
              aria-label={`Open ${project.title} case study`}
            >
              <img
                src={project.thumbnail}
                alt={`${project.title} abstract thumbnail`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/45 to-black/80 transition-opacity duration-500 group-hover:opacity-90" />
              <div className="relative z-10 flex items-start justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand/90 sm:text-xs xl:text-sm min-[1920px]:text-base">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand/75 sm:text-xs xl:text-sm min-[1920px]:text-base">
                  {project.tag}
                </span>
              </div>
              <div className="relative z-10">
                <h3 className="text-lg font-medium tracking-tight text-white transition-colors group-hover:text-brand/90 md:text-xl xl:text-2xl 2xl:text-3xl min-[1920px]:text-4xl">
                  {project.title}
                </h3>
                <span className="mt-3 inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-brand/80 opacity-0 transition-opacity group-hover:opacity-100 xl:mt-4 xl:text-xs min-[1920px]:text-sm">
                  Open →
                </span>
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

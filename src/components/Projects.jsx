import { useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const loadingCards = Array.from({ length: 8 }, (_, index) => ({ id: `loading-${index}` }))

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

const getTileSpanClass = (index) => {
  const rowIndex = Math.floor(index / 2)
  const isFirstInPair = index % 2 === 0
  const isOddRow = rowIndex % 2 === 1
  const isNarrowTile = isOddRow ? !isFirstInPair : isFirstInPair
  return isNarrowTile ? 'md:col-span-1' : 'md:col-span-2'
}

const normalizeExternalUrl = (value) => {
  if (!value) return ''
  const trimmed = String(value).trim()
  if (!trimmed) return ''
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed.replace(/^\/+/, '')}`
}

const Projects = ({ onOpenProject, projects, isLoading = false, lastSyncedAt = null }) => {
  const sectionRef = useRef(null)
  const [cursorState, setCursorState] = useState({ visible: false, x: 0, y: 0, label: '[VIEW PROJECT]' })
  const lastSyncedLabel = formatLastSynced(lastSyncedAt)
  const visibleProjects = useMemo(() => projects.slice(0, 8), [projects])

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
              {isLoading
                ? (lastSyncedLabel ? `Last synced ${lastSyncedLabel}` : 'Syncing from Strapi...')
                : (lastSyncedLabel ? `Last synced ${lastSyncedLabel}` : 'Last synced unavailable')}
            </p>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-zinc-500 md:max-w-md xl:max-w-xl xl:text-base min-[1920px]:max-w-2xl min-[1920px]:text-lg">
            Replace titles and tags with your real projects. Tablet and desktop use an editorial collage layout.
          </p>
        </div>

        <div className="flex flex-wrap border-t border-l border-white/[0.08] md:grid md:grid-cols-3">
          {isLoading ? loadingCards.map((card, index) => (
            <div
              key={card.id}
              className={`project-tile relative flex aspect-[4/3] w-full flex-col justify-between overflow-hidden border-r border-b border-white/[0.08] bg-gradient-to-b from-zinc-900/60 to-zinc-900/40 p-5 sm:w-1/2 sm:p-6 md:col-span-1 md:h-[clamp(320px,32vw,560px)] md:w-auto md:aspect-auto lg:p-8 xl:p-10 min-[1920px]:p-12 ${getTileSpanClass(index)}`}
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
          )) : visibleProjects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              onClick={() => onOpenProject?.(project.slug)}
              onMouseEnter={() => setCursorState((current) => ({ ...current, visible: true, label: current.label === '[VISIT SITE]' ? '[VISIT SITE]' : '[VIEW PROJECT]' }))}
              onMouseMove={(event) => setCursorState({
                visible: true,
                x: event.clientX + 20,
                y: event.clientY - 18,
                label: cursorState.label === '[VISIT SITE]' ? '[VISIT SITE]' : '[VIEW PROJECT]',
              })}
              onMouseLeave={() => setCursorState((current) => ({ ...current, visible: false }))}
              className={`project-tile group relative flex aspect-[4/3] w-full cursor-pointer flex-col justify-between overflow-hidden border-r border-b border-white/[0.08] p-5 text-left sm:w-1/2 sm:p-6 md:col-span-1 md:h-[clamp(320px,32vw,560px)] md:w-auto md:aspect-auto lg:p-8 xl:p-10 min-[1920px]:p-12 ${getTileSpanClass(index)}`}
              aria-label={`Open ${project.title} case study`}
            >
              <img
                src={project.thumbnail}
                alt={`${project.title} abstract thumbnail`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/45 to-black/80 transition-opacity duration-500 group-hover:opacity-90" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/55 via-black/28 to-transparent" />
              <div className="relative z-10 flex items-start justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand/90 sm:text-xs xl:text-sm min-[1920px]:text-base">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand/75 sm:text-xs xl:text-sm min-[1920px]:text-base">
                  {project.tag}
                </span>
              </div>
              <div className="relative z-10 pr-12 sm:pr-14">
                <h3 className="text-lg font-medium tracking-tight text-white transition-colors group-hover:text-brand/90 md:text-xl xl:text-2xl 2xl:text-3xl min-[1920px]:text-4xl">
                  {project.title}
                </h3>
                <span className="pointer-events-none absolute left-0 top-full mt-1 inline-block -translate-y-1 font-mono text-[10px] uppercase tracking-[0.2em] text-brand/80 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 xl:text-xs min-[1920px]:text-sm">
                  Open →
                </span>
              </div>
              {project.visitSiteUrl ? (
                <a
                  href={normalizeExternalUrl(project.visitSiteUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  onPointerEnter={() => setCursorState((current) => ({ ...current, visible: true, label: '[VISIT SITE]' }))}
                  onMouseEnter={() => setCursorState((current) => ({ ...current, visible: true, label: '[VISIT SITE]' }))}
                  onMouseMove={(event) => setCursorState({
                    visible: true,
                    x: event.clientX + 20,
                    y: event.clientY - 18,
                    label: '[VISIT SITE]',
                  })}
                  onMouseLeave={() => setCursorState((current) => ({ ...current, visible: true, label: '[VIEW PROJECT]' }))}
                  className="absolute bottom-5 right-5 z-20 inline-flex h-9 w-9 items-center justify-center border border-white/15 bg-black/28 text-[0.95rem] leading-none text-zinc-100 transition-colors hover:border-brand/60 hover:text-brand sm:bottom-6 sm:right-6"
                  aria-label={`Visit ${project.title} website`}
                >
                  ↗
                </a>
              ) : null}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </button>
          ))}
        </div>
        <div
          className={`pointer-events-none fixed left-0 top-0 z-[120] hidden font-mono text-[10px] uppercase tracking-[0.18em] text-white md:block ${
            cursorState.visible ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-150`}
          style={{ transform: `translate3d(${cursorState.x}px, ${cursorState.y}px, 0)` }}
          aria-hidden
        >
          {cursorState.label}
        </div>
      </div>
    </section>
  )
}

export default Projects

import { useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import logotypeWhite from '../assets/logotype-white.svg'
import logomarkDark from '../assets/logomark-dark.svg'

gsap.registerPlugin(ScrollTrigger)

const asLines = (value) => value.split('\n').map((line) => line.trim()).filter(Boolean)

const hasHtmlTags = (value) => /<([a-z][a-z0-9]*)\b[^>]*>/i.test(value)

const toPlainRichTextBlocks = (value) => {
  const chunks = value.split(/\n{2,}/).map((chunk) => chunk.trim()).filter(Boolean)

  return chunks.map((chunk, index) => {
    const headingMatch = chunk.match(/^(#{1,3})\s+(.+)$/)
    if (headingMatch) {
      const level = headingMatch[1].length
      return { type: `h${level}`, content: headingMatch[2].trim(), key: `h-${index}` }
    }

    const imageMatch = chunk.match(/^!\[(.*?)\]\((https?:\/\/[^\s)]+)\)$/)
    if (imageMatch) {
      return {
        type: 'image',
        alt: imageMatch[1].trim() || 'Body visual',
        src: imageMatch[2].trim(),
        key: `img-${index}`,
      }
    }

    const listLines = asLines(chunk)
    if (listLines.length > 1 && listLines.every((line) => /^[-*]\s+/.test(line))) {
      return {
        type: 'ul',
        items: listLines.map((line) => line.replace(/^[-*]\s+/, '').trim()).filter(Boolean),
        key: `ul-${index}`,
      }
    }

    if (listLines.length > 1 && listLines.every((line) => /^\d+\.\s+/.test(line))) {
      return {
        type: 'ol',
        items: listLines.map((line) => line.replace(/^\d+\.\s+/, '').trim()).filter(Boolean),
        key: `ol-${index}`,
      }
    }

    return { type: 'p', content: chunk, key: `p-${index}` }
  })
}

const ProjectCaseStudy = ({ project, allProjects = [], onBack, onNavigateMain, onOpenProject }) => {
  const rootRef = useRef(null)
  const [useCompactLogo, setUseCompactLogo] = useState(false)
  const relatedProjects = useMemo(
    () => allProjects.filter((item) => item.slug !== project.slug).slice(0, 3),
    [allProjects, project.slug],
  )
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
  const bodyRichText = typeof project.bodyRichText === 'string' ? project.bodyRichText.trim() : ''
  const bodyBlocks = useMemo(() => {
    if (!bodyRichText || hasHtmlTags(bodyRichText)) return []
    return toPlainRichTextBlocks(bodyRichText)
  }, [bodyRichText])
  const sectionNav = [
    { id: 'case-context', label: 'Context' },
    { id: 'case-challenge', label: 'Challenge' },
    { id: 'case-goals', label: 'Goals' },
    { id: 'case-process', label: 'Process' },
    { id: 'case-rationale', label: 'Design rationale' },
    { id: 'case-body', label: 'Body' },
    { id: 'case-outcome', label: 'Outcome' },
  ]
  const visitSiteUrl = typeof project.visitSiteUrl === 'string' ? project.visitSiteUrl.trim() : ''

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
                  ? 'h-9 max-w-[2.5rem] sm:h-10 sm:max-w-[2.75rem]'
                  : 'h-8 max-w-[min(100%,13rem)] origin-center scale-y-[1.03] sm:h-9 sm:max-w-[15rem] md:h-10 md:max-w-[17rem] xl:h-11 xl:max-w-[19rem]'
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
        <div className="grid gap-10 xl:grid-cols-[15rem_minmax(0,1fr)] xl:gap-14">
          <aside className="case-section hidden xl:block">
            <nav className="sticky top-28 border border-white/[0.08] bg-white/[0.02] p-5" aria-label="Case study section navigation">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">On this page</p>
              <ul className="mt-4 space-y-2">
                {sectionNav.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-400 transition-colors hover:text-brand"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              {visitSiteUrl ? (
                <a
                  href={visitSiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-between border border-white/15 bg-white/[0.02] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-200 transition-colors hover:border-brand/60 hover:text-brand"
                >
                  Visit site
                  <span aria-hidden>↗</span>
                </a>
              ) : null}
            </nav>
          </aside>

          <div>
            <section id="case-context" className="case-section border-b border-white/[0.08] pb-12 xl:pb-16">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.24em] text-brand/90 sm:text-xs xl:text-sm">
                Context
              </h2>
              <div className="mt-5 max-w-4xl space-y-5 text-sm leading-relaxed text-zinc-300 sm:text-base xl:text-base">
                {contextParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section id="case-challenge" className="case-section border-b border-white/[0.08] py-12 xl:py-16">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.24em] text-brand/90 sm:text-xs xl:text-sm">
                Challenge
              </h2>
              <p className="mt-5 max-w-4xl text-sm leading-relaxed text-zinc-300 xl:text-base">
                {project.challenge}
              </p>
            </section>

            <section id="case-goals" className="case-section border-b border-white/[0.08] py-12 xl:py-16">
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
            </section>

            <section id="case-process" className="case-section border-b border-white/[0.08] py-12 xl:py-16">
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
            </section>

            <section id="case-rationale" className="case-section border-b border-white/[0.08] py-12 xl:py-16">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.24em] text-brand/90 sm:text-xs xl:text-sm">
                Design rationale
              </h2>
              <div className="mt-5 max-w-4xl space-y-5 text-sm leading-relaxed text-zinc-300 sm:text-base xl:text-base">
                {rationaleParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section id="case-body" className="case-section border-b border-white/[0.08] py-12 xl:py-16">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.24em] text-brand/90 sm:text-xs xl:text-sm">
                Body (rich text) — UX Diagrams &amp; UI Designs
              </h2>
              {bodyRichText ? (
                hasHtmlTags(bodyRichText) ? (
                  <div
                    className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-300 xl:text-base [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:text-white [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-white [&_img]:my-6 [&_img]:w-full [&_img]:border [&_img]:border-white/[0.08] [&_img]:object-cover [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5"
                    dangerouslySetInnerHTML={{ __html: bodyRichText }}
                  />
                ) : (
                  <div className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-300 xl:text-base">
                    {bodyBlocks.map((block) => {
                      if (block.type === 'h1') {
                        return <h3 key={block.key} className="text-2xl font-semibold text-white">{block.content}</h3>
                      }
                      if (block.type === 'h2') {
                        return <h3 key={block.key} className="text-xl font-semibold text-white">{block.content}</h3>
                      }
                      if (block.type === 'h3') {
                        return <h4 key={block.key} className="text-lg font-semibold text-white">{block.content}</h4>
                      }
                      if (block.type === 'image') {
                        return (
                          <img
                            key={block.key}
                            src={block.src}
                            alt={block.alt}
                            className="my-6 w-full border border-white/[0.08] object-cover"
                            loading="lazy"
                          />
                        )
                      }
                      if (block.type === 'ul') {
                        return (
                          <ul key={block.key} className="list-disc space-y-2 pl-5">
                            {block.items.map((item) => <li key={item}>{item}</li>)}
                          </ul>
                        )
                      }
                      if (block.type === 'ol') {
                        return (
                          <ol key={block.key} className="list-decimal space-y-2 pl-5">
                            {block.items.map((item) => <li key={item}>{item}</li>)}
                          </ol>
                        )
                      }
                      return (
                        <p key={block.key} className="whitespace-pre-line leading-relaxed">
                          {block.content}
                        </p>
                      )
                    })}
                  </div>
                )
              ) : (
                <div className="mt-6 space-y-6">
                  <p className="text-sm leading-relaxed text-zinc-400 xl:text-base">
                    Add rich text content in Strapi to populate this section with diagrams, annotated visuals, and UI design walkthroughs.
                  </p>
                  {supportingImages.map((image, index) => (
                    <figure key={image} className="overflow-hidden border border-white/[0.08] bg-white/[0.02]">
                      <img
                        src={image}
                        alt={`${project.title} supporting visual ${index + 1}`}
                        className="h-[32vh] w-full object-cover sm:h-[40vh] xl:h-[52vh]"
                        loading="lazy"
                      />
                    </figure>
                  ))}
                </div>
              )}
            </section>

            <section id="case-outcome" className="case-section border-b border-white/[0.08] pt-12 xl:pt-16">
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
          </div>
        </div>

        {relatedProjects.length > 0 ? (
          <section className="case-section pt-12 xl:pt-16">
            <div className="mb-6 flex items-end justify-between gap-4 xl:mb-8">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-brand/90 sm:text-xs xl:text-sm">
                  Continue browsing
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl xl:text-4xl">
                  More projects
                </h2>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {relatedProjects.map((related) => (
                <button
                  key={related.slug}
                  type="button"
                  onClick={() => onOpenProject?.(related.slug)}
                  className="group relative overflow-hidden border border-white/[0.08] bg-white/[0.02] text-left"
                  aria-label={`Open ${related.title} case study`}
                >
                  <img
                    src={related.thumbnail}
                    alt={`${related.title} preview`}
                    className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] sm:h-48"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/45 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/65 to-transparent p-4 sm:p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand/80 sm:text-xs">
                      {related.tag}
                    </p>
                    <h3 className="mt-2 text-lg font-medium tracking-tight text-white sm:text-xl">
                      {related.title}
                    </h3>
                    <span className="mt-3 inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-300 transition-colors group-hover:text-brand sm:text-xs">
                      View case study →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </article>
  )
}

export default ProjectCaseStudy

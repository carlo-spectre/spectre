import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { id: 1, title: 'Project 01', tag: 'Web' },
  { id: 2, title: 'Project 02', tag: 'Product' },
  { id: 3, title: 'Project 03', tag: 'Brand' },
  { id: 4, title: 'Project 04', tag: 'Web' },
  { id: 5, title: 'Project 05', tag: 'App' },
  { id: 6, title: 'Project 06', tag: 'Web' },
  { id: 7, title: 'Project 07', tag: 'Design' },
  { id: 8, title: 'Project 08', tag: 'Product' },
  { id: 9, title: 'Project 09', tag: 'Web' },
]

const Projects = () => {
  const sectionRef = useRef(null)

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
      className="border-b border-white/[0.06] bg-[#08080a] py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 md:px-12">
        <div className="projects-intro mb-16 flex flex-col justify-between gap-8 md:mb-20 md:flex-row md:items-end">
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
              Selected work
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Nine pieces
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-zinc-500">
            Replace titles and tags with your real projects. Layout is three columns × three rows — flex, not grid.
          </p>
        </div>

        {/* 3×3 via flex wrap — no CSS grid */}
        <div className="flex flex-wrap border-t border-l border-white/[0.08]">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="project-tile group relative flex aspect-[4/3] w-full cursor-default flex-col justify-between border-r border-b border-white/[0.08] p-5 sm:w-1/2 lg:w-1/3 lg:aspect-square lg:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                  {project.tag}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-medium tracking-tight text-white transition-colors group-hover:text-primary-300 md:text-xl">
                  {project.title}
                </h3>
                <span className="mt-3 inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600 opacity-0 transition-opacity group-hover:opacity-100">
                  Open →
                </span>
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-500/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

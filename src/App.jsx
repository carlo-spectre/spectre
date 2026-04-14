import { useEffect, useMemo, useState } from 'react'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Contact from './components/Contact'
import PageTransitionWebGL from './components/PageTransitionWebGL'
import ProjectCaseStudy from './components/ProjectCaseStudy'
import { projects as defaultProjects } from './data/projects'
import { fetchStrapiProjects } from './data/strapiProjects'

const getRouteFromPath = () => {
  const { pathname } = window.location
  const projectMatch = pathname.match(/^\/projects\/([a-z0-9-]+)$/i)
  if (projectMatch) return { type: 'project', slug: projectMatch[1] }
  return { type: 'home' }
}

function App() {
  const [projectsData, setProjectsData] = useState(defaultProjects)
  const [isProjectsLoading, setIsProjectsLoading] = useState(true)
  const [projectsLoadError, setProjectsLoadError] = useState('')
  const [route, setRoute] = useState(() => getRouteFromPath())
  const activeProject = useMemo(
    () => (route.type === 'project' ? projectsData.find((project) => project.slug === route.slug) ?? null : null),
    [route, projectsData],
  )

  useEffect(() => {
    const handlePopState = () => {
      setRoute(getRouteFromPath())
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    let cancelled = false

    const loadProjects = async () => {
      try {
        setIsProjectsLoading(true)
        const remoteProjects = await fetchStrapiProjects()
        if (!cancelled) {
          setProjectsData(remoteProjects)
          setProjectsLoadError('')
        }
      } catch {
        if (!cancelled) {
          setProjectsData(defaultProjects)
          setProjectsLoadError('Unable to load live CMS content right now.')
        }
      } finally {
        if (!cancelled) {
          setIsProjectsLoading(false)
        }
      }
    }

    loadProjects()

    return () => {
      cancelled = true
    }
  }, [])

  const navigateWithTransition = (targetId) => {
    window.dispatchEvent(
      new CustomEvent('spectre:transition', {
        detail: { targetId },
      }),
    )
  }

  const openProject = (slug) => {
    if (!slug) return
    window.history.pushState({}, '', `/projects/${slug}`)
    window.scrollTo({ top: 0, behavior: 'auto' })
    setRoute({ type: 'project', slug })
  }

  const closeProject = (targetId = 'projects') => {
    window.history.pushState({}, '', '/')
    setRoute({ type: 'home' })

    window.requestAnimationFrame(() => {
      const target = document.getElementById(targetId)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    })
  }

  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-100">
      <PageTransitionWebGL />
      {projectsLoadError ? (
        <p className="border-b border-white/[0.06] bg-[#09090c] px-5 py-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500 sm:text-xs">
          {projectsLoadError} Showing fallback content.
        </p>
      ) : null}
      <main>
        {activeProject ? (
          <ProjectCaseStudy
            project={activeProject}
            onBack={() => closeProject('projects')}
            onNavigateMain={closeProject}
          />
        ) : (
          <>
            <Hero onNavigate={navigateWithTransition} />
            <Projects onOpenProject={openProject} projects={projectsData} />
            {isProjectsLoading ? (
              <p className="border-b border-white/[0.06] py-8 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600 sm:text-xs">
                Loading projects from CMS...
              </p>
            ) : null}
            <Contact />
          </>
        )}
      </main>
      <footer className="border-t border-white/[0.06] py-10 text-center xl:py-14 min-[1920px]:py-16">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-600 xl:text-sm min-[1920px]:text-base">
          © {new Date().getFullYear()} Spectre
        </p>
      </footer>
    </div>
  )
}

export default App

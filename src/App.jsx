import { useEffect, useMemo, useState } from 'react'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Contact from './components/Contact'
import PageTransitionWebGL from './components/PageTransitionWebGL'
import ProjectCaseStudy from './components/ProjectCaseStudy'
import CmsLogin from './components/CmsLogin'
import CmsDashboard from './components/CmsDashboard'
import { loadCmsProjects, resetCmsProjects, saveCmsProjects } from './data/cmsProjects'
import { isCmsAuthenticated, loginCms, logoutCms } from './data/cmsAuth'
import { fetchStrapiProjectBySlug } from './data/strapiProjects'

const getRouteFromPath = () => {
  const { pathname } = window.location
  if (pathname === '/cms/login') return { type: 'cms-login' }
  if (pathname === '/cms') return { type: 'cms-dashboard' }
  const projectMatch = pathname.match(/^\/projects\/([a-z0-9-]+)$/i)
  if (projectMatch) return { type: 'project', slug: projectMatch[1] }
  return { type: 'home' }
}

function App() {
  const [projectsData, setProjectsData] = useState(() => loadCmsProjects())
  const [route, setRoute] = useState(() => getRouteFromPath())
  const activeProject = useMemo(
    () => (route.type === 'project' ? projectsData.find((project) => project.slug === route.slug) ?? null : null),
    [route, projectsData],
  )
  const cmsLoggedIn = useMemo(() => isCmsAuthenticated(), [route])

  useEffect(() => {
    const handlePopState = () => {
      setRoute(getRouteFromPath())
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (route.type === 'cms-dashboard' && !cmsLoggedIn) {
      window.history.replaceState({}, '', '/cms/login')
      setRoute({ type: 'cms-login' })
    }
  }, [route, cmsLoggedIn])

  useEffect(() => {
    let cancelled = false

    const loadSignalCommerce = async () => {
      try {
        const strapiProject = await fetchStrapiProjectBySlug('signal-commerce')
        if (!strapiProject || cancelled) return

        setProjectsData((current) => current.map((project) => (
          project.slug === 'signal-commerce'
            ? { ...project, ...strapiProject }
            : project
        )))
      } catch {
        // Keep local content as fallback if Strapi is unavailable.
      }
    }

    loadSignalCommerce()

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

  const handleCmsLogin = async (email, password) => {
    const ok = await loginCms(email, password)
    if (!ok) return false
    window.history.pushState({}, '', '/cms')
    setRoute({ type: 'cms-dashboard' })
    return true
  }

  const handleCmsLogout = () => {
    logoutCms()
    window.history.pushState({}, '', '/cms/login')
    setRoute({ type: 'cms-login' })
  }

  const handleSaveProject = (slug, updates) => {
    const next = projectsData.map((project) => (project.slug === slug ? { ...project, ...updates } : project))
    setProjectsData(next)
    saveCmsProjects(next)
  }

  const handleResetProjects = () => {
    const next = resetCmsProjects()
    setProjectsData(next)
  }

  const openSiteHome = () => {
    window.history.pushState({}, '', '/')
    setRoute({ type: 'home' })
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  if (route.type === 'cms-login') {
    return <CmsLogin onLogin={handleCmsLogin} />
  }

  if (route.type === 'cms-dashboard') {
    return (
      <CmsDashboard
        projects={projectsData}
        onSaveProject={handleSaveProject}
        onReset={handleResetProjects}
        onLogout={handleCmsLogout}
        onOpenSite={openSiteHome}
      />
    )
  }

  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-100">
      <PageTransitionWebGL />
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
            <Contact />
          </>
        )}
      </main>
      <footer className="border-t border-white/[0.06] py-6 xl:py-8 min-[1920px]:py-10">
        <div className="mx-auto flex w-full max-w-[min(96vw,1920px)] flex-col items-start justify-between gap-3 px-5 sm:flex-row sm:items-center sm:px-8 md:px-12 xl:px-16 min-[1920px]:max-w-[min(94vw,2200px)] min-[1920px]:px-24">
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 xl:text-xs min-[1920px]:text-sm">
            © {new Date().getFullYear()} Spectre Design Studio
          </p>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500 xl:text-xs min-[1920px]:text-sm">
            <a href="#home" className="transition-colors hover:text-brand">Top</a>
            <a href="#projects" className="transition-colors hover:text-brand">Work</a>
            <a href="#contact" className="transition-colors hover:text-brand">Contact</a>
            <a href="mailto:carlo@spectredesign.studio" className="transition-colors hover:text-brand">Email</a>
            <a href="/privacy" className="transition-colors hover:text-brand">Privacy</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}

export default App

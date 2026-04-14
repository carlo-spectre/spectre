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
  const [hktTime, setHktTime] = useState('')
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
    const formatHkt = () =>
      new Intl.DateTimeFormat('en-HK', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Hong_Kong',
      }).format(new Date())

    setHktTime(formatHkt())
    const timer = window.setInterval(() => setHktTime(formatHkt()), 30000)
    return () => window.clearInterval(timer)
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
            allProjects={projectsData}
            onBack={() => closeProject('projects')}
            onNavigateMain={closeProject}
            onOpenProject={openProject}
          />
        ) : (
          <>
            <Hero onNavigate={navigateWithTransition} />
            <Projects onOpenProject={openProject} projects={projectsData} />
            <Contact />
          </>
        )}
      </main>
      <footer className="border-t border-white/[0.06] py-10 text-center xl:py-14 min-[1920px]:py-16">
        <div className="flex flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-600 xl:text-sm min-[1920px]:text-base">
          <p>© {new Date().getFullYear()} Spectre</p>
          <p>HKT {hktTime}</p>
        </div>
      </footer>
    </div>
  )
}

export default App

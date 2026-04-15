import { useEffect, useMemo, useState } from 'react'
import Hero from './components/Hero'
import Projects from './components/Projects'
import ServicesInfo from './components/ServicesInfo'
import Contact from './components/Contact'
import PageTransitionWebGL from './components/PageTransitionWebGL'
import ProjectCaseStudy from './components/ProjectCaseStudy'
import LegalPage from './components/LegalPage'
import CmsLogin from './components/CmsLogin'
import CmsDashboard from './components/CmsDashboard'
import logotypeWhite from './assets/logotype-white.svg'
import logomarkDark from './assets/logomark-dark.svg'
import { loadCmsProjects, resetCmsProjects, saveCmsProjects } from './data/cmsProjects'
import { isCmsAuthenticated, loginCms, logoutCms } from './data/cmsAuth'
import { fetchStrapiProjects } from './data/strapiProjects'

const STRAPI_CACHE_KEY = 'spectre:strapi-projects-cache:v1'

const readProjectsCache = () => {
  try {
    const raw = window.localStorage.getItem(STRAPI_CACHE_KEY)
    if (!raw) return { projects: [], syncedAt: null }
    const parsed = JSON.parse(raw)
    return {
      projects: Array.isArray(parsed?.projects) ? parsed.projects : [],
      syncedAt: typeof parsed?.syncedAt === 'string' ? parsed.syncedAt : null,
    }
  } catch {
    return { projects: [], syncedAt: null }
  }
}

const writeProjectsCache = (projects, syncedAt) => {
  try {
    window.localStorage.setItem(STRAPI_CACHE_KEY, JSON.stringify({ projects, syncedAt }))
  } catch {
    // Ignore storage failures.
  }
}

const getRouteFromPath = () => {
  const { pathname } = window.location
  if (pathname === '/cms/login') return { type: 'cms-login' }
  if (pathname === '/cms') return { type: 'cms-dashboard' }
  if (pathname === '/privacy') return { type: 'legal', page: 'privacy' }
  if (pathname === '/terms') return { type: 'legal', page: 'terms' }
  const projectMatch = pathname.match(/^\/projects\/([a-z0-9-]+)$/i)
  if (projectMatch) return { type: 'project', slug: projectMatch[1] }
  return { type: 'home' }
}

function App() {
  const cachedProjectsState = useMemo(() => readProjectsCache(), [])
  const hasInitialCachedProjects = cachedProjectsState.projects.length > 0
  const [projectsData, setProjectsData] = useState(
    () => (hasInitialCachedProjects ? cachedProjectsState.projects : loadCmsProjects()),
  )
  const [isProjectsLoading, setIsProjectsLoading] = useState(!hasInitialCachedProjects)
  const [projectsLoadError, setProjectsLoadError] = useState('')
  const [projectsLastSyncedAt, setProjectsLastSyncedAt] = useState(cachedProjectsState.syncedAt)
  const [useCompactLegalLogo, setUseCompactLegalLogo] = useState(false)
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
    if (route.type !== 'legal') {
      setUseCompactLegalLogo(false)
      return
    }

    const threshold = 160
    const onScroll = () => {
      setUseCompactLegalLogo(window.scrollY > threshold)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [route.type])

  useEffect(() => {
    let cancelled = false

    const loadProjectsFromStrapi = async () => {
      if (!hasInitialCachedProjects) {
        setIsProjectsLoading(true)
      }
      setProjectsLoadError('')
      try {
        const strapiProjects = await fetchStrapiProjects()
        if (cancelled || !strapiProjects?.length) return
        const syncedAt = new Date().toISOString()
        setProjectsData(strapiProjects)
        setProjectsLastSyncedAt(syncedAt)
        writeProjectsCache(strapiProjects, syncedAt)
      } catch {
        if (cancelled) return
        if (cachedProjectsState.projects.length) {
          setProjectsData(cachedProjectsState.projects)
          setProjectsLastSyncedAt(cachedProjectsState.syncedAt)
        }
        setProjectsLoadError('Strapi sync is unavailable, showing last cached content.')
      } finally {
        if (!cancelled) setIsProjectsLoading(false)
      }
    }

    loadProjectsFromStrapi()

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

  if (route.type === 'legal') {
    return (
      <div className="min-h-screen bg-[#08080a] text-zinc-100">
        <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#08080a]">
          <div className="mx-auto flex w-full max-w-[min(96vw,1920px)] items-center justify-between gap-4 px-5 py-4 sm:px-8 md:px-12 xl:px-16 min-[1920px]:max-w-[min(94vw,2200px)] min-[1920px]:px-24">
            <a
              href="/"
              className="flex shrink-0 items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080a]"
              aria-label="Spectre — home"
            >
              <img
                src={useCompactLegalLogo ? logomarkDark : logotypeWhite}
                alt=""
                width={558}
                height={281}
                className={`w-auto object-contain object-left transition-all duration-400 ${
                  useCompactLegalLogo
                    ? 'h-9 max-w-[2.5rem] sm:h-10 sm:max-w-[2.75rem]'
                    : 'h-9 max-w-[min(100%,14rem)] origin-center scale-y-[1.03] sm:h-10 sm:max-w-[15.5rem] md:h-10 md:max-w-[17rem] xl:h-[3.25rem] xl:max-w-[23rem]'
                }`}
              />
            </a>
            <nav className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:gap-8 sm:text-xs">
              <a href="/#projects" className="transition-colors hover:text-brand">Work</a>
              <a href="/#contact" className="transition-colors hover:text-brand">Contact</a>
            </nav>
          </div>
        </header>
        <main>
          <LegalPage
            type={route.page}
            onBackHome={() => {
              window.history.pushState({}, '', '/')
              setRoute({ type: 'home' })
              window.scrollTo({ top: 0, behavior: 'auto' })
            }}
          />
        </main>
        <footer className="border-t border-white/[0.06] py-6 xl:py-8 min-[1920px]:py-10">
          <div className="mx-auto flex w-full max-w-[min(96vw,1920px)] flex-col items-start justify-between gap-3 px-5 sm:flex-row sm:items-center sm:px-8 md:px-12 xl:px-16 min-[1920px]:max-w-[min(94vw,2200px)] min-[1920px]:px-24">
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 xl:text-xs min-[1920px]:text-sm">
              © {new Date().getFullYear()} Spectre Design Studio
            </p>
            <nav className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500 xl:text-xs min-[1920px]:text-sm">
              <a href="/" className="transition-colors hover:text-brand">Top</a>
              <a href="/#projects" className="transition-colors hover:text-brand">Work</a>
              <a href="/#contact" className="transition-colors hover:text-brand">Contact</a>
              <a href="mailto:carlo@spectredesign.studio" className="transition-colors hover:text-brand">Email</a>
              <a href="/privacy" className="transition-colors hover:text-brand">Privacy</a>
              <a href="/terms" className="transition-colors hover:text-brand">Terms</a>
            </nav>
          </div>
        </footer>
      </div>
    )
  }

  if (!projectsData.length && projectsLoadError && route.type !== 'cms-login' && route.type !== 'cms-dashboard') {
    return (
      <div className="min-h-screen bg-[#08080a] text-zinc-100">
        <main className="mx-auto flex min-h-screen w-full max-w-[min(96vw,1200px)] items-center justify-center px-5 sm:px-8">
          <div className="max-w-xl border border-red-400/30 bg-red-500/[0.08] p-6 sm:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-red-200 sm:text-xs">
              Strapi connection error
            </p>
            <h1 className="mt-3 text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Unable to load live content.
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">
              {projectsLoadError} Please refresh or check Strapi Cloud deployment health.
            </p>
          </div>
        </main>
      </div>
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
            <Projects
              onOpenProject={openProject}
              projects={projectsData}
              isLoading={isProjectsLoading}
              lastSyncedAt={projectsLastSyncedAt}
            />
            <ServicesInfo />
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
            <a href="/terms" className="transition-colors hover:text-brand">Terms</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}

export default App

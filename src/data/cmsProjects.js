import { projects as defaultProjects } from './projects'

const STORAGE_KEY = 'spectre:cms:projects'

const normalizeList = (value) => {
  if (!Array.isArray(value)) return []
  return value.filter(Boolean).map((item) => String(item).trim()).filter(Boolean)
}

const normalizeSupportingImages = (value, fallback) => {
  const normalized = normalizeList(value)
  if (normalized.length >= 3) return normalized.slice(0, 3)
  return [...normalized, ...fallback].slice(0, 3)
}

const sanitizeProject = (project, fallback) => ({
  ...fallback,
  ...project,
  id: fallback.id,
  slug: fallback.slug,
  goals: normalizeList(project?.goals ?? fallback.goals),
  process: normalizeList(project?.process ?? fallback.process),
  outcome: normalizeList(project?.outcome ?? fallback.outcome),
  contextParagraphs: normalizeList(project?.contextParagraphs ?? fallback.contextParagraphs ?? []),
  rationaleParagraphs: normalizeList(project?.rationaleParagraphs ?? fallback.rationaleParagraphs ?? []),
  supportingImages: normalizeSupportingImages(
    project?.supportingImages ?? fallback.supportingImages ?? [],
    fallback.supportingImages ?? [],
  ),
})

export const loadCmsProjects = () => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultProjects
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return defaultProjects

    const fallbackBySlug = defaultProjects.reduce((acc, project) => {
      acc[project.slug] = project
      return acc
    }, {})

    return defaultProjects.map((fallback) => {
      const match = parsed.find((item) => item?.slug === fallback.slug)
      return match ? sanitizeProject(match, fallback) : fallback
    })
  } catch {
    return defaultProjects
  }
}

export const saveCmsProjects = (projects) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}

export const resetCmsProjects = () => {
  window.localStorage.removeItem(STORAGE_KEY)
  return defaultProjects
}

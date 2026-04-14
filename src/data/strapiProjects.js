const STRAPI_BASE_URL = (import.meta.env.VITE_STRAPI_URL || '').replace(/\/+$/, '')
const PROJECTS_ENDPOINT = '/api/projects?sort=idNumber:asc&populate=thumbnail,supportingImages'

const asList = (value) => (Array.isArray(value) ? value.filter(Boolean).map((item) => String(item).trim()).filter(Boolean) : [])

const getMediaUrl = (media) => {
  const rawUrl = media?.url || ''
  if (!rawUrl) return ''
  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) return rawUrl
  return `${STRAPI_BASE_URL}${rawUrl}`
}

const normalizeEntry = (entry) => {
  const attrs = entry?.attributes || entry || {}
  const thumbnail = attrs.thumbnail?.data
  const supportingMedia = attrs.supportingImages?.data || []

  return {
    id: Number(attrs.idNumber ?? entry?.id ?? 0),
    slug: String(attrs.slug || ''),
    title: String(attrs.title || ''),
    tag: String(attrs.tag || ''),
    timeframe: String(attrs.timeframe || ''),
    role: String(attrs.role || ''),
    team: String(attrs.team || ''),
    summary: String(attrs.summary || ''),
    thumbnail: getMediaUrl(thumbnail?.attributes || thumbnail),
    challenge: String(attrs.challenge || ''),
    goals: asList(attrs.goals),
    process: asList(attrs.process),
    outcome: asList(attrs.outcome),
    contextParagraphs: asList(attrs.contextParagraphs),
    rationaleParagraphs: asList(attrs.rationaleParagraphs),
    supportingImages: supportingMedia
      .map((item) => getMediaUrl(item?.attributes || item))
      .filter(Boolean)
      .slice(0, 3),
  }
}

export const fetchStrapiProjects = async () => {
  if (!STRAPI_BASE_URL) {
    throw new Error('Missing VITE_STRAPI_URL')
  }

  const response = await fetch(`${STRAPI_BASE_URL}${PROJECTS_ENDPOINT}`, {
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`Strapi request failed with ${response.status}`)
  }

  const payload = await response.json()
  const list = Array.isArray(payload?.data) ? payload.data : []
  const normalized = list.map(normalizeEntry).filter((project) => project.slug && project.title)

  if (!normalized.length) {
    throw new Error('No projects returned from Strapi')
  }

  return normalized
}

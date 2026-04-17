const STRAPI_BASE_URL = (
  import.meta.env.VITE_STRAPI_URL
  || import.meta.env.VITE_STRAPI_API_URL
  || import.meta.env.VITE_API_URL
  || ''
).replace(/\/+$/, '')
const PROJECTS_ENDPOINT = '/api/projects?sort=idNumber:asc&populate[0]=thumbnail&populate[1]=supportingImages'
const STRAPI_REQUEST_TIMEOUT_MS = 20000

const asList = (value) => {
  if (Array.isArray(value)) {
    return value.filter(Boolean).map((item) => String(item).trim()).filter(Boolean)
  }
  if (typeof value === 'string') {
    return value.split('\n').map((item) => item.trim()).filter(Boolean)
  }
  return []
}

const getMediaUrl = (media) => {
  const rawUrl = media?.url || ''
  if (!rawUrl) return ''
  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) return rawUrl
  return `${STRAPI_BASE_URL}${rawUrl}`
}

const isGifUrl = (value) => /\.gif(\?|#|$)/i.test(String(value || '').trim())

const pickPreferredThumbnailUrl = (media, fallbackUrl = '') => {
  const mediaAttrs = media?.attributes || media || {}
  const formatEntries = Object.values(mediaAttrs?.formats || {})
  const formatUrls = formatEntries.map((item) => getMediaUrl(item)).filter(Boolean)
  const mediaUrl = getMediaUrl(mediaAttrs)
  const candidates = [
    String(fallbackUrl || '').trim(),
    mediaUrl,
    ...formatUrls,
  ].filter(Boolean)

  const gifCandidate = candidates.find((url) => isGifUrl(url))
  if (gifCandidate) return gifCandidate
  return mediaUrl || String(fallbackUrl || '').trim()
}

const normalizeEntry = (entry) => {
  const attrs = entry?.attributes || entry || {}
  const thumbnail = attrs.thumbnail?.data || attrs.thumbnail || null
  const supportingMedia = attrs.supportingImages?.data || attrs.supportingImages || []
  const thumbnailUrl = pickPreferredThumbnailUrl(thumbnail, attrs.thumbnailUrl)

  return {
    id: Number(attrs.idNumber ?? entry?.id ?? 0),
    slug: String(attrs.slug || ''),
    title: String(attrs.title || ''),
    tag: String(attrs.tag || ''),
    timeframe: String(attrs.timeframe || ''),
    role: String(attrs.role || ''),
    team: String(attrs.team || ''),
    visitSiteUrl: String(attrs.visitSiteUrl || ''),
    summary: String(attrs.summary || ''),
    thumbnail: thumbnailUrl,
    challenge: String(attrs.challenge || ''),
    goals: asList(attrs.goalsText || attrs.goals),
    process: asList(attrs.processText || attrs.process),
    outcome: asList(attrs.outcomeText || attrs.outcome),
    contextParagraphs: asList(attrs.contextParagraphsText || attrs.contextParagraphs),
    rationaleParagraphs: asList(attrs.rationaleParagraphsText || attrs.rationaleParagraphs),
    bodyRichText: String(attrs.bodyRichText || ''),
    supportingImages: (supportingMedia
      .map((item) => getMediaUrl(item?.attributes || item))
      .filter(Boolean)
      .slice(0, 3)).length
      ? supportingMedia.map((item) => getMediaUrl(item?.attributes || item)).filter(Boolean).slice(0, 3)
      : asList(attrs.supportingImageUrlsText || attrs.supportingImageUrls).slice(0, 3),
  }
}

export const fetchStrapiProjects = async () => {
  if (!STRAPI_BASE_URL) throw new Error('Missing VITE_STRAPI_URL')

  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), STRAPI_REQUEST_TIMEOUT_MS)
  const separator = PROJECTS_ENDPOINT.includes('?') ? '&' : '?'
  const endpointWithBust = `${PROJECTS_ENDPOINT}${separator}_t=${Date.now()}`
  const response = await fetch(`${STRAPI_BASE_URL}${endpointWithBust}`, {
    cache: 'no-store',
    headers: { Accept: 'application/json' },
    signal: controller.signal,
  }).finally(() => window.clearTimeout(timeout))
  if (!response.ok) throw new Error(`Strapi request failed with ${response.status}`)
  const contentType = response.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    throw new Error('Strapi returned a non-JSON response')
  }

  const payload = await response.json()
  const list = Array.isArray(payload?.data) ? payload.data : []
  const normalized = list.map(normalizeEntry).filter((project) => project.slug && project.title)
  if (!normalized.length) throw new Error('No projects returned from Strapi')
  return normalized
}


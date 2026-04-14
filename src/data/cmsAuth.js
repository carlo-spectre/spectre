const SESSION_KEY = 'spectre:cms:session'
const DEFAULT_EMAIL = 'admin@spectre.local'
const DEFAULT_SALT = 'spectre-salt'
const DEFAULT_HASH = '4eb8afaf2ca09d75b9ad1e93568bdfa7bc9abea3648cd07683d79aa075e24850'
const ITERATIONS = 120000

const CMS_EMAIL = import.meta.env.VITE_CMS_EMAIL || DEFAULT_EMAIL
const CMS_PASSWORD_SALT = import.meta.env.VITE_CMS_PASSWORD_SALT || DEFAULT_SALT
const CMS_PASSWORD_HASH = import.meta.env.VITE_CMS_PASSWORD_HASH || DEFAULT_HASH
const CMS_ROLE = import.meta.env.VITE_CMS_ROLE || 'editor'

const hashPassword = async (password, salt) => {
  const encoder = new TextEncoder()
  const key = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits'],
  )
  const bits = await window.crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: encoder.encode(salt),
      iterations: ITERATIONS,
      hash: 'SHA-256',
    },
    key,
    256,
  )
  return Array.from(new Uint8Array(bits))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

export const loginCms = async (email, password) => {
  const normalizedEmail = String(email || '').trim().toLowerCase()
  if (normalizedEmail !== CMS_EMAIL.toLowerCase()) return false
  const hashedInput = await hashPassword(password, CMS_PASSWORD_SALT)
  const valid = hashedInput === CMS_PASSWORD_HASH
  if (valid) {
    window.sessionStorage.setItem(SESSION_KEY, 'ok')
  }
  return valid
}

export const logoutCms = () => {
  window.sessionStorage.removeItem(SESSION_KEY)
}

export const isCmsAuthenticated = () => window.sessionStorage.getItem(SESSION_KEY) === 'ok'

export const getCmsAuthMeta = () => ({
  emailHint: CMS_EMAIL,
  role: CMS_ROLE,
})

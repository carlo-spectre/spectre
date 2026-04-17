const normalizeExternalUrl = (value) => {
  if (!value) return ''
  const trimmed = String(value).trim()
  if (!trimmed) return ''
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed.replace(/^\/+/, '')}`
}

/** Alphabetical by display name. Omit `url` until a live site is available. */
const clients = [
  { name: 'AXC', url: 'https://axc.xyz/' },
  { name: 'Convergent', url: 'https://convergent.so/' },
  { name: 'Hashpower', url: 'https://www.hashpowerx.com/' },
  { name: 'Instyl', url: 'https://www.instyl.co/' },
  { name: 'Lambda Finance', url: 'https://lambda.finance/' },
  { name: 'Lita Foundation', url: 'https://lita.foundation/' },
  { name: 'Narwhal Finance', url: 'https://narwhal.finance/' },
  { name: 'On-us', url: 'https://www.on-us.com/' },
  { name: 'Project Solo', url: 'https://projectsolo.xyz/' },
  { name: 'Velocity Capital', url: 'https://v3locity.capital/' },
  { name: 'Wolver', url: 'https://wolver.io/' },
]

const expertisePrimary = [
  'PRODUCT DESIGN',
  'UX/UI',
  'WEB DESIGN',
  'BRAND DESIGN',
  'DIGITAL DESIGN',
  'MOTION DESIGN',
]

const expertiseSecondary = [
  'CONCEPT DEVELOPMENT',
  'CREATIVE DIRECTION',
  'RESEARCH',
  'VISUAL DESIGN',
]

const uxMethods = [
  'DISCOVERY',
  'UX RESEARCH',
  'JOURNEY MAPPING',
  'INFORMATION ARCHITECTURE',
  'FLOW DIAGRAMS',
  'WIREFRAMES',
  'USABILITY TESTING',
]

const uiMethods = [
  'GRID SETUP',
  'COMPONENT LIBRARIES',
  'DESIGN SYSTEMS',
  'RESPONSIVE LAYOUT',
  'INTERACTION DESIGN',
  'UI PROTOTYPING',
]

const services = [
  'WEB & MOBILE APP DESIGN',
  'AI INTEGRATION',
  'DIGITAL TRANSFORMATION',
  'WEBSITE DESIGN & DEVELOPMENT',
  'BRAND IDENTITY DEVELOPMENT',
  'DIGITAL MARKETING CAMPAIGN',
]

const listOneColClass =
  'mt-4 space-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-300 sm:text-xs'

const ServicesInfo = () => {
  return (
    <section
      id="services-info"
      className="border-t border-white/[0.06] bg-[#060608] py-20 md:py-24 xl:py-28 min-[1920px]:py-32"
    >
      <div className="mx-auto w-full max-w-[min(96vw,1920px)] px-5 sm:px-8 md:px-12 xl:px-16 min-[1920px]:max-w-[min(94vw,2200px)] min-[1920px]:px-24">
        <div className="mb-12 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-center sm:justify-between md:mb-16 xl:mb-20">
          <div className="flex items-baseline gap-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] sm:text-xs xl:text-sm">
              <span className="text-brand/90">03</span>
              <span className="text-zinc-600"> — Services Info</span>
            </span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-white/[0.12] via-white/[0.06] to-transparent sm:mx-8" />
          <p className="max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-[0.22em] text-brand/70 sm:text-right sm:text-xs xl:max-w-md xl:text-sm">
            Partners, craft, and principles
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 pt-8 lg:grid-cols-5 lg:gap-x-8 xl:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:text-xs">
              SERVICES_INFO
            </h3>
          </div>

          <div className="order-2 lg:order-3">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:text-xs">
              Clients
            </h3>
            <ul className={listOneColClass}>
              {clients.map((client) => {
                const href = client.url ? normalizeExternalUrl(client.url) : ''
                const content = client.name
                if (href) {
                  return (
                    <li key={client.name} className="min-w-0">
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer text-zinc-300 transition-colors hover:text-brand"
                      >
                        {content}
                      </a>
                    </li>
                  )
                }
                return (
                  <li key={client.name} className="min-w-0 text-zinc-400">
                    {content}
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="order-3 lg:order-3">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:text-xs">
              Expertise
            </h3>
            <ul className={listOneColClass}>
              {expertisePrimary.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <ul className={`${listOneColClass} mt-6`}>
              {expertiseSecondary.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="order-4 lg:order-4">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:text-xs">
              Design process
            </h3>
            <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-brand/85">
              UX methods
            </p>
            <ul className={listOneColClass}>
              {uxMethods.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.18em] text-brand/85">
              UI methods
            </p>
            <ul className={listOneColClass}>
              {uiMethods.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="order-1 lg:order-2">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:text-xs">
              Services
            </h3>
            <ul className={listOneColClass}>
              {services.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesInfo

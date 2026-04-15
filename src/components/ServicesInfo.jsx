const clients = [
  'ABSTRACT',
  'AKANO',
  'BALKY STUDIO',
  'FOLA PR',
  'HINTFLOW',
  'OUTSIDE',
  'SCHOOLABLE',
  'STUDIO NULL',
  'THE MAKER STUDIO INC',
]

const expertisePrimary = [
  'BRAND DESIGN',
  'DIGITAL DESIGN',
  'GRAPHIC & PRINT',
  'MOTION DESIGN',
]

const expertiseSecondary = [
  'CONCEPTING',
  'CREATIVE DIRECTION',
  'RESEARCH',
  'VISUAL DESIGN',
]

const designValues = [
  'COLLABORATION',
  'CURIOSITY',
  'EMPATHY',
  'EXPERIMENTING',
  'FUNCTIONALITY',
  'INNOVATION',
  'SIMPLICITY',
  'SUSTAINABILITY',
]

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

        <div className="grid grid-cols-1 gap-10 pt-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-12">
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:text-xs">
              SERVICES_INFO
            </h3>
          </div>

          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:text-xs">
              Clients
            </h3>
            <ul className="mt-4 space-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-300 sm:text-xs">
              {clients.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:text-xs">
              Expertise
            </h3>
            <ul className="mt-4 space-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-300 sm:text-xs">
              {expertisePrimary.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <ul className="mt-6 space-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-300 sm:text-xs">
              {expertiseSecondary.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:text-xs">
              Design process
            </h3>
            <ul className="mt-4 space-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-300 sm:text-xs">
              {designValues.map((item) => (
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

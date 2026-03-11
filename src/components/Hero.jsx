const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      className="min-h-screen bg-gradient-to-br from-[#f7f5ff] via-white to-[#fdf4ff] pt-24 pb-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top content */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,1.5fr)] items-start">
          <div>
            <p className="text-sm md:text-base uppercase tracking-[0.25em] text-gray-400 mb-4">
              Revolutionize Your
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-gray-900 mb-6">
              Creative Projects with
              <br />
              the Ultimate{' '}
              <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                AI‑Powered
              </span>
              <br />
              Pattern
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <button
                onClick={scrollToContact}
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gray-900 text-white text-sm font-semibold tracking-wide shadow-md hover:bg-gray-800 transition-colors"
              >
                START GENERATING
              </button>
              <p className="text-sm md:text-base text-gray-500 max-w-xs">
                The next generation product experience for designers and creators.
              </p>
            </div>
          </div>

          {/* Right-side meta navigation */}
          <div className="hidden md:flex justify-end">
            <div className="text-right space-y-3 text-sm text-gray-500">
              <p className="uppercase tracking-[0.24em] text-xs text-gray-400">
                Navigation
              </p>
              <button
                onClick={() => {
                  const el = document.getElementById('projects')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                className="block text-gray-900 font-medium hover:text-primary-600 transition-colors"
              >
                Projects
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('about')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                className="block hover:text-primary-600 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('skills')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                className="block hover:text-primary-600 transition-colors"
              >
                Skills
              </button>
              <button
                onClick={scrollToContact}
                className="block hover:text-primary-600 transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        </div>

        {/* Lower cards / gallery strip */}
        <div className="mt-16 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.2fr)_minmax(0,1.8fr)]">
          {/* Card 1 */}
          <div className="relative bg-white/80 border border-gray-100 rounded-2xl p-6 shadow-sm backdrop-blur">
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-xs font-semibold text-gray-500">
                01
              </span>
              <span className="inline-flex -space-x-2 overflow-hidden">
                <span className="h-8 w-8 rounded-full bg-gradient-to-tr from-pink-300 to-orange-300 border-2 border-white" />
                <span className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-300 to-purple-400 border-2 border-white" />
                <span className="h-8 w-8 rounded-full bg-gradient-to-tr from-emerald-300 to-cyan-300 border-2 border-white" />
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-4">Learn from best mentors</p>
            <button className="inline-flex items-center text-xs font-semibold text-gray-700 hover:text-primary-600 transition-colors">
              START LEARNING
              <span className="ml-2 text-lg leading-none">↗</span>
            </button>
          </div>

          {/* Card 2 */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#ff8a8a] via-[#ff6fd8] to-[#ffc46b] p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-xs font-semibold">
                02
              </span>
              <div className="flex gap-1">
                <span className="h-1.5 w-10 rounded-full bg-white/80" />
                <span className="h-1.5 w-10 rounded-full bg-white/40" />
                <span className="h-1.5 w-10 rounded-full bg-white/20" />
              </div>
            </div>
            <ul className="space-y-2 text-sm font-medium">
              <li>Free edit</li>
              <li>Interactive</li>
              <li>Easy interface</li>
              <li>Compare to others</li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#7b5cff] via-[#ff52ff] to-[#4fd1c5] p-6 text-white shadow-2xl flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-xs font-semibold">
                03
              </span>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold mb-2">
                +20K
              </p>
              <p className="text-sm text-white/80 max-w-xs">
                Glass patterns generated in the first release week.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero


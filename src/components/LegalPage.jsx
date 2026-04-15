const CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'Last updated: April 2026',
    sections: [
      {
        heading: 'Overview',
        body: 'This site collects only the information you provide through the contact form, such as your name, email address, and message details.',
      },
      {
        heading: 'How data is used',
        body: 'Your message details are used only to respond to inquiries, discuss projects, and handle collaboration requests.',
      },
      {
        heading: 'Data sharing',
        body: 'Information is not sold. Data is only shared with essential service providers needed to operate this website and contact workflow.',
      },
      {
        heading: 'Your rights',
        body: 'You can request access, correction, or deletion of your submitted information by contacting carlo@spectredesign.studio.',
      },
    ],
  },
  terms: {
    title: 'Terms of Use',
    updated: 'Last updated: April 2026',
    sections: [
      {
        heading: 'Use of this site',
        body: 'This website is provided for informational and portfolio purposes. You agree to use it lawfully and respectfully.',
      },
      {
        heading: 'Intellectual property',
        body: 'All site content, designs, text, and visuals are owned by Spectre Design Studio unless otherwise noted and may not be reused without permission.',
      },
      {
        heading: 'No warranty',
        body: 'Content is provided as-is without guarantees of completeness, availability, or suitability for a specific purpose.',
      },
      {
        heading: 'Contact',
        body: 'Questions about these terms can be sent to carlo@spectredesign.studio.',
      },
    ],
  },
}

const LegalPage = ({ type = 'privacy', onBackHome }) => {
  const page = CONTENT[type] || CONTENT.privacy

  return (
    <section className="mx-auto w-full max-w-[min(96vw,1200px)] px-5 py-20 sm:px-8 md:px-12 xl:py-28">
      <button
        type="button"
        onClick={onBackHome}
        className="mb-8 inline-flex items-center gap-2 border border-white/15 bg-white/[0.03] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:border-white/30 hover:text-white sm:text-xs"
      >
        ← Back to home
      </button>

      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl xl:text-5xl">{page.title}</h1>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:text-xs">{page.updated}</p>

      <div className="mt-10 space-y-8">
        {page.sections.map((section) => (
          <article key={section.heading} className="border-t border-white/[0.08] pt-6">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand/90 sm:text-xs">{section.heading}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-300 sm:text-base">{section.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default LegalPage


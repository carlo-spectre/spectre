const PRIVACY_CONTENT = {
  title: 'Privacy Policy',
  updated: 'Last updated: April 14, 2026',
  sections: [
    {
      heading: 'What information is collected',
      body: 'When you submit the contact form, we receive the details you provide such as your name, email address, and message content. Basic technical information such as browser and request metadata may also be processed by hosting and form providers.',
    },
    {
      heading: 'How information is used',
      body: 'Submitted information is used only to respond to your inquiry, discuss potential work, and maintain communication related to your request. Information is not sold or used for unrelated marketing.',
    },
    {
      heading: 'Third-party services',
      body: 'This site may use third-party services for hosting, analytics, and form delivery. These providers may process data according to their own policies while acting as processors on our behalf.',
    },
    {
      heading: 'Data retention',
      body: 'Inquiry records are retained only as long as reasonably necessary for communication, project discussions, and legal or operational requirements.',
    },
    {
      heading: 'Your rights',
      body: 'You may request access, correction, or deletion of your submitted data at any time by contacting carlo@spectredesign.studio.',
    },
  ],
}

const TERMS_CONTENT = {
  title: 'Terms of Use',
  updated: 'Last updated: April 14, 2026',
  sections: [
    {
      heading: 'Use of this website',
      body: 'This website is provided for informational and portfolio purposes. You agree not to misuse, disrupt, or attempt unauthorized access to any part of the site or its infrastructure.',
    },
    {
      heading: 'Intellectual property',
      body: 'Unless stated otherwise, all portfolio content, text, visual assets, and branding are owned by Spectre Design Studio and may not be copied or reused without prior written permission.',
    },
    {
      heading: 'No warranty',
      body: 'Content is provided on an "as is" basis. While we aim for accuracy, no guarantees are made regarding completeness, availability, or uninterrupted operation.',
    },
    {
      heading: 'External links',
      body: 'This site may include links to third-party websites. We are not responsible for the content, practices, or policies of external sites.',
    },
    {
      heading: 'Contact',
      body: 'Questions about these terms can be sent to carlo@spectredesign.studio.',
    },
  ],
}

const contentByType = {
  privacy: PRIVACY_CONTENT,
  terms: TERMS_CONTENT,
}

const LegalPage = ({ type, onBackHome }) => {
  const content = contentByType[type] || PRIVACY_CONTENT

  return (
    <section className="border-b border-white/[0.06] bg-[#08080a] py-16 sm:py-20 xl:py-24">
      <div className="mx-auto w-full max-w-[min(96vw,1120px)] px-5 sm:px-8 md:px-12">
        <button
          type="button"
          onClick={onBackHome}
          className="mb-8 inline-flex items-center gap-2 border border-white/15 bg-white/[0.03] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-300 transition-colors hover:border-white/25 hover:text-white sm:text-xs"
        >
          ← Back to home
        </button>

        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl xl:text-5xl">
          {content.title}
        </h1>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500 sm:text-xs">
          {content.updated}
        </p>

        <div className="mt-10 space-y-8">
          {content.sections.map((section) => (
            <article key={section.heading} className="border-t border-white/[0.08] pt-6">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand/85 sm:text-xs">
                {section.heading}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">
                {section.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LegalPage

import { useEffect, useMemo, useState } from 'react'

const joinLines = (value) => (Array.isArray(value) ? value.join('\n') : '')
const splitLines = (value) => value.split('\n').map((item) => item.trim()).filter(Boolean)
const splitParagraphs = (value) => value.split('\n\n').map((item) => item.trim()).filter(Boolean)
const joinParagraphs = (value) => (Array.isArray(value) ? value.join('\n\n') : '')

const CmsDashboard = ({ projects, onSaveProject, onReset, onLogout, onOpenSite }) => {
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? null)
  const [form, setForm] = useState(null)
  const activeProject = useMemo(
    () => projects.find((project) => project.slug === activeSlug) ?? null,
    [activeSlug, projects],
  )

  useEffect(() => {
    if (!activeProject) return
    setForm({
      title: activeProject.title,
      tag: activeProject.tag,
      timeframe: activeProject.timeframe,
      role: activeProject.role,
      team: activeProject.team,
      thumbnail: activeProject.thumbnail,
      summary: activeProject.summary,
      challenge: activeProject.challenge,
      goals: joinLines(activeProject.goals),
      process: joinLines(activeProject.process),
      outcome: joinLines(activeProject.outcome),
      supportingImage1: activeProject.supportingImages?.[0] ?? '',
      supportingImage2: activeProject.supportingImages?.[1] ?? '',
      supportingImage3: activeProject.supportingImages?.[2] ?? '',
      contextParagraphs: joinParagraphs(activeProject.contextParagraphs),
      rationaleParagraphs: joinParagraphs(activeProject.rationaleParagraphs),
    })
  }, [activeProject])

  if (!activeProject || !form) {
    return (
      <section className="min-h-[100dvh] bg-[#08080a] p-8 text-zinc-300">
        No projects available.
      </section>
    )
  }

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const save = () => {
    onSaveProject?.(activeProject.slug, {
      ...form,
      goals: splitLines(form.goals),
      process: splitLines(form.process),
      outcome: splitLines(form.outcome),
      supportingImages: [
        form.supportingImage1,
        form.supportingImage2,
        form.supportingImage3,
      ].filter(Boolean),
      contextParagraphs: splitParagraphs(form.contextParagraphs),
      rationaleParagraphs: splitParagraphs(form.rationaleParagraphs),
    })
  }

  const handleImageUpload = (key) => async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      updateField(key, String(reader.result || ''))
    }
    reader.readAsDataURL(file)
  }

  return (
    <section className="min-h-[100dvh] bg-[#08080a] px-5 py-8 sm:px-8 md:px-12 xl:px-16">
      <div className="mx-auto w-full max-w-[min(98vw,2200px)]">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3 border border-white/[0.08] bg-black/20 px-5 py-4">
          <h1 className="text-lg font-semibold text-white sm:text-xl">CMS Dashboard</h1>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={onOpenSite} className="border border-white/20 px-3 py-2 text-xs uppercase tracking-[0.18em] text-zinc-300 hover:border-white/35">
              Open site
            </button>
            <button type="button" onClick={onReset} className="border border-white/20 px-3 py-2 text-xs uppercase tracking-[0.18em] text-zinc-300 hover:border-white/35">
              Reset content
            </button>
            <button type="button" onClick={onLogout} className="border border-brand/50 px-3 py-2 text-xs uppercase tracking-[0.18em] text-brand hover:border-brand">
              Logout
            </button>
          </div>
        </header>

        <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="max-h-[78dvh] overflow-auto border border-white/[0.08] bg-black/20 p-3">
            {projects.map((project) => (
              <button
                key={project.slug}
                type="button"
                onClick={() => setActiveSlug(project.slug)}
                className={`mb-2 w-full border px-3 py-3 text-left ${activeSlug === project.slug ? 'border-brand/60 bg-brand/10' : 'border-white/[0.1] bg-[#0f0f12]'} `}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{project.tag}</p>
                <p className="mt-1 text-sm text-zinc-100">{project.title}</p>
                <p className="mt-1 text-[11px] text-zinc-500">/{project.slug}</p>
              </button>
            ))}
          </aside>

          <div className="space-y-4 border border-white/[0.08] bg-black/20 p-4 sm:p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ['title', 'Title'],
                ['tag', 'Tag'],
                ['timeframe', 'Timeframe'],
                ['role', 'Role'],
                ['team', 'Team'],
                ['thumbnail', 'Thumbnail URL'],
              ].map(([key, label]) => (
                <label key={key} className="block">
                  <span className="mb-1 block text-xs uppercase tracking-[0.15em] text-zinc-500">{label}</span>
                  <input value={form[key]} onChange={(event) => updateField(key, event.target.value)} className="w-full border border-white/[0.12] bg-[#0e0e11] px-3 py-2 text-sm text-zinc-100 outline-none focus:border-brand/80" />
                </label>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <label className="block">
                <span className="mb-1 block text-xs uppercase tracking-[0.15em] text-zinc-500">Thumbnail upload</span>
                <input type="file" accept="image/*" onChange={handleImageUpload('thumbnail')} className="w-full text-xs text-zinc-400" />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs uppercase tracking-[0.15em] text-zinc-500">Supporting image 1 upload</span>
                <input type="file" accept="image/*" onChange={handleImageUpload('supportingImage1')} className="w-full text-xs text-zinc-400" />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs uppercase tracking-[0.15em] text-zinc-500">Supporting image 2 upload</span>
                <input type="file" accept="image/*" onChange={handleImageUpload('supportingImage2')} className="w-full text-xs text-zinc-400" />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs uppercase tracking-[0.15em] text-zinc-500">Supporting image 3 upload</span>
                <input type="file" accept="image/*" onChange={handleImageUpload('supportingImage3')} className="w-full text-xs text-zinc-400" />
              </label>
            </div>

            <div className="grid gap-3 xl:grid-cols-3">
              {[
                ['supportingImage1', 'Supporting image 1 URL'],
                ['supportingImage2', 'Supporting image 2 URL'],
                ['supportingImage3', 'Supporting image 3 URL'],
              ].map(([key, label]) => (
                <label key={key} className="block">
                  <span className="mb-1 block text-xs uppercase tracking-[0.15em] text-zinc-500">{label}</span>
                  <input value={form[key]} onChange={(event) => updateField(key, event.target.value)} className="w-full border border-white/[0.12] bg-[#0e0e11] px-3 py-2 text-sm text-zinc-100 outline-none focus:border-brand/80" />
                </label>
              ))}
            </div>

            <label className="block">
              <span className="mb-1 block text-xs uppercase tracking-[0.15em] text-zinc-500">Summary</span>
              <textarea value={form.summary} onChange={(event) => updateField('summary', event.target.value)} rows={3} className="w-full border border-white/[0.12] bg-[#0e0e11] px-3 py-2 text-sm text-zinc-100 outline-none focus:border-brand/80" />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs uppercase tracking-[0.15em] text-zinc-500">Challenge</span>
              <textarea value={form.challenge} onChange={(event) => updateField('challenge', event.target.value)} rows={3} className="w-full border border-white/[0.12] bg-[#0e0e11] px-3 py-2 text-sm text-zinc-100 outline-none focus:border-brand/80" />
            </label>

            <div className="grid gap-3 xl:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-xs uppercase tracking-[0.15em] text-zinc-500">Context paragraphs (separate with blank line)</span>
                <textarea value={form.contextParagraphs} onChange={(event) => updateField('contextParagraphs', event.target.value)} rows={6} className="w-full border border-white/[0.12] bg-[#0e0e11] px-3 py-2 text-sm text-zinc-100 outline-none focus:border-brand/80" />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs uppercase tracking-[0.15em] text-zinc-500">Design rationale paragraphs (separate with blank line)</span>
                <textarea value={form.rationaleParagraphs} onChange={(event) => updateField('rationaleParagraphs', event.target.value)} rows={6} className="w-full border border-white/[0.12] bg-[#0e0e11] px-3 py-2 text-sm text-zinc-100 outline-none focus:border-brand/80" />
              </label>
            </div>

            <div className="grid gap-3 xl:grid-cols-3">
              <label className="block">
                <span className="mb-1 block text-xs uppercase tracking-[0.15em] text-zinc-500">Goals (one per line)</span>
                <textarea value={form.goals} onChange={(event) => updateField('goals', event.target.value)} rows={7} className="w-full border border-white/[0.12] bg-[#0e0e11] px-3 py-2 text-sm text-zinc-100 outline-none focus:border-brand/80" />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs uppercase tracking-[0.15em] text-zinc-500">Process (one per line)</span>
                <textarea value={form.process} onChange={(event) => updateField('process', event.target.value)} rows={7} className="w-full border border-white/[0.12] bg-[#0e0e11] px-3 py-2 text-sm text-zinc-100 outline-none focus:border-brand/80" />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs uppercase tracking-[0.15em] text-zinc-500">Outcome (one per line)</span>
                <textarea value={form.outcome} onChange={(event) => updateField('outcome', event.target.value)} rows={7} className="w-full border border-white/[0.12] bg-[#0e0e11] px-3 py-2 text-sm text-zinc-100 outline-none focus:border-brand/80" />
              </label>
            </div>

            <div className="flex justify-end">
              <button type="button" onClick={save} className="border border-white/25 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.18em] text-zinc-100 hover:border-white/40">
                Save project
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CmsDashboard

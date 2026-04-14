import Hero from './components/Hero'
import Projects from './components/Projects'
import Contact from './components/Contact'

function App() {
  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-100">
      <main>
        <Hero />
        <Projects />
        <Contact />
      </main>
      <footer className="border-t border-white/[0.06] py-10 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
          © {new Date().getFullYear()} Spectre
        </p>
      </footer>
    </div>
  )
}

export default App

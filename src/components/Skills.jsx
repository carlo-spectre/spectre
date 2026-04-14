import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Skills = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.skills-heading', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power3.out',
      })

      gsap.from('.skill-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])
  const skillCategories = [
    {
      category: 'Frontend',
      skills: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS'],
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Python', 'Express', 'MongoDB', 'PostgreSQL'],
    },
    {
      category: 'Tools',
      skills: ['Git', 'Docker', 'AWS', 'Figma', 'Vite'],
    },
  ]

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 skills-heading">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Skills & Technologies
          </h2>
          <div className="mx-auto h-1 w-24 bg-brand" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 shadow-lg border border-gray-100 skill-card"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                {category.category}
              </h3>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                      <div
                        className="h-2 rounded-full bg-brand"
                        style={{ width: `${85 + Math.random() * 10}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-700 font-medium w-24 text-right">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills


const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-primary-400 mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg">
                I'm a passionate developer with a love for creating beautiful,
                functional, and user-friendly applications. With expertise in
                modern web technologies, I bring ideas to life through clean
                code and thoughtful design.
              </p>
              <p>
                My journey in development has been driven by curiosity and a
                constant desire to learn and grow. I enjoy solving complex
                problems and turning them into elegant solutions.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge with
                the developer community.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Quick Facts
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <span className="text-primary-600 mr-3">✓</span>
                  <span className="text-gray-700">Full-stack developer</span>
                </li>
                <li className="flex items-center">
                  <span className="text-primary-600 mr-3">✓</span>
                  <span className="text-gray-700">UI/UX enthusiast</span>
                </li>
                <li className="flex items-center">
                  <span className="text-primary-600 mr-3">✓</span>
                  <span className="text-gray-700">Problem solver</span>
                </li>
                <li className="flex items-center">
                  <span className="text-primary-600 mr-3">✓</span>
                  <span className="text-gray-700">Continuous learner</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About


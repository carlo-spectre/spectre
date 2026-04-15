import { memo, useEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import logomarkDarkRaw from '../assets/logomark-dark.svg?raw'

const buildStrokeSvg = (raw) => {
  const withStrokeStyle = raw.replace(
    /<style>[\s\S]*?<\/style>/,
    '<style>.cls-1,.cls-2{fill:none;stroke:#777783;stroke-width:1.05;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke;}.cls-1{stroke:#f23737;stroke-width:1.3;}</style>',
  )

  return withStrokeStyle
    .replace(/class="([^"]*)"/g, 'class="$1 hero-logomark-path"')
    .replace('<svg ', '<svg class="hero-logomark-svg" ')
}

const HeroLogomarkFx = () => {
  const rootRef = useRef(null)
  const svgRef = useRef(null)
  const strokeMarkup = useMemo(() => buildStrokeSvg(logomarkDarkRaw), [])

  useEffect(() => {
    const root = rootRef.current
    const svgNode = svgRef.current
    if (!root || !svgNode) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const compactScreen = window.matchMedia('(max-width: 1023px)').matches
    const largeScreen = window.matchMedia('(min-width: 1280px)').matches
    const tweens = []

    // Phase 1: prepare all paths for initial draw.
    const paths = svgNode.querySelectorAll('.hero-logomark-path')
    paths.forEach((path, index) => {
      const isInnerCirclePath = path.classList.contains('cls-1')
      const length = path.getTotalLength ? path.getTotalLength() : 0
      const drawDuration = isInnerCirclePath
        ? (compactScreen ? 4.4 : 5.4)
        : (compactScreen ? 5.2 : 6.2)

      path.style.strokeDasharray = `${length}`
      path.style.strokeDashoffset = `${length}`
      path.style.opacity = isInnerCirclePath ? '0.92' : '0.6'

      const traceTl = gsap.timeline({
        delay: 0.2 + index * 0.03,
        repeat: -1,
        repeatDelay: compactScreen ? 0.2 : 0.3,
      })

      traceTl
        .fromTo(path, {
          strokeDashoffset: length,
          opacity: isInnerCirclePath ? 0.92 : 0.6,
        }, {
          strokeDashoffset: -length,
          opacity: isInnerCirclePath ? 1 : 0.78,
          duration: drawDuration,
          ease: 'none',
        })

      tweens.push(traceTl)
    })

    tweens.push(
      gsap.fromTo(
        root,
        { opacity: 0, scale: 0.92, rotate: -8 },
        { opacity: 0.46, scale: 1, rotate: 0, duration: 1.4, ease: 'power3.out' },
      ),
    )

    if (!reducedMotion && !largeScreen) {
      tweens.push(
        gsap.to(root, {
          yPercent: -4,
          xPercent: 4,
          rotate: 5,
          scale: 1.035,
          duration: 15,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        }),
      )
    }

    return () => {
      tweens.forEach((tween) => tween.kill())
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className="hero-logomark-fx pointer-events-none absolute left-1/2 top-1/2 z-[2] h-[clamp(11rem,52vw,17rem)] w-[clamp(11rem,52vw,17rem)] -translate-x-1/2 -translate-y-1/2 opacity-34 sm:left-auto sm:right-[-20%] sm:top-[12%] sm:h-[clamp(14rem,48vw,22rem)] sm:w-[clamp(14rem,48vw,22rem)] sm:translate-x-0 sm:translate-y-0 sm:opacity-36 md:right-[-14%] md:top-[10%] md:h-[clamp(17rem,44vw,28rem)] md:w-[clamp(17rem,44vw,28rem)] md:opacity-38 lg:right-[-6%] lg:top-[8%] lg:h-[clamp(20rem,40vw,42rem)] lg:w-[clamp(20rem,40vw,42rem)] lg:opacity-42 xl:right-[10%] xl:top-1/2 xl:h-[clamp(24rem,42vw,50rem)] xl:w-[clamp(24rem,42vw,50rem)] xl:-translate-y-1/2 min-[1920px]:right-[18%] min-[1920px]:h-[clamp(38rem,44vw,68rem)] min-[1920px]:w-[clamp(38rem,44vw,68rem)]"
      aria-hidden
    >
      <div
        ref={svgRef}
        className="absolute inset-0"
        dangerouslySetInnerHTML={{ __html: strokeMarkup }}
      />
    </div>
  )
}

export default memo(HeroLogomarkFx)

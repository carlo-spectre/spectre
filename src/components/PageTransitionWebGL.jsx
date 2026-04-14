import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const VERTEX_SHADER = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = (a_position + 1.0) * 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
precision mediump float;
varying vec2 v_uv;

uniform float u_time;
uniform float u_progress;
uniform vec2 u_resolution;

void main() {
  vec2 uv = v_uv;
  float waveA = sin((uv.y * 18.0) + (u_time * 2.2)) * 0.015 * u_progress;
  float waveB = cos((uv.x * 14.0) - (u_time * 1.8)) * 0.012 * u_progress;
  uv.x += waveA;
  uv.y += waveB;

  float radial = distance(uv, vec2(0.5, 0.52));
  float pulse = smoothstep(0.95, 0.2, radial);
  float edgeNoise = sin((uv.x + uv.y + u_time) * 24.0) * 0.5 + 0.5;
  float alpha = (0.16 + pulse * 0.72 + edgeNoise * 0.12) * u_progress;

  vec3 nearBlack = vec3(0.03, 0.03, 0.05);
  vec3 brand = vec3(0.949, 0.216, 0.216);
  vec3 color = mix(nearBlack, brand, pulse * 0.34 + edgeNoise * 0.08);

  gl_FragColor = vec4(color, clamp(alpha, 0.0, 0.92));
}
`

const createShader = (gl, type, source) => {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

const createProgram = (gl, vertexSource, fragmentSource) => {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource)
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource)
  if (!vertexShader || !fragmentShader) return null

  const program = gl.createProgram()
  if (!program) return null

  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  gl.deleteShader(vertexShader)
  gl.deleteShader(fragmentShader)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program)
    return null
  }
  return program
}

const PageTransitionWebGL = () => {
  const canvasRef = useRef(null)
  const fallbackRef = useRef(null)
  const stateRef = useRef({ progress: 0, active: false, targetId: null, animating: false })
  const triggerRef = useRef(() => {})

  useEffect(() => {
    const canvas = canvasRef.current
    const fallback = fallbackRef.current
    if (!canvas || !fallback) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let rafId = 0
    let gl = null
    let program = null
    let positionBuffer = null
    let uTime = null
    let uProgress = null
    let uResolution = null
    let startTime = performance.now()

    const state = stateRef.current

    const scrollToTarget = () => {
      if (!state.targetId) return
      const target = document.getElementById(state.targetId)
      if (target) target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
    }

    const resize = () => {
      if (!gl || !canvas) return
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      const width = Math.floor(window.innerWidth * ratio)
      const height = Math.floor(window.innerHeight * ratio)
      canvas.width = width
      canvas.height = height
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      gl.viewport(0, 0, width, height)
    }

    gl = canvas.getContext('webgl', { alpha: true, antialias: true })
    if (gl) {
      program = createProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER)
    }

    if (!gl || !program) {
      canvas.style.display = 'none'
      fallback.style.display = 'block'
    } else {
      gl.useProgram(program)
      const aPosition = gl.getAttribLocation(program, 'a_position')
      uTime = gl.getUniformLocation(program, 'u_time')
      uProgress = gl.getUniformLocation(program, 'u_progress')
      uResolution = gl.getUniformLocation(program, 'u_resolution')

      const vertices = new Float32Array([
        -1, -1,
        1, -1,
        -1, 1,
        -1, 1,
        1, -1,
        1, 1,
      ])

      positionBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
      gl.enableVertexAttribArray(aPosition)
      gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)

      resize()
      window.addEventListener('resize', resize)
    }

    const render = (time) => {
      if (!gl || !program) return
      const elapsed = (time - startTime) / 1000
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform1f(uTime, elapsed)
      gl.uniform1f(uProgress, state.progress)
      gl.uniform2f(uResolution, canvas.width, canvas.height)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    const tick = (time) => {
      if (state.active) {
        render(time)
      }
      rafId = window.requestAnimationFrame(tick)
    }
    rafId = window.requestAnimationFrame(tick)

    const showFallback = () => {
      fallback.style.display = 'block'
      gsap.fromTo(
        fallback,
        { opacity: 0 },
        {
          opacity: 0.82,
          duration: 0.32,
          ease: 'power2.out',
          onComplete: scrollToTarget,
        },
      )
      gsap.to(fallback, {
        opacity: 0,
        duration: 0.55,
        delay: 0.12,
        ease: 'power3.out',
        onComplete: () => {
          state.active = false
          state.animating = false
        },
      })
    }

    triggerRef.current = (targetId) => {
      if (!targetId || state.animating) return
      state.targetId = targetId

      if (!gl || !program || reducedMotion) {
        state.animating = true
        state.active = true
        showFallback()
        return
      }

      state.animating = true
      state.active = true
      state.progress = 0

      gsap.timeline({
        onComplete: () => {
          state.progress = 0
          state.active = false
          state.animating = false
        },
      })
        .to(state, {
          progress: 1,
          duration: 0.42,
          ease: 'power2.in',
          onUpdate: () => {
            state.progress = state.progress
          },
          onComplete: scrollToTarget,
        })
        .to(state, {
          progress: 0,
          duration: 0.62,
          ease: 'power3.out',
          onUpdate: () => {
            state.progress = state.progress
          },
        })
    }

    const handleTransitionEvent = (event) => {
      const nextId = event?.detail?.targetId
      triggerRef.current(nextId)
    }
    window.addEventListener('spectre:transition', handleTransitionEvent)

    return () => {
      window.removeEventListener('spectre:transition', handleTransitionEvent)
      window.removeEventListener('resize', resize)
      window.cancelAnimationFrame(rafId)
      if (gl && positionBuffer) gl.deleteBuffer(positionBuffer)
      if (gl && program) gl.deleteProgram(program)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[120] opacity-100" aria-hidden />
      <div
        ref={fallbackRef}
        className="pointer-events-none fixed inset-0 z-[120] hidden bg-gradient-to-br from-[#0a0a0d] via-brand/40 to-[#050507]"
        aria-hidden
      />
    </>
  )
}

export default PageTransitionWebGL

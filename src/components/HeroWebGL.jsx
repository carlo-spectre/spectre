import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const VERT = `
varying vec2 v_uv;
void main() {
  v_uv = uv;
  gl_Position = vec4(position.x, position.y, 0.0, 1.0);
}
`

const FRAG = `
precision highp float;
uniform float u_time;
varying vec2 v_uv;

float wave(vec2 p, float t) {
  return sin(p.x * 3.2 + t * 0.35) * 0.5 + cos(p.y * 2.7 - t * 0.28) * 0.5;
}

void main() {
  vec2 uv = v_uv;
  float t = u_time;
  vec2 q = uv + 0.04 * vec2(
    sin(uv.y * 5.0 + t * 0.4),
    cos(uv.x * 4.0 - t * 0.35)
  );
  float w = wave(q, t);
  float w2 = 0.5 * sin(q.x * 8.0 + q.y * 5.0 + t * 0.5);
  float n = w * 0.15 + w2 * 0.08 + 0.52;

  vec3 base = vec3(0.031, 0.031, 0.039);
  vec3 tintA = vec3(0.04, 0.10, 0.14);
  vec3 tintB = vec3(0.09, 0.04, 0.12);
  vec3 col = mix(base, tintA, smoothstep(0.4, 0.72, n));
  col = mix(col, tintB, 0.12 * (0.5 + 0.5 * sin(uv.x * 2.5 + uv.y * 1.5 + t * 0.25)));
  col = mix(col, base, 0.55);

  gl_FragColor = vec4(col, 1.0);
}
`

const HeroWebGL = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x08080a, 1)
    mount.appendChild(renderer.domElement)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    camera.position.z = 1

    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        u_time: { value: 0 },
      },
      depthWrite: false,
      depthTest: false,
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    let rafId = 0
    const clock = new THREE.Clock()

    const resize = () => {
      const w = mount.clientWidth || 1
      const h = mount.clientHeight || 1
      renderer.setSize(w, h, false)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(mount)

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      if (!reducedMotion) {
        material.uniforms.u_time.value = clock.getElapsedTime()
      }
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0 z-0 opacity-[0.72]"
      aria-hidden
    />
  )
}

export default HeroWebGL

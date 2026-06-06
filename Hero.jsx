import { Canvas } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import { motion } from 'framer-motion'

function Stars() {
  const ref = useRef()
  const points = useMemo(() => {
    const arr = new Float32Array(6000)
    for (let i = 0; i < 6000; i++) arr[i] = (Math.random() - 0.5) * 40
    return arr
  }, [])

  return (
    <points ref={ref} position={[0, 0, -2]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={points.length / 3} array={points} itemSize={3} />
      </bufferGeometry>
      <pointMaterial size={0.05} color="#00f0ff" sizeAttenuation />
    </points>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#0b0b10]" id="services">
      {/* 3D Canvas background — always dark for immersive effect */}
      <div className="absolute inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Stars />
        </Canvas>
      </div>

      <div className="container mx-auto px-6 py-24 text-center">
        <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-neonPurple to-cyberBlue">
          EMPOWERING BUSINESSES WITH DIGITAL INNOVATION.
        </motion.h1>
        <p className="mt-6 text-lg text-gray-300">Let&apos;s start a whole new journey to unleash your brand&apos;s real potential.</p>
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <a href="#packages" className="px-6 py-3 rounded-full bg-gradient-to-r from-neonPurple to-cyberBlue text-black font-semibold hover:brightness-110 transition-all">Explore Now</a>
          <a href="#contact" className="px-6 py-3 rounded-full border border-neonPurple text-neonPurple hover:bg-neonPurple/10 transition-all">Let&apos;s Discuss Your Idea</a>
        </div>
      </div>
    </section>
  )
}

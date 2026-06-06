'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import { Icosahedron, Points, PointMaterial } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'

function RotatingGeo({ mousePos }) {
  const meshRef = useRef()
  const wireframeRef = useRef()

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Smooth rotation
      meshRef.current.rotation.x += delta * 0.3
      meshRef.current.rotation.y += delta * 0.25
      meshRef.current.rotation.z += delta * 0.15

      // Pulsating scale
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      meshRef.current.scale.set(pulse, pulse, pulse)

      // Mouse hover influence
      if (mousePos.x !== 0 || mousePos.y !== 0) {
        meshRef.current.rotation.x += mousePos.y * 0.3
        meshRef.current.rotation.y += mousePos.x * 0.3
      }
    }

    if (wireframeRef.current) {
      wireframeRef.current.rotation.copy(meshRef.current.rotation)
      wireframeRef.current.scale.copy(meshRef.current.scale)
    }
  })

  return (
    <group>
      {/* Main emissive mesh */}
      <mesh ref={meshRef}>
        <Icosahedron args={[1.5, 4]} />
        <meshStandardMaterial
          color="#b026ff"
          emissive="#b026ff"
          emissiveIntensity={0.8}
          wireframe={false}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Wireframe overlay with gradient */}
      <mesh ref={wireframeRef}>
        <Icosahedron args={[1.5, 4]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={0.6}
          wireframe={true}
          wireframeLinewidth={2}
        />
      </mesh>

      {/* Glow effect */}
      <pointLight position={[0, 0, 3]} intensity={2} color="#b026ff" />
      <pointLight position={[-3, 2, 2]} intensity={1.5} color="#00f0ff" />
    </group>
  )
}

function StarField() {
  const pointsRef = useRef()
  const particlesPosition = new Float32Array(Array.from({ length: 1500 }, () => (Math.random() - 0.5) * 40))

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x -= 0.0003
      pointsRef.current.rotation.y -= 0.0005
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particlesPosition.length / 3} array={particlesPosition} itemSize={3} />
      </bufferGeometry>
      <PointMaterial size={0.06} color="#00f0ff" sizeAttenuation />
    </points>
  )
}

function Scene() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMousePos({ x: x * 0.5, y: y * 0.5 })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      <StarField />
      <RotatingGeo mousePos={mousePos} />
    </>
  )
}

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [displayText, setDisplayText] = useState('')
  const fullText = 'PIVOT & PULSE - INITIALIZING SYSTEM...'

  useEffect(() => {
    // Typewriter effect for loading text
    let charIndex = 0
    const interval = setInterval(() => {
      if (charIndex < fullText.length) {
        setDisplayText(fullText.slice(0, charIndex + 1))
        charIndex++
      }
    }, 30)

    // Minimum 2.5 second loading time
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => {
      clearInterval(interval)
      clearTimeout(loadingTimer)
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-black/95 via-[#0a0a0f] to-black/95 backdrop-blur-sm"
        >
          {/* 3D Canvas */}
          <div className="w-80 h-80 mb-12">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <color attach="background" args={['#000000']} />
              <ambientLight intensity={0.4} />
              <Scene />
            </Canvas>
          </div>

          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <div className="text-xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-neonPurple to-cyberBlue tracking-widest min-h-[32px]">
              {displayText}
              <span className="animate-pulse">|</span>
            </div>
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xs text-gray-500 font-light"
            >
              Loading assets...
            </motion.div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '200px' }}
            transition={{ duration: 2.3 }}
            className="mt-8 h-1 bg-gradient-to-r from-neonPurple via-cyberBlue to-neonPurple rounded-full shadow-lg shadow-neonPurple/50"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

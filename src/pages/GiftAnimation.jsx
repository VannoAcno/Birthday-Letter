import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

function GiftAnimation({ onComplete }) {
  const [stage, setStage] = useState('closed') // closed, opening, opened

  useEffect(() => {
    // Mulai buka gift setelah 1 detik
    const timer1 = setTimeout(() => {
      setStage('opening')
    }, 1000)

    // Trigger confetti dan stage opened
    const timer2 = setTimeout(() => {
      // Confetti burst
      const duration = 2000
      const end = Date.now() + duration

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FFD700', '#FF69B4', '#C084FC', '#FF1493', '#FF6B6B', '#FFB6C1']
        })
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FFD700', '#FF69B4', '#C084FC', '#FF1493', '#FF6B6B', '#FFB6C1']
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }

      frame()

      setStage('opened')
    }, 2500)

    // Selesai dan lanjut ke letter
    const timer3 = setTimeout(() => {
      onComplete()
    }, 5500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [onComplete])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Stars */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
            }}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: 0
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Floating Flowers */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl md:text-4xl"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: -50,
              rotate: 0,
              opacity: 0.8
            }}
            animate={{ 
              y: typeof window !== 'undefined' ? window.innerHeight + 50 : 900,
              rotate: 360,
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ 
              duration: 10 + Math.random() * 5, 
              repeat: Infinity, 
              delay: i * 0.8,
              ease: "linear" 
            }}
          >
            {['🌸', '🌹', '', '', '', '💖'][i % 6]}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="text-center z-10 relative w-full max-w-2xl"
      >
        {/* Text Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: stage === 'closed' ? 1 : stage === 'opening' ? 0.5 : 0,
            y: stage === 'closed' ? 0 : stage === 'opening' ? -20 : -40 
          }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 mb-3 font-serif"
            animate={{ 
              filter: ['drop-shadow(0 0 20px rgba(236, 72, 153, 0.6))', 'drop-shadow(0 0 30px rgba(192, 132, 252, 0.8))', 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.6))']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨ A Special Gift For You ✨
          </motion.h1>
          <p className="text-pink-200 text-lg md:text-xl">
            {stage === 'closed' ? 'Something magical is coming...' : stage === 'opening' ? 'Opening...' : ''}
          </p>
        </motion.div>

        {/* Gift Box Container */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
          <AnimatePresence mode="wait">
            {stage === 'closed' && (
              <motion.div
                key="closed"
                initial={{ scale: 0.8, rotateY: 0 }}
                animate={{ scale: 1, rotateY: 360 }}
                exit={{ scale: 0.5, opacity: 0, rotateY: 180 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                {/* Gift Box - Closed */}
                <svg viewBox="0 0 200 220" className="w-full h-full drop-shadow-2xl">
                  {/* Box Body */}
                  <rect x="30" y="100" width="140" height="100" fill="#ec4899" rx="8" />
                  <rect x="30" y="100" width="140" height="100" fill="url(#pinkGradient)" rx="8" />
                  
                  {/* Box Lid */}
                  <rect x="20" y="85" width="160" height="25" fill="#db2777" rx="6" />
                  <rect x="20" y="85" width="160" height="25" fill="url(#lidGradient)" rx="6" />
                  
                  {/* Vertical Ribbon */}
                  <rect x="95" y="100" width="10" height="100" fill="#FFD700" />
                  <rect x="95" y="85" width="10" height="25" fill="#FFD700" />
                  
                  {/* Horizontal Ribbon */}
                  <rect x="30" y="140" width="140" height="10" fill="#FFD700" />
                  
                  {/* Bow */}
                  <circle cx="100" cy="85" r="10" fill="#FFD700" />
                  <ellipse cx="85" cy="75" rx="10" ry="8" fill="#FFD700" />
                  <ellipse cx="115" cy="75" rx="10" ry="8" fill="#FFD700" />
                  <ellipse cx="85" cy="95" rx="8" ry="10" fill="#FFD700" />
                  <ellipse cx="115" cy="95" rx="8" ry="10" fill="#FFD700" />
                  
                  {/* Gradients */}
                  <defs>
                    <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#be185d" />
                    </linearGradient>
                    <linearGradient id="lidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#db2777" />
                      <stop offset="100%" stopColor="#9d174d" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Sparkles around box */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-3xl"
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${Math.random() * 100}%`
                    }}
                    animate={{ 
                      scale: [0, 1, 0],
                      rotate: 360,
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      delay: i * 0.3 
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
              </motion.div>
            )}

            {stage === 'opening' && (
              <motion.div
                key="opening"
                className="absolute inset-0"
              >
                {/* Lid flying up */}
                <motion.div
                  initial={{ y: 0, rotateX: 0, opacity: 1 }}
                  animate={{ y: -150, rotateX: 90, opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-full"
                >
                  <svg viewBox="0 0 200 220" className="w-full h-full">
                    <rect x="20" y="85" width="160" height="25" fill="#db2777" rx="6" />
                    <rect x="95" y="85" width="10" height="25" fill="#FFD700" />
                    <circle cx="100" cy="85" r="10" fill="#FFD700" />
                  </svg>
                </motion.div>

                {/* Box base staying */}
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4"
                >
                  <svg viewBox="0 0 200 220" className="w-full h-full">
                    <rect x="30" y="100" width="140" height="100" fill="#ec4899" rx="8" />
                    <rect x="95" y="100" width="10" height="100" fill="#FFD700" />
                    <rect x="30" y="140" width="140" height="10" fill="#FFD700" />
                  </svg>
                </motion.div>
              </motion.div>
            )}

            {stage === 'opened' && (
              <motion.div
                key="opened"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0"
              >
                {/* Floating Hearts */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      x: typeof window !== 'undefined' ? window.innerWidth / 2 : 400,
                      y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400,
                      scale: 0,
                      opacity: 0
                    }}
                    animate={{ 
                      y: -150 - Math.random() * 300,
                      x: (typeof window !== 'undefined' ? window.innerWidth / 2 : 400) + (Math.random() - 0.5) * 400,
                      scale: [0, 1.5, 1, 0],
                      rotate: Math.random() * 720,
                      opacity: [0, 1, 1, 0]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      delay: i * 0.15,
                      ease: "easeOut"
                    }}
                    className="absolute text-4xl md:text-5xl"
                  >
                    {['💖', '💕', '💗', '💝', '❤️', '💘'][i % 6]}
                  </motion.div>
                ))}

                {/* Floating Stars */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      x: typeof window !== 'undefined' ? window.innerWidth / 2 : 400,
                      y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400,
                      scale: 0
                    }}
                    animate={{ 
                      y: -100 - Math.random() * 250,
                      x: (typeof window !== 'undefined' ? window.innerWidth / 2 : 400) + (Math.random() - 0.5) * 350,
                      scale: [0, 1.8, 1, 0],
                      rotate: 360
                    }}
                    transition={{ 
                      duration: 2, 
                      delay: 0.5 + i * 0.2,
                      ease: "easeOut"
                    }}
                    className="absolute text-3xl"
                  >
                    ⭐
                  </motion.div>
                ))}

                {/* Opened Box Base */}
                <motion.div
                  initial={{ y: 0, scale: 0.8 }}
                  animate={{ y: 20, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2"
                >
                  <svg viewBox="0 0 200 220" className="w-full h-full drop-shadow-xl">
                    <rect x="30" y="100" width="140" height="100" fill="#ec4899" rx="8" />
                    <rect x="95" y="100" width="10" height="100" fill="#FFD700" />
                    <rect x="30" y="140" width="140" height="10" fill="#FFD700" />
                  </svg>
                </motion.div>

                {/* Magic text reveal - DI ATAS box */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-full text-center"
                >
                  <motion.h2 
                    className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 font-serif"
                    animate={{ 
                      filter: ['drop-shadow(0 0 15px rgba(253, 224, 71, 0.8))', 'drop-shadow(0 0 25px rgba(236, 72, 153, 0.9))', 'drop-shadow(0 0 15px rgba(253, 224, 71, 0.8))']
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Happy Birthday!
                  </motion.h2>
                  <motion.p 
                    className="text-pink-200 text-lg mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                  >
                    Loading your letter...
                  </motion.p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom decoration text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: stage === 'opened' ? 1 : 0 }}
          transition={{ delay: 3 }}
          className="text-pink-300/60 text-sm mt-12"
        >
          Made with 💖 for your special day
        </motion.p>
      </motion.div>
    </div>
  )
}

export default GiftAnimation
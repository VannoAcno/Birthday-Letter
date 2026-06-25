import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

function GiftAnimation({ onComplete }) {
  const [stage, setStage] = useState('closed') // closed, opening, opened

  useEffect(() => {
    setStage('opening')
    
    const timer1 = setTimeout(() => {
      // Trigger confetti dengan warna yang lebih cocok
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FF69B4', '#C084FC', '#FF1493', '#FF6B6B']
      })
      setStage('opened')
    }, 1500)

    const timer2 = setTimeout(() => {
      onComplete()
    }, 3500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [onComplete])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Stars */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
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

      {/* Flower Drop Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl md:text-4xl"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: -50,
              rotate: 0,
              opacity: 0.7
            }}
            animate={{ 
              y: typeof window !== 'undefined' ? window.innerHeight + 50 : 900,
              rotate: 360,
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 8 + Math.random() * 6, 
              repeat: Infinity, 
              delay: i * 1.5,
              ease: "linear" 
            }}
          >
            {['🌸', '🌹', '🌷', '💐', '🌺'][i % 5]}
          </motion.div>
        ))}
      </div>

      {/* Sparkles dengan warna yang lebih cocok */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-300"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              scale: 0,
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: 360,
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="text-center z-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 text-xl md:text-2xl mb-8 font-serif font-bold"
        >
          {stage === 'opening' ? '✨ Opening your gift... ✨' : ''}
        </motion.p>

        {/* Gift Box */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
          <AnimatePresence>
            {stage === 'closed' && (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                className="absolute inset-0"
              >
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Box body */}
                  <rect x="40" y="80" width="120" height="100" fill="#ff69b4" rx="5" />
                  {/* Box lid */}
                  <rect x="30" y="70" width="140" height="20" fill="#ff69b4" rx="3" />
                  {/* Vertical ribbon */}
                  <rect x="95" y="80" width="10" height="100" fill="#ffd700" />
                  <rect x="95" y="70" width="10" height="20" fill="#ffd700" />
                  {/* Horizontal ribbon */}
                  <rect x="40" y="125" width="120" height="10" fill="#ffd700" />
                  {/* Bow */}
                  <circle cx="100" cy="70" r="8" fill="#ffd700" />
                  <ellipse cx="88" cy="62" rx="8" ry="6" fill="#ffd700" />
                  <ellipse cx="112" cy="62" rx="8" ry="6" fill="#ffd700" />
                </svg>
              </motion.div>
            )}

            {stage === 'opened' && (
              <>
                {/* Light burst */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 2, opacity: [0, 1, 0] }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 bg-gradient-radial from-yellow-300 via-pink-400 to-transparent rounded-full"
                />
                
                {/* Opened box parts */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: -50, rotate: -15, opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-40"
                >
                  <svg viewBox="0 0 200 200">
                    <rect x="30" y="70" width="140" height="20" fill="#ff69b4" rx="3" />
                    <rect x="95" y="70" width="10" height="20" fill="#ffd700" />
                    <circle cx="100" cy="70" r="8" fill="#ffd700" />
                  </svg>
                </motion.div>

                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.3, opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <rect x="40" y="80" width="120" height="100" fill="#ff69b4" rx="5" />
                    <rect x="95" y="80" width="10" height="100" fill="#ffd700" />
                    <rect x="40" y="125" width="120" height="10" fill="#ffd700" />
                  </svg>
                </motion.div>

                {/* Hearts floating up */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      x: typeof window !== 'undefined' ? window.innerWidth / 2 : 400,
                      y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400,
                      scale: 0 
                    }}
                    animate={{ 
                      y: -200 - Math.random() * 200,
                      x: (typeof window !== 'undefined' ? window.innerWidth / 2 : 400) + (Math.random() - 0.5) * 300,
                      scale: [0, 1, 0],
                      rotate: Math.random() * 360 
                    }}
                    transition={{ duration: 2, delay: i * 0.1 }}
                    className="absolute text-4xl"
                  >
                    {['💖', '💕', '💗', '💝'][i % 4]}
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

export default GiftAnimation
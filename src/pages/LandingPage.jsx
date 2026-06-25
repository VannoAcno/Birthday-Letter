import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PasscodeInput from './PasscodeInput'
import GiftAnimation from './GiftAnimation'

function LandingPage() {
  const navigate = useNavigate()
  const [stage, setStage] = useState('countdown') // countdown, passcode, gift
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Target: 25 Juni 2026, jam 15:10 (3:10 PM)
  const targetDate = new Date('2026-06-27T00:00:00').getTime()

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance < 0) {
        clearInterval(timer)
        setStage('passcode') // ✅ Ganti stage ke passcode
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const handlePasscodeComplete = () => {
    setStage('gift') // ✅ Setelah passcode benar, tampilkan gift
  }

  const handleGiftComplete = () => {
    navigate('/letter') // ✅ Setelah gift animation, ke letter
  }

  // Render Passcode Input
  if (stage === 'passcode') {
    return <PasscodeInput onComplete={handlePasscodeComplete} />
  }

  // Render Gift Animation
  if (stage === 'gift') {
    return <GiftAnimation onComplete={handleGiftComplete} />
  }

  // Render Countdown (default)
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

      {/* Floating Flowers */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: typeof window !== 'undefined' ? window.innerHeight + 100 : 900,
              rotate: 0
            }}
            animate={{
              y: -100,
              rotate: 360,
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 3,
              ease: "linear"
            }}
          >
            {['🌸', '', '🌷', '🌹', '🌻', ''][i % 6]}
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center space-y-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400"
          animate={{
            filter: ['drop-shadow(0 0 20px rgba(236, 72, 153, 0.5))', 'drop-shadow(0 0 40px rgba(168, 85, 247, 0.8))', 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.5))']
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          For You
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-pink-200 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Something special is coming...
        </motion.p>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        >

          <div className="grid grid-cols-4 lg:grid-cols-4 gap-3 md:gap-6 max-w-md lg:max-w-2xl mx-auto">
            {[
              { value: timeLeft.days, label: 'DAYS' },
              { value: timeLeft.hours, label: 'HOURS' },
              { value: timeLeft.minutes, label: 'MINUTES' },
              { value: timeLeft.seconds, label: 'SECONDS' }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 md:p-6 min-w-[80px] md:min-w-[100px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-pink-300 to-purple-400">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-xs md:text-sm text-pink-200 mt-2 tracking-wider">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-pink-300/80 text-sm md:text-base">
            27 Juni 2026
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default LandingPage
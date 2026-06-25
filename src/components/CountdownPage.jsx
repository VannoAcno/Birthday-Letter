import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

function CountdownPage({ onComplete }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isComplete, setIsComplete] = useState(false)

  // Countdown ke 27 Juni 2026
  useEffect(() => {
    const targetDate = new Date('2026-06-27T00:00:00').getTime()
    
    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        // Countdown selesai
        setIsComplete(true)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        
        // Auto lanjut ke passcode setelah 2 detik
        setTimeout(() => {
          onComplete()
        }, 2000)
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [onComplete])

  const handleSkip = () => {
    onComplete()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
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
            {['🌸', '🌹', '🌷', '💐', ''][i % 5]}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center z-10 w-full max-w-2xl flex flex-col items-center"
      >
        {/* ===== BAGIAN ATAS: For You, My Love ===== */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          {/* Flower decoration */}
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 mb-2 font-serif">
            For You, My Love
          </h1>
          
          <p className="text-pink-200 text-lg">
            Something special is coming...
          </p>
        </motion.div>

        {/* ===== BAGIAN TENGAH: Countdown Timer ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-6"
        >
          {isComplete ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 py-8"
            >
              🎉 It's Her Day! 
            </motion.div>
          ) : (
            <>
              {/* Countdown Label */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <Calendar className="w-6 h-6 text-pink-400" />
                <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">
                  Countdown to Her Special Day
                </h2>
              </div>

              {/* Countdown Boxes */}
              <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-md mx-auto mb-4">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Minutes', value: timeLeft.minutes },
                  { label: 'Seconds', value: timeLeft.seconds },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 md:p-4"
                  >
                    <motion.div
                      key={item.value}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"
                    >
                      {String(item.value).padStart(2, '0')}
                    </motion.div>
                    <div className="text-xs md:text-sm text-pink-200/80 mt-1 uppercase tracking-wider">
                      {item.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-pink-200/60 text-sm"
              >
                27 Juni 2026
              </motion.p>
            </>
          )}
        </motion.div>

        {/* ===== BAGIAN BAWAH: Skip Button ===== */}
        {!isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mt-4"
          >
            <Button
              onClick={handleSkip}
              className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-8 py-3 rounded-xl flex items-center gap-2 transition-all hover:scale-105"
            >
              Skip Countdown
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default CountdownPage
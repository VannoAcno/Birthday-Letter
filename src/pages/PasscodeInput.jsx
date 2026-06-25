import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

function PasscodeInput({ onComplete }) {
  const [passcode, setPasscode] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [isShaking, setIsShaking] = useState(false)
  const inputRefs = useRef([])

  const CORRECT_CODE = '270607'

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return
    
    const char = value.slice(-1)

    const newPasscode = [...passcode]
    newPasscode[index] = char
    setPasscode(newPasscode)
    setError('')

    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    const enteredCode = newPasscode.join('')
    if (newPasscode.every(d => d !== '') && index === 5) {
      if (enteredCode === CORRECT_CODE) {
        setTimeout(() => onComplete(), 300)
      } else {
        setIsShaking(true)
        setError('Kode salah, coba lagi 💔')
        setTimeout(() => {
          setIsShaking(false)
          setPasscode(['', '', '', '', '', ''])
          inputRefs.current[0]?.focus()
        }, 1000)
      }
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !passcode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    if (!/^\d+$/.test(pastedData)) return

    const newPasscode = [...passcode]
    pastedData.split('').forEach((char, i) => {
      if (i < 6) newPasscode[i] = char
    })
    setPasscode(newPasscode)

    if (pastedData.length === 6) {
      if (pastedData === CORRECT_CODE) {
        setTimeout(() => onComplete(), 300)
      } else {
        setIsShaking(true)
        setError('Kode salah, coba lagi 💔')
        setTimeout(() => {
          setIsShaking(false)
          setPasscode(['', '', '', '', '', ''])
        }, 1000)
      }
    }
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
            {['🌸', '🌹', '🌷', '💐', '🌺'][i % 5]}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center z-10 w-full max-w-2xl"
      >
        {/* Flower decoration */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-6xl mb-4"
        >
          🌸
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 mb-2 font-serif">
          For You
        </h1>
        
        <p className="text-pink-200 mb-8 text-lg">
          Enter your special date
        </p>

        {/* Passcode inputs */}
        <motion.div
          animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="flex gap-2 md:gap-3 justify-center mb-6"
        >
          {passcode.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-11 h-14 md:w-14 md:h-16 text-center text-2xl md:text-3xl font-bold bg-white/10 border-2 border-white/30 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-pink-400 focus:bg-white/20 transition-all"
            />
          ))}
        </motion.div>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-300 text-sm mb-4"
          >
            {error}
          </motion.p>
        )}

        <p className="text-pink-200/60 text-xs md:text-sm">
          Format: DDMMYY (contoh: 110707)
        </p>
      </motion.div>
    </div>
  )
}

export default PasscodeInput
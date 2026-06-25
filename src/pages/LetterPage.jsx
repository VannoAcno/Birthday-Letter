import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Volume2, VolumeX, Heart, Sparkles } from "lucide-react"
import confetti from 'canvas-confetti'

function LetterPage() {
  const navigate = useNavigate()
  const [currentText, setCurrentText] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [showGallery, setShowGallery] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const audioRef = useRef(null)
  const indexRef = useRef(0)
  const timerRef = useRef(null)

  const letterText = `Selamat ulang tahun, bebekk... 🎂

Hari ini adalah hari spesial, hari di mana seseorang yang sangat berarti lahir ke dunia. Dan aku bersyukur pernah menjadi bagian dari hidupmu.

Aku masih ingat kenangan-kenangan indah kita. Tertawa bersama, berbagi cerita, dan momen-momen yang tak akan pernah terlupakan.

Meski kini kita sudah tidak bersama, aku tetap mendoakan yang terbaik untukmu. Semoga kamu selalu bahagia, sehat, dan sukses dalam segala hal.

Terima kasih sudah pernah ada. Terima kasih untuk semua kenangan indahnya.

Selamat merayakan hidup. You deserve all the happiness in the world. ❤️

- Dari aku, Vano -`

  // 🎊 Confetti
  useEffect(() => {
    const timer = setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FF69B4', '#FF1493', '#C084FC', '#FF6B6B'],
        disableForReducedMotion: true
      })
      setShowContent(true)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // Typewriter effect
  useEffect(() => {
    const speed = 10
    
    const typeWriter = () => {
      if (indexRef.current < letterText.length) {
        setCurrentText(letterText.substring(0, indexRef.current + 1))
        indexRef.current++
        timerRef.current = setTimeout(typeWriter, speed)
      } else {
        setTimeout(() => setShowGallery(true), 1500)
      }
    }

    timerRef.current = setTimeout(typeWriter, 1500)
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [letterText])

  // 🎵 AUTOPLAY MUSIK - Dengan multiple attempts
  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = 0.5 // Set volume 50%
          await audioRef.current.play()
          setIsPlaying(true)
          console.log('✅ Musik berhasil diputar otomatis!')
        } catch (err) {
          console.log('❌ Autoplay diblokir browser, mencoba lagi...', err)
          
          // Coba lagi setelah delay singkat
          setTimeout(async () => {
            try {
              await audioRef.current.play()
              setIsPlaying(true)
              console.log('✅ Musik berhasil diputar di attempt kedua!')
            } catch (err2) {
              console.log('❌ Autoplay tetap diblokir. User perlu klik tombol musik.')
            }
          }, 100)
        }
      }
    }

    // Delay sedikit untuk memastikan audio element ready
    const timer = setTimeout(() => {
      playAudio()
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true)
            console.log('✅ Musik diputar manual')
          })
          .catch(err => console.log('Error:', err))
      }
    }
  }

  // 📸 Foto untuk HEADER (Polaroid kiri & kanan di atas)
  const headerPhotos = [
    { src: '/photos/photo5.webp', caption: '' },  // Kiri atas
    { src: '/photos/photo4.webp', caption: '' },  // Kiri bawah
    { src: '/photos/photo4.webp', caption: '' },  // Kanan atas
    { src: '/photos/photo4.webp', caption: '' },  // Kanan bawah
  ]

  // 📸 Foto untuk GALLERY (di bawah)
  const galleryPhotos = [
    { src: '/photos/photo1.webp', caption: '' },
    { src: '/photos/photo2.webp', caption: '' },
    { src: '/photos/photo3.webp', caption: '' },
    { src: '/photos/photo6.webp', caption: '' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 p-4 md:p-8 relative overflow-hidden">
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

      {/* Floating Hearts */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
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
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear"
            }}
          >
            {['💖', '💕', '💗', '💝'][i % 4]}
          </motion.div>
        ))}
      </div>

      {/* Audio Player */}
      <audio ref={audioRef} loop src="/music/song.mp3" preload="auto" />

      {/* Music Toggle */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 hover:scale-110 transition-transform shadow-lg shadow-purple-500/30"
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6 text-pink-400" />
        ) : (
          <VolumeX className="w-6 h-6 text-gray-300" />
        )}
      </motion.button>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
      >
        <Button
          onClick={() => navigate('/')}
          className="fixed top-4 left-4 z-50 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white"
        >
          ← Kembali
        </Button>
      </motion.div>

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        {/* 📸 HEADER DENGAN POLAROID DI KIRI & KANAN */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative min-h-[400px] md:min-h-[500px] pt-8"
            >
              {/* Polaroid di KIRI ATAS */}
              <div className="absolute left-0 md:left-0 top-10 md:top-0 w-32 md:w-40 z-20">
                <motion.div
                  initial={{ opacity: 0, scale: 0, rotate: -15 }}
                  animate={{ opacity: 1, scale: 1, rotate: -12 }}
                  transition={{ delay: 0.8, type: 'spring', stiffness: 100 }}
                  whileHover={{ scale: 1.1, rotate: -5, zIndex: 50 }}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-2 pb-8 shadow-2xl shadow-purple-500/20"
                >
                  <div className="aspect-square rounded-md overflow-hidden bg-black/30">
                    <img
                      src={headerPhotos[0].src}
                      alt="Kenangan"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x400/1e1b4b/FFD700?text=Header+1'
                      }}
                    />
                  </div>
                  <p className="text-pink-100 text-xs text-center mt-2 italic" style={{ fontFamily: 'Georgia, serif' }}>
                    {headerPhotos[0].caption}
                  </p>
                </motion.div>
              </div>

              {/* Polaroid di KIRI BAWAH */}
              <div className="absolute left-4 md:left-10 top-48 md:top-40 w-28 md:w-36 z-20 hidden md:block">
                <motion.div
                  initial={{ opacity: 0, scale: 0, rotate: 10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 8 }}
                  transition={{ delay: 1, type: 'spring', stiffness: 100 }}
                  whileHover={{ scale: 1.1, rotate: 0, zIndex: 50 }}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-2 pb-8 shadow-2xl shadow-purple-500/20"
                >
                  <div className="aspect-square rounded-md overflow-hidden bg-black/30">
                    <img
                      src={headerPhotos[1].src}
                      alt="Kenangan"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x400/1e1b4b/FFD700?text=Header+2'
                      }}
                    />
                  </div>
                  <p className="text-pink-100 text-xs text-center mt-2 italic" style={{ fontFamily: 'Georgia, serif' }}>
                    {headerPhotos[1].caption}
                  </p>
                </motion.div>
              </div>

              {/* Teks Happy Birthday di TENGAH */}
              <motion.div
                initial={{ opacity: 0, y: -50, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.5 }}
                className="text-center space-y-4 relative z-10 px-20 md:px-40"
              >
                <motion.div
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.7 }}
                  className="inline-block"
                >
                  <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
                </motion.div>
                
                <motion.h1 
                  className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-400 bg-clip-text text-transparent"
                  animate={{
                    filter: ['drop-shadow(0 0 20px rgba(236, 72, 153, 0.5))', 'drop-shadow(0 0 40px rgba(168, 85, 247, 0.8))', 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.5))']
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Happy Birthday!
                </motion.h1>
                
                <motion.h2 
                  className="text-3xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  Bebekk
                </motion.h2>
                
                <div className="flex justify-center items-center gap-3 text-pink-300">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Heart className="w-5 h-5 md:w-6 md:h-6 fill-pink-500 text-pink-500" />
                  </motion.div>
                  <span className="text-sm md:text-lg font-medium tracking-wider">With Love</span>
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], rotate: [0, -15, 15, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  >
                    <Heart className="w-5 h-5 md:w-6 md:h-6 fill-pink-500 text-pink-500" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Polaroid di KANAN ATAS */}
              <div className="absolute right-0 md:right-0 top-20 md:top-10 w-32 md:w-40 z-20">
                <motion.div
                  initial={{ opacity: 0, scale: 0, rotate: 15 }}
                  animate={{ opacity: 1, scale: 1, rotate: 12 }}
                  transition={{ delay: 0.9, type: 'spring', stiffness: 100 }}
                  whileHover={{ scale: 1.1, rotate: 5, zIndex: 50 }}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-2 pb-8 shadow-2xl shadow-purple-500/20"
                >
                  <div className="aspect-square rounded-md overflow-hidden bg-black/30">
                    <img
                      src={headerPhotos[2].src}
                      alt="Kenangan"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x400/1e1b4b/FFD700?text=Header+3'
                      }}
                    />
                  </div>
                  <p className="text-pink-100 text-xs text-center mt-2 italic" style={{ fontFamily: 'Georgia, serif' }}>
                    {headerPhotos[2].caption}
                  </p>
                </motion.div>
              </div>

              {/* Polaroid di KANAN BAWAH */}
              <div className="absolute right-4 md:right-10 top-56 md:top-48 w-28 md:w-36 z-20 hidden md:block">
                <motion.div
                  initial={{ opacity: 0, scale: 0, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: -8 }}
                  transition={{ delay: 1.1, type: 'spring', stiffness: 100 }}
                  whileHover={{ scale: 1.1, rotate: 0, zIndex: 50 }}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-2 pb-8 shadow-2xl shadow-purple-500/20"
                >
                  <div className="aspect-square rounded-md overflow-hidden bg-black/30">
                    <img
                      src={headerPhotos[3].src}
                      alt="Kenangan"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x400/1e1b4b/FFD700?text=Header+4'
                      }}
                    />
                  </div>
                  <p className="text-pink-100 text-xs text-center mt-2 italic" style={{ fontFamily: 'Georgia, serif' }}>
                    {headerPhotos[3].caption}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Letter Card */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <Card className="shadow-2xl border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl">
                <CardContent className="pt-10 pb-10 px-6 md:px-12">
                  <div className="max-w-none">
                    <p 
                      className="whitespace-pre-line text-gray-200 leading-relaxed text-lg md:text-xl font-light" 
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      {currentText}
                      <motion.span 
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="text-pink-400"
                      >
                        |
                      </motion.span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gallery Section */}
        <AnimatePresence>
          {showGallery && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="pt-8 pb-8"
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 mb-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                More Memories 📸
              </motion.h2>

              <div className="relative min-h-[600px] md:min-h-[700px] w-full max-w-5xl mx-auto">
                {galleryPhotos.map((photo, index) => {
                  const positions = [
                    { top: '0%', left: '5%', rotate: -8 },
                    { top: '5%', left: '55%', rotate: 6 },
                    { top: '45%', left: '15%', rotate: 4 },
                    { top: '50%', left: '60%', rotate: -7 },
                  ]

                  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0, rotate: 0 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1, 
                        rotate: positions[index].rotate 
                      }}
                      transition={{ 
                        delay: 0.5 + index * 0.2,
                        type: 'spring',
                        stiffness: 100
                      }}
                      whileHover={{ 
                        scale: 1.15, 
                        rotate: 0, 
                        zIndex: 50,
                        transition: { duration: 0.3 }
                      }}
                      className={`${
                        isMobile 
                          ? 'relative w-[45%] inline-block m-2' 
                          : 'absolute w-56 md:w-64'
                      }`}
                      style={
                        isMobile 
                          ? {} 
                          : {
                              top: positions[index].top,
                              left: positions[index].left,
                            }
                      }
                    >
                      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-3 pb-12 shadow-2xl shadow-purple-500/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
                        
                        <div className="aspect-square rounded-md overflow-hidden bg-black/30 relative">
                          <img
                            src={photo.src}
                            alt={photo.caption}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/400x400/1e1b4b/FFD700?text=Foto+' + (index + 1)
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>

                        <div className="absolute bottom-2 left-0 right-0 text-center">
                          <p className="text-pink-100 text-sm md:text-base font-light italic px-2" style={{ fontFamily: 'Georgia, serif' }}>
                            {photo.caption}
                          </p>
                        </div>

                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-gradient-to-r from-pink-400/40 to-purple-400/40 backdrop-blur-sm border border-white/20 rounded-sm" />
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <motion.p 
                className="text-center text-pink-200/80 mt-16 italic text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                The Prettiest Girl in The World 💕
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="text-center pb-8"
        >
          <p className="text-gray-400 text-sm">
            Made with <Heart className="w-4 h-4 inline fill-pink-500 text-pink-500" /> for your special day
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default LetterPage
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PasscodeInput from '../components/PasscodeInput'
import GiftAnimation from '../components/GiftAnimation'
import CountdownPage from '../components/CountdownPage'

function LandingPage() {
  const navigate = useNavigate()
  const [stage, setStage] = useState('countdown') // countdown → input → gift → done

  // Setelah gift animation selesai, redirect ke /letter
  useEffect(() => {
    if (stage === 'done') {
      navigate('/letter')
    }
  }, [stage, navigate])

  return (
    <>
      {stage === 'countdown' && (
        <CountdownPage 
          onComplete={() => setStage('input')}
        />
      )}
      
      {stage === 'input' && (
        <PasscodeInput 
          onComplete={() => setStage('gift')}
        />
      )}
      
      {stage === 'gift' && (
        <GiftAnimation 
          onComplete={() => setStage('done')}
        />
      )}
    </>
  )
}

export default LandingPage
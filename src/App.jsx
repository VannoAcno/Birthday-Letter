import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import PasscodeInput from './pages/PasscodeInput'
import GiftAnimation from './pages/GiftAnimation'
import LetterPage from './pages/LetterPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/passcode" element={<PasscodeInput />} />
        <Route path="/gift" element={<GiftAnimation />} />
        <Route path="/letter" element={<LetterPage />} />
      </Routes>
    </BrowserRouter>
  )
}
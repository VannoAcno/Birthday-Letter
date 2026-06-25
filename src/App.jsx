import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LetterPage from './pages/LetterPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/letter" element={<LetterPage />} />
      </Routes>
    </BrowserRouter>
  )
}

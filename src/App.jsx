import { useState, useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Qualifications from './pages/Qualifications'
import Books from './pages/Books'
import ProjectDetail from './pages/ProjectDetail'

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')

  useEffect(() => {
    document.documentElement.dataset.theme = theme === 'light' ? 'light' : ''
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <HashRouter>
      <Navbar theme={theme} onToggle={toggleTheme} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/qualifications" element={<Qualifications />} />
          <Route path="/books" element={<Books />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  )
}

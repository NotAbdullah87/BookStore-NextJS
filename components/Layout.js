// components/Layout.js
import { useState, useEffect } from 'react'
import Navbar from './Navbar'

export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDarkMode)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
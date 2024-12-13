// components/Navbar.js
import Link from 'next/link'
import DarkModeToggle from './DarkModeToggle'
import { useAuth } from '@/pages/context/AuthContext'

export default function Navbar({ darkMode, toggleDarkMode }) {

  const {token} = useAuth();
 const {logout} = useAuth();
  const handleLogout = () => {
    logout();
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link legacyBehavior href="/">
          <a className="text-xl font-bold text-gray-800 dark:text-white">Book Store</a>
        </Link>
        <div className="flex items-center">
        <Link legacyBehavior href="/"><a className="mx-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">Home</a></Link>
          <Link legacyBehavior href="/books"><a className="mx-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">Books</a></Link>
          <Link legacyBehavior href="/genres"><a className="mx-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">Genres</a></Link>
          <Link legacyBehavior href="/authors"><a className="mx-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">Authors</a></Link>
          <Link legacyBehavior href="/search"><a className="mx-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">Search</a></Link>
          <Link legacyBehavior href="/info"><a className="mx-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">Info</a></Link>
          { token && <button onClick={handleLogout}> <a className="mx-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">Logout</a></button>}
         {!token && <Link legacyBehavior href="/"><a className="mx-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">Login</a></Link> }
       
          <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
      </div>
    </nav>
  )
}
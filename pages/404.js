// pages/404.js
import Link from 'next/link'
import Layout from '../components/Layout'

export default function Custom404() {
  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Oops! The page you're looking for doesn't exist.</p>
        <Link href="/">
          <a className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
            Go back home
          </a>
        </Link>
      </div>
    </Layout>
  )
}
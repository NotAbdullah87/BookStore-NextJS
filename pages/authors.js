// pages/authors.js
import { useState } from 'react'
import useSWR from 'swr'
import Layout from '../components/Layout'
import AuthorCard from '../components/AuthorCard'

const fetcher = url => fetch(url).then(res => res.json())

export default function Authors() {
  const { data, error } = useSWR('/api/authors', fetcher)
  const [searchTerm, setSearchTerm] = useState('')

  if (error) return <div>Failed to load authors</div>
  if (!data) return <div>Loading...</div>

  const filteredAuthors = data.filter(author =>
    author.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Layout>
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Authors</h1>
      <input
        type="text"
        placeholder="Search authors..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2 mb-6 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAuthors.map(author => (
          <AuthorCard key={author.id} author={author} />
        ))}
      </div>
    </Layout>
  )
}

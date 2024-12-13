import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import BookCard from '../components/BookCard'
import data from '../data.json'

export default function Search({ books }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchHistory, setSearchHistory] = useState([])
  const [filteredBooks, setFilteredBooks] = useState(books)

  useEffect(() => {
    const storedHistory = localStorage.getItem('searchHistory')
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory))
    }
  }, [])

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      const results = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredBooks(results)

      // Save search term to history if it doesn't already exist
      if (!searchHistory.includes(searchTerm)) {
        const newHistory = [searchTerm, ...searchHistory].slice(0, 5)
        setSearchHistory(newHistory)
        localStorage.setItem('searchHistory', JSON.stringify(newHistory))
      }
    } else {
      // Reset to show all books if search term is empty
      setFilteredBooks(books)
    }
  }

  const handleHistorySearch = (term) => {
    setSearchTerm(term)
    const results = books.filter(book =>
      book.title.toLowerCase().includes(term.toLowerCase()) ||
      book.description.toLowerCase().includes(term.toLowerCase())
    )
    setFilteredBooks(results)
  }

  return (
    <Layout>
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Search Books</h1>
      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          onClick={handleSearchSubmit}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
        >
          Search
        </button>
      </div>
      {searchHistory.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Recent Searches</h2>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((term, index) => (
              <button
                key={index}
                onClick={() => handleHistorySearch(term)}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredBooks.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      books: data.books,
    },
    revalidate: 60,
  }
}

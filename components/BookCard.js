// components/BookCard.js
import Link from 'next/link'
import "../styles/globals.css"
export default function BookCard({ book }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{book.title}</h2>
      {/* <p className="text-gray-600 dark:text-gray-300 mb-4">{book.description.substring(0, 100)}...</p> */}
      <div className="flex justify-between items-center">
        <div>
        <span className="text-indigo-600 dark:text-indigo-400 font-medium">${book.price}</span>
        <span className='text-yellow-600 ml-5 dark:text-indigo-400 font-medium'>⭐ {book.rating}</span>
        </div>
        <Link legacyBehavior href={`/books/${book.id}`}>
          <a className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors duration-300">View Book</a>
        </Link>
    
      </div>
    </div>
  )
}

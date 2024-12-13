// components/GenreCard.js
import Link from 'next/link'

export default function GenreCard({ genre }) {
  return (
    <Link legacyBehavior href={`/books?genre=${genre.id}`}>
      <a className="block bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{genre.name}</h2>
      </a>
    </Link>
  )
}
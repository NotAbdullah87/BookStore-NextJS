// components/AuthorCard.js
export default function AuthorCard({ author }) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{author.name}</h2>
        <p className="text-gray-600 dark:text-gray-300">{author.biography}</p>
      </div>
    )
  }
  
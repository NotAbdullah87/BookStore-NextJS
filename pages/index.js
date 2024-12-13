// pages/index.js
import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import BookCard from '../components/BookCard'
import data from '../Data.json'
import "../styles/globals.css"
import { useAuth } from './context/AuthContext'
import LoginForm from './components/LoginForm'

export default function Home({ books }) {
  const router = useRouter()
  const [featuredBooks] = useState(books)
  const {token} = useAuth();
  const {name} = useAuth();

  return (
    <Layout>
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Welcome to Book Store <span className='italic text-gray-500 font-medium'>{name}</span></h1>
      {token && <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {featuredBooks.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      <button
        onClick={() => router.push('/genres')}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
      >
        View Genres
      </button>
      </>
      }

      {!token && <LoginForm />}
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      books: data.books,
    },
    revalidate: 60, // Revalidate every 60 seconds
  }
}
// pages/books/index.js

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import BookCard from '../../components/BookCard';

export default function Books({ books, genres }) {
  const router = useRouter();
  const { genre: genreId } = router.query;
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [currentGenre, setCurrentGenre] = useState('');

  useEffect(() => {
 
    if (genreId) {
      setFilteredBooks(books.filter(book => book.genreId.toString() === genreId.toString()));
      setCurrentGenre(genreId);
    } else {
      setFilteredBooks(books);
      setCurrentGenre('');
    }
  }, [genreId, books]);

  const handleGenreChange = (e) => {
    const selectedGenre = e.target.value;
    if (selectedGenre) {
      router.push(`/books?genre=${selectedGenre}`);
    } else {
      router.push('/books');
    }
  };

  return (
    <Layout>
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Books</h1>
      <div className="mb-8">
        <label htmlFor="genre-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Filter by Genre:
        </label>
        <select
          id="genre-filter"
          value={currentGenre}
          onChange={handleGenreChange}
          className="block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>
      {filteredBooks.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No books found for this genre.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps() {
  const booksRes = await fetch(`http://localhost:3000/api/books`);
  const books = await booksRes.json();

  // console.log(books.books)

  const genresRes = await fetch(`http://localhost:3000/api/genres`);
  const genres = await genresRes.json();
  return {
    props: {
      books: books.books,
      genres: genres.genres,
    },
  };
}

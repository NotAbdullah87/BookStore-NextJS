// pages/search.js

import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import BookCard from '../components/BookCard';
import { useAuth } from './context/AuthContext';

export default function Search({ books }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState(books);
  const { token, userId } = useAuth(); // Assuming userId is part of the auth context

  useEffect(() => {
    const fetchSearchHistory = async () => {
      const response = await fetch(`/api/search-history?userId=${userId}`);
      const data = await response.json();
      if (response.ok) {
        setSearchHistory(data.searchHistory.map(item => item.searchTerm));
      }
    };

    console.log(userId);

    if (userId) {
      fetchSearchHistory();
    }
  }, [userId]);

  const handleSearchSubmit = async () => {
    if (searchTerm.trim()) {
      const results = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(results);

      // Save search term to history if it doesn't already exist
      if (!searchHistory.includes(searchTerm)) {
        const newHistory = [searchTerm, ...searchHistory].slice(0, 5);
        setSearchHistory(newHistory);

        await fetch('/api/search-history', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, searchTerm }),
        });
      }
    } else {
      // Reset to show all books if search term is empty
      setFilteredBooks(books);
    }
  };

  const handleHistorySearch = (term) => {
    setSearchTerm(term);
    const results = books.filter(book =>
      book.title.toLowerCase().includes(term.toLowerCase()) ||
      book.description.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredBooks(results);
  };

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
  );
}

export async function getStaticProps() {
  const booksRes = await fetch(`http://localhost:3000/api/books`);
  const books = await booksRes.json();

  return {
    props: {
      books: books.books,
    },
    revalidate: 60,
  };
}

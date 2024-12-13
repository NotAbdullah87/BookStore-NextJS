import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';


export default function BookDetails({ book }) {
  const router = useRouter();

  const {token} = useAuth();

  if (router.isFallback) {
    return <p className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-6">Loading...</p>;
  }

  useEffect(()=>{

    if(!token){
      router.push('/login')
    }
  },[router,token])

  return (
    <Layout>
      {book ? (
        <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{book.title}</h1>
          <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">Author: {book.authorId}</p>
          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">{book.description}</p>
          <Link href={`/books/${book.id}/${book.authorId}`}>
            <button className="mt-6 px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition duration-200">
              View Author Details
            </button>
          </Link>
        </div>
      ) : (
        <p className="text-center text-gray-500">Book not found</p>
      )}
    </Layout>
  );
}

export async function getStaticPaths() {

  const booksRes = await fetch(`http://localhost:3000/api/books`);
  const books = await booksRes.json();


  const paths = books.books.map((book) => ({
    params: { id: book.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}


export async function getStaticProps({ params }) {
 
  const booksRes = await fetch(`http://localhost:3000/api/books`);
  const books = await booksRes.json();



  const book = books.books.find((i) => i.id.toString() === params.id.toString()) || null;

  return {
    props: { book },
    revalidate: 10,
  };
}


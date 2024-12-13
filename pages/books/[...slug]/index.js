import Layout from '@/components/Layout';
import { useAuth } from '@/pages/context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';


const fetcher = async (url) => {
  const res = await fetch(url);
  // console.log("Response status:", res.status);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const json = await res.json();
  // console.log("Fetched data:", json.authors);
  return json.authors;
};


const BookDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const {token} = useAuth();

  useEffect(() => {
    // Redirect to login if the user is not authenticated
    console.log("HERE")
   
    if (!token) {
      router.replace('/login');
    }
  }, [router, token]);

  const { data, error } = useSWR(token ? 'http://localhost:3000/api/authors' : null, fetcher);

  // Show a loading state until the token is verified
  if (!token) {
    return null; // Render nothing while redirecting
  }

  if (!data && !error) return <p>Loading...</p>;
  if (error) return <p>Failed to load data.</p>;

  if (!slug) return <p>Loading...</p>;

  const lastSegment = slug[slug.length - 1];
  const author = data?.find((i) => i.id.toString() === lastSegment.toString());
  
  if (!author) {
    return <div>Author Not Found</div>;
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <p className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Author: {author.name}</p>
        <p className="text-gray-700 dark:text-gray-300 font-medium text-lg mb-4">
          <span className="text-indigo-700 dark:text-indigo-400">Biography:</span>
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
          {author.biography}
        </p>
      </div>
    </Layout>
  );
};

export default BookDetail;

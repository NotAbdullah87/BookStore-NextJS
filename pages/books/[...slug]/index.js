import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const BookDetail = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data, error } = useSWR('/api/authors', fetcher);

  if (!data && !error) return <p>Loading...</p>;
  if (error) return <p>Failed to load data.</p>;

  if (!slug) return <p>Loading...</p>;

  const lastSegment = slug[slug.length - 1];
  const author = data?.find((i) => i.id === lastSegment);

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

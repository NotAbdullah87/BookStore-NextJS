// pages/genres.js
import Layout from '../components/Layout'
import GenreCard from '../components/GenreCard'
import data from '../data.json'

export default function Genres({ genres }) {
  return (
    <Layout>
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Book Genres</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {genres.map(genre => (
          <GenreCard key={genre.id} genre={genre} />
        ))}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      genres: data.genres,
    },
    revalidate: 60,
  }
}
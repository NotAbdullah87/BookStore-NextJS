// pages/info/[...slug].js
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'


const infoPages = {
  faqs: {
    title: "Frequently Asked Questions",
    content: "Here are some frequently asked questions about our book store...",
  },
  support: {
    title: "Customer Support",
    content: "Need help? Contact our customer support team...",
  },
}

export default function InfoPage() {
  const router = useRouter()
  const { slug } = router.query

  const pageKey = slug ? slug[0] : ''
  const page = infoPages[pageKey]

  if (!page) {
    return (
      <Layout>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Information</h1>
        <p className="text-gray-600 dark:text-gray-300">Select a topic:</p>
        <ul className="list-disc list-inside mt-4">
          {Object.keys(infoPages).map(key => (
            <li key={key} className="mb-2">
              <a href={`/info/${key}`} className="text-indigo-600 dark:text-indigo-400 hover:underline">
                {infoPages[key].title}
              </a>
            </li>
          ))}
        </ul>
      </Layout>
    )
  }

  return (
    <Layout>
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">{page.title}</h1>
      <div className="prose dark:prose-invert">
        <p>{page.content}</p>
      </div>
    </Layout>
  )
}
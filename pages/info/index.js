import Layout from "@/components/Layout";
import Link from "next/link";

export default function Info() {
  return (
    <Layout>
      <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-4">
       

        <div className="space-y-4">
          <Link href="/info/faqs">
            <button className="w-full mb-5 px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition duration-200">
              FAQ
            </button>
          </Link>

          <Link href="/info/support">
            <button className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-200">
            Support
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

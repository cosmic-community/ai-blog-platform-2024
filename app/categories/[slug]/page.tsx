// app/categories/[slug]/page.tsx
import { getCategoryBySlug, getPostsByCategory, getCategories } from '@/lib/cosmic'
import { Post, Category } from '@/types'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

export async function generateStaticParams() {
  const categories = await getCategories() as Category[]
  
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug) as Category | null
  
  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          Return to Home
        </Link>
      </div>
    )
  }
  
  const posts = await getPostsByCategory(category.id) as Post[]
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
        >
          ← Back to all posts
        </Link>
        <h1 className="text-5xl font-bold mb-4">{category.title}</h1>
        {category.metadata?.description && (
          <p className="text-xl text-gray-600">{category.metadata.description}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No posts in this category yet.</p>
        </div>
      )}
    </div>
  )
}
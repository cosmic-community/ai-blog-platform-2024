import { getPosts, getCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import CategoryFilter from '@/components/CategoryFilter'
import { Post, Category } from '@/types'

export default async function HomePage() {
  const posts = await getPosts() as Post[]
  const categories = await getCategories() as Category[]
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to AI Blog Platform</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover insights on technology, travel, lifestyle, and more from our expert writers.
        </p>
      </div>
      
      <CategoryFilter categories={categories} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No posts available yet.</p>
        </div>
      )}
    </div>
  )
}
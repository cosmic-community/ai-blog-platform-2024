import Link from 'next/link'
import { Post } from '@/types'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const featuredImage = post.metadata?.featured_image
  const categories = post.metadata?.categories || []
  const author = post.metadata?.author
  
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      {featuredImage && (
        <Link href={`/posts/${post.slug}`}>
          <img
            src={`${featuredImage.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
            width={400}
            height={200}
          />
        </Link>
      )}
      
      <div className="p-6">
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
              >
                {category.title}
              </Link>
            ))}
          </div>
        )}
        
        <Link href={`/posts/${post.slug}`}>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 hover:text-blue-600 transition-colors">
            {post.title}
          </h2>
        </Link>
        
        {author && (
          <Link
            href={`/authors/${author.slug}`}
            className="text-sm text-gray-600 hover:text-gray-900 font-medium"
          >
            By {author.title}
          </Link>
        )}
      </div>
    </article>
  )
}
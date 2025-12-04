// app/posts/[slug]/page.tsx
import { getPostBySlug, getPosts } from '@/lib/cosmic'
import { Post } from '@/types'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import AuthorInfo from '@/components/AuthorInfo'

export async function generateStaticParams() {
  const posts = await getPosts() as Post[]
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug) as Post | null
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          Return to Home
        </Link>
      </div>
    )
  }
  
  const featuredImage = post.metadata?.featured_image
  const content = post.metadata?.content || ''
  const categories = post.metadata?.categories || []
  
  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      {featuredImage && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <img
            src={`${featuredImage.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-auto"
            width={1200}
            height={600}
          />
        </div>
      )}
      
      <div className="mb-6">
        <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
        
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                {category.title}
              </Link>
            ))}
          </div>
        )}
        
        {post.metadata?.author && (
          <AuthorInfo author={post.metadata.author} />
        )}
      </div>
      
      <div className="prose prose-lg">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
      
      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to all posts
        </Link>
      </div>
    </article>
  )
}
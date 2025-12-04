// app/authors/[slug]/page.tsx
import { getAuthorBySlug, getPostsByAuthor, getPosts } from '@/lib/cosmic'
import { Author, Post } from '@/types'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

export async function generateStaticParams() {
  const posts = await getPosts() as Post[]
  const authorSlugs = new Set<string>()
  
  posts.forEach(post => {
    if (post.metadata?.author?.slug) {
      authorSlugs.add(post.metadata.author.slug)
    }
  })
  
  return Array.from(authorSlugs).map((slug) => ({
    slug,
  }))
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug) as Author | null
  
  if (!author) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Author Not Found</h1>
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          Return to Home
        </Link>
      </div>
    )
  }
  
  const posts = await getPostsByAuthor(author.id) as Post[]
  const photo = author.metadata?.photo
  const bio = author.metadata?.bio
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
        >
          ← Back to all posts
        </Link>
        
        <div className="flex items-start gap-6 mb-8">
          {photo && (
            <img
              src={`${photo.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
              alt={author.title}
              className="w-32 h-32 rounded-full object-cover"
              width={200}
              height={200}
            />
          )}
          <div className="flex-1">
            <h1 className="text-5xl font-bold mb-4">{author.title}</h1>
            {bio && (
              <p className="text-xl text-gray-600">{bio}</p>
            )}
          </div>
        </div>
        
        <h2 className="text-3xl font-bold mb-6">Articles by {author.title}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No posts by this author yet.</p>
        </div>
      )}
    </div>
  )
}
import Link from 'next/link'
import { Author } from '@/types'

interface AuthorInfoProps {
  author: Author
}

export default function AuthorInfo({ author }: AuthorInfoProps) {
  const photo = author.metadata?.photo
  const bio = author.metadata?.bio
  
  return (
    <Link
      href={`/authors/${author.slug}`}
      className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
    >
      {photo && (
        <img
          src={`${photo.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
          alt={author.title}
          className="w-12 h-12 rounded-full object-cover"
          width={60}
          height={60}
        />
      )}
      <div>
        <p className="font-semibold text-gray-900">{author.title}</p>
        {bio && (
          <p className="text-sm text-gray-600 line-clamp-2">{bio}</p>
        )}
      </div>
    </Link>
  )
}
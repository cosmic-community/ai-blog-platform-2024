import Link from 'next/link'
import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  if (!categories || categories.length === 0) {
    return null
  }
  
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Browse by Category</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:border-gray-400 hover:shadow-sm transition-all"
          >
            <span className="font-medium">{category.title}</span>
            {category.metadata?.description && (
              <span className="ml-2 text-sm text-gray-500">
                • {category.metadata.description}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
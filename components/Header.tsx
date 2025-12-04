import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
            AI Blog Platform
          </Link>
          
          <nav>
            <ul className="flex items-center gap-8">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                  Home
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
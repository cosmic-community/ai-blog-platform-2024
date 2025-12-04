# AI Blog Platform 2024

![App Preview](https://imgix.cosmicjs.com/42b86d80-d0e0-11f0-b20e-1d251587b0cd-photo-1677442136019-21780ecad995-1764832205726.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, full-featured blog platform built with Next.js 16 and powered by Cosmic CMS. This application provides a clean, intuitive interface for browsing blog posts, exploring categories, and discovering authors.

## Features

- 📝 **Dynamic Blog Posts** - Automatically fetch and display blog posts from Cosmic
- 👥 **Author Profiles** - Dedicated pages for each author with their bio and articles
- 🏷️ **Category Filtering** - Browse posts by category with intuitive navigation
- 📱 **Responsive Design** - Mobile-first design that works beautifully on all devices
- ⚡ **Server-Side Rendering** - Fast page loads with Next.js 16 App Router
- 🖼️ **Image Optimization** - Automatic image optimization using imgix
- 🎨 **Modern UI** - Clean, minimalist design with smooth interactions
- 📖 **Markdown Support** - Rich content formatting with markdown rendering

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=693133753584465d0a2f6d2d&clone_repository=693135b83584465d0a2f6d58)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a blog with posts, authors, and categories"

### Code Generation Prompt

> "Build a Next.js website that uses my existing objects in this bucket. Create repository name 'ai-blog-platform-2024'"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **CMS**: Cosmic
- **Styling**: Tailwind CSS
- **Package Manager**: Bun
- **Image Optimization**: imgix
- **Markdown**: react-markdown

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with a bucket containing Posts, Authors, and Categories

### Installation

1. Clone this repository
2. Install dependencies:
```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching Posts with Related Data

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch posts with author and category relationships
const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1) // Include related objects

// Access nested data
posts.forEach(post => {
  console.log(post.title)
  console.log(post.metadata.author?.title)
  console.log(post.metadata.categories?.map(c => c.title))
})
```

### Filtering by Category

```typescript
// Get posts in a specific category
const { objects: posts } = await cosmic.objects
  .find({ 
    type: 'posts',
    'metadata.categories': categoryId // Filter by category ID
  })
  .depth(1)
```

### Fetching a Single Post

```typescript
const { object: post } = await cosmic.objects
  .findOne({
    type: 'posts',
    slug: 'post-slug'
  })
  .depth(1) // Include author and categories
```

## Cosmic CMS Integration

This application uses three object types from your Cosmic bucket:

### Posts
- **Title**: Main post title
- **Content**: Markdown content for the post body
- **Featured Image**: Hero image for the post
- **Author**: Connected to Authors object type
- **Categories**: Connected to Categories object type (multiple)

### Authors
- **Name**: Author's full name
- **Bio**: Author biography
- **Photo**: Author profile picture

### Categories
- **Name**: Category name
- **Description**: Category description

All relationships are handled automatically using the Cosmic SDK's `depth` parameter, which fetches connected objects in a single query.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Add environment variables in Netlify dashboard
4. Set build command: `bun run build`
5. Set publish directory: `.next`
6. Deploy!

## Project Structure

```
├── app/
│   ├── page.tsx              # Home page with post grid
│   ├── posts/
│   │   └── [slug]/
│   │       └── page.tsx      # Individual post pages
│   ├── authors/
│   │   └── [slug]/
│   │       └── page.tsx      # Author profile pages
│   ├── categories/
│   │   └── [slug]/
│   │       └── page.tsx      # Category listing pages
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── Header.tsx            # Site header with navigation
│   ├── PostCard.tsx          # Post preview card
│   ├── CategoryFilter.tsx    # Category navigation
│   ├── AuthorInfo.tsx        # Author display component
│   └── CosmicBadge.tsx       # Cosmic branding badge
├── lib/
│   └── cosmic.ts             # Cosmic SDK configuration
└── types.ts                  # TypeScript type definitions
```

## License

MIT

<!-- README_END -->
// ============================================
// DRAVE — TypeScript Type Definitions
// ============================================

export interface Product {
  id: number
  slug: string
  name: string
  category: string
  price: number
  originalPrice?: number
  description: string
  shortDescription: string
  images: string[]
  colors: ProductColor[]
  sizes: string[]
  rating: number
  reviewCount: number
  isNew: boolean
  isFeatured: boolean
  isBestseller: boolean
  tags: string[]
  details: string[]
  careInstructions: string[]
  material: string
  fit: string
}

export interface ProductColor {
  name: string
  hex: string
}

export interface CartItem {
  id: string
  product: Product
  selectedColor: string
  selectedSize: string
  quantity: number
}

export interface WishlistItem {
  product: Product
  addedAt: Date
}

export interface Collection {
  id: number
  slug: string
  name: string
  tagline: string
  description: string
  image: string
  productCount: number
}

export interface JournalArticle {
  id: number
  slug: string
  title: string
  category: string
  excerpt: string
  image: string
  date: string
  readTime: string
}

export interface SizeChart {
  size: string
  chest: number
  length: number
}

export interface FilterState {
  category: string
  sizes: string[]
  colors: string[]
  priceRange: [number, number]
  sortBy: string
}

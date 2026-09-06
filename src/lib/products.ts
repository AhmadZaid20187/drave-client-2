// ============================================
// DRAVE — Mock Product Data
// Architecture: Replace API calls in getProduct() / getProducts()
// with real MongoDB/API calls without changing component contracts
// ============================================

import type { Product, Collection, JournalArticle } from './types'

// Unsplash curated fashion images
export const PRODUCTS: Product[] = [
  {
    id: 1,
    slug: 'signature-oversize-tee',
    name: 'Signature Oversize Tee',
    category: 'T-Shirts',
    price: 2290,
    description:
      'Crafted from premium 240 GSM cotton. Our Signature Oversize Tee sets the standard for what streetwear should feel like. The structured drop-shoulder silhouette and reinforced stitching ensure this piece lasts for years. Not just a t-shirt — a statement.',
    shortDescription: 'Crafted from premium 240 GSM cotton. Oversized fit. Soft feel. Built to last.',
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80',
    ],
    colors: [
      { name: 'Black', hex: '#0A0A0A' },
      { name: 'Beige', hex: '#C8B89A' },
      { name: 'Off White', hex: '#F4F1EA' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 5,
    reviewCount: 128,
    isNew: true,
    isFeatured: true,
    isBestseller: true,
    tags: ['oversized', 'cotton', 'essentials'],
    material: '100% Premium 240 GSM Combed Cotton',
    fit: 'Oversized',
    details: [
      '240 GSM heavyweight cotton construction',
      'Drop-shoulder oversized silhouette',
      'Ribbed crew neckline with reinforced seams',
      'Screen-printed DRAVE wordmark on back',
      'Double-stitched hem for durability',
      'Pre-washed for soft hand feel',
    ],
    careInstructions: [
      'Machine wash cold, gentle cycle',
      'Wash inside out to preserve print',
      'Do not tumble dry',
      'Iron on low heat, avoid print area',
      'Do not bleach',
    ],
  },
  {
    id: 2,
    slug: 'minimal-hoodie',
    name: 'Minimal Hoodie',
    category: 'Hoodies',
    price: 3190,
    description:
      'The Minimal Hoodie is engineered for those who understand that true luxury is in the details. 320 GSM French terry fabric, a structured hood with flat drawcords, and a kangaroo pocket with hidden seaming. Zero excess. Maximum presence.',
    shortDescription: '320 GSM French terry. Structured fit. Premium in every thread.',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80',
      'https://images.unsplash.com/photo-1578681994506-b8f463449011?w=800&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
    ],
    colors: [
      { name: 'Black', hex: '#0A0A0A' },
      { name: 'Beige', hex: '#C8B89A' },
      { name: 'Slate', hex: '#404040' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 5,
    reviewCount: 94,
    isNew: false,
    isFeatured: true,
    isBestseller: true,
    tags: ['hoodie', 'french terry', 'essentials'],
    material: '320 GSM French Terry Cotton',
    fit: 'Regular',
    details: [
      '320 GSM premium French terry fabric',
      'Structured hood with flat drawcords',
      'Kangaroo pocket with internal seaming',
      'Ribbed cuffs and hem with spandex',
      'Metal YKK zipper pulls',
      'Embroidered DRAVE logo at chest',
    ],
    careInstructions: [
      'Machine wash cold, gentle cycle',
      'Wash inside out',
      'Tumble dry low or hang to dry',
      'Iron on low heat, avoid embroidery',
      'Do not bleach',
    ],
  },
  {
    id: 3,
    slug: 'utility-jacket',
    name: 'Utility Jacket',
    category: 'Jackets',
    price: 4890,
    description:
      'Engineered for the urban environment. The Utility Jacket features a woven shell with DWR water-resistant coating, multiple functional pockets, and a clean minimal silhouette. Technical without trying. Elevated without effort.',
    shortDescription: 'Woven shell with DWR coating. Technical meets minimal.',
    images: [
      'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80',
    ],
    colors: [
      { name: 'Black', hex: '#0A0A0A' },
      { name: 'Olive', hex: '#4A4A35' },
      { name: 'Slate', hex: '#404040' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4,
    reviewCount: 67,
    isNew: true,
    isFeatured: true,
    isBestseller: true,
    tags: ['jacket', 'utility', 'outerwear'],
    material: '100% Woven Polyester Shell with DWR Coating',
    fit: 'Regular',
    details: [
      'DWR water-resistant woven shell',
      '4 exterior cargo pockets with snap closures',
      '2 interior zip pockets',
      'Adjustable hem cinch cord',
      'Removable hood with magnetic closure',
      'Tonal metal hardware throughout',
    ],
    careInstructions: [
      'Machine wash cold',
      'Do not use fabric softener — reduces DWR performance',
      'Tumble dry low to reactivate DWR coating',
      'Do not iron',
      'Do not dry clean',
    ],
  },
  {
    id: 4,
    slug: 'premium-joggers',
    name: 'Premium Joggers',
    category: 'Joggers',
    price: 2490,
    description:
      'The Premium Joggers redefine what comfortable can look like. Cut from heavyweight French terry with a tapered leg and clean ankle ribbing. A refined waistband, minimal branding, and precision stitching make these the only joggers you\'ll ever need.',
    shortDescription: 'Heavyweight French terry. Tapered fit. Refined details.',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80',
    ],
    colors: [
      { name: 'Black', hex: '#0A0A0A' },
      { name: 'Beige', hex: '#C8B89A' },
      { name: 'Slate', hex: '#404040' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 5,
    reviewCount: 112,
    isNew: false,
    isFeatured: true,
    isBestseller: true,
    tags: ['joggers', 'bottoms', 'essentials'],
    material: '300 GSM French Terry Cotton',
    fit: 'Tapered',
    details: [
      '300 GSM heavyweight French terry',
      'Tapered leg with clean ankle ribbing',
      'Refined elastic waistband with drawcord',
      'Side seam pockets and rear welt pocket',
      'Embroidered DRAVE monogram at hip',
      'Pre-washed for immediate softness',
    ],
    careInstructions: [
      'Machine wash cold, gentle cycle',
      'Wash inside out',
      'Tumble dry low or hang to dry',
      'Iron on low heat, avoid embroidery',
      'Do not bleach',
    ],
  },
  {
    id: 5,
    slug: 'structured-cargo-pant',
    name: 'Structured Cargo Pant',
    category: 'Joggers',
    price: 3490,
    description:
      'Military-inspired utility pockets meet modern tailoring. The Structured Cargo Pant is cut from premium twill with a straight leg silhouette, functional cargo pockets, and an adjustable waistband. Where function meets form.',
    shortDescription: 'Premium twill. Straight leg. Military-inspired utility.',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
    ],
    colors: [
      { name: 'Black', hex: '#0A0A0A' },
      { name: 'Olive', hex: '#4A4A35' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4,
    reviewCount: 43,
    isNew: true,
    isFeatured: false,
    isBestseller: false,
    tags: ['cargo', 'bottoms', 'military'],
    material: '100% Premium Cotton Twill',
    fit: 'Straight',
    details: [
      'Premium cotton twill construction',
      'Straight leg silhouette',
      '6 functional pockets including cargo',
      'Adjustable waistband with internal drawcord',
      'YKK zip fly with button closure',
      'Contrast bartack stitching at stress points',
    ],
    careInstructions: [
      'Machine wash cold',
      'Tumble dry low',
      'Iron on medium heat',
      'Do not bleach',
    ],
  },
  {
    id: 6,
    slug: 'essential-longsleeve',
    name: 'Essential Longsleeve',
    category: 'T-Shirts',
    price: 1890,
    description:
      'The Essential Longsleeve is built for year-round wear. A medium-weight 200 GSM cotton jersey with a slim-regular fit, reinforced cuffs, and a minimal DRAVE mark at the chest. Foundational. Versatile. Effortless.',
    shortDescription: '200 GSM cotton jersey. Year-round wear. Minimal DRAVE mark.',
    images: [
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
      'https://images.unsplash.com/photo-1564859228273-274232fdb516?w=800&q=80',
      'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&q=80',
    ],
    colors: [
      { name: 'Black', hex: '#0A0A0A' },
      { name: 'Off White', hex: '#F4F1EA' },
      { name: 'Slate', hex: '#404040' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4,
    reviewCount: 78,
    isNew: false,
    isFeatured: false,
    isBestseller: false,
    tags: ['longsleeve', 'essentials', 'cotton'],
    material: '200 GSM Combed Cotton Jersey',
    fit: 'Slim Regular',
    details: [
      '200 GSM combed cotton jersey',
      'Slim-regular fit with set-in sleeves',
      'Reinforced ribbed cuffs',
      'Minimal embroidered DRAVE mark at chest',
      'Side-seam construction for clean drape',
    ],
    careInstructions: [
      'Machine wash cold',
      'Tumble dry low',
      'Iron on medium heat',
      'Do not bleach',
    ],
  },
  {
    id: 7,
    slug: 'drave-black-zip-hoodie',
    name: 'DRAVE Black Zip Hoodie',
    category: 'Hoodies',
    price: 3690,
    description:
      'The DRAVE Black Zip Hoodie is part of our DRAVE BLACK line — the most premium tier of the collection. 360 GSM heavyweight fleece, a full-length YKK zipper, and an adjustable hood. Exclusively black. Uncompromisingly premium.',
    shortDescription: '360 GSM heavyweight fleece. DRAVE BLACK exclusive. YKK full zip.',
    images: [
      'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
    ],
    colors: [
      { name: 'Black', hex: '#0A0A0A' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 5,
    reviewCount: 55,
    isNew: true,
    isFeatured: false,
    isBestseller: false,
    tags: ['hoodie', 'drave-black', 'zip', 'premium'],
    material: '360 GSM Heavyweight Fleece',
    fit: 'Regular',
    details: [
      '360 GSM heavyweight fleece construction',
      'Full-length YKK metal zipper',
      'Adjustable hood with flat drawcords',
      'Kangaroo split pocket at front',
      'Tonal DRAVE embroidery at chest',
      'Ribbed cuffs and hem with spandex',
    ],
    careInstructions: [
      'Machine wash cold, gentle cycle',
      'Do not tumble dry — hang to dry',
      'Do not iron on zipper',
      'Do not bleach',
    ],
  },
  {
    id: 8,
    slug: 'oversized-bomber-jacket',
    name: 'Oversized Bomber Jacket',
    category: 'Jackets',
    price: 5490,
    description:
      'Reimagining the classic bomber silhouette. Crafted from a premium satin-effect fabric with a relaxed oversized fit, ribbed collar, cuffs and hem. The DRAVE wordmark is embroidered in tonal thread on the left chest. An iconic piece for the modern wardrobe.',
    shortDescription: 'Premium satin-effect fabric. Oversized silhouette. Tonal embroidery.',
    images: [
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
      'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800&q=80',
    ],
    colors: [
      { name: 'Black', hex: '#0A0A0A' },
      { name: 'Beige', hex: '#C8B89A' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 5,
    reviewCount: 38,
    isNew: false,
    isFeatured: false,
    isBestseller: false,
    tags: ['jacket', 'bomber', 'outerwear'],
    material: 'Satin-Effect Polyester Blend',
    fit: 'Oversized',
    details: [
      'Premium satin-effect polyester blend',
      'Relaxed oversized fit',
      'Ribbed collar, cuffs and hem',
      'Full-length metal zipper closure',
      'Tonal DRAVE embroidery at left chest',
      '2 side welt pockets',
      '1 interior zip pocket',
    ],
    careInstructions: [
      'Dry clean recommended',
      'If machine washing: cold, gentle cycle',
      'Do not tumble dry',
      'Iron on low heat on reverse side',
      'Do not bleach',
    ],
  },
]

// ============================================
// Collections
// ============================================

export const COLLECTIONS: Collection[] = [
  {
    id: 1,
    slug: 'essentials',
    name: 'Essentials',
    tagline: 'The foundation of the DRAVE wardrobe.',
    description: 'Timeless pieces built with premium materials. Wear them alone or build around them.',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1200&q=80',
    productCount: 12,
  },
  {
    id: 2,
    slug: 'summer-2026',
    name: 'Summer 2026',
    tagline: 'Light fabrics. Heavy impact.',
    description: 'Our Summer 2026 collection balances breathable construction with DRAVE\'s signature minimalist aesthetic.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80',
    productCount: 8,
  },
  {
    id: 3,
    slug: 'drave-black',
    name: 'DRAVE Black',
    tagline: 'Exclusive. Uncompromising. Elevated.',
    description: 'The most premium tier of the DRAVE collection. Limited quantities. Maximum quality.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=1200&q=80',
    productCount: 5,
  },
  {
    id: 4,
    slug: 'limited-edition',
    name: 'Limited Edition',
    tagline: 'Once it\'s gone, it\'s gone.',
    description: 'Exclusive limited-run pieces. No restocks. No compromises.',
    image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=1200&q=80',
    productCount: 3,
  },
]

// ============================================
// Journal Articles
// ============================================

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 1,
    slug: 'the-drave-standard',
    title: 'The DRAVE Standard',
    category: 'Brand',
    excerpt: 'What does it mean to build a clothing brand from a standard rather than a trend? We explore how quality becomes identity.',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80',
    date: 'September 1, 2026',
    readTime: '5 min read',
  },
  {
    id: 2,
    slug: 'the-art-of-oversized',
    title: 'The Art of Oversized',
    category: 'Style',
    excerpt: 'Oversized silhouettes have dominated fashion for decades — but wearing them well is an art. Our guide to mastering proportion.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    date: 'August 18, 2026',
    readTime: '4 min read',
  },
  {
    id: 3,
    slug: 'behind-the-collection',
    title: 'Behind the Collection',
    category: 'Process',
    excerpt: 'From fabric sourcing to final stitch — a behind-the-scenes look at how the DRAVE Essentials collection came to life.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80',
    date: 'August 5, 2026',
    readTime: '7 min read',
  },
]

// ============================================
// Data Access Functions — Replace these with API/MongoDB calls
// ============================================

export async function getProducts(): Promise<Product[]> {
  // TODO: Replace with: const res = await fetch('/api/products'); return res.json()
  return PRODUCTS
}

export async function getProduct(slug: string): Promise<Product | null> {
  // TODO: Replace with: const res = await fetch(`/api/products/${slug}`); return res.json()
  return PRODUCTS.find((p) => p.slug === slug) ?? null
}

export async function getBestsellers(): Promise<Product[]> {
  // TODO: Replace with: const res = await fetch('/api/products?featured=true&limit=4')
  return PRODUCTS.filter((p) => p.isBestseller).slice(0, 4)
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  if (category === 'All') return PRODUCTS
  return PRODUCTS.filter((p) => p.category === category)
}

export async function getCollections(): Promise<Collection[]> {
  // TODO: Replace with API call
  return COLLECTIONS
}

export async function getJournalArticles(): Promise<JournalArticle[]> {
  // TODO: Replace with API call
  return JOURNAL_ARTICLES
}

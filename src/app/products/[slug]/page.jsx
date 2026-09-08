import { notFound } from 'next/navigation'
import { getProduct, getProducts } from '@/lib/products'
import ProductGallery from '@/components/product/ProductGallery'
import ProductInfo from '@/components/product/ProductInfo'

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) return {}
  return {
    title: `${product.name} — DRAVE`,
    description: product.shortDescription,
  }
}

export default async function ProductPage({ params }) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) notFound()

  return (
    <div className="pt-[112px] min-h-screen bg-white">
      <div className="container-drave py-10 md:py-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-8">
          <a href="/" className="font-sans text-[11px] text-[#A3A3A3] hover:text-[#0A0A0A] transition-colors">Home</a>
          <span className="text-[#D4D4D4]">/</span>
          <a href="/shop" className="font-sans text-[11px] text-[#A3A3A3] hover:text-[#0A0A0A] transition-colors">Shop</a>
          <span className="text-[#D4D4D4]">/</span>
          <span className="font-sans text-[11px] text-[#0A0A0A]">{product.name}</span>
        </nav>

        {/* Product layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Gallery */}
          <div>
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Info */}
          <div className="lg:sticky lg:top-[120px] lg:self-start">
            <ProductInfo product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}

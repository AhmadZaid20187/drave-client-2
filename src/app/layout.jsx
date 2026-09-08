import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import ClientLayout from './ClientLayout'

// Page metadata for SEO — Next.js reads this automatically
export const metadata = {
  title: {
    default: 'DRAVE — Built Different. Worn Proud.',
    template: '%s | DRAVE',
  },
  description:
    'Premium streetwear crafted for those who define their own standard. Shop DRAVE — exclusive designs, finest fabrics, timeless silhouettes.',
  keywords: ['DRAVE', 'premium streetwear', 'fashion', 'Bangladesh', 'clothing brand', 'minimal', 'luxury'],
  openGraph: {
    type: 'website',
    siteName: 'DRAVE',
    title: 'DRAVE — Built Different. Worn Proud.',
    description: 'Premium streetwear crafted for those who define their own standard.',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

// RootLayout wraps every page on the site
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        {/* CartProvider and WishlistProvider share cart/wishlist data with all components */}
        <CartProvider>
          <WishlistProvider>
            <ClientLayout>{children}</ClientLayout>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}

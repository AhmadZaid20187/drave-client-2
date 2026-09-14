import OrdersClient from '@/components/account/OrdersClient'

export const metadata = {
  title: 'Orders',
  description: 'View your DRAVE order history.',
}

export default function OrdersPage() {
  return <OrdersClient />
}

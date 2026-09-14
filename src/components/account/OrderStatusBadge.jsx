// OrderStatusBadge — minimal pill with contextual styling for each order status
const STATUS_CONFIG = {
  pending:    { label: 'Pending',    bg: '#F5F5F5', color: '#737373' },
  confirmed:  { label: 'Confirmed',  bg: '#F0F0F4', color: '#4B4B6B' },
  processing: { label: 'Processing', bg: '#FDF6EC', color: '#8A5E00' },
  shipped:    { label: 'Shipped',    bg: '#0A0A0A', color: '#FFFFFF' },
  delivered:  { label: 'Delivered',  bg: '#EDF5EE', color: '#2D6B30' },
  cancelled:  { label: 'Cancelled',  bg: '#FDF0EF', color: '#8A2020' },
}

export default function OrderStatusBadge({ status }) {
  const key = (status ?? '').toLowerCase()
  const config = STATUS_CONFIG[key] ?? { label: status ?? 'Unknown', bg: '#F5F5F5', color: '#737373' }

  return (
    <span
      className="inline-block font-sans text-[9px] font-semibold tracking-[0.2em] uppercase px-2.5 py-1"
      style={{ backgroundColor: config.bg, color: config.color }}
    >
      {config.label}
    </span>
  )
}

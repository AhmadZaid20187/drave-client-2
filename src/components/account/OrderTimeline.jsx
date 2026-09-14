// OrderTimeline — vertical status timeline for the order detail page
const STEPS = [
  { key: 'pending',    label: 'Order Placed' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'processing',label: 'Processing' },
  { key: 'shipped',   label: 'Shipped' },
  { key: 'delivered', label: 'Delivered' },
]

const STATUS_ORDER = ['pending', 'confirmed', 'processing', 'shipped', 'delivered']

export default function OrderTimeline({ status }) {
  const currentIndex = STATUS_ORDER.indexOf((status ?? '').toLowerCase())
  const isCancelled = (status ?? '').toLowerCase() === 'cancelled'

  if (isCancelled) {
    return (
      <div className="flex items-center gap-3 py-4">
        <div className="h-3 w-3 rounded-full bg-[#D4573A] flex-shrink-0" />
        <span className="font-sans text-xs tracking-wide text-[#D4573A] uppercase">
          Order Cancelled
        </span>
      </div>
    )
  }

  return (
    <ol className="space-y-0">
      {STEPS.map((step, i) => {
        const isDone = i < currentIndex
        const isActive = i === currentIndex
        const isFuture = i > currentIndex

        return (
          <li key={step.key} className="flex items-start gap-4">
            {/* Indicator column */}
            <div className="flex flex-col items-center">
              {/* Circle */}
              <div
                className={`h-3 w-3 rounded-full flex-shrink-0 mt-0.5 border transition-all ${
                  isDone
                    ? 'bg-[#0A0A0A] border-[#0A0A0A]'
                    : isActive
                    ? 'bg-white border-[#0A0A0A] ring-2 ring-[#0A0A0A] ring-offset-1'
                    : 'bg-white border-[#D4D4D4]'
                }`}
                aria-hidden="true"
              />
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div
                  className={`w-px flex-1 my-1 h-6 ${
                    isDone ? 'bg-[#0A0A0A]' : 'bg-[#E5E5E5]'
                  }`}
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Label */}
            <div className="pb-6">
              <p
                className={`font-sans text-xs tracking-[0.12em] uppercase ${
                  isDone || isActive ? 'text-[#0A0A0A]' : 'text-[#D4D4D4]'
                } ${isActive ? 'font-semibold' : 'font-normal'}`}
              >
                {step.label}
              </p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

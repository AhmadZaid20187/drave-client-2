'use client'

interface AnnouncementBarProps {
  collapsed?: boolean
}

export default function AnnouncementBar({ collapsed = false }: AnnouncementBarProps) {
  return (
    <div
      className={`bg-[#0A0A0A] text-white transition-all duration-300 overflow-hidden ${
        collapsed ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'
      }`}
      role="banner"
    >
      <div className="flex items-center justify-center h-10 px-4">
        <p className="font-sans text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-light text-center text-white/90">
          Free Shipping on Orders Above ৳5,000
        </p>
      </div>
    </div>
  )
}

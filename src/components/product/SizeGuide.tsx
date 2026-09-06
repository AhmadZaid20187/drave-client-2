'use client'

import Modal from '@/components/ui/Modal'

const SIZE_CHART = [
  { size: 'S', chest: 38, length: 26 },
  { size: 'M', chest: 40, length: 27 },
  { size: 'L', chest: 42, length: 28 },
  { size: 'XL', chest: 44, length: 29 },
  { size: 'XXL', chest: 46, length: 30 },
]

interface SizeGuideProps {
  isOpen: boolean
  onClose: () => void
}

export default function SizeGuide({ isOpen, onClose }: SizeGuideProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Size Guide" size="md">
      <div className="space-y-6">
        <p className="font-sans text-xs text-[#737373] leading-relaxed">
          All measurements are in inches. For the best fit, measure your chest at its widest point.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm" role="table">
            <thead>
              <tr className="border-b border-[#E5E5E5]">
                {['Size', 'Chest', 'Length'].map((h) => (
                  <th
                    key={h}
                    className="pb-3 text-left font-sans text-[10px] font-medium tracking-[0.18em] uppercase text-[#737373]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SIZE_CHART.map((row, i) => (
                <tr key={row.size} className={`${i < SIZE_CHART.length - 1 ? 'border-b border-[#E5E5E5]' : ''}`}>
                  <td className="py-3.5 font-sans text-sm font-medium text-[#0A0A0A]">{row.size}</td>
                  <td className="py-3.5 font-sans text-sm text-[#525252]">{row.chest}&quot;</td>
                  <td className="py-3.5 font-sans text-sm text-[#525252]">{row.length}&quot;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-[#F5F5F5] p-4">
          <p className="font-sans text-xs text-[#737373] leading-relaxed">
            <strong className="text-[#0A0A0A]">Fit note:</strong> DRAVE oversized pieces are designed to fit larger. 
            If you prefer a more fitted look, consider sizing down.
          </p>
        </div>
      </div>
    </Modal>
  )
}

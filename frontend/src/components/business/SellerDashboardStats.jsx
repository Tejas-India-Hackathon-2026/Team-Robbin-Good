import { WASTE_TYPE_LABELS, STATUS_COLORS } from '../../utils/constants'

export default function SellerDashboardStats({ stats }) {
  if (!stats) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-24 mb-3" />
            <div className="h-8 bg-gray-200 rounded w-20" />
          </div>
        ))}
      </div>
    )
  }

  const cards = [
    {
      label: 'Total Waste Sold',
      value: `${stats.totalWasteSold || 0} kg`,
      color: 'bg-green-50 text-green-700',
    },
    {
      label: 'Total Earnings',
      value: `₹${(stats.totalEarnings || 0).toLocaleString()}`,
      color: 'bg-blue-50 text-blue-700',
    },
    {
      label: 'Commission Paid',
      value: `₹${(stats.commissionPaid || 0).toLocaleString()}`,
      color: 'bg-amber-50 text-amber-700',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className={`rounded-xl shadow p-6 ${c.color}`}
        >
          <p className="text-sm font-medium opacity-75">{c.label}</p>
          <p className="text-2xl font-bold mt-1">{c.value}</p>
        </div>
      ))}
    </div>
  )
}

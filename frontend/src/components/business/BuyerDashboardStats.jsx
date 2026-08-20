export default function BuyerDashboardStats({ stats }) {
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
      label: 'Total Waste Bought',
      value: `${stats.totalWasteBought || 0} kg`,
      color: 'bg-blue-50 text-blue-700',
    },
    {
      label: 'Total Spent',
      value: `₹${(stats.totalSpent || 0).toLocaleString()}`,
      color: 'bg-purple-50 text-purple-700',
    },
    {
      label: 'Estimated Savings',
      value: `₹${(stats.estimatedSavings || 0).toLocaleString()}`,
      color: 'bg-green-50 text-green-700',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((c) => (
        <div key={c.label} className={`rounded-xl shadow p-6 ${c.color}`}>
          <p className="text-sm font-medium opacity-75">{c.label}</p>
          <p className="text-2xl font-bold mt-1">{c.value}</p>
        </div>
      ))}
    </div>
  )
}

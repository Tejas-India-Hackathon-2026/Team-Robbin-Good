import { useState, useEffect } from 'react'
import { adminService } from '../../services/api'

function StatCard({ label, value, sub, color }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 space-y-1">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className={'text-2xl font-bold ' + (color || 'text-gray-800')}>{value}</p>
      {sub && <p className="text-xs text-gray-400">{sub}</p>}
    </div>
  )
}

export default function AdminOverview({ refreshKey }) {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    adminService
      .getStats()
      .then((res) => setStats(res.data.data || res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [refreshKey])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-5 animate-pulse">
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-3" />
            <div className="h-7 bg-gray-200 rounded w-1/3" />
          </div>
        ))}
      </div>
    )
  }

  if (!stats) return null

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Users</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Users" value={stats.totalUsers} />
          <StatCard label="Sellers" value={stats.totalSellers} color="text-blue-600" />
          <StatCard label="Buyers" value={stats.totalBuyers} color="text-purple-600" />
          <StatCard label="Household" value={stats.totalHouseholdUsers} color="text-green-600" />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-3">B2B Marketplace</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Listings" value={stats.totalListings} sub={`${stats.activeListings} active`} />
          <StatCard label="Transactions" value={stats.totalTransactions} sub={`${stats.completedTransactions} completed`} />
          <StatCard label="Commission Earned" value={`₹${stats.totalCommissionEarned}`} color="text-green-700" />
          <StatCard label="CO2 Saved (B2B)" value={`${stats.totalCo2SavedB2bKg} kg`} color="text-emerald-600" />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Household Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Pickup Requests" value={stats.totalPickupRequests} sub={`${stats.collectedPickups} collected`} />
          <StatCard label="Waste Collected" value={`${stats.totalWasteCollectedKg} kg`} />
          <StatCard label="Collection Agents" value={stats.totalAgents} color="text-amber-600" />
          <StatCard label="CO2 Saved (HH)" value={`${stats.totalCo2SavedHouseholdKg} kg`} color="text-emerald-600" />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Aggregation & Impact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Batches" value={stats.totalBatches} sub={`${stats.soldBatches} sold`} />
          <StatCard label="Batch Revenue" value={`₹${stats.totalBatchSaleAmount}`} color="text-green-700" />
          <StatCard label="Combined CO2 Saved" value={`${stats.combinedCo2SavedKg} kg`} color="text-emerald-600" sub="B2B + Household" />
        </div>
      </div>

      {stats.usersByCity && Object.keys(stats.usersByCity).length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Users by City</h2>
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium text-gray-600">City</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Users</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {Object.entries(stats.usersByCity).map(([city, count]) => (
                  <tr key={city} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-800 font-medium">{city}</td>
                    <td className="px-4 py-3 text-gray-600">{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

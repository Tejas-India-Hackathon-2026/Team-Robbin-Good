import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { dashboardService } from '../services/api'
import BuyerDashboardStats from '../components/business/BuyerDashboardStats'
import ListingSearch from '../components/business/ListingSearch'
import MyRequests from '../components/business/MyRequests'

export default function BuyerDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    dashboardService
      .getBuyerStats(user.id)
      .then((res) => setStats(res.data.data || res.data))
      .catch(() => {})
  }, [user.id, refreshKey])

  const refresh = () => setRefreshKey((k) => k + 1)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Buyer Dashboard</h1>

      <BuyerDashboardStats stats={stats} />

      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Search Listings
        </h2>
        <ListingSearch onRequestSent={refresh} />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">My Requests</h2>
        <MyRequests refreshKey={refreshKey} />
      </div>
    </div>
  )
}

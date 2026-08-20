import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { dashboardService } from '../services/api'
import SellerDashboardStats from '../components/business/SellerDashboardStats'
import ListingForm from '../components/business/ListingForm'
import MyListings from '../components/business/MyListings'
import IncomingRequests from '../components/business/IncomingRequests'

export default function SellerDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    dashboardService
      .getSellerStats(user.id)
      .then((res) => setStats(res.data.data || res.data))
      .catch(() => {})
  }, [user.id, refreshKey])

  const refresh = () => setRefreshKey((k) => k + 1)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Seller Dashboard</h1>

      <SellerDashboardStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Create New Listing
          </h2>
          <ListingForm onCreated={refresh} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Incoming Requests
          </h2>
          <IncomingRequests refreshKey={refreshKey} onAction={refresh} />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">My Listings</h2>
        <MyListings refreshKey={refreshKey} />
      </div>
    </div>
  )
}

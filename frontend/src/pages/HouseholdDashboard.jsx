import { useState } from 'react'
import PickupRequestForm from '../components/household/PickupRequestForm'
import MyPickupRequests from '../components/household/MyPickupRequests'
import WalletWidget from '../components/household/WalletWidget'
import ImpactDashboard from '../components/impact/ImpactDashboard'

export default function HouseholdDashboard() {
  const [refreshKey, setRefreshKey] = useState(0)

  const refresh = () => setRefreshKey((k) => k + 1)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Household Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Request a Pickup
          </h2>
          <PickupRequestForm onCreated={refresh} />
        </div>
        <div>
          <WalletWidget refreshKey={refreshKey} />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          My Pickup Requests
        </h2>
        <MyPickupRequests refreshKey={refreshKey} />
      </div>
    </div>
  )
}

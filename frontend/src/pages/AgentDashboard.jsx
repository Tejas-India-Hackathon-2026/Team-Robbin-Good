import { useState } from 'react'
import AgentPickupList from '../components/agent/AgentPickupList'

export default function AgentDashboard() {
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Collection Agent Dashboard</h1>
      <AgentPickupList refreshKey={refreshKey} onCollected={() => setRefreshKey((k) => k + 1)} />
    </div>
  )
}

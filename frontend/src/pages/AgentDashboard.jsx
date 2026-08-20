import { useState } from 'react'
import AgentPickupList from '../components/agent/AgentPickupList'
import AgentWalletCredit from '../components/agent/AgentWalletCredit'

export default function AgentDashboard() {
  const [refreshKey, setRefreshKey] = useState(0)
  const [activeTab, setActiveTab] = useState('pickups')

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Collection Agent Dashboard</h1>

      <div className="flex gap-1 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('pickups')}
          className={
            'px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors -mb-px ' +
            (activeTab === 'pickups'
              ? 'text-green-700 border-b-2 border-green-600'
              : 'text-gray-500 hover:text-gray-700')
          }
        >
          Pickups
        </button>
        <button
          onClick={() => setActiveTab('wallet')}
          className={
            'px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors -mb-px ' +
            (activeTab === 'wallet'
              ? 'text-green-700 border-b-2 border-green-600'
              : 'text-gray-500 hover:text-gray-700')
          }
        >
          Credit Wallet
        </button>
      </div>

      {activeTab === 'pickups' && (
        <AgentPickupList refreshKey={refreshKey} onCollected={() => setRefreshKey((k) => k + 1)} />
      )}
      {activeTab === 'wallet' && (
        <AgentWalletCredit onCredited={() => setRefreshKey((k) => k + 1)} />
      )}
    </div>
  )
}

import { useState } from 'react'
import AgentCollectionWorkflow from '../components/agent/AgentCollectionWorkflow'
import AgentWalletCredit from '../components/agent/AgentWalletCredit'

export default function AgentDashboard() {
  const [refreshKey, setRefreshKey] = useState(0)
  const [activeTab, setActiveTab] = useState('collect')

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Collection Agent Dashboard</h1>

      <div className="flex gap-1 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('collect')}
          className={
            'px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors -mb-px ' +
            (activeTab === 'collect'
              ? 'text-green-700 border-b-2 border-green-600'
              : 'text-gray-500 hover:text-gray-700')
          }
        >
          Collect Waste
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

      {activeTab === 'collect' && (
        <AgentCollectionWorkflow key={refreshKey} onRefresh={() => setRefreshKey((k) => k + 1)} />
      )}
      {activeTab === 'wallet' && (
        <AgentWalletCredit onCredited={() => setRefreshKey((k) => k + 1)} />
      )}
    </div>
  )
}

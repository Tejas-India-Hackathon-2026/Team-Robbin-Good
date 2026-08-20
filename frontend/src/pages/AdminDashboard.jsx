import { useState } from 'react'
<<<<<<< HEAD
import AggregationBatchList from '../components/admin/AggregationBatchList'
import SellBatchForm from '../components/admin/SellBatchForm'
import AdminPayment from './AdminPayment'
=======
import AdminOverview from '../components/admin/AdminOverview'
import AdminUserList from '../components/admin/AdminUserList'
import AdminListingList from '../components/admin/AdminListingList'
import AdminTransactionList from '../components/admin/AdminTransactionList'
import AdminPickupList from '../components/admin/AdminPickupList'
import AdminAgentList from '../components/admin/AdminAgentList'
import AdminBatchList from '../components/admin/AdminBatchList'

const TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'users', label: 'Users' },
  { key: 'listings', label: 'Listings' },
  { key: 'transactions', label: 'Transactions' },
  { key: 'pickups', label: 'Pickups' },
  { key: 'agents', label: 'Agents' },
  { key: 'batches', label: 'Batches' },
]
>>>>>>> a0faf4d611083a29d3b66c83e0acabf95608eb5d

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [refreshKey, setRefreshKey] = useState(0)

  const refresh = () => setRefreshKey((k) => k + 1)

  const renderTab = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverview refreshKey={refreshKey} />
      case 'users':
        return <AdminUserList refreshKey={refreshKey} />
      case 'listings':
        return <AdminListingList refreshKey={refreshKey} />
      case 'transactions':
        return <AdminTransactionList refreshKey={refreshKey} />
      case 'pickups':
        return <AdminPickupList refreshKey={refreshKey} />
      case 'agents':
        return <AdminAgentList refreshKey={refreshKey} />
      case 'batches':
        return <AdminBatchList refreshKey={refreshKey} onRefresh={refresh} />
      default:
        return null
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>

      <div className="flex gap-1 border-b border-gray-200 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={
              'px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors -mb-px ' +
              (activeTab === tab.key
                ? 'text-green-700 border-b-2 border-green-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300')
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

<<<<<<< HEAD
      {selectedBatch && (
        <SellBatchForm
          batch={selectedBatch}
          onSold={() => {
            setSelectedBatch(null)
            setRefreshKey((k) => k + 1)
          }}
        />
      )}

      <AdminPayment />
=======
      {renderTab()}
>>>>>>> a0faf4d611083a29d3b66c83e0acabf95608eb5d
    </div>
  )
}

import { useState } from 'react'
import AdminOverview from '../components/admin/AdminOverview'
import AdminUserList from '../components/admin/AdminUserList'
import AdminListingList from '../components/admin/AdminListingList'
import AdminTransactionList from '../components/admin/AdminTransactionList'
import AdminPickupList from '../components/admin/AdminPickupList'
import AdminAgentList from '../components/admin/AdminAgentList'
import AdminBatchList from '../components/admin/AdminBatchList'
import AdminPayment from './AdminPayment'

const TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'users', label: 'Users' },
  { key: 'listings', label: 'Listings' },
  { key: 'transactions', label: 'Transactions' },
  { key: 'pickups', label: 'Pickups' },
  { key: 'agents', label: 'Agents' },
  { key: 'batches', label: 'Batches' },
  { key: 'payments', label: 'Payments' },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [refreshKey, setRefreshKey] = useState(0)
  const [payments, setPayments] = useState([])

  const refresh = () => setRefreshKey((k) => k + 1)

  const recordPayment = (payment) => {
    setPayments((currentPayments) => [payment, ...currentPayments])
  }

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
      case 'payments':
        return (
          <div className="space-y-6">
            <AdminPayment onPaymentRecorded={recordPayment} />
            {payments.length > 0 && (
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  Recent Payments
                </h2>
                <div className="space-y-3">
                  {payments.map((payment) => (
                    <div
                      key={`${payment.createdAt}-${payment.recipient}`}
                      className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium text-gray-800">{payment.recipient}</p>
                        <p className="text-xs text-gray-500">
                          {payment.method} {payment.reference && `· ${payment.reference}`}
                        </p>
                      </div>
                      <span className="font-semibold text-green-700">
                        ₹{payment.amount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
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

      {renderTab()}
    </div>
  )
}

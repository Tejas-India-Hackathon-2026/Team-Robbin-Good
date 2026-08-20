import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { transactionService } from '../../services/api'
import { STATUS_COLORS } from '../../utils/constants'

export default function MyRequests({ refreshKey }) {
  const { user } = useAuth()
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    transactionService
      .getByBuyer(user.id)
      .then((res) => setRequests(res.data.data || res.data || []))
      .catch(() => setRequests([]))
      .finally(() => setLoading(false))
  }, [user.id, refreshKey])

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 animate-pulse space-y-3">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>
    )
  }

  if (requests.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
        No requests yet. Search and request listings above!
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow divide-y">
      {requests.map((r) => (
        <div key={r.id} className="p-4 flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-800">Transaction #{r.id}</p>
            <p className="text-sm text-gray-500">
              Qty: {r.agreedQuantity} — ₹{r.agreedPrice}/unit — Total: ₹
              {(r.agreedQuantity * r.agreedPrice).toFixed(2)}
            </p>
          </div>
          <span
            className={'text-xs font-medium px-3 py-1 rounded-full ' +
              (STATUS_COLORS[r.status] || 'text-gray-600 bg-gray-50')}
          >
            {r.status}
          </span>
        </div>
      ))}
    </div>
  )
}

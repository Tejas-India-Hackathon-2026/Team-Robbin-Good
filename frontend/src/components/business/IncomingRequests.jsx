import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { transactionService } from '../../services/api'
import { WASTE_TYPE_LABELS, STATUS_COLORS } from '../../utils/constants'

export default function IncomingRequests({ refreshKey, onAction }) {
  const { user } = useAuth()
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(null)

  const fetchRequests = () => {
    setLoading(true)
    transactionService
      .getBySeller(user.id)
      .then((res) => setRequests(res.data.data || res.data || []))
      .catch(() => setRequests([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchRequests()
  }, [user.id, refreshKey])

  const handleAccept = async (id) => {
    setActionLoading(id)
    try {
      await transactionService.accept(id)
      fetchRequests()
      onAction && onAction()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to accept request')
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (id) => {
    setActionLoading(id)
    try {
      await transactionService.reject(id)
      fetchRequests()
      onAction && onAction()
    } catch {
    } finally {
      setActionLoading(null)
    }
  }

  const handleComplete = async (id) => {
    setActionLoading(id)
    try {
      await transactionService.complete(id)
      fetchRequests()
      onAction && onAction()
    } catch {
    } finally {
      setActionLoading(null)
    }
  }

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
        No incoming requests yet.
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow divide-y">
      {requests.map((r) => (
        <div key={r.id} className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-800">
              Transaction #{r.id}
            </span>
            <span
              className={'text-xs font-medium px-2 py-1 rounded-full ' +
                (STATUS_COLORS[r.status] || 'text-gray-600 bg-gray-50')}
            >
              {r.status}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            Quantity: {r.agreedQuantity} — Price: ₹{r.agreedPrice}/unit
          </p>
          <p className="text-sm text-gray-500">
            Total: ₹{(r.agreedQuantity * r.agreedPrice).toFixed(2)}
            {r.commissionAmount != null && r.commissionAmount > 0 && (
              <> — Commission: ₹{r.commissionAmount}</>
            )}
          </p>
          <div className="flex gap-2">
            {r.status === 'REQUESTED' && (
              <>
                <button
                  onClick={() => handleAccept(r.id)}
                  disabled={actionLoading === r.id}
                  className="px-4 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {actionLoading === r.id ? 'Processing...' : 'Accept'}
                </button>
                <button
                  onClick={() => handleReject(r.id)}
                  disabled={actionLoading === r.id}
                  className="px-4 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  {actionLoading === r.id ? 'Processing...' : 'Reject'}
                </button>
              </>
            )}
            {r.status === 'ACCEPTED' && (
              <button
                onClick={() => handleComplete(r.id)}
                disabled={actionLoading === r.id}
                className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {actionLoading === r.id ? 'Processing...' : 'Mark Complete'}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

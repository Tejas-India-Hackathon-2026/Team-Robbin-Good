import { useAuth } from '../../context/AuthContext'
import { transactionService } from '../../services/api'
import { WASTE_TYPE_LABELS, STATUS_COLORS } from '../../utils/constants'
import { useState } from 'react'

export default function IncomingRequests({ refreshKey, onAction }) {
  const { user } = useAuth()
  const [actionLoading, setActionLoading] = useState(null)
  const [transactionId, setTransactionId] = useState('')
  const [tx, setTx] = useState(null)
  const [error, setError] = useState('')

  const handleFetch = async () => {
    if (!transactionId.trim()) return
    setError('')
    setTx(null)
    try {
      const res = await transactionService.getById(transactionId.trim())
      setTx(res.data.data || res.data)
    } catch {
      setError('Transaction not found')
    }
  }

  const handleAccept = async (id) => {
    setActionLoading(id)
    try {
      await transactionService.accept(id)
      handleFetch()
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
      handleFetch()
      onAction && onAction()
    } catch {
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-5 space-y-4">
      <p className="text-sm text-gray-500">
        Look up a transaction by ID to view and manage it.
      </p>

      <div className="flex gap-2">
        <input
          type="text"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          placeholder="Transaction ID"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
        />
        <button
          onClick={handleFetch}
          className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700"
        >
          Lookup
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {tx && (
        <div className="border rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-800">
              {WASTE_TYPE_LABELS[tx.wasteType] || tx.wasteType}
            </span>
            <span
              className={'text-xs font-medium px-2 py-1 rounded-full ' +
                (STATUS_COLORS[tx.status] || 'text-gray-600 bg-gray-50')}
            >
              {tx.status}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            Quantity: {tx.requestedQuantity || tx.quantity} {tx.unit}
          </p>
          {tx.buyerName && (
            <p className="text-sm text-gray-500">Buyer: {tx.buyerName}</p>
          )}
          {tx.sellerName && (
            <p className="text-sm text-gray-500">Seller: {tx.sellerName}</p>
          )}
          <div className="flex gap-2">
            {tx.status === 'PENDING' && (
              <button
                onClick={() => handleAccept(tx.id)}
                disabled={actionLoading === tx.id}
                className="px-4 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                Accept
              </button>
            )}
            {tx.status === 'ACCEPTED' && (
              <button
                onClick={() => handleComplete(tx.id)}
                disabled={actionLoading === tx.id}
                className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                Mark Complete
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

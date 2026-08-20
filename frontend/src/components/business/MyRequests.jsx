import { useState } from 'react'
import { transactionService } from '../../services/api'
import { WASTE_TYPE_LABELS, STATUS_COLORS } from '../../utils/constants'

export default function MyRequests({ refreshKey }) {
  const [transactionId, setTransactionId] = useState('')
  const [tx, setTx] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFetch = async () => {
    if (!transactionId.trim()) return
    setLoading(true)
    setError('')
    setTx(null)
    try {
      const res = await transactionService.getById(transactionId.trim())
      setTx(res.data.data || res.data)
    } catch {
      setError('Transaction not found')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-5 space-y-4">
      <p className="text-sm text-gray-500">
        Look up your transaction by ID to check its status.
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
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Lookup'}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {tx && (
        <div className="border rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-800">
              {WASTE_TYPE_LABELS[tx.wasteType] || tx.wasteType}
            </span>
            <span
              className={'text-xs font-medium px-3 py-1 rounded-full ' +
                (STATUS_COLORS[tx.status] || 'text-gray-600 bg-gray-50')}
            >
              {tx.status}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            Quantity: {tx.requestedQuantity || tx.quantity} {tx.unit}
          </p>
          {tx.sellerName && (
            <p className="text-sm text-gray-500">Seller: {tx.sellerName}</p>
          )}
          {tx.buyerName && (
            <p className="text-sm text-gray-500">Buyer: {tx.buyerName}</p>
          )}
        </div>
      )}
    </div>
  )
}

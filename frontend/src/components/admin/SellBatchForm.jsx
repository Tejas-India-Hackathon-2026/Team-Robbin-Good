import { useState } from 'react'
import { aggregationService } from '../../services/api'
import { WASTE_TYPE_LABELS } from '../../utils/constants'

export default function SellBatchForm({ batch, onSold }) {
  const [saleAmount, setSaleAmount] = useState('')
  const [soldToBuyerId, setSoldToBuyerId] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    try {
      await aggregationService.sellBatch(batch.id, {
        saleAmount: Number(saleAmount),
        soldToBuyerId: soldToBuyerId || undefined,
      })
      setMessage({ type: 'success', text: 'Batch marked as sold!' })
      setTimeout(() => onSold && onSold(), 1000)
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to sell batch',
      })
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm'

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4 max-w-lg">
      <h2 className="text-lg font-semibold text-gray-700">Sell Batch</h2>

      <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-1">
        <p>
          <span className="font-medium text-gray-600">Waste Type:</span>{' '}
          {WASTE_TYPE_LABELS[batch.wasteType] || batch.wasteType}
        </p>
        <p>
          <span className="font-medium text-gray-600">City:</span> {batch.city}
        </p>
        <p>
          <span className="font-medium text-gray-600">Quantity:</span>{' '}
          {batch.quantity || batch.totalQuantity} {batch.unit || ''}
        </p>
      </div>

      {message && (
        <div
          className={'p-3 rounded-lg text-sm ' +
            (message.type === 'success'
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700')}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sale Amount (₹)
          </label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={saleAmount}
            onChange={(e) => setSaleAmount(e.target.value)}
            className={inputClass}
            placeholder="Total sale amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Buyer ID (optional)
          </label>
          <input
            type="text"
            value={soldToBuyerId}
            onChange={(e) => setSoldToBuyerId(e.target.value)}
            className={inputClass}
            placeholder="Buyer user ID"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 transition text-sm"
          >
            {loading ? 'Processing...' : 'Confirm Sale'}
          </button>
          <button
            type="button"
            onClick={onSold}
            className="px-5 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

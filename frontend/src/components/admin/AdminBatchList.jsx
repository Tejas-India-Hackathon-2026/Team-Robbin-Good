import { useState, useEffect } from 'react'
import { adminService } from '../../services/api'
import { WASTE_TYPE_LABELS, STATUS_COLORS } from '../../utils/constants'

export default function AdminBatchList({ refreshKey, onRefresh }) {
  const [batches, setBatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBatch, setSelectedBatch] = useState(null)
  const [saleAmount, setSaleAmount] = useState('')
  const [buyerId, setBuyerId] = useState('')
  const [saleLoading, setSaleLoading] = useState(false)
  const [saleMsg, setSaleMsg] = useState(null)

  const fetchBatches = () => {
    setLoading(true)
    adminService
      .getBatches()
      .then((res) => setBatches(res.data.data || res.data || []))
      .catch(() => setBatches([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchBatches()
  }, [refreshKey])

  const handleSell = async (e) => {
    e.preventDefault()
    setSaleLoading(true)
    setSaleMsg(null)
    try {
      const { aggregationService } = await import('../../services/api')
      await aggregationService.sellBatch(selectedBatch.id, {
        saleAmount: Number(saleAmount),
        soldToBuyerId: buyerId ? Number(buyerId) : undefined,
      })
      setSaleMsg({ type: 'success', text: 'Batch sold successfully!' })
      setSelectedBatch(null)
      setSaleAmount('')
      setBuyerId('')
      fetchBatches()
      onRefresh && onRefresh()
    } catch (err) {
      setSaleMsg({ type: 'error', text: err.response?.data?.message || 'Failed to sell batch' })
    } finally {
      setSaleLoading(false)
    }
  }

  const inputClass =
    'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm'

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 animate-pulse space-y-3">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {saleMsg && (
        <div className={'p-3 rounded-lg text-sm ' + (saleMsg.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700')}>
          {saleMsg.text}
        </div>
      )}

      {selectedBatch && (
        <div className="bg-white rounded-xl shadow p-6 space-y-4 max-w-lg">
          <h3 className="text-lg font-semibold text-gray-700">Sell Batch #{selectedBatch.id}</h3>
          <div className="bg-gray-50 rounded-lg p-3 text-sm space-y-1">
            <p><span className="font-medium text-gray-600">Waste:</span> {WASTE_TYPE_LABELS[selectedBatch.wasteType] || selectedBatch.wasteType}</p>
            <p><span className="font-medium text-gray-600">City:</span> {selectedBatch.city}</p>
            <p><span className="font-medium text-gray-600">Qty:</span> {selectedBatch.totalQuantity}</p>
          </div>
          <form onSubmit={handleSell} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sale Amount (₹)</label>
              <input type="number" required min="0" step="0.01" value={saleAmount} onChange={(e) => setSaleAmount(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Buyer ID (optional)</label>
              <input type="text" value={buyerId} onChange={(e) => setBuyerId(e.target.value)} className={inputClass} placeholder="Buyer user ID" />
            </div>
            <div className="flex gap-2">
              <button type="submit" disabled={saleLoading} className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50">
                {saleLoading ? 'Processing...' : 'Confirm Sale'}
              </button>
              <button type="button" onClick={() => { setSelectedBatch(null); setSaleMsg(null) }} className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-300">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {batches.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">No batches found.</div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium text-gray-600">ID</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Waste Type</th>
                  <th className="px-4 py-3 font-medium text-gray-600">City</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Quantity</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Status</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Sale Amount</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {batches.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-500">#{b.id}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{WASTE_TYPE_LABELS[b.wasteType] || b.wasteType}</td>
                    <td className="px-4 py-3 text-gray-600">{b.city}</td>
                    <td className="px-4 py-3 text-gray-600">{b.totalQuantity}</td>
                    <td className="px-4 py-3">
                      <span className={'text-xs font-medium px-2 py-1 rounded-full ' + (STATUS_COLORS[b.status] || 'text-gray-600 bg-gray-50')}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{b.saleAmount ? `₹${b.saleAmount}` : '—'}</td>
                    <td className="px-4 py-3">
                      {b.status === 'COLLECTING' && (
                        <button onClick={() => { setSelectedBatch(b); setSaleMsg(null) }} className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700">
                          Sell Batch
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

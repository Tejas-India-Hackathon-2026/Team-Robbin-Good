import { useState, useEffect } from 'react'
import { aggregationService } from '../../services/api'
import { WASTE_TYPE_LABELS, STATUS_COLORS } from '../../utils/constants'

export default function AggregationBatchList({ refreshKey, onSelectBatch }) {
  const [batches, setBatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [cityFilter, setCityFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const fetchBatches = () => {
    setLoading(true)
    const params = {}
    if (cityFilter) params.city = cityFilter
    if (statusFilter) params.status = statusFilter
    aggregationService
      .getBatches(params)
      .then((res) => setBatches(res.data.data || res.data || []))
      .catch(() => setBatches([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchBatches()
  }, [refreshKey, cityFilter, statusFilter])

  const inputClass =
    'px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm'

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow p-4 flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className={inputClass}
            placeholder="Filter by city"
          />
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={inputClass}
          >
            <option value="">All Statuses</option>
            <option value="COLLECTING">Collecting</option>
            <option value="SOLD">Sold</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow p-6 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-full mb-3" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      ) : batches.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
          No batches found.
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-600">Waste Type</th>
                <th className="px-4 py-3 font-medium text-gray-600">City</th>
                <th className="px-4 py-3 font-medium text-gray-600">Quantity</th>
                <th className="px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {batches.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {WASTE_TYPE_LABELS[b.wasteType] || b.wasteType}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{b.city}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {b.quantity || b.totalQuantity} {b.unit || ''}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={'text-xs font-medium px-2 py-1 rounded-full ' +
                        (STATUS_COLORS[b.status] || 'text-gray-600 bg-gray-50')}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {b.status === 'COLLECTING' && (
                      <button
                        onClick={() => onSelectBatch(b)}
                        className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700"
                      >
                        Sell Batch
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

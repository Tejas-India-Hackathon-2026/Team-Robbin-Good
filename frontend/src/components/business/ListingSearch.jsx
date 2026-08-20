import { useState, useEffect } from 'react'
import { listingService, transactionService } from '../../services/api'
import { WASTE_TYPES, WASTE_TYPE_LABELS } from '../../utils/constants'

export default function ListingSearch({ onRequestSent }) {
  const [filters, setFilters] = useState({ wasteType: '', city: '' })
  const [results, setResults] = useState([])
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(true)
  const [requestingId, setRequestingId] = useState(null)

  const update = (field) => (e) =>
    setFilters((prev) => ({ ...prev, [field]: e.target.value }))

  const doSearch = async (params) => {
    setLoading(true)
    setSearched(true)
    try {
      const res = await listingService.search(params)
      setResults(res.data.data || res.data || [])
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    doSearch({})
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    const params = {}
    if (filters.wasteType) params.wasteType = filters.wasteType
    if (filters.city) params.city = filters.city
    doSearch(params)
  }

  const handleRequest = async (listingId) => {
    setRequestingId(listingId)
    try {
      await transactionService.request({ listingId, requestedQuantity: 1 })
      onRequestSent && onRequestSent()
    } catch {
    } finally {
      setRequestingId(null)
    }
  }

  const inputClass =
    'px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm'

  return (
    <div className="space-y-4">
      <form
        onSubmit={handleSearch}
        className="bg-white rounded-xl shadow p-4 flex flex-wrap gap-3 items-end"
      >
        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Waste Type
          </label>
          <select
            value={filters.wasteType}
            onChange={update('wasteType')}
            className={inputClass}
          >
            <option value="">All Types</option>
            {WASTE_TYPES.map((t) => (
              <option key={t} value={t}>
                {WASTE_TYPE_LABELS[t]}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            value={filters.city}
            onChange={update('city')}
            className={inputClass}
            placeholder="e.g. Mumbai"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow p-5 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
              <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : results.length === 0 && searched ? (
        <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
          No listings found. Try different filters.
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((l) => (
            <div key={l.id} className="bg-white rounded-xl shadow p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-800">
                  {WASTE_TYPE_LABELS[l.wasteType] || l.wasteType}
                </span>
                <span className="text-green-700 font-bold">
                  ₹{l.pricePerUnit != null ? l.pricePerUnit + '/' + l.unit : 'Negotiable'}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {l.quantity} {l.unit} available
              </p>
              <p className="text-sm text-gray-500">
                {l.city}{l.location ? ', ' + l.location : ''}
              </p>
              <button
                onClick={() => handleRequest(l.id)}
                disabled={requestingId === l.id}
                className="w-full py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
              >
                {requestingId === l.id ? 'Requesting...' : 'Request'}
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

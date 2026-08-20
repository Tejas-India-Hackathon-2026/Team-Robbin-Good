import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { listingService } from '../../services/api'
import { WASTE_TYPE_LABELS, STATUS_COLORS } from '../../utils/constants'

export default function MyListings({ refreshKey }) {
  const { user } = useAuth()
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    listingService
      .search({})
      .then((res) => {
        const all = res.data.data || res.data || []
        setListings(all.filter((l) => l.sellerId === user.id))
      })
      .catch(() => setListings([]))
      .finally(() => setLoading(false))
  }, [user.id, refreshKey])

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-full mb-3" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
      </div>
    )
  }

  if (listings.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
        No listings yet. Create one above!
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {listings.map((l) => (
        <div key={l.id} className="bg-white rounded-xl shadow p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">
              {WASTE_TYPE_LABELS[l.wasteType] || l.wasteType}
            </span>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                STATUS_COLORS[l.status] || 'text-gray-600 bg-gray-50'
              }`}
            >
              {l.status}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            {l.quantity} {l.unit} — {l.pricePerUnit != null ? '₹' + l.pricePerUnit + '/' + l.unit : 'Negotiable'}
          </p>
          <p className="text-sm text-gray-500">
            {l.city} • {l.frequency?.replace('_', ' ')}
          </p>
        </div>
      ))}
    </div>
  )
}

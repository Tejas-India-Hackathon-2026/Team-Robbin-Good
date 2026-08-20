import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { pickupService } from '../../services/api'
import { WASTE_TYPE_LABELS, STATUS_COLORS } from '../../utils/constants'

export default function MyPickupRequests({ refreshKey }) {
  const { user } = useAuth()
  const [pickups, setPickups] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    pickupService
      .getByUser(user.id)
      .then((res) => setPickups(res.data.data || res.data || []))
      .catch(() => setPickups([]))
      .finally(() => setLoading(false))
  }, [user.id, refreshKey])

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-full mb-3" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>
    )
  }

  if (pickups.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
        No pickup requests yet.
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow divide-y">
      {pickups.map((p) => (
        <div key={p.id} className="p-4 flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-800">
              {WASTE_TYPE_LABELS[p.wasteType] || p.wasteType}
            </p>
            <p className="text-sm text-gray-500">
              {p.estimatedQuantity} {p.unit} — {p.city}
            </p>
            {p.address && (
              <p className="text-xs text-gray-400 mt-1">{p.address}</p>
            )}
          </div>
          <span
            className={'text-xs font-medium px-3 py-1 rounded-full ' +
              (STATUS_COLORS[p.status] || 'text-gray-600 bg-gray-50')}
          >
            {p.status}
          </span>
        </div>
      ))}
    </div>
  )
}

import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { pickupService } from '../../services/api'
import { WASTE_TYPE_LABELS, STATUS_COLORS, WASTE_CATEGORY_LABELS, SUB_TYPE_LABELS } from '../../utils/constants'

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
            <div className="flex items-center gap-2">
              <p className="font-medium text-gray-800">
                {WASTE_TYPE_LABELS[p.wasteType] || p.wasteType}
              </p>
              {p.wasteCategory && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                  {WASTE_CATEGORY_LABELS[p.wasteCategory] || p.wasteCategory}
                </span>
              )}
              {p.subType && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                  {SUB_TYPE_LABELS[p.subType] || p.subType}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">
              {p.actualQuantity || p.estimatedQuantity} {p.unit} — {p.city}
            </p>
            {p.address && (
              <p className="text-xs text-gray-400 mt-1">{p.address}</p>
            )}
          </div>
          <div className="text-right space-y-1">
            <span
              className={'text-xs font-medium px-3 py-1 rounded-full ' +
                (STATUS_COLORS[p.status] || 'text-gray-600 bg-gray-50')}
            >
              {p.status?.replace(/_/g, ' ')}
            </span>
            {p.payoutAmount && (
              <p className="text-sm font-semibold text-emerald-600">₹{p.payoutAmount}</p>
            )}
            {p.co2SavedKg > 0 && (
              <p className="text-xs text-emerald-500">-{p.co2SavedKg} kg CO2</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

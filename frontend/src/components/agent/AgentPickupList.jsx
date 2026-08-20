import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { pickupService } from '../../services/api'
import { WASTE_TYPE_LABELS, STATUS_COLORS } from '../../utils/constants'

export default function AgentPickupList({ refreshKey, onCollected }) {
  const { user } = useAuth()
  const [pickups, setPickups] = useState([])
  const [loading, setLoading] = useState(true)
  const [collectingId, setCollectingId] = useState(null)

  useEffect(() => {
    setLoading(true)
    pickupService
      .getAgentPickups(user.id)
      .then((res) => setPickups(res.data.data || res.data || []))
      .catch(() => setPickups([]))
      .finally(() => setLoading(false))
  }, [user.id, refreshKey])

  const handleCollect = async (id) => {
    setCollectingId(id)
    try {
      await pickupService.collect(id)
      onCollected && onCollected()
    } catch {
    } finally {
      setCollectingId(null)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 animate-pulse space-y-3">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    )
  }

  if (pickups.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
        No pickups assigned in your city right now.
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow divide-y">
      {pickups.map((p) => (
        <div key={p.id} className="p-4 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-800">
                {WASTE_TYPE_LABELS[p.wasteType] || p.wasteType}
              </span>
              <span
                className={'text-xs font-medium px-2 py-0.5 rounded-full ' +
                  (STATUS_COLORS[p.status] || 'text-gray-600 bg-gray-50')}
              >
                {p.status}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {p.estimatedQuantity} {p.unit}
            </p>
            <p className="text-sm text-gray-500">
              {p.address || p.city}
            </p>
            {p.userName && (
              <p className="text-xs text-gray-400">Household: {p.userName}</p>
            )}
          </div>

          {p.status !== 'COLLECTED' && (
            <button
              onClick={() => handleCollect(p.id)}
              disabled={collectingId === p.id}
              className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 transition whitespace-nowrap"
            >
              {collectingId === p.id ? 'Collecting...' : 'Mark Collected'}
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

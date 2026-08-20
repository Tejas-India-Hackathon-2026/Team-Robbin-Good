import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { rewardsService } from '../../services/api'

export default function RewardsWidget({ refreshKey, onRewardsLoaded }) {
  const { user } = useAuth()
  const [rewards, setRewards] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    rewardsService
      .getBalance(user.id)
      .then((res) => {
        const data = res.data.data || res.data
        setRewards(data)
        onRewardsLoaded && onRewardsLoaded(data)
      })
      .catch(() => setRewards(null))
      .finally(() => setLoading(false))
  }, [user.id, refreshKey, onRewardsLoaded])

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-32 mb-3" />
        <div className="h-10 bg-gray-200 rounded w-24" />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Reward Points</h2>

      <div className="bg-green-50 rounded-xl p-6 text-center">
        <p className="text-4xl font-bold text-green-700">
          {rewards?.points || rewards?.balance || 0}
        </p>
        <p className="text-sm text-green-600 mt-1">points earned</p>
      </div>

      {rewards?.history && rewards.history.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Recent History</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {rewards.history.map((h, i) => (
              <div
                key={h.id || i}
                className="flex items-center justify-between text-sm py-1 border-b last:border-0"
              >
                <span className="text-gray-700">{h.description || h.wasteType || 'Pickup'}</span>
                <span className="font-medium text-green-600">+{h.points || h.amount || 0}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

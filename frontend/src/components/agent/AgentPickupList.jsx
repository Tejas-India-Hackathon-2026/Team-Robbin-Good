import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { pickupService } from '../../services/api'
import { WASTE_TYPE_LABELS, STATUS_COLORS, WASTE_CATEGORIES, WASTE_CATEGORY_LABELS, SUB_TYPES, SUB_TYPE_LABELS } from '../../utils/constants'

export default function AgentPickupList({ refreshKey, onCollected }) {
  const { user } = useAuth()
  const [pickups, setPickups] = useState([])
  const [loading, setLoading] = useState(true)
  const [claimingId, setClaimingId] = useState(null)
  const [collectingId, setCollectingId] = useState(null)
  const [form, setForm] = useState({})

  const loadPickups = () => {
    setLoading(true)
    pickupService
      .getAgentPickups(user.id)
      .then((res) => setPickups(res.data.data || res.data || []))
      .catch(() => setPickups([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadPickups()
  }, [user.id, refreshKey])

  const updateForm = (pickupId, field, value) => {
    setForm((prev) => ({
      ...prev,
      [pickupId]: { ...prev[pickupId], [field]: value },
    }))
  }

  const handleClaim = async (id) => {
    setClaimingId(id)
    try {
      await pickupService.claim(id, user.id)
      onCollected && onCollected()
    } catch {} finally {
      setClaimingId(null)
    }
  }

  const handleCollect = async (id) => {
    const f = form[id] || {}
    if (!f.wasteCategory || !f.subType || !f.actualQuantity) return
    setCollectingId(id)
    try {
      await pickupService.collect(id, {
        wasteCategory: f.wasteCategory,
        subType: f.subType,
        actualQuantity: Number(f.actualQuantity),
      })
      setForm((prev) => { const n = { ...prev }; delete n[id]; return n })
      onCollected && onCollected()
    } catch {} finally {
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
        No pickups available in your city right now.
      </div>
    )
  }

  const inputClass =
    'w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm'

  const requested = pickups.filter((p) => p.status === 'REQUESTED')
  const assigned = pickups.filter((p) => p.status === 'ASSIGNED')

  const renderPickup = (p) => {
    const f = form[p.id] || {}
    return (
      <div key={p.id} className="p-4 space-y-3">
        <div className="flex items-center justify-between">
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
              {p.estimatedQuantity} {p.unit} (estimated)
            </p>
            <p className="text-sm text-gray-500">
              {p.address || p.city}
            </p>
          </div>

          {p.status === 'REQUESTED' && (
            <button
              onClick={() => handleClaim(p.id)}
              disabled={claimingId === p.id}
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition whitespace-nowrap"
            >
              {claimingId === p.id ? 'Claiming...' : 'Claim Pickup'}
            </button>
          )}
        </div>

        {p.status === 'ASSIGNED' && (
          <div className="bg-gray-50 rounded-lg p-3 space-y-3">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Collection Details
            </p>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Waste Category</label>
                <select
                  value={f.wasteCategory || ''}
                  onChange={(e) => updateForm(p.id, 'wasteCategory', e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select...</option>
                  {WASTE_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{WASTE_CATEGORY_LABELS[c]}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Sub-Type</label>
                <select
                  value={f.subType || ''}
                  onChange={(e) => updateForm(p.id, 'subType', e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select...</option>
                  {SUB_TYPES.map((s) => (
                    <option key={s} value={s}>{SUB_TYPE_LABELS[s]}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Actual Qty (kg)</label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={f.actualQuantity || ''}
                  onChange={(e) => updateForm(p.id, 'actualQuantity', e.target.value)}
                  className={inputClass}
                  placeholder="e.g. 4.5"
                />
              </div>
            </div>
            <button
              onClick={() => handleCollect(p.id)}
              disabled={collectingId === p.id || !f.wasteCategory || !f.subType || !f.actualQuantity}
              className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
            >
              {collectingId === p.id ? 'Processing...' : 'Collect & Pay Out'}
            </button>
          </div>
        )}

        {p.status === 'PAID_OUT' && p.payoutAmount && (
          <div className="text-right">
            <span className="text-sm font-semibold text-emerald-600">
              Paid out: ₹{p.payoutAmount}
            </span>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {assigned.length > 0 && (
        <div className="bg-white rounded-xl shadow divide-y">
          <div className="px-4 py-3 bg-indigo-50">
            <h3 className="text-sm font-semibold text-indigo-700">
              Assigned to You ({assigned.length})
            </h3>
          </div>
          {assigned.map(renderPickup)}
        </div>
      )}

      {requested.length > 0 && (
        <div className="bg-white rounded-xl shadow divide-y">
          <div className="px-4 py-3 bg-amber-50">
            <h3 className="text-sm font-semibold text-amber-700">
              Available in Your City ({requested.length})
            </h3>
          </div>
          {requested.map(renderPickup)}
        </div>
      )}
    </div>
  )
}

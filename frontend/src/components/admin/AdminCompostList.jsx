import { useState, useEffect } from 'react'
import { compostService } from '../../services/api'
import { STATUS_COLORS } from '../../utils/constants'

export default function AdminCompostList({ refreshKey }) {
  const [batches, setBatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [distributing, setDistributing] = useState(null)
  const [form, setForm] = useState({})
  const [distributions, setDistributions] = useState({})
  const [showDist, setShowDist] = useState(null)

  useEffect(() => {
    setLoading(true)
    compostService
      .getAll()
      .then((res) => setBatches(res.data.data || res.data || []))
      .catch(() => setBatches([]))
      .finally(() => setLoading(false))
  }, [refreshKey])

  const loadDistributions = async (batchId) => {
    try {
      const res = await compostService.getDistributions(batchId)
      setDistributions((prev) => ({ ...prev, [batchId]: res.data.data || res.data || [] }))
    } catch {}
  }

  const handleDistribute = async (batchId) => {
    const f = form[batchId] || {}
    if (!f.farmerName || !f.quantityGiven) return
    setDistributing(batchId)
    try {
      await compostService.distribute(batchId, {
        farmerName: f.farmerName,
        farmerContact: f.farmerContact || '',
        quantityGiven: Number(f.quantityGiven),
      })
      setForm((prev) => { const n = { ...prev }; delete n[batchId]; return n })
      const res = await compostService.getAll()
      setBatches(res.data.data || res.data || [])
    } catch {} finally {
      setDistributing(null)
    }
  }

  const inputClass =
    'w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm'

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 animate-pulse space-y-3">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
      </div>
    )
  }

  if (batches.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
        No compost batches yet. Biodegradable waste collected from pickups will appear here.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {batches.map((b) => {
        const f = form[b.id] || {}
        const dists = distributions[b.id] || []
        return (
          <div key={b.id} className="bg-white rounded-xl shadow p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">
                  Batch #{b.id} — {b.city}
                </p>
                <p className="text-sm text-gray-500">
                  {b.totalQuantity} kg biodegradable waste
                </p>
              </div>
              <div className="text-right space-y-1">
                <span
                  className={'text-xs font-medium px-2 py-0.5 rounded-full ' +
                    (STATUS_COLORS[b.status] || 'text-gray-600 bg-gray-50')}
                >
                  {b.status?.replace(/_/g, ' ')}
                </span>
                {b.status !== 'DISTRIBUTED' && (
                  <div>
                    <button
                      onClick={() => {
                        setShowDist(showDist === b.id ? null : b.id)
                        if (showDist !== b.id) loadDistributions(b.id)
                      }}
                      className="text-xs text-green-600 hover:text-green-800"
                    >
                      Distribute
                    </button>
                  </div>
                )}
              </div>
            </div>

            {showDist === b.id && b.status !== 'DISTRIBUTED' && (
              <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                <p className="text-xs font-medium text-gray-500 uppercase">Distribute to Farmer</p>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={f.farmerName || ''}
                    onChange={(e) => setForm((prev) => ({ ...prev, [b.id]: { ...prev[b.id], farmerName: e.target.value } }))}
                    className={inputClass}
                    placeholder="Farmer name"
                  />
                  <input
                    type="text"
                    value={f.farmerContact || ''}
                    onChange={(e) => setForm((prev) => ({ ...prev, [b.id]: { ...prev[b.id], farmerContact: e.target.value } }))}
                    className={inputClass}
                    placeholder="Contact (optional)"
                  />
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    max={b.totalQuantity}
                    value={f.quantityGiven || ''}
                    onChange={(e) => setForm((prev) => ({ ...prev, [b.id]: { ...prev[b.id], quantityGiven: e.target.value } }))}
                    className={inputClass}
                    placeholder={`Max ${b.totalQuantity} kg`}
                  />
                </div>
                <button
                  onClick={() => handleDistribute(b.id)}
                  disabled={distributing === b.id || !f.farmerName || !f.quantityGiven}
                  className="px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
                >
                  {distributing === b.id ? 'Processing...' : 'Distribute'}
                </button>
              </div>
            )}

            {showDist === b.id && dists.length > 0 && (
              <div className="text-xs text-gray-500 space-y-1">
                {dists.map((d) => (
                  <div key={d.id} className="flex justify-between">
                    <span>{d.farmerName}{d.farmerContact ? ` (${d.farmerContact})` : ''}</span>
                    <span className="font-medium text-gray-700">{d.quantityGiven} kg</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

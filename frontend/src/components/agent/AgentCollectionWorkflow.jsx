import { useState } from 'react'
import { householdService, pickupService, walletService } from '../../services/api'
import { WASTE_TYPE_LABELS, STATUS_COLORS, WASTE_CATEGORIES, WASTE_CATEGORY_LABELS, SUB_TYPES, SUB_TYPE_LABELS } from '../../utils/constants'

export default function AgentCollectionWorkflow({ onRefresh }) {
  const [phone, setPhone] = useState('')
  const [searching, setSearching] = useState(false)
  const [household, setHousehold] = useState(null)
  const [pickups, setPickups] = useState([])
  const [message, setMessage] = useState(null)
  const [collectingId, setCollectingId] = useState(null)
  const [collectingForm, setCollectingForm] = useState({})
  const [walletCredited, setWalletCredited] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!phone.trim()) return
    setSearching(true)
    setMessage(null)
    setHousehold(null)
    setPickups([])
    setWalletCredited(false)
    try {
      const userRes = await householdService.searchByPhone(phone.trim())
      const user = userRes.data.data || userRes.data
      setHousehold(user)
      const pickupRes = await householdService.getPickups(user.id)
      setPickups(pickupRes.data.data || pickupRes.data || [])
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'No household user found with this phone number' })
    } finally {
      setSearching(false)
    }
  }

  const updateCollectForm = (pickupId, field, value) => {
    setCollectingForm((prev) => ({
      ...prev,
      [pickupId]: { ...prev[pickupId], [field]: value },
    }))
  }

  const handleCollect = async (pickupId) => {
    const f = collectingForm[pickupId] || {}
    if (!f.wasteCategory || !f.subType || !f.actualQuantity) return
    setCollectingId(pickupId)
    setMessage(null)
    try {
      const req = {
        wasteCategory: f.wasteCategory,
        subType: f.subType,
        actualQuantity: Number(f.actualQuantity),
      }
      if (f.bonusCredit && Number(f.bonusCredit) > 0) {
        req.bonusCredit = Number(f.bonusCredit)
        req.bonusDescription = f.bonusDescription || 'Agent bonus credit'
      }
      await pickupService.collect(pickupId, req)
      setMessage({ type: 'success', text: 'Waste collected and wallet credited!' })
      setCollectingForm((prev) => { const n = { ...prev }; delete n[pickupId]; return n })
      const pickupRes = await householdService.getPickups(household.id)
      setPickups(pickupRes.data.data || pickupRes.data || [])
      onRefresh && onRefresh()
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to collect pickup' })
    } finally {
      setCollectingId(null)
    }
  }

  const inputClass =
    'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm'

  const activePickups = pickups.filter((p) => p.status === 'REQUESTED' || p.status === 'ASSIGNED')
  const donePickups = pickups.filter((p) => p.status === 'PAID_OUT' || p.status === 'COLLECTED')

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">Find Household by Phone</h2>

        {message && (
          <div className={'p-3 rounded-lg text-sm ' + (message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700')}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass + ' flex-1'}
            placeholder="Enter household user's mobile number"
            required
          />
          <button
            type="submit"
            disabled={searching}
            className="px-5 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition whitespace-nowrap"
          >
            {searching ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {household && (
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <div className="flex items-center gap-4 pb-4 border-b">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-700 font-bold text-lg">
                {household.name?.charAt(0)?.toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-lg">{household.name}</p>
              <p className="text-sm text-gray-500">{household.phone || 'No phone'} | {household.email}</p>
              <p className="text-xs text-gray-400">{household.city}{household.address ? `, ${household.address}` : ''}</p>
            </div>
          </div>

          {activePickups.length === 0 && donePickups.length === 0 && (
            <p className="text-gray-500 text-sm text-center py-4">No pickup requests found for this household.</p>
          )}

          {activePickups.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-amber-700 mb-3">Pending Pickups ({activePickups.length})</h3>
              <div className="space-y-4">
                {activePickups.map((p) => {
                  const f = collectingForm[p.id] || {}
                  return (
                    <div key={p.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-800">
                              {WASTE_TYPE_LABELS[p.wasteType] || p.wasteType}
                            </span>
                            <span className={'text-xs font-medium px-2 py-0.5 rounded-full ' + (STATUS_COLORS[p.status] || 'text-gray-600 bg-gray-50')}>
                              {p.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">{p.estimatedQuantity} {p.unit} — {p.address || p.city}</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3 space-y-3">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Collect Waste</p>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Category</label>
                            <select value={f.wasteCategory || ''} onChange={(e) => updateCollectForm(p.id, 'wasteCategory', e.target.value)} className={inputClass}>
                              <option value="">Select...</option>
                              {WASTE_CATEGORIES.map((c) => (
                                <option key={c} value={c}>{WASTE_CATEGORY_LABELS[c]}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Sub-Type</label>
                            <select value={f.subType || ''} onChange={(e) => updateCollectForm(p.id, 'subType', e.target.value)} className={inputClass}>
                              <option value="">Select...</option>
                              {SUB_TYPES.map((s) => (
                                <option key={s} value={s}>{SUB_TYPE_LABELS[s]}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Actual Qty (kg)</label>
                            <input type="number" min="0.1" step="0.1" value={f.actualQuantity || ''} onChange={(e) => updateCollectForm(p.id, 'actualQuantity', e.target.value)} className={inputClass} placeholder="e.g. 4.5" />
                          </div>
                        </div>
                        <div className="border-t pt-3 mt-3">
                          <p className="text-xs font-medium text-gray-500 mb-2">Bonus Credit (optional)</p>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Bonus ₹</label>
                              <input type="number" min="0" step="1" value={f.bonusCredit || ''} onChange={(e) => updateCollectForm(p.id, 'bonusCredit', e.target.value)} className={inputClass} placeholder="0" />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Reason</label>
                              <input type="text" value={f.bonusDescription || ''} onChange={(e) => updateCollectForm(p.id, 'bonusDescription', e.target.value)} className={inputClass} placeholder="e.g. Bonus reward" />
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleCollect(p.id)}
                          disabled={collectingId === p.id || !f.wasteCategory || !f.subType || !f.actualQuantity}
                          className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
                        >
                          {collectingId === p.id ? 'Processing...' : 'Collect & Credit Wallet'}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {donePickups.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-green-700 mb-3">Completed ({donePickups.length})</h3>
              <div className="space-y-2">
                {donePickups.map((p) => (
                  <div key={p.id} className="flex items-center justify-between text-sm py-2 border-b last:border-0">
                    <div>
                      <span className="font-medium text-gray-700">{WASTE_TYPE_LABELS[p.wasteType] || p.wasteType}</span>
                      {p.subType && <span className="ml-2 text-xs text-blue-600">{SUB_TYPE_LABELS[p.subType] || p.subType}</span>}
                      <span className="ml-2 text-gray-500">{p.actualQuantity || p.estimatedQuantity} {p.unit}</span>
                    </div>
                    <div className="text-right">
                      {p.payoutAmount && <span className="font-medium text-emerald-600">₹{p.payoutAmount}</span>}
                      <span className={'ml-2 text-xs px-2 py-0.5 rounded-full ' + (STATUS_COLORS[p.status] || 'text-gray-600 bg-gray-50')}>
                        {p.status?.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

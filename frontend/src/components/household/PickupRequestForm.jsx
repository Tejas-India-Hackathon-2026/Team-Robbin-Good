import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { pickupService } from '../../services/api'
import { WASTE_TYPES, WASTE_TYPE_LABELS, UNITS } from '../../utils/constants'

export default function PickupRequestForm({ onCreated }) {
  const { user } = useAuth()
  const [form, setForm] = useState({
    wasteType: WASTE_TYPES[0],
    estimatedQuantity: '',
    unit: 'KG',
    address: user?.address || '',
    city: user?.city || '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    try {
      await pickupService.create({
        ...form,
        estimatedQuantity: Number(form.estimatedQuantity),
      })
      setMessage({ type: 'success', text: 'Pickup request submitted!' })
      setForm((prev) => ({ ...prev, estimatedQuantity: '' }))
      onCreated && onCreated()
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to submit request',
      })
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm'

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-6 space-y-4"
    >
      {message && (
        <div
          className={'p-3 rounded-lg text-sm ' + (message.type === 'success'
            ? 'bg-green-50 text-green-700'
            : 'bg-red-50 text-red-700')}
        >
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Waste Type
          </label>
          <select
            value={form.wasteType}
            onChange={update('wasteType')}
            className={inputClass}
          >
            {WASTE_TYPES.map((t) => (
              <option key={t} value={t}>
                {WASTE_TYPE_LABELS[t]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Unit
          </label>
          <select value={form.unit} onChange={update('unit')} className={inputClass}>
            {UNITS.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Estimated Quantity
        </label>
        <input
          type="number"
          required
          min="1"
          value={form.estimatedQuantity}
          onChange={update('estimatedQuantity')}
          className={inputClass}
          placeholder="e.g. 5"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address
        </label>
        <input
          type="text"
          required
          value={form.address}
          onChange={update('address')}
          className={inputClass}
          placeholder="Pickup address"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          City
        </label>
        <input
          type="text"
          required
          value={form.city}
          onChange={update('city')}
          className={inputClass}
          placeholder="e.g. Mumbai"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 transition text-sm"
      >
        {loading ? 'Submitting...' : 'Request Pickup'}
      </button>
    </form>
  )
}

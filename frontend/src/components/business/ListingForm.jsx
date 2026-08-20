import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { listingService } from '../../services/api'
import { WASTE_TYPES, WASTE_TYPE_LABELS, UNITS } from '../../utils/constants'

export default function ListingForm({ onCreated }) {
  const { user } = useAuth()
  const [form, setForm] = useState({
    wasteType: WASTE_TYPES[0],
    quantity: '',
    unit: 'KG',
    frequency: 'ONE_TIME',
    pricePerUnit: '',
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
      await listingService.create({
        ...form,
        quantity: Number(form.quantity),
        pricePerUnit: Number(form.pricePerUnit),
      })
      setMessage({ type: 'success', text: 'Listing created!' })
      setForm((prev) => ({
        ...prev,
        quantity: '',
        pricePerUnit: '',
      }))
      onCreated?.()
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to create listing',
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
          className={`p-3 rounded-lg text-sm ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Waste Type
          </label>
          <select value={form.wasteType} onChange={update('wasteType')} className={inputClass}>
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <input
            type="number"
            required
            min="1"
            value={form.quantity}
            onChange={update('quantity')}
            className={inputClass}
            placeholder="e.g. 100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price per Unit (₹)
          </label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={form.pricePerUnit}
            onChange={update('pricePerUnit')}
            className={inputClass}
            placeholder="e.g. 25"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Frequency
          </label>
          <select value={form.frequency} onChange={update('frequency')} className={inputClass}>
            <option value="ONE_TIME">One Time</option>
            <option value="WEEKLY">Weekly</option>
            <option value="MONTHLY">Monthly</option>
          </select>
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
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 transition text-sm"
      >
        {loading ? 'Creating...' : 'Create Listing'}
      </button>
    </form>
  )
}

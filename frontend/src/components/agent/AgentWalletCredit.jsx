import { useState } from 'react'
import { householdService, walletService } from '../../services/api'

export default function AgentWalletCredit({ onCredited }) {
  const [phone, setPhone] = useState('')
  const [searching, setSearching] = useState(false)
  const [found, setFound] = useState(null)
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [crediting, setCrediting] = useState(false)
  const [message, setMessage] = useState(null)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!phone.trim()) return
    setSearching(true)
    setFound(null)
    setMessage(null)
    try {
      const res = await householdService.searchByPhone(phone.trim())
      const user = res.data.data || res.data
      setFound(user)
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'No user found with this phone number' })
    } finally {
      setSearching(false)
    }
  }

  const handleCredit = async (e) => {
    e.preventDefault()
    if (!found || !amount || Number(amount) <= 0) return
    setCrediting(true)
    setMessage(null)
    try {
      await walletService.credit({
        householdUserId: found.id,
        amount: Number(amount),
        description: description || 'Manual credit by agent',
      })
      setMessage({ type: 'success', text: `₹${amount} credited to ${found.name}'s wallet` })
      setAmount('')
      setDescription('')
      onCredited && onCredited()
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to credit wallet' })
    } finally {
      setCrediting(false)
    }
  }

  const inputClass =
    'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm'

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Credit Household Wallet</h2>

      {message && (
        <div
          className={'p-3 rounded-lg text-sm ' + (message.type === 'success'
            ? 'bg-green-50 text-green-700'
            : 'bg-red-50 text-red-700')}
        >
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
          className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition whitespace-nowrap"
        >
          {searching ? 'Searching...' : 'Search'}
        </button>
      </form>

      {found && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-700 font-bold text-sm">
                {found.name?.charAt(0)?.toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-800">{found.name}</p>
              <p className="text-sm text-gray-500">{found.phone || found.email}</p>
              <p className="text-xs text-gray-400">{found.city}</p>
            </div>
          </div>

          <form onSubmit={handleCredit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Amount (₹)</label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={inputClass}
                  placeholder="e.g. 50"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={inputClass}
                  placeholder="e.g. Bonus reward"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={crediting || !amount || Number(amount) <= 0}
              className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
            >
              {crediting ? 'Crediting...' : `Credit ₹${amount || 0}`}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { walletService } from '../../services/api'

export default function WalletWidget({ refreshKey }) {
  const { user } = useAuth()
  const [wallet, setWallet] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      walletService.getBalance(user.id),
      walletService.getTransactions(user.id),
    ])
      .then(([wRes, tRes]) => {
        setWallet(wRes.data.data || wRes.data)
        setTransactions(tRes.data.data || tRes.data || [])
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [user.id, refreshKey])

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 animate-pulse space-y-3">
        <div className="h-4 bg-gray-200 rounded w-32 mb-3" />
        <div className="h-10 bg-gray-200 rounded w-24" />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Wallet</h2>

      <div className="bg-emerald-50 rounded-xl p-6 text-center">
        <p className="text-4xl font-bold text-emerald-700">
          ₹{wallet?.totalBalance || '0.00'}
        </p>
        <p className="text-sm text-emerald-600 mt-1">current balance</p>
        <p className="text-xs text-emerald-500 mt-1">
          ₹{wallet?.totalEarnedLifetime || '0.00'} earned lifetime
        </p>
      </div>

      {transactions.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Recent Transactions</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {transactions.slice(0, 5).map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between text-sm py-1 border-b last:border-0"
              >
                <span className="text-gray-700">{t.description || 'Payout'}</span>
                <span className="font-medium text-emerald-600">+₹{t.amount}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

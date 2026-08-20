import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { authService } from '../services/api'
import { ROLE_LABELS } from '../utils/constants'

const ROLE_COLORS = {
  ADMIN: 'bg-red-100 text-red-700',
  BUSINESS_SELLER: 'bg-blue-100 text-blue-700',
  BUSINESS_BUYER: 'bg-purple-100 text-purple-700',
  HOUSEHOLD_USER: 'bg-green-100 text-green-700',
  COLLECTION_AGENT: 'bg-amber-100 text-amber-700',
}

export default function ProfilePage() {
  const { user: authUser } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    authService
      .getMe()
      .then((res) => setProfile(res.data.data || res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-4">
        <div className="bg-white rounded-xl shadow p-8 animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
          Could not load profile.
        </div>
      </div>
    )
  }

  const role = profile.role
  const roleColor = ROLE_COLORS[role] || 'bg-gray-100 text-gray-700'

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center">
          <div className="w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center shadow-lg">
            <span className="text-3xl font-bold text-green-700">
              {profile.name?.charAt(0)?.toUpperCase()}
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-4">{profile.name}</h2>
          <span className={'inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ' + roleColor}>
            {ROLE_LABELS[role] || role}
          </span>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InfoRow label="User ID" value={`#${profile.id}`} />
            <InfoRow label="Email" value={profile.email} />
            <InfoRow label="Phone" value={profile.phone || 'Not provided'} />
            <InfoRow label="City" value={profile.city || 'Not provided'} />
          </div>

          <div className="border-t pt-4">
            <InfoRow label="Address" value={profile.address || 'Not provided'} />
          </div>

          <div className="border-t pt-4">
            <InfoRow label="Member Since" value={profile.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A'} />
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-sm font-medium text-gray-800 mt-1">{value}</p>
    </div>
  )
}

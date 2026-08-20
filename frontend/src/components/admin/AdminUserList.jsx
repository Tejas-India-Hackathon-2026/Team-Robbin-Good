import { useState, useEffect } from 'react'
import { adminService } from '../../services/api'
import { ROLE_LABELS, ROLE_COLORS } from '../../utils/constants'

export default function AdminUserList({ refreshKey }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [roleFilter, setRoleFilter] = useState('')

  const fetchUsers = () => {
    setLoading(true)
    const params = roleFilter ? { role: roleFilter } : {}
    adminService
      .getUsers(params)
      .then((res) => setUsers(res.data.data || res.data || []))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchUsers()
  }, [refreshKey, roleFilter])

  const inputClass =
    'px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm'

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow p-4 flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[180px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className={inputClass}>
            <option value="">All Roles</option>
            <option value="BUSINESS_SELLER">Business Seller</option>
            <option value="BUSINESS_BUYER">Business Buyer</option>
            <option value="HOUSEHOLD_USER">Household User</option>
            <option value="COLLECTION_AGENT">Collection Agent</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <span className="text-sm text-gray-500 py-2">{users.length} users</span>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow p-6 animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      ) : users.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">No users found.</div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium text-gray-600">ID</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Name</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Email</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Role</th>
                  <th className="px-4 py-3 font-medium text-gray-600">City</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Phone</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-500">#{u.id}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{u.name}</td>
                    <td className="px-4 py-3 text-gray-600">{u.email}</td>
                    <td className="px-4 py-3">
                      <span className={'text-xs font-medium px-2 py-1 rounded-full ' + (ROLE_COLORS[u.role] || 'text-gray-600 bg-gray-50')}>
                        {ROLE_LABELS[u.role] || u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{u.city || '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{u.phone || '—'}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

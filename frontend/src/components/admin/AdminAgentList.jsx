import { useState, useEffect } from 'react'
import { adminService } from '../../services/api'

export default function AdminAgentList({ refreshKey }) {
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    adminService
      .getAgents()
      .then((res) => setAgents(res.data.data || res.data || []))
      .catch(() => setAgents([]))
      .finally(() => setLoading(false))
  }, [refreshKey])

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 animate-pulse space-y-3">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>
    )
  }

  if (agents.length === 0) {
    return <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">No agents found.</div>
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-600">ID</th>
              <th className="px-4 py-3 font-medium text-gray-600">User ID</th>
              <th className="px-4 py-3 font-medium text-gray-600">Assigned City</th>
              <th className="px-4 py-3 font-medium text-gray-600">Active</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {agents.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500">#{a.id}</td>
                <td className="px-4 py-3 text-gray-600">#{a.userId}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{a.assignedCity}</td>
                <td className="px-4 py-3">
                  <span className={a.isActive ? 'text-green-600 font-medium' : 'text-red-500'}>
                    {a.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

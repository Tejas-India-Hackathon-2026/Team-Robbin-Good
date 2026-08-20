import { useState, useEffect } from 'react'
import { adminService } from '../../services/api'
import { WASTE_TYPE_LABELS, STATUS_COLORS } from '../../utils/constants'

export default function AdminPickupList({ refreshKey }) {
  const [pickups, setPickups] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    adminService
      .getPickups()
      .then((res) => setPickups(res.data.data || res.data || []))
      .catch(() => setPickups([]))
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

  if (pickups.length === 0) {
    return <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">No pickup requests found.</div>
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-600">ID</th>
              <th className="px-4 py-3 font-medium text-gray-600">User</th>
              <th className="px-4 py-3 font-medium text-gray-600">Waste Type</th>
              <th className="px-4 py-3 font-medium text-gray-600">Qty</th>
              <th className="px-4 py-3 font-medium text-gray-600">City</th>
              <th className="px-4 py-3 font-medium text-gray-600">Agent</th>
              <th className="px-4 py-3 font-medium text-gray-600">CO2 Saved</th>
              <th className="px-4 py-3 font-medium text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {pickups.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500">#{p.id}</td>
                <td className="px-4 py-3 text-gray-600">#{p.householdUserId}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{WASTE_TYPE_LABELS[p.wasteType] || p.wasteType}</td>
                <td className="px-4 py-3 text-gray-600">{p.estimatedQuantity} {p.unit}</td>
                <td className="px-4 py-3 text-gray-600">{p.city}</td>
                <td className="px-4 py-3 text-gray-600">{p.assignedAgentId ? `#${p.assignedAgentId}` : '—'}</td>
                <td className="px-4 py-3 text-emerald-600 font-medium">{p.co2SavedKg} kg</td>
                <td className="px-4 py-3">
                  <span className={'text-xs font-medium px-2 py-1 rounded-full ' + (STATUS_COLORS[p.status] || 'text-gray-600 bg-gray-50')}>
                    {p.status}
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

import { useState, useEffect } from 'react'
import { adminService } from '../../services/api'
import { WASTE_TYPE_LABELS, STATUS_COLORS } from '../../utils/constants'

export default function AdminListingList({ refreshKey }) {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    adminService
      .getListings()
      .then((res) => setListings(res.data.data || res.data || []))
      .catch(() => setListings([]))
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

  if (listings.length === 0) {
    return <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">No listings found.</div>
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-600">ID</th>
              <th className="px-4 py-3 font-medium text-gray-600">Waste Type</th>
              <th className="px-4 py-3 font-medium text-gray-600">Seller ID</th>
              <th className="px-4 py-3 font-medium text-gray-600">Qty</th>
              <th className="px-4 py-3 font-medium text-gray-600">Unit</th>
              <th className="px-4 py-3 font-medium text-gray-600">Price/Unit</th>
              <th className="px-4 py-3 font-medium text-gray-600">City</th>
              <th className="px-4 py-3 font-medium text-gray-600">Frequency</th>
              <th className="px-4 py-3 font-medium text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {listings.map((l) => (
              <tr key={l.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500">#{l.id}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{WASTE_TYPE_LABELS[l.wasteType] || l.wasteType}</td>
                <td className="px-4 py-3 text-gray-600">#{l.sellerId}</td>
                <td className="px-4 py-3 text-gray-600">{l.quantity}</td>
                <td className="px-4 py-3 text-gray-600">{l.unit}</td>
                <td className="px-4 py-3 text-gray-600">{l.pricePerUnit != null ? `₹${l.pricePerUnit}` : '—'}</td>
                <td className="px-4 py-3 text-gray-600">{l.city}</td>
                <td className="px-4 py-3 text-gray-600 text-xs">{l.frequency}</td>
                <td className="px-4 py-3">
                  <span className={'text-xs font-medium px-2 py-1 rounded-full ' + (STATUS_COLORS[l.status] || 'text-gray-600 bg-gray-50')}>
                    {l.status}
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

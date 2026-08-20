// import { useState, useEffect } from 'react'
// import { adminService } from '../../services/api'
// import { WASTE_TYPE_LABELS, STATUS_COLORS } from '../../utils/constants'

// export default function AdminTransactionList({ refreshKey }) {
//   const [payment, setpayment] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     setLoading(true)
//     adminService
//       .getpayment()
//       .then((res) => setpayment(res.data.data || res.data || []))
//       .catch(() => setpayment([]))
//       .finally(() => setLoading(false))
//   }, [refreshKey])

//   if (loading) {
//     return (
//       <div className="bg-white rounded-xl shadow p-6 animate-pulse space-y-3">
//         <div className="h-4 bg-gray-200 rounded w-full" />
//         <div className="h-4 bg-gray-200 rounded w-2/3" />
//       </div>
//     )
//   }

//   if (payment.length === 0) {
//     return <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">No payment found.</div>
//   }

//   return (
//     <div className="bg-white rounded-xl shadow overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-50 text-left">
//             <tr>
//               <th className="px-4 py-3 font-medium text-gray-600">ID</th>
//               <th className="px-4 py-3 font-medium text-gray-600">Listing</th>
//               <th className="px-4 py-3 font-medium text-gray-600">Seller</th>
//               <th className="px-4 py-3 font-medium text-gray-600">Buyer</th>
//               <th className="px-4 py-3 font-medium text-gray-600">Qty</th>
//               <th className="px-4 py-3 font-medium text-gray-600">Price</th>
//               <th className="px-4 py-3 font-medium text-gray-600">Commission</th>
//               <th className="px-4 py-3 font-medium text-gray-600">CO2 Saved</th>
//               <th className="px-4 py-3 font-medium text-gray-600">Status</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y">
//             {payment.map((t) => (
//               <tr key={t.id} className="hover:bg-gray-50">
//                 <td className="px-4 py-3 text-gray-500">#{t.id}</td>
//                 <td className="px-4 py-3 text-gray-600">#{t.listingId}</td>
//                 <td className="px-4 py-3 text-gray-600">#{t.sellerId}</td>
//                 <td className="px-4 py-3 text-gray-600">#{t.buyerId}</td>
//                 <td className="px-4 py-3 text-gray-600">{t.agreedQuantity}</td>
//                 <td className="px-4 py-3 text-gray-600">₹{t.agreedPrice}</td>
//                 <td className="px-4 py-3 text-gray-600">₹{t.commissionAmount}</td>
//                 <td className="px-4 py-3 text-emerald-600 font-medium">{t.co2SavedKg} kg</td>
//                 <td className="px-4 py-3">
//                   <span className={'text-xs font-medium px-2 py-1 rounded-full ' + (STATUS_COLORS[t.status] || 'text-gray-600 bg-gray-50')}>
//                     {t.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

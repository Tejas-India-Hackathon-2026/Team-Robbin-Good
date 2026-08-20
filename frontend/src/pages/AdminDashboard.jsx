import { useState } from 'react'
import AggregationBatchList from '../components/admin/AggregationBatchList'
import SellBatchForm from '../components/admin/SellBatchForm'

export default function AdminDashboard() {
  const [refreshKey, setRefreshKey] = useState(0)
  const [selectedBatch, setSelectedBatch] = useState(null)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>

      <AggregationBatchList
        refreshKey={refreshKey}
        onSelectBatch={setSelectedBatch}
      />

      {selectedBatch && (
        <SellBatchForm
          batch={selectedBatch}
          onSold={() => {
            setSelectedBatch(null)
            setRefreshKey((k) => k + 1)
          }}
        />
      )}
    </div>
  )
}

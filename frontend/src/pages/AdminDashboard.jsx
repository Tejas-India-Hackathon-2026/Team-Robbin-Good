import { useState } from 'react'
import AggregationBatchList from '../components/admin/AggregationBatchList'
import SellBatchForm from '../components/admin/SellBatchForm'

export default function AdminDashboard() {
  const [refreshKey, setRefreshKey] = useState(0)
  const [selectedBatch, setSelectedBatch] = useState(null)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">

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

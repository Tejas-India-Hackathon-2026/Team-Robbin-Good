import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'

export default function ImpactDashboard({
  wasteDiverted = 0,
  co2Saved = 0,
  moneySaved = 0,
  history = [],
}) {
  const chartData = history.length > 0
    ? history.map((h) => ({
        name: h.label || h.date || h.period || 'Period',
        waste: h.waste || h.quantity || h.amount || 0,
      }))
    : [
        { name: 'Jan', waste: 120 },
        { name: 'Feb', waste: 200 },
        { name: 'Mar', waste: 150 },
        { name: 'Apr', waste: 300 },
        { name: 'May', waste: 250 },
        { name: 'Jun', waste: 400 },
      ]

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-700">Impact Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-xl shadow p-5 text-center">
          <p className="text-sm text-green-600 font-medium">Waste Diverted</p>
          <p className="text-3xl font-bold text-green-700 mt-1">
            {wasteDiverted} kg
          </p>
        </div>
        <div className="bg-blue-50 rounded-xl shadow p-5 text-center">
          <p className="text-sm text-blue-600 font-medium">CO2 Saved</p>
          <p className="text-3xl font-bold text-blue-700 mt-1">
            {co2Saved} kg
          </p>
        </div>
        <div className="bg-amber-50 rounded-xl shadow p-5 text-center">
          <p className="text-sm text-amber-600 font-medium">
            Money Earned/Saved
          </p>
          <p className="text-3xl font-bold text-amber-700 mt-1">
            ₹{moneySaved.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-sm font-medium text-gray-600 mb-4">
          Waste Diverted Over Time
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="waste" fill="#16a34a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

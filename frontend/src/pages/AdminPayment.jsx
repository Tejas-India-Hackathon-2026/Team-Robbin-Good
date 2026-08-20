import { useState } from 'react'

const initialForm = {
    recipient: '',
    amount: '',
    method: 'BANK_TRANSFER',
    reference: '',
}

export default function AdminPayment({ onPaymentRecorded }) {
    const [form, setForm] = useState(initialForm)
    const [message, setMessage] = useState(null)

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm((currentForm) => ({ ...currentForm, [name]: value }))
        setMessage(null)
    }

    const loadDemoPayment = () => {
        setForm({ ...demoPayment, amount: String(demoPayment.amount) })
        setMessage(null)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const amount = Number(form.amount)

        if (!form.recipient.trim() || !Number.isFinite(amount) || amount <= 0) {
            setMessage({
                type: 'error',
                text: 'Enter a recipient and a payment amount greater than zero.',
            })
            return
        }

        const payment = {
            ...form,
            recipient: form.recipient.trim(),
            amount,
            createdAt: new Date().toISOString(),
        }

        onPaymentRecorded?.(payment)
        setForm(initialForm)
        setMessage({ type: 'success', text: 'Payment recorded successfully.' })
    }

    const inputClass =
        'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm'

    return (
        <section className="bg-white rounded-xl shadow p-6 space-y-4 max-w-lg">
            <div>
                <h2 className="text-lg font-semibold text-gray-700">Record Payment</h2>
                <p className="text-sm text-gray-500 mt-1">
                    Record an outgoing payment for an approved marketplace transaction.
                </p>
            </div>

            {message && (
                <div
                    className={`p-3 rounded-lg text-sm ${
                        message.type === 'success'
                            ? 'bg-green-50 text-green-700'
                            : 'bg-red-50 text-red-700'
                    }`}
                    role="status"
                >
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="payment-recipient" className="block text-sm font-medium text-gray-700 mb-1">
                        Recipient
                    </label>
                    <input
                        id="payment-recipient"
                        name="recipient"
                        type="text"
                        required
                        value={form.recipient}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Recipient name or user ID"
                    />
                </div>

                <div>
                    <label htmlFor="payment-amount" className="block text-sm font-medium text-gray-700 mb-1">
                        Amount (₹)
                    </label>
                    <input
                        id="payment-amount"
                        name="amount"
                        type="number"
                        required
                        min="0.01"
                        step="0.01"
                        value={form.amount}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Payment amount"
                    />
                </div>

                <div>
                    <label htmlFor="payment-method" className="block text-sm font-medium text-gray-700 mb-1">
                        Payment Method
                    </label>
                    <select
                        id="payment-method"
                        name="method"
                        value={form.method}
                        onChange={handleChange}
                        className={inputClass}
                    >
                        <option value="BANK_TRANSFER">Bank transfer</option>
                        <option value="UPI">UPI</option>
                        <option value="CASH">Cash</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="payment-reference" className="block text-sm font-medium text-gray-700 mb-1">
                        Reference (optional)
                    </label>
                    <input
                        id="payment-reference"
                        name="reference"
                        type="text"
                        value={form.reference}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Transaction reference"
                    />
                </div>

                <button
                    type="submit"
                    className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition text-sm"
                >
                    Record Payment
                </button>
            </form>
        </section>
    )
}

const demoPayment = {
    recipient: 'Aarav Sharma',
    amount: 1250,
    method: 'UPI',
    reference: 'DEMO-UPI-1024',
}

const formatRupees = (amount) =>
    new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount)

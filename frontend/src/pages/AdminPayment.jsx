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
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [sendEmail, setSendEmail] = useState(true)

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm((currentForm) => ({ ...currentForm, [name]: value }))
        setMessage(null)
    }

    const loadDemoPayment = () => {
        setForm({ ...demoPayment, amount: String(demoPayment.amount) })
        setMessage(null)
    }

    const validateUPI = (id) => /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/.test(id)

    const checkPaymentLimit = (amount) => amount <= 50000

    const generateTransactionId = () => 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase()

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

        if (!checkPaymentLimit(amount)) {
            setMessage({
                type: 'error',
                text: 'Amount exceeds maximum limit of ₹50,000.',
            })
            return
        }

        if (form.method === 'UPI' && form.recipient.includes('@') && !validateUPI(form.recipient)) {
            setMessage({ type: 'error', text: 'Invalid UPI ID format.' })
            return
        }

        setIsSubmitting(true)
        setTimeout(() => {
            const payment = {
                ...form,
                reference: form.reference || generateTransactionId(),
                recipient: form.recipient.trim(),
                amount,
                createdAt: new Date().toISOString(),
            }

            onPaymentRecorded?.(payment)
            setForm(initialForm)
            setMessage({ type: 'success', text: `Payment recorded successfully.${sendEmail ? ' Email sent.' : ''}` })
            setIsSubmitting(false)
        }, 1000)
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

            <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=960&q=80"
                alt="Person completing a digital payment"
                className="h-32 w-full rounded-lg object-cover"
            />

            <div className="rounded-lg border border-green-100 bg-green-50 p-4 relative">
                <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
                    Demo payment
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-800">
                    {demoPayment.recipient}
                </p>
                <p className="mt-2 text-2xl font-bold text-green-700">
                    {formatRupees(demoPayment.amount)}
                </p>
                <p className="mt-1 text-xs text-gray-600">
                    {demoPayment.method} · {demoPayment.reference}
                </p>
                <button
                    type="button"
                    onClick={loadDemoPayment}
                    className="absolute top-4 right-4 px-3 py-1 bg-white border border-green-200 text-green-700 rounded text-xs font-medium hover:bg-green-100 transition"
                >
                    Load Demo
                </button>
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

                <div>
                    <label className="flex items-center space-x-2 text-sm text-gray-700">
                        <input type="checkbox" checked={sendEmail} onChange={(e) => setSendEmail(e.target.checked)} className="rounded text-green-600 focus:ring-green-500" />
                        <span>Send email notification to recipient</span>
                    </label>
                </div>
                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition text-sm disabled:opacity-50 flex items-center justify-center min-w-35"
                    >
                        {isSubmitting ? 'Recording...' : 'Record Payment'}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setForm(initialForm)
                            setMessage(null)
                        }}
                        className="px-5 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition text-sm"
                    >
                        Clear Form
                    </button>
                </div>
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

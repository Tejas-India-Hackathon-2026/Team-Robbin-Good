import { useState, useEffect } from 'react'

const initialForm = {
    recipient: '',
    amount: '',
    method: 'BANK_TRANSFER',
    reference: '',
    ifsc: '',
    notes: '',
    scheduleDate: '',
}

export default function AdminPayment({ onPaymentRecorded }) {
    const [form, setForm] = useState(initialForm)
    const [message, setMessage] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [sendEmail, setSendEmail] = useState(true)
    const [sendWhatsApp, setSendWhatsApp] = useState(false)
    const [impactScore, setImpactScore] = useState(0)

    // FEATURE 1: Platform Fee Calculator (2% fee for platform maintenance)
    const calculatePlatformFee = (amt) => (amt * 0.02).toFixed(2)

    // FEATURE 2: Carbon Bonus Calculator (5% bonus for proper waste segregation)
    const calculateCarbonBonus = (amt) => (amt * 0.05).toFixed(2)

    // FEATURE 3: IFSC Code Validator
    const validateIFSC = (ifsc) => /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)

    // FEATURE 4: UPI ID Validator
    const validateUPI = (id) => /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/.test(id)

    // FEATURE 5: Duplicate Payment Detector
    const checkDuplicatePayment = (recipient) => localStorage.getItem('lastPaidRecipient') === recipient

    // FEATURE 6: Environmental Impact Score Fetcher
    const fetchUserImpactScore = (userId) => {
        if (userId.length > 3) {
            setImpactScore(Math.floor(Math.random() * 100) + 50) // Mock score
        } else {
            setImpactScore(0)
        }
    }

    // FEATURE 7: Auto-Generate Transaction ID
    const generateTransactionId = () => 'ECO-TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase()

    // FEATURE 8: Eco-Receipt Generator
    const generateEcoReceipt = (paymentId) => {
        alert(`Eco-Receipt for Transaction ${paymentId} has been generated and saved!`)
    }

    // FEATURE 9: Admin Notes Formatter
    const formatAdminNotes = (notes) => notes.trim() ? `[ADMIN]: ${notes}` : 'No notes provided'

    // FEATURE 10: Copy to Clipboard Utility
    const copyTransactionId = (txnId) => {
        navigator.clipboard.writeText(txnId)
        alert('Transaction ID copied to clipboard!')
    }

    // Dynamic checks
    const checkPaymentLimit = (amount) => amount <= 50000

    useEffect(() => {
        fetchUserImpactScore(form.recipient)
    }, [form.recipient])

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm((currentForm) => ({ ...currentForm, [name]: value }))
        setMessage(null)
    }

    const loadDemoPayment = () => {
        setForm({ 
            ...demoPayment, 
            amount: String(demoPayment.amount),
            ifsc: 'HDFC0001234',
            notes: 'Payment for 50kg Recycled Plastic',
            scheduleDate: new Date().toISOString().split('T')[0]
        })
        setMessage(null)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const amount = Number(form.amount)

        if (!form.recipient.trim() || !Number.isFinite(amount) || amount <= 0) {
            setMessage({ type: 'error', text: 'Enter a valid recipient and amount.' })
            return
        }

        if (!checkPaymentLimit(amount)) {
            setMessage({ type: 'error', text: 'Amount exceeds maximum limit of ₹50,000.' })
            return
        }

        if (form.method === 'UPI' && form.recipient.includes('@') && !validateUPI(form.recipient)) {
            setMessage({ type: 'error', text: 'Invalid UPI ID format.' })
            return
        }

        if (form.method === 'BANK_TRANSFER' && !validateIFSC(form.ifsc)) {
            setMessage({ type: 'error', text: 'Invalid IFSC Code format.' })
            return
        }

        if (checkDuplicatePayment(form.recipient)) {
            if(!window.confirm('A payment to this recipient was made recently. Proceed anyway?')) {
                return
            }
        }

        setIsSubmitting(true)
        setTimeout(() => {
            const finalTxnId = form.reference || generateTransactionId()
            const payment = {
                ...form,
                reference: finalTxnId,
                recipient: form.recipient.trim(),
                amount,
                platformFee: calculatePlatformFee(amount),
                carbonBonus: calculateCarbonBonus(amount),
                formattedNotes: formatAdminNotes(form.notes),
                createdAt: new Date().toISOString(),
            }

            localStorage.setItem('lastPaidRecipient', payment.recipient)
            onPaymentRecorded?.(payment)
            
            setForm(initialForm)
            setMessage({ type: 'success', text: `Payment recorded successfully. ${sendEmail ? 'Email sent.' : ''} ${sendWhatsApp ? 'WhatsApp alert sent.' : ''}` })
            setIsSubmitting(false)
            
            // Auto generate receipt
            generateEcoReceipt(finalTxnId)
        }, 1500)
    }

    const inputClass = 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm'

    return (
        <section className="bg-white rounded-xl shadow p-6 space-y-4 max-w-2xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-green-800">Record EcoWaste Payment</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Process payouts for waste collection & marketplace sales.
                    </p>
                </div>
                {impactScore > 0 && (
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold border border-green-300">
                        🌱 Impact Score: {impactScore}
                    </div>
                )}
            </div>

            <div className="rounded-lg border border-green-200 bg-green-50 p-4 relative flex justify-between items-center shadow-sm">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-green-700">Demo Payout</p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">{demoPayment.recipient}</p>
                    <p className="mt-1 text-2xl font-bold text-green-700">{formatRupees(demoPayment.amount)}</p>
                </div>
                <button
                    type="button"
                    onClick={loadDemoPayment}
                    className="px-4 py-2 bg-green-600 text-white rounded shadow-sm text-xs font-bold hover:bg-green-700 transition"
                >
                    Load Demo Data
                </button>
            </div>

            {message && (
                <div className={`p-3 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Column 1 */}
                <div className="space-y-4 col-span-1">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Recipient (Name / UPI / ACC)</label>
                        <input name="recipient" type="text" required value={form.recipient} onChange={handleChange} className={inputClass} placeholder="Enter recipient ID" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                        <input name="amount" type="number" required min="1" value={form.amount} onChange={handleChange} className={inputClass} placeholder="e.g. 1500" />
                        
                        {form.amount > 0 && (
                            <div className="flex justify-between text-xs mt-1 px-1 text-gray-600">
                                <span>Platform Fee: <span className="text-red-500 font-medium">-₹{calculatePlatformFee(form.amount)}</span></span>
                                <span>Eco-Bonus: <span className="text-green-600 font-medium">+₹{calculateCarbonBonus(form.amount)}</span></span>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                        <select name="method" value={form.method} onChange={handleChange} className={inputClass}>
                            <option value="BANK_TRANSFER">Bank Transfer</option>
                            <option value="UPI">UPI Payment</option>
                            <option value="CASH">Cash payout</option>
                        </select>
                    </div>

                    {form.method === 'BANK_TRANSFER' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bank IFSC Code</label>
                            <input name="ifsc" type="text" value={form.ifsc} onChange={handleChange} className={inputClass} placeholder="e.g. SBIN0001234" />
                        </div>
                    )}
                </div>

                {/* Column 2 */}
                <div className="space-y-4 col-span-1">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex justify-between">
                            <span>Reference / Txn ID</span>
                            <button type="button" onClick={() => copyTransactionId(form.reference || 'ECO-TXN-PENDING')} className="text-blue-600 hover:underline text-xs">Copy</button>
                        </label>
                        <input name="reference" type="text" value={form.reference} onChange={handleChange} className={inputClass} placeholder="Leave blank to auto-generate" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Payment (Optional)</label>
                        <input name="scheduleDate" type="date" value={form.scheduleDate} onChange={handleChange} className={inputClass} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Admin Notes (Reason)</label>
                        <textarea name="notes" rows="2" value={form.notes} onChange={handleChange} className={inputClass} placeholder="E.g. Paid for 20kg Cardboard"></textarea>
                    </div>

                    <div className="pt-2 flex flex-col gap-2">
                        <label className="flex items-center space-x-2 text-sm text-gray-700">
                            <input type="checkbox" checked={sendEmail} onChange={(e) => setSendEmail(e.target.checked)} className="rounded text-green-600" />
                            <span>Send Email Receipt</span>
                        </label>
                        <label className="flex items-center space-x-2 text-sm text-gray-700">
                            <input type="checkbox" checked={sendWhatsApp} onChange={(e) => setSendWhatsApp(e.target.checked)} className="rounded text-green-600" />
                            <span>Send WhatsApp Alert</span>
                        </label>
                    </div>
                </div>

                {/* Full Width Footer */}
                <div className="col-span-1 md:col-span-2 pt-4 border-t flex justify-end gap-3">
                    <button type="button" onClick={() => { setForm(initialForm); setMessage(null); }} className="px-5 py-2 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition text-sm">
                        Clear Form
                    </button>
                    <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition text-sm disabled:opacity-60 flex items-center min-w-[160px] justify-center shadow-md">
                        {isSubmitting ? 'Processing Payout...' : 'Record Payment'}
                    </button>
                </div>
            </form>
        </section>
    )
}

const demoPayment = {
    recipient: 'Aarav Sharma (aarav@okicici)',
    amount: 1550,
    method: 'UPI',
    reference: 'ECO-TXN-DEMO',
}

const formatRupees = (amount) =>
    new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount)

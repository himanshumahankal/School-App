import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Pencil } from 'lucide-react';
import { useState } from 'react';

interface Fee {
    id: number;
    fee_type: string;
    amount: number;
    due_date: string;
    status: string;
    paid_date: string | null;
    remarks: string | null;
    student: { name: string; roll_number: string };
}

export default function FeesEdit() {
    const pageProps = (window as unknown as { page: { props: { fee: Fee } } }).page.props;
    const fee = pageProps?.props?.fee;

    const [formData, setFormData] = useState({
        fee_type: fee?.fee_type || '',
        amount: fee?.amount?.toString() || '',
        due_date: fee?.due_date || '',
        status: fee?.status || 'pending',
        paid_date: fee?.paid_date || '',
        remarks: fee?.remarks || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(route('admin.fees.update', fee?.id), formData);
    };

    return (
        <AppLayout>
            <Head title="Edit Fee" />

            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div className="mx-auto max-w-2xl p-6">
                    <div className="mb-8">
                        <div className="mb-6 flex items-center gap-4">
                            <Link
                                href="/admin/fees"
                                className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-2.5 transition-all hover:border-slate-600 hover:bg-slate-700"
                            >
                                <ArrowLeft className="h-5 w-5 text-slate-400" />
                            </Link>
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold tracking-tight text-white">Edit Fee</h1>
                                <p className="mt-1 text-slate-400">Update fee record for {fee?.student?.name}</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">Fee Type</label>
                            <input
                                type="text"
                                value={formData.fee_type}
                                onChange={(e) => setFormData({ ...formData, fee_type: e.target.value })}
                                placeholder="e.g., Tuition Fee, Exam Fee"
                                className="w-full rounded-xl border border-slate-600/50 bg-slate-900/50 py-3 px-4 text-white placeholder-slate-400 transition-all focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">Amount (₹)</label>
                            <input
                                type="number"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                placeholder="Enter amount"
                                min="0"
                                step="0.01"
                                className="w-full rounded-xl border border-slate-600/50 bg-slate-900/50 py-3 px-4 text-white placeholder-slate-400 transition-all focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">Due Date</label>
                            <input
                                type="date"
                                value={formData.due_date}
                                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                                className="w-full rounded-xl border border-slate-600/50 bg-slate-900/50 py-3 px-4 text-white transition-all focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full rounded-xl border border-slate-600/50 bg-slate-900/50 py-3 px-4 text-white transition-all focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                            >
                                <option value="pending">Pending</option>
                                <option value="paid">Paid</option>
                            </select>
                        </div>

                        {formData.status === 'paid' && (
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">Paid Date</label>
                                <input
                                    type="date"
                                    value={formData.paid_date}
                                    onChange={(e) => setFormData({ ...formData, paid_date: e.target.value })}
                                    className="w-full rounded-xl border border-slate-600/50 bg-slate-900/50 py-3 px-4 text-white transition-all focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                                />
                            </div>
                        )}

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">Remarks</label>
                            <textarea
                                value={formData.remarks}
                                onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                                placeholder="Optional remarks"
                                rows={3}
                                className="w-full rounded-xl border border-slate-600/50 bg-slate-900/50 py-3 px-4 text-white placeholder-slate-400 transition-all focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                            />
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="flex-1 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 py-3 font-medium text-white shadow-lg shadow-emerald-500/20 transition-all hover:from-emerald-500 hover:to-cyan-500"
                            >
                                <Pencil className="mr-2 inline h-4 w-4" />
                                Update Fee
                            </button>
                            <Link
                                href="/admin/fees"
                                className="flex-1 rounded-xl border border-slate-600/50 py-3 text-center font-medium text-slate-300 transition-all hover:bg-slate-700"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
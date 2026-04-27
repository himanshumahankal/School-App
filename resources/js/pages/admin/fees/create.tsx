import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Plus } from 'lucide-react';
import { useState } from 'react';

interface Student {
    id: number;
    name: string;
    roll_number: string;
    class: { name: string } | null;
}

export default function FeesCreate() {
    const pageProps = (window as unknown as { page: { props: { students: Student[] } } }).page.props;
    const students = pageProps?.props?.students || [];
    const [formData, setFormData] = useState({
        student_id: '',
        fee_type: '',
        amount: '',
        due_date: '',
        status: 'pending',
        paid_date: '',
        remarks: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('admin.fees.store'), formData);
    };

    return (
        <AppLayout>
            <Head title="Add Fee" />

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
                                <h1 className="text-3xl font-bold tracking-tight text-white">Add New Fee</h1>
                                <p className="mt-1 text-slate-400">Create a new fee record for a student</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">Student</label>
                            <select
                                value={formData.student_id}
                                onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                                className="w-full rounded-xl border border-slate-600/50 bg-slate-900/50 py-3 px-4 text-white transition-all focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                                required
                            >
                                <option value="">Select Student</option>
                                {students.map((student) => (
                                    <option key={student.id} value={student.id}>
                                        {student.name} - {student.roll_number} ({student.class?.name})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">Fee Type</label>
                            <input
                                type="text"
                                value={formData.fee_type}
                                onChange={(e) => setFormData({ ...formData, fee_type: e.target.value })}
                                placeholder="e.g., Tuition Fee, Exam Fee, Transport Fee"
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
                                <Plus className="mr-2 inline h-4 w-4" />
                                Create Fee
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
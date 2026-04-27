import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { ArrowLeft, CreditCard, Plus, Search, Pencil, Trash2, DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

interface Fee {
    id: number;
    fee_type: string;
    amount: number;
    due_date: string;
    status: 'pending' | 'paid';
    paid_date: string | null;
    remarks: string | null;
    student: {
        id: number;
        name: string;
        roll_number: string;
        class: { name: string } | null;
    };
}

export default function FeesIndex() {
    const pageProps = usePage().props as unknown as {
        fees: {
            data: Fee[];
            total: number;
        };
        filters: { search?: string; status?: string };
    };

    const { fees, filters } = pageProps;
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this fee record?')) {
            router.delete(route('admin.fees.destroy', id));
        }
    };

    const filteredFees = fees.data.filter((fee) => {
        const matchesSearch =
            fee.student.name.toLowerCase().includes(search.toLowerCase()) ||
            fee.student.roll_number.toLowerCase().includes(search.toLowerCase()) ||
            fee.fee_type.toLowerCase().includes(search.toLowerCase());

        const matchesStatus = !statusFilter || fee.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const totalPending = fees.data.filter(f => f.status === 'pending').length;
    const totalPaid = fees.data.filter(f => f.status === 'paid').length;
    const totalAmount = fees.data.reduce((sum, f) => sum + Number(f.amount), 0);
    const pendingAmount = fees.data.filter(f => f.status === 'pending').reduce((sum, f) => sum + Number(f.amount), 0);

    return (
        <AppLayout>
            <Head title="Fees" />

            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div className="mx-auto max-w-7xl p-6">
                    <div className="mb-8">
                        <div className="mb-6 flex items-center gap-4">
                            <Link
                                href="/admin/dashboard"
                                className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-2.5 transition-all hover:border-slate-600 hover:bg-slate-700"
                            >
                                <ArrowLeft className="h-5 w-5 text-slate-400" />
                            </Link>
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold tracking-tight text-white">Fees Management</h1>
                                <p className="mt-1 text-slate-400">Manage student fee records and payments</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/admin/fees/create"
                                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-5 py-2.5 font-medium text-white shadow-lg shadow-emerald-500/20 transition-all hover:from-emerald-500 hover:to-cyan-500"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Fee
                                </Link>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                            <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-600/20 to-cyan-800/20 p-5 backdrop-blur-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-cyan-300">Total Fees</p>
                                        <p className="mt-1 text-3xl font-bold text-white">₹{totalAmount.toLocaleString()}</p>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/20">
                                        <CreditCard className="h-6 w-6 text-cyan-400" />
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-600/20 to-green-800/20 p-5 backdrop-blur-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-green-300">Paid Amount</p>
                                        <p className="mt-1 text-3xl font-bold text-white">₹{(totalAmount - pendingAmount).toLocaleString()}</p>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/20">
                                        <CheckCircle className="h-6 w-6 text-green-400" />
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-600/20 to-amber-800/20 p-5 backdrop-blur-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-amber-300">Pending Amount</p>
                                        <p className="mt-1 text-3xl font-bold text-white">₹{pendingAmount.toLocaleString()}</p>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20">
                                        <Clock className="h-6 w-6 text-amber-400" />
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-600/20 to-blue-800/20 p-5 backdrop-blur-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-blue-300">Total Records</p>
                                        <p className="mt-1 text-3xl font-bold text-white">{fees.total}</p>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20">
                                        <DollarSign className="h-6 w-6 text-blue-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
                        <div className="border-b border-slate-700/50 p-6">
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <div className="relative flex-1">
                                    <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by student name, roll number or fee type..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full rounded-xl border border-slate-600/50 bg-slate-900/50 py-3 pr-4 pl-12 text-white placeholder-slate-400 transition-all focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                                    />
                                </div>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="rounded-xl border border-slate-600/50 bg-slate-900/50 py-3 px-4 text-white transition-all focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                                >
                                    <option value="">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="paid">Paid</option>
                                </select>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-900/50">
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                            Student
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                            Fee Type
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                            Amount
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                            Due Date
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/50">
                                    {filteredFees.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-16 text-center">
                                                <div className="flex flex-col items-center">
                                                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-700/50">
                                                        <CreditCard className="h-10 w-10 text-slate-500" />
                                                    </div>
                                                    <p className="text-lg font-medium text-slate-300">No fees found</p>
                                                    <p className="mt-1 text-sm text-slate-500">Try adjusting your search</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredFees.map((fee) => (
                                            <tr key={fee.id} className="transition-all hover:bg-slate-700/30">
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <p className="font-medium text-white">{fee.student.name}</p>
                                                        <p className="text-sm text-slate-400">{fee.student.roll_number} - {fee.student.class?.name}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-white">{fee.fee_type}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="font-mono font-semibold text-emerald-400">₹{Number(fee.amount).toLocaleString()}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-slate-300">{fee.due_date}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {fee.status === 'paid' ? (
                                                        <span className="rounded-lg border border-green-500/30 bg-green-500/20 px-2.5 py-1 text-xs font-medium text-green-300">
                                                            Paid
                                                        </span>
                                                    ) : (
                                                        <span className="rounded-lg border border-amber-500/30 bg-amber-500/20 px-2.5 py-1 text-xs font-medium text-amber-300">
                                                            Pending
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            href={route('admin.fees.edit', fee.id)}
                                                            className="rounded-lg p-2 transition-colors hover:bg-slate-600/50"
                                                            title="Edit"
                                                        >
                                                            <Pencil className="h-4 w-4 text-slate-400" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(fee.id)}
                                                            className="rounded-lg p-2 transition-colors hover:bg-red-500/20"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="h-4 w-4 text-red-400" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
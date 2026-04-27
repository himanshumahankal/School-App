import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { ArrowDown, GraduationCap, Plus, Users, FileSpreadsheet, FileText, Wallet, Mail } from 'lucide-react';

interface PageProps {
    auth: { user: { name: string } };
    stats: {
        totalTeachers: number;
        totalStudents: number;
        totalParents: number;
        totalFees: number;
        pendingFees: number;
    };
}

export default function AdminDashboard() {
    const { auth, stats } = usePage<PageProps>().props;
    const userName = auth?.user?.name || 'Admin';

    const handleExport = (type: string) => {
        window.open(`/admin/export/${type}`, '_blank');
    };

    return (
        <AppLayout>
            <Head title="Admin Dashboard" />
            <div className="p-6 bg-slate-900 min-h-screen">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Welcome, {userName}!</h1>
                    <p className="text-slate-400 mt-1">School Management Dashboard</p>
                </div>

                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <FileSpreadsheet className="h-5 w-5" />
                        Export Data
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <button
                            onClick={() => handleExport('teachers')}
                            className="flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-xl p-4 transition-colors"
                        >
                            <Users className="h-5 w-5 text-blue-400" />
                            <span className="text-blue-300 text-sm font-medium">Teachers</span>
                        </button>
                        <button
                            onClick={() => handleExport('students')}
                            className="flex items-center gap-2 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 rounded-xl p-4 transition-colors"
                        >
                            <GraduationCap className="h-5 w-5 text-green-400" />
                            <span className="text-green-300 text-sm font-medium">Students</span>
                        </button>
                        <button
                            onClick={() => handleExport('parents')}
                            className="flex items-center gap-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded-xl p-4 transition-colors"
                        >
                            <Users className="h-5 w-5 text-purple-400" />
                            <span className="text-purple-300 text-sm font-medium">Parents</span>
                        </button>
                        <button
                            onClick={() => handleExport('fees')}
                            className="flex items-center gap-2 bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/30 rounded-xl p-4 transition-colors"
                        >
                            <Wallet className="h-5 w-5 text-amber-400" />
                            <span className="text-amber-300 text-sm font-medium">Fees</span>
                        </button>
                        <button
                            onClick={() => handleExport('all')}
                            className="flex items-center gap-2 bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/30 rounded-xl p-4 transition-colors col-span-2 md:col-span-1"
                        >
                            <ArrowDown className="h-5 w-5 text-cyan-400" />
                            <span className="text-cyan-300 text-sm font-medium">Export All</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link
                        href="/admin/teachers"
                        className="group bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-blue-500 transition-all duration-200"
                    >
                        <div className="flex items-center gap-6">
                            <div className="bg-blue-600 p-4 rounded-2xl group-hover:bg-blue-500 transition-colors">
                                <Users className="h-10 w-10 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                                    Manage Teachers
                                </h2>
                                <p className="text-slate-400 mt-1">Add, edit, or remove teachers</p>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center text-blue-400 font-medium">
                            <span>Go to Teachers</span>
                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </Link>

                    <Link
                        href="/admin/students"
                        className="group bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-green-500 transition-all duration-200"
                    >
                        <div className="flex items-center gap-6">
                            <div className="bg-green-600 p-4 rounded-2xl group-hover:bg-green-500 transition-colors">
                                <GraduationCap className="h-10 w-10 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white group-hover:text-green-400 transition-colors">
                                    View Students
                                </h2>
                                <p className="text-slate-400 mt-1">View all enrolled students</p>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center text-green-400 font-medium">
                            <span>Go to Students</span>
                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </Link>

                    <Link
                        href="/admin/parents"
                        className="group bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-purple-500 transition-all duration-200"
                    >
                        <div className="flex items-center gap-6">
                            <div className="bg-purple-600 p-4 rounded-2xl group-hover:bg-purple-500 transition-colors">
                                <Users className="h-10 w-10 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">
                                    Manage Parents
                                </h2>
                                <p className="text-slate-400 mt-1">View and manage parents</p>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center text-purple-400 font-medium">
                            <span>Go to Parents</span>
                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </Link>

                    <Link
                        href="/admin/fees"
                        className="group bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-amber-500 transition-all duration-200"
                    >
                        <div className="flex items-center gap-6">
                            <div className="bg-amber-600 p-4 rounded-2xl group-hover:bg-amber-500 transition-colors">
                                <Wallet className="h-10 w-10 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white group-hover:text-amber-400 transition-colors">
                                    Fees Management
                                </h2>
                                <p className="text-slate-400 mt-1">Track and manage fees</p>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center text-amber-400 font-medium">
                            <span>Go to Fees</span>
                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </Link>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
                        <div className="flex items-center gap-4">
                            <Users className="h-8 w-8 opacity-80" />
                            <div>
                                <p className="text-blue-200 text-sm">Total Teachers</p>
                                <p className="text-2xl font-bold mt-0.5">{stats?.totalTeachers || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-6 text-white">
                        <div className="flex items-center gap-4">
                            <GraduationCap className="h-8 w-8 opacity-80" />
                            <div>
                                <p className="text-green-200 text-sm">Total Students</p>
                                <p className="text-2xl font-bold mt-0.5">{stats?.totalStudents || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-6 text-white">
                        <div className="flex items-center gap-4">
                            <Users className="h-8 w-8 opacity-80" />
                            <div>
                                <p className="text-purple-200 text-sm">Total Parents</p>
                                <p className="text-2xl font-bold mt-0.5">{stats?.totalParents || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-amber-600 to-amber-800 rounded-2xl p-6 text-white">
                        <div className="flex items-center gap-4">
                            <Wallet className="h-8 w-8 opacity-80" />
                            <div>
                                <p className="text-amber-200 text-sm">Pending Fees</p>
                                <p className="text-2xl font-bold mt-0.5">₹{stats?.pendingFees || 0}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { GraduationCap, Users, Plus } from 'lucide-react';

export default function AdminDashboard() {
    const pageProps = usePage().props as unknown as { auth: { user: { name: string } } };
    const userName = pageProps.auth?.user?.name || 'Admin';

    return (
        <AppLayout>
            <Head title="Admin Dashboard" />
            <div className="p-6 bg-slate-900 min-h-screen">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Welcome, {userName}!</h1>
                    <p className="text-slate-400 mt-1">School Management Dashboard</p>
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
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
                        <div className="flex items-center gap-4">
                            <Users className="h-8 w-8 opacity-80" />
                            <div>
                                <p className="text-blue-200 text-sm">Quick Action</p>
                                <p className="font-medium mt-0.5">Add New Teacher</p>
                            </div>
                        </div>
                        <Link
                            href="/admin/teachers/create"
                            className="mt-4 inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                            <Plus className="h-4 w-4" />
                            Add Teacher
                        </Link>
                    </div>

                    <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-6 text-white">
                        <div className="flex items-center gap-4">
                            <GraduationCap className="h-8 w-8 opacity-80" />
                            <div>
                                <p className="text-purple-200 text-sm">Total Students</p>
                                <p className="text-2xl font-bold mt-0.5">1</p>
                            </div>
                        </div>
                        <p className="mt-4 text-purple-200 text-sm">View all student records</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-6 text-white">
                        <div className="flex items-center gap-4">
                            <Users className="h-8 w-8 opacity-80" />
                            <div>
                                <p className="text-green-200 text-sm">Total Teachers</p>
                                <p className="text-2xl font-bold mt-0.5">1</p>
                            </div>
                        </div>
                        <p className="mt-4 text-green-200 text-sm">Active teaching staff</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

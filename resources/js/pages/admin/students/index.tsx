import AppLayout from '@/layouts/app-layout';
import { Head, usePage, Link } from '@inertiajs/react';
import { Search, ArrowLeft, Users, GraduationCap, UserPlus, Download, Filter } from 'lucide-react';
import { useState } from 'react';

export default function StudentsIndex() {
    const pageProps = usePage().props as unknown as {
        students: {
            data: {
                id: number;
                name: string;
                roll_number: string;
                date_of_birth: string | null;
                gender: string | null;
                admission_date: string;
                user: { email: string };
                class: { id: number; name: string; section: string | null };
                parents: { id: number; name: string }[];
            }[];
            links: { url: string | null; label: string; active: boolean }[];
            total: number;
            last_page: number;
        };
        classes: { id: number; name: string; section: string | null }[];
        filters: { search?: string; class?: string };
    };

    const { students, classes, filters } = pageProps;
    const [search, setSearch] = useState(filters.search || '');
    const [selectedClass, setSelectedClass] = useState(filters.class || '');

    const totalMale = students.data.filter(s => s.gender === 'male').length;
    const totalFemale = students.data.filter(s => s.gender === 'female').length;

    const avatarColors = [
        'from-blue-500 to-blue-600',
        'from-purple-500 to-purple-600',
        'from-green-500 to-green-600',
        'from-orange-500 to-orange-600',
        'from-pink-500 to-pink-600',
    ];

    return (
        <AppLayout>
            <Head title="Students" />

            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div className="p-6 max-w-7xl mx-auto">
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Link
                                href="/admin/dashboard"
                                className="p-2.5 bg-slate-800/50 hover:bg-slate-700 rounded-xl transition-all border border-slate-700/50 hover:border-slate-600"
                            >
                                <ArrowLeft className="h-5 w-5 text-slate-400" />
                            </Link>
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold text-white tracking-tight">Students Management</h1>
                                <p className="text-slate-400 mt-1">Manage and view all enrolled students</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/50 hover:bg-slate-700 text-slate-300 rounded-xl transition-all border border-slate-700/50 hover:border-slate-600">
                                    <Download className="h-4 w-4" />
                                    Export
                                </button>
                                <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-xl font-medium shadow-lg shadow-green-500/20 transition-all">
                                    <UserPlus className="h-4 w-4" />
                                    Add Student
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-2xl p-5 backdrop-blur-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-blue-300 text-sm font-medium">Total Students</p>
                                        <p className="text-3xl font-bold text-white mt-1">{students.total}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                        <Users className="h-6 w-6 text-blue-400" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-2xl p-5 backdrop-blur-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-purple-300 text-sm font-medium">Total Classes</p>
                                        <p className="text-3xl font-bold text-white mt-1">{classes.length}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                                        <GraduationCap className="h-6 w-6 text-purple-400" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-2xl p-5 backdrop-blur-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-green-300 text-sm font-medium">Male Students</p>
                                        <p className="text-3xl font-bold text-white mt-1">{totalMale}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-2xl">
                                        <span className="text-green-400">♂</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-pink-600/20 to-pink-800/20 border border-pink-500/30 rounded-2xl p-5 backdrop-blur-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-pink-300 text-sm font-medium">Female Students</p>
                                        <p className="text-3xl font-bold text-white mt-1">{totalFemale}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center text-2xl">
                                        <span className="text-pink-400">♀</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
                        <div className="p-6 border-b border-slate-700/50">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by name, roll number or email..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all"
                                    />
                                </div>
                                <div className="relative">
                                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <select
                                        value={selectedClass}
                                        onChange={(e) => setSelectedClass(e.target.value)}
                                        className="pl-10 pr-10 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all appearance-none cursor-pointer min-w-[180px]"
                                    >
                                        <option value="">All Classes</option>
                                        {classes.map((cls) => (
                                            <option key={cls.id} value={cls.name}>
                                                {cls.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-900/50">
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Student</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Roll No</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Class</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Gender</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">DOB</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/50">
                                    {students.data.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-16 text-center">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-20 h-20 bg-slate-700/50 rounded-2xl flex items-center justify-center mb-4">
                                                        <Search className="h-10 w-10 text-slate-500" />
                                                    </div>
                                                    <p className="text-slate-300 font-medium text-lg">No students found</p>
                                                    <p className="text-slate-500 text-sm mt-1">Try adjusting your search or filters</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        students.data.map((student, index) => (
                                            <tr key={student.id} className="hover:bg-slate-700/30 transition-all group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${avatarColors[index % 5]} flex items-center justify-center text-white font-semibold text-sm shadow-lg`}>
                                                            {student.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-white">{student.name}</p>
                                                            <p className="text-sm text-slate-400">{student.user.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="font-mono text-sm bg-slate-900/80 px-3 py-1.5 rounded-lg text-slate-300 border border-slate-700/50">
                                                        #{student.roll_number}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className="px-3 py-1.5 bg-gradient-to-r from-green-900/50 to-emerald-900/50 text-green-300 text-sm font-medium rounded-lg border border-green-700/50">
                                                            {student.class.name}
                                                        </span>
                                                        {student.class.section && (
                                                            <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs font-medium rounded-md">
                                                                {student.class.section}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${
                                                        student.gender === 'male' 
                                                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                                                            : 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                                                    }`}>
                                                        <span>{student.gender === 'male' ? '♂' : '♀'}</span>
                                                        <span className="capitalize">{student.gender || 'N/A'}</span>
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-slate-300 text-sm">
                                                        {student.date_of_birth || 'N/A'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <button className="p-2 hover:bg-slate-600/50 rounded-lg transition-colors" title="View">
                                                            <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </button>
                                                        <button className="p-2 hover:bg-slate-600/50 rounded-lg transition-colors" title="Edit">
                                                            <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                        </button>
                                                        <button className="p-2 hover:bg-red-500/20 rounded-lg transition-colors" title="Delete">
                                                            <svg className="h-4 w-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {students.last_page > 1 && (
                            <div className="p-4 border-t border-slate-700/50 flex justify-center items-center gap-2">
                                {students.links.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                            link.active
                                                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/20'
                                                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}

                        <div className="p-4 border-t border-slate-700/50 bg-slate-900/30">
                            <p className="text-sm text-slate-400 text-center">
                                Showing {students.data.length} of {students.total} students
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { ArrowLeft, BookOpen, GraduationCap, Search, UserPlus, Users, Eye, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Teacher {
    id: number;
    name: string;
    employee_id: string;
    qualification: string | null;
    phone: string | null;
    joining_date: string;
    user: { email: string | null };
    subjects: { id: number; name: string }[];
    classes: { id: number; name: string; section: string | null }[];
}

export default function TeachersIndex() {
    const pageProps = usePage().props as unknown as {
        teachers: {
            data: Teacher[];
            total: number;
        };
        filters: { search?: string };
    };

    const { teachers, filters } = pageProps;
    const [search, setSearch] = useState(filters.search || '');

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this teacher? This will also delete the associated user account.')) {
            router.delete(route('admin.teachers.destroy', id));
        }
    };

    const avatarColors = [
        'from-blue-500 to-blue-600',
        'from-purple-500 to-purple-600',
        'from-green-500 to-green-600',
        'from-orange-500 to-orange-600',
        'from-pink-500 to-pink-600',
        'from-cyan-500 to-cyan-600',
        'from-amber-500 to-amber-600',
    ];

    const filteredTeachers = teachers.data.filter((teacher) => {
        const matchesSearch =
            teacher.name.toLowerCase().includes(search.toLowerCase()) ||
            teacher.employee_id.toLowerCase().includes(search.toLowerCase()) ||
            (teacher.user.email?.toLowerCase() || '').includes(search.toLowerCase());

        return matchesSearch;
    });

    const totalSubjects = new Set(teachers.data.flatMap(t => t.subjects.map(s => s.name))).size;
    const totalClasses = new Set(teachers.data.flatMap(t => t.classes.map(c => c.name))).size;

    return (
        <AppLayout>
            <Head title="Teachers" />

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
                                <h1 className="text-3xl font-bold tracking-tight text-white">Teachers Management</h1>
                                <p className="mt-1 text-slate-400">Manage and view all faculty members</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/admin/teachers/create"
                                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-2.5 font-medium text-white shadow-lg shadow-blue-500/20 transition-all hover:from-blue-500 hover:to-cyan-500"
                                >
                                    <UserPlus className="h-4 w-4" />
                                    Add Teacher
                                </Link>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                            <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-600/20 to-blue-800/20 p-5 backdrop-blur-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-blue-300">Total Teachers</p>
                                        <p className="mt-1 text-3xl font-bold text-white">{teachers.total}</p>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20">
                                        <Users className="h-6 w-6 text-blue-400" />
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-600/20 to-purple-800/20 p-5 backdrop-blur-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-purple-300">Assigned Classes</p>
                                        <p className="mt-1 text-3xl font-bold text-white">{totalClasses}</p>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
                                        <GraduationCap className="h-6 w-6 text-purple-400" />
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-600/20 to-green-800/20 p-5 backdrop-blur-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-green-300">Total Subjects</p>
                                        <p className="mt-1 text-3xl font-bold text-white">{totalSubjects}</p>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/20">
                                        <BookOpen className="h-6 w-6 text-green-400" />
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-600/20 to-amber-800/20 p-5 backdrop-blur-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-amber-300">Filtered Results</p>
                                        <p className="mt-1 text-3xl font-bold text-white">{filteredTeachers.length}</p>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20">
                                        <Search className="h-6 w-6 text-amber-400" />
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
                                        placeholder="Search by name, employee ID or email..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full rounded-xl border border-slate-600/50 bg-slate-900/50 py-3 pr-4 pl-12 text-white placeholder-slate-400 transition-all focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-900/50">
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                            Teacher
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                            Employee ID
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                            Subjects
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                            Classes
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/50">
                                    {filteredTeachers.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-16 text-center">
                                                <div className="flex flex-col items-center">
                                                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-700/50">
                                                        <Search className="h-10 w-10 text-slate-500" />
                                                    </div>
                                                    <p className="text-lg font-medium text-slate-300">No teachers found</p>
                                                    <p className="mt-1 text-sm text-slate-500">Try adjusting your search</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredTeachers.map((teacher, index) => (
                                            <tr key={teacher.id} className="transition-all hover:bg-slate-700/30">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div
                                                            className={`h-11 w-11 rounded-xl bg-gradient-to-br ${avatarColors[index % 7]} flex items-center justify-center text-sm font-semibold text-white shadow-lg`}
                                                        >
                                                            {teacher.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-white">{teacher.name}</p>
                                                            <p className="text-sm text-slate-400">{teacher.user.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="font-mono text-sm bg-slate-900/80 px-3 py-1.5 rounded-lg text-slate-300 border border-slate-700/50">
                                                        {teacher.employee_id}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {teacher.subjects.map((s) => (
                                                            <span key={s.id} className="rounded-lg border border-blue-500/30 bg-blue-500/20 px-2.5 py-1 text-xs font-medium text-blue-300">
                                                                {s.name}
                                                            </span>
                                                        ))}
                                                        {teacher.subjects.length === 0 && (
                                                            <span className="text-xs text-slate-500 italic">No Subjects</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {teacher.classes.map((c) => (
                                                            <span key={c.id} className="rounded-lg border border-green-500/30 bg-green-500/20 px-2.5 py-1 text-xs font-medium text-green-300">
                                                                {c.name}{c.section ? ` - ${c.section}` : ''}
                                                            </span>
                                                        ))}
                                                        {teacher.classes.length === 0 && (
                                                            <span className="text-xs text-slate-500 italic">No Classes</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            href={route('admin.teachers.show', teacher.id)}
                                                            className="rounded-lg p-2 transition-colors hover:bg-slate-600/50"
                                                            title="View"
                                                        >
                                                            <Eye className="h-4 w-4 text-slate-400" />
                                                        </Link>
                                                        <Link
                                                            href={route('admin.teachers.edit', teacher.id)}
                                                            className="rounded-lg p-2 transition-colors hover:bg-slate-600/50"
                                                            title="Edit"
                                                        >
                                                            <Pencil className="h-4 w-4 text-slate-400" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(teacher.id)}
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

import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Search, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function TeachersIndex() {
    const pageProps = usePage().props as unknown as {
        teachers: {
            data: {
                id: number;
                name: string;
                employee_id: string;
                qualification: string | null;
                user: { email: string };
                subjects: { id: number; name: string }[];
                classes: { id: number; name: string; section: string | null }[];
            }[];
            links: { url: string | null; label: string; active: boolean }[];
            total: number;
            last_page: number;
        };
        filters: { search?: string };
    };

    const { teachers, filters } = pageProps;
    const [search, setSearch] = useState(filters.search || '');

    return (
        <AppLayout>
            <Head title="Manage Teachers" />

            <div className="p-6 max-w-7xl mx-auto bg-slate-900 min-h-screen">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Link
                            href="/admin/dashboard"
                            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5 text-slate-400" />
                        </Link>
                        <h1 className="text-3xl font-bold text-white">Teachers</h1>
                    </div>
                    <p className="text-slate-400 ml-11">Manage your school teachers</p>
                </div>

                <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                    <div className="p-6 border-b border-slate-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search teachers..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <Link
                            href="/admin/teachers/create"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-colors"
                        >
                            <Plus className="h-5 w-5" />
                            Add Teacher
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-900">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Teacher</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Employee ID</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Email</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Subjects</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Classes</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {teachers.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mb-4">
                                                    <Search className="h-8 w-8 text-slate-400" />
                                                </div>
                                                <p className="text-slate-300 font-medium">No teachers found</p>
                                                <p className="text-slate-500 text-sm mt-1">Try adjusting your search or add a new teacher</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    teachers.data.map((teacher) => (
                                        <tr key={teacher.id} className="hover:bg-slate-700 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                                        <span className="text-white font-semibold text-sm">
                                                            {teacher.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-white">{teacher.name}</p>
                                                        <p className="text-sm text-slate-400">{teacher.qualification || 'N/A'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-mono text-sm bg-slate-900 px-2 py-1 rounded text-slate-300">{teacher.employee_id}</span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-300">{teacher.user.email}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {teacher.subjects.slice(0, 2).map((s) => (
                                                        <span key={s.id} className="px-2.5 py-1 bg-blue-900/50 text-blue-300 text-xs font-medium rounded-full border border-blue-700">
                                                            {s.name}
                                                        </span>
                                                    ))}
                                                    {teacher.subjects.length > 2 && (
                                                        <span className="px-2.5 py-1 bg-slate-700 text-slate-300 text-xs font-medium rounded-full">
                                                            +{teacher.subjects.length - 2}
                                                        </span>
                                                    )}
                                                    {teacher.subjects.length === 0 && (
                                                        <span className="text-slate-500 text-sm">No subjects</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {teacher.classes.slice(0, 2).map((c) => (
                                                        <span key={c.id} className="px-2.5 py-1 bg-green-900/50 text-green-300 text-xs font-medium rounded-full border border-green-700">
                                                            {c.name}{c.section ? ` - ${c.section}` : ''}
                                                        </span>
                                                    ))}
                                                    {teacher.classes.length > 2 && (
                                                        <span className="px-2.5 py-1 bg-slate-700 text-slate-300 text-xs font-medium rounded-full">
                                                            +{teacher.classes.length - 2}
                                                        </span>
                                                    )}
                                                    {teacher.classes.length === 0 && (
                                                        <span className="text-slate-500 text-sm">No classes</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/admin/teachers/${teacher.id}/edit`}
                                                        className="p-2 text-blue-400 hover:bg-slate-700 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Pencil className="h-5 w-5" />
                                                    </Link>
                                                    <button
                                                        onClick={() => {
                                                            if (confirm('Are you sure you want to delete this teacher?')) {
                                                                window.location.href = `/admin/teachers/${teacher.id}`;
                                                            }
                                                        }}
                                                        className="p-2 text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {teachers.last_page > 1 && (
                        <div className="p-4 border-t border-slate-700 flex justify-center gap-2">
                            {teachers.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        link.active
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

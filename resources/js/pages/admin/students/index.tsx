import AppLayout from '@/layouts/app-layout';
import { Head, usePage, Link } from '@inertiajs/react';
import { Search, ArrowLeft } from 'lucide-react';
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
        filters: { search?: string; class_id?: string };
    };

    const { students, classes, filters } = pageProps;
    const [search, setSearch] = useState(filters.search || '');
    const [classId, setClassId] = useState(filters.class_id || '');

    return (
        <AppLayout>
            <Head title="Students" />

            <div className="p-6 max-w-7xl mx-auto bg-slate-900 min-h-screen">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Link
                            href="/admin/dashboard"
                            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5 text-slate-400" />
                        </Link>
                        <h1 className="text-3xl font-bold text-white">Students</h1>
                    </div>
                    <p className="text-slate-400 ml-11">View all enrolled students</p>
                </div>

                <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                    <div className="p-6 border-b border-slate-700">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search by name or roll number..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>
                            <select
                                value={classId}
                                onChange={(e) => setClassId(e.target.value)}
                                className="px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500 min-w-[180px]"
                            >
                                <option value="">All Classes</option>
                                {classes.map((cls) => (
                                    <option key={cls.id} value={cls.id}>
                                        {cls.name}{cls.section ? ` - Section ${cls.section}` : ''}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-900">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Student</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Roll No</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Class</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Gender</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">DOB</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Parents</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {students.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mb-4">
                                                    <Search className="h-8 w-8 text-slate-400" />
                                                </div>
                                                <p className="text-slate-300 font-medium">No students found</p>
                                                <p className="text-slate-500 text-sm mt-1">Try adjusting your search filters</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    students.data.map((student) => (
                                        <tr key={student.id} className="hover:bg-slate-700 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                                                        <span className="text-white font-semibold text-sm">
                                                            {student.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-white">{student.name}</p>
                                                        <p className="text-sm text-slate-400">{student.user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-mono text-sm bg-slate-900 px-2.5 py-1 rounded-lg text-slate-300">{student.roll_number}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-green-900/50 text-green-300 text-sm font-medium rounded-full border border-green-700">
                                                    {student.class.name}{student.class.section ? ` - ${student.class.section}` : ''}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-slate-300 capitalize">{student.gender || 'N/A'}</span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-300">
                                                {student.date_of_birth || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {student.parents.slice(0, 2).map((p) => (
                                                        <span key={p.id} className="px-2.5 py-1 bg-purple-900/50 text-purple-300 text-xs font-medium rounded-full border border-purple-700">
                                                            {p.name}
                                                        </span>
                                                    ))}
                                                    {student.parents.length > 2 && (
                                                        <span className="px-2.5 py-1 bg-slate-700 text-slate-300 text-xs font-medium rounded-full">
                                                            +{student.parents.length - 2}
                                                        </span>
                                                    )}
                                                    {student.parents.length === 0 && (
                                                        <span className="text-slate-500 text-sm">No parents</span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {students.last_page > 1 && (
                        <div className="p-4 border-t border-slate-700 flex justify-center gap-2">
                            {students.links.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        link.active
                                            ? 'bg-green-600 text-white'
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

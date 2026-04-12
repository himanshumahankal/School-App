import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, GraduationCap, Search, UserPlus, Users, UsersRound } from 'lucide-react';
import { useState } from 'react';

interface Parent {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    occupation: string | null;
    relation: string | null;
    students: {
        id: number;
        name: string;
        roll_number: string;
        class: {
            id: number;
            name: string;
            section: string | null;
        } | null;
        relation: string;
    }[];
}

export default function ParentsIndex() {
    const pageProps = usePage().props as unknown as {
        parents: {
            data: Parent[];
            total: number;
        };
        classes: { id: number; name: string; section: string | null }[];
        students: { id: number; name: string; roll_number: string; class: { name: string; section: string | null } }[];
    };

    const { parents, classes } = pageProps;
    const [search, setSearch] = useState('');
    const [selectedClass, setSelectedClass] = useState('');

    const { delete: destroy } = useForm({});

    const filteredParents = parents.data.filter((parent) => {
        const firstStudent = parent.students[0];
        if (!firstStudent) return false;

        const matchesSearch =
            parent.name.toLowerCase().includes(search.toLowerCase()) ||
            parent.email.toLowerCase().includes(search.toLowerCase()) ||
            firstStudent.name.toLowerCase().includes(search.toLowerCase());

        const matchesClass = !selectedClass || (firstStudent.class?.name || '') === selectedClass;

        return matchesSearch && matchesClass;
    });

    const parentsByClass = filteredParents.reduce(
        (acc, parent) => {
            const firstStudent = parent.students[0];
            if (!firstStudent) return acc;
            const className = firstStudent.class?.name || 'No Class';
            if (!acc[className]) {
                acc[className] = [];
            }
            acc[className].push(parent);
            return acc;
        },
        {} as Record<string, Parent[]>,
    );

    const handleDelete = (parentId: number) => {
        if (confirm('Are you sure you want to delete this parent?')) {
            destroy(route('admin.parents.destroy', parentId));
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

    return (
        <AppLayout>
            <Head title="Parents" />

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
                                <h1 className="text-3xl font-bold tracking-tight text-white">Parents Management</h1>
                                <p className="mt-1 text-slate-400">Manage parents linked to students by class</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/admin/parents/create"
                                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-2.5 font-medium text-white shadow-lg shadow-blue-500/20 transition-all hover:from-blue-500 hover:to-cyan-500"
                                >
                                    <UserPlus className="h-4 w-4" />
                                    Add Parent
                                </Link>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-600/20 to-blue-800/20 p-5 backdrop-blur-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-blue-300">Total Parents</p>
                                        <p className="mt-1 text-3xl font-bold text-white">{parents.total}</p>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20">
                                        <UsersRound className="h-6 w-6 text-blue-400" />
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-600/20 to-purple-800/20 p-5 backdrop-blur-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-purple-300">Total Classes</p>
                                        <p className="mt-1 text-3xl font-bold text-white">{Object.keys(parentsByClass).length}</p>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
                                        <GraduationCap className="h-6 w-6 text-purple-400" />
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-600/20 to-green-800/20 p-5 backdrop-blur-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-green-300">Filtered Results</p>
                                        <p className="mt-1 text-3xl font-bold text-white">{filteredParents.length}</p>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/20">
                                        <Users className="h-6 w-6 text-green-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
                        <div className="border-b border-slate-700/50 p-6">
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <div className="relative flex-1">
                                    <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by parent name, email or student name..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full rounded-xl border border-slate-600/50 bg-slate-900/50 py-3 pr-4 pl-12 text-white placeholder-slate-400 transition-all focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                                    />
                                </div>
                                <div className="relative">
                                    <select
                                        value={selectedClass}
                                        onChange={(e) => setSelectedClass(e.target.value)}
                                        className="min-w-[180px] cursor-pointer appearance-none rounded-xl border border-slate-600/50 bg-slate-900/50 py-3 pr-10 pl-4 text-white transition-all focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
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
                    </div>

                    {Object.keys(parentsByClass).length === 0 ? (
                        <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-16 backdrop-blur-sm">
                            <div className="flex flex-col items-center">
                                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-700/50">
                                    <UsersRound className="h-10 w-10 text-slate-500" />
                                </div>
                                <p className="text-lg font-medium text-slate-300">No parents found</p>
                                <p className="mt-1 text-sm text-slate-500">Try adjusting your search or filters</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {Object.entries(parentsByClass)
                                .sort((a, b) => {
                                    const numA = parseInt(a[0].replace(/\D/g, '')) || 0;
                                    const numB = parseInt(b[0].replace(/\D/g, '')) || 0;
                                    return numA - numB;
                                })
                                .map(([className, classParents]) => (
                                    <div
                                        key={className}
                                        className="overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm"
                                    >
                                        <div className="border-b border-slate-700/50 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20">
                                                        <GraduationCap className="h-5 w-5 text-purple-400" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-white">{className}</h3>
                                                        <p className="text-sm text-slate-400">
                                                            {classParents.length} parent{classParents.length !== 1 ? 's' : ''}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="bg-slate-900/50">
                                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                                            Parent
                                                        </th>
                                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                                            Student
                                                        </th>
                                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                                            Relation
                                                        </th>
                                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                                            Contact
                                                        </th>
                                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                                            Actions
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-700/50">
                                                    {classParents.map((parent, index) => {
                                                        const firstStudent = parent.students[0];
                                                        return (
                                                            <tr key={parent.id} className="group transition-all hover:bg-slate-700/30">
                                                                <td className="px-6 py-4">
                                                                    <div className="flex items-center gap-4">
                                                                        <div
                                                                            className={`h-11 w-11 rounded-xl bg-gradient-to-br ${avatarColors[index % 7]} flex items-center justify-center text-sm font-semibold text-white shadow-lg`}
                                                                        >
                                                                            {parent.name.charAt(0).toUpperCase()}
                                                                        </div>
                                                                        <div>
                                                                            <p className="font-medium text-white">{parent.name}</p>
                                                                            <p className="text-sm text-slate-400">{parent.email}</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    {firstStudent && (
                                                                        <div className="flex items-center gap-3">
                                                                            <div
                                                                                className={`h-8 w-8 rounded-lg bg-gradient-to-br ${avatarColors[(index + 1) % 7]} flex items-center justify-center text-xs font-semibold text-white`}
                                                                            >
                                                                                {firstStudent.name.charAt(0).toUpperCase()}
                                                                            </div>
                                                                            <div>
                                                                                <p className="text-sm font-medium text-white">{firstStudent.name}</p>
                                                                                <p className="font-mono text-xs text-slate-500">
                                                                                    #{firstStudent.roll_number}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <span className="rounded-lg border border-blue-500/30 bg-blue-500/20 px-3 py-1.5 text-sm font-medium text-blue-300">
                                                                        {firstStudent?.relation || 'Parent'}
                                                                    </span>
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <div className="space-y-1">
                                                                        <p className="text-sm text-slate-300">{parent.phone || 'N/A'}</p>
                                                                        <p className="text-xs text-slate-500">{parent.occupation || 'N/A'}</p>
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <div className="flex items-center gap-2">
                                                                        <Link
                                                                            href={route('admin.parents.edit', parent.id)}
                                                                            className="rounded-lg p-2 transition-colors hover:bg-slate-600/50"
                                                                            title="Edit"
                                                                        >
                                                                            <svg
                                                                                className="h-4 w-4 text-slate-400"
                                                                                fill="none"
                                                                                stroke="currentColor"
                                                                                viewBox="0 0 24 24"
                                                                            >
                                                                                <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth={2}
                                                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                                                />
                                                                            </svg>
                                                                        </Link>
                                                                        <button
                                                                            onClick={() => handleDelete(parent.id)}
                                                                            className="rounded-lg p-2 transition-colors hover:bg-red-500/20"
                                                                            title="Delete"
                                                                        >
                                                                            <svg
                                                                                className="h-4 w-4 text-red-400"
                                                                                fill="none"
                                                                                stroke="currentColor"
                                                                                viewBox="0 0 24 24"
                                                                            >
                                                                                <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth={2}
                                                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                                />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

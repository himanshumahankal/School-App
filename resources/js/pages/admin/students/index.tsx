import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { ArrowLeft, Filter, GraduationCap, Search, UserPlus, Users, Eye, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Student {
    id: number;
    name: string;
    roll_number: string;
    date_of_birth: string | null;
    gender: string | null;
    admission_date: string;
    user: { email: string | null };
    class: {
        id: number;
        name: string;
        section: string | null;
    } | null;
    parent: {
        id: number;
        name: string;
    } | null;
}

export default function StudentsIndex() {
    const pageProps = usePage().props as unknown as {
        students: {
            data: Student[];
            total: number;
        };
        classes: { name: string }[];
        filters: { search?: string; class?: string };
    };

    const { students, classes, filters } = pageProps;
    const [search, setSearch] = useState(filters.search || '');
    const [selectedClass, setSelectedClass] = useState(filters.class || '');

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this student? This will also delete the associated user account.')) {
            router.delete(route('admin.students.destroy', id));
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

    const filteredStudents = students.data.filter((student) => {
        const matchesSearch =
            student.name.toLowerCase().includes(search.toLowerCase()) ||
            student.roll_number.toLowerCase().includes(search.toLowerCase()) ||
            (student.user.email?.toLowerCase() || '').includes(search.toLowerCase());

        const matchesClass = !selectedClass || (student.class?.name || '') === selectedClass;

        return matchesSearch && matchesClass;
    });

    const studentsByClass = filteredStudents.reduce(
        (acc, student) => {
            const className = student.class?.name || 'No Class';
            if (!acc[className]) {
                acc[className] = [];
            }
            acc[className].push(student);
            return acc;
        },
        {} as Record<string, Student[]>,
    );

    const totalMale = filteredStudents.filter((s) => s.gender === 'male').length;
    const totalFemale = filteredStudents.filter((s) => s.gender === 'female').length;

    return (
        <AppLayout>
            <Head title="Students" />

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
                                <h1 className="text-3xl font-bold tracking-tight text-white">Students Management</h1>
                                <p className="mt-1 text-slate-400">Manage and view all enrolled students by class</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/admin/students/create"
                                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-2.5 font-medium text-white shadow-lg shadow-blue-500/20 transition-all hover:from-blue-500 hover:to-cyan-500"
                                >
                                    <UserPlus className="h-4 w-4" />
                                    Add Student
                                </Link>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                            <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-600/20 to-blue-800/20 p-5 backdrop-blur-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-blue-300">Total Students</p>
                                        <p className="mt-1 text-3xl font-bold text-white">{students.total}</p>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20">
                                        <Users className="h-6 w-6 text-blue-400" />
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-600/20 to-purple-800/20 p-5 backdrop-blur-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-purple-300">Total Classes</p>
                                        <p className="mt-1 text-3xl font-bold text-white">{Object.keys(studentsByClass).length}</p>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
                                        <GraduationCap className="h-6 w-6 text-purple-400" />
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-600/20 to-green-800/20 p-5 backdrop-blur-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-green-300">Male Students</p>
                                        <p className="mt-1 text-3xl font-bold text-white">{totalMale}</p>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/20 text-2xl">
                                        <span className="text-green-400">♂</span>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-2xl border border-pink-500/30 bg-gradient-to-br from-pink-600/20 to-pink-800/20 p-5 backdrop-blur-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-pink-300">Female Students</p>
                                        <p className="mt-1 text-3xl font-bold text-white">{totalFemale}</p>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/20 text-2xl">
                                        <span className="text-pink-400">♀</span>
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
                                        placeholder="Search by name, roll number or email..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full rounded-xl border border-slate-600/50 bg-slate-900/50 py-3 pr-4 pl-12 text-white placeholder-slate-400 transition-all focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                                    />
                                </div>
                                <div className="relative">
                                    <Filter className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                    <select
                                        value={selectedClass}
                                        onChange={(e) => setSelectedClass(e.target.value)}
                                        className="min-w-[180px] cursor-pointer appearance-none rounded-xl border border-slate-600/50 bg-slate-900/50 py-3 pr-10 pl-10 text-white transition-all focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                                    >
                                        <option value="">All Classes</option>
                                        {classes.map((cls) => (
                                            <option key={cls.name} value={cls.name}>
                                                {cls.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {Object.keys(studentsByClass).length === 0 ? (
                            <div className="p-16 text-center">
                                <div className="flex flex-col items-center">
                                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-700/50">
                                        <Search className="h-10 w-10 text-slate-500" />
                                    </div>
                                    <p className="text-lg font-medium text-slate-300">No students found</p>
                                    <p className="mt-1 text-sm text-slate-500">Try adjusting your search or filters</p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6 p-6">
                                {Object.entries(studentsByClass)
                                    .sort((a, b) => {
                                        const numA = parseInt(a[0].replace(/\D/g, '')) || 0;
                                        const numB = parseInt(b[0].replace(/\D/g, '')) || 0;
                                        return numA - numB;
                                    })
                                    .map(([className, classStudents]) => (
                                        <div key={className} className="overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/30">
                                            <div className="border-b border-slate-700/50 bg-gradient-to-r from-green-900/30 to-emerald-900/30 p-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/20">
                                                            <GraduationCap className="h-5 w-5 text-green-400" />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-lg font-semibold text-white">{className}</h3>
                                                            <p className="text-sm text-slate-400">
                                                                {classStudents.length} student{classStudents.length !== 1 ? 's' : ''}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="overflow-x-auto">
                                                <table className="w-full">
                                                    <thead>
                                                        <tr className="bg-slate-800/50">
                                                            <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                                                Student
                                                            </th>
                                                            <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                                                Roll No
                                                            </th>
                                                            <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                                                Parent
                                                            </th>
                                                            <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                                                Gender
                                                            </th>
                                                            <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                                                Actions
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-slate-700/50">
                                                        {classStudents.map((student, index) => (
                                                            <tr key={student.id} className="transition-all hover:bg-slate-700/30">
                                                                <td className="px-6 py-4">
                                                                    <div className="flex items-center gap-4">
                                                                        <div
                                                                            className={`h-11 w-11 rounded-xl bg-gradient-to-br ${avatarColors[index % 7]} flex items-center justify-center text-sm font-semibold text-white shadow-lg`}
                                                                        >
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
                                                                    {student.parent ? (
                                                                        <div className="flex flex-col">
                                                                            <p className="text-sm font-medium text-white">{student.parent.name}</p>
                                                                            <p className="text-xs text-slate-500">Parent</p>
                                                                        </div>
                                                                    ) : (
                                                                        <span className="text-sm text-slate-500 italic">Not Linked</span>
                                                                    )}
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
                                                                    <div className="flex items-center gap-2">
                                                                        <Link
                                                                            href={route('admin.students.show', student.id)}
                                                                            className="rounded-lg p-2 transition-colors hover:bg-slate-600/50"
                                                                            title="View"
                                                                        >
                                                                            <Eye className="h-4 w-4 text-slate-400" />
                                                                        </Link>
                                                                        <Link
                                                                            href={route('admin.students.edit', student.id)}
                                                                            className="rounded-lg p-2 transition-colors hover:bg-slate-600/50"
                                                                            title="Edit"
                                                                        >
                                                                            <Pencil className="h-4 w-4 text-slate-400" />
                                                                        </Link>
                                                                        <button
                                                                            onClick={() => handleDelete(student.id)}
                                                                            className="rounded-lg p-2 transition-colors hover:bg-red-500/20"
                                                                            title="Delete"
                                                                        >
                                                                            <Trash2 className="h-4 w-4 text-red-400" />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

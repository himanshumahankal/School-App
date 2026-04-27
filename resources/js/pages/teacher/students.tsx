import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { 
    ArrowLeft, Search, Filter, GraduationCap, Users, 
    Phone, Mail, Calendar, Shield, Eye, EyeOff
} from 'lucide-react';
import { useState } from 'react';

interface Student {
    id: number;
    name: string;
    roll_number: string;
    date_of_birth: string | null;
    gender: string | null;
    phone: string | null;
    address: string | null;
    admission_date: string;
    class: { id: number; name: string; section: string | null };
    parent: { id: number; name: string; phone: string } | null;
}

interface Class {
    id: number;
    name: string;
    section: string | null;
}

interface PageProps {
    students: { data: Student[]; total: number };
    classes: Class[];
    filters: { search?: string; class_id?: string };
}

export default function TeacherStudents() {
    const { students, classes, filters } = usePage<PageProps>().props;
    const [search, setSearch] = useState(filters.search || '');
    const [selectedClass, setSelectedClass] = useState(filters.class_id || '');
    const [showParentModal, setShowParentModal] = useState<number | null>(null);

    const filteredStudents = students.data.filter((student) => {
        const matchesSearch = !search || 
            student.name.toLowerCase().includes(search.toLowerCase()) ||
            student.roll_number.toLowerCase().includes(search.toLowerCase());
        const matchesClass = !selectedClass || student.class.id.toString() === selectedClass;
        return matchesSearch && matchesClass;
    });

    const handleSearch = (value: string) => {
        setSearch(value);
        router.get('/teacher/students', { search: value, class_id: selectedClass }, { preserveState: true });
    };

    const handleClassFilter = (value: string) => {
        setSelectedClass(value);
        router.get('/teacher/students', { search, class_id: value }, { preserveState: true });
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
            <Head title="My Students" />
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
                <div className="mb-8 flex items-center gap-4">
                    <Link
                        href="/teacher/dashboard"
                        className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-2.5 transition-all hover:border-slate-600 hover:bg-slate-700"
                    >
                        <ArrowLeft className="h-5 w-5 text-slate-400" />
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-white">My Students</h1>
                        <p className="mt-1 text-slate-400">Students in your assigned classes</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-600/20 to-blue-800/20 p-5 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-blue-300">Total Students</p>
                                <p className="mt-1 text-3xl font-bold text-white">{students.total}</p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20">
                                <GraduationCap className="h-6 w-6 text-blue-400" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-600/20 to-green-800/20 p-5 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-green-300">Classes</p>
                                <p className="mt-1 text-3xl font-bold text-white">{classes.length}</p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/20">
                                <Users className="h-6 w-6 text-green-400" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-600/20 to-purple-800/20 p-5 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-purple-300">Males</p>
                                <p className="mt-1 text-3xl font-bold text-white">
                                    {students.data.filter(s => s.gender === 'male').length}
                                </p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
                                <Shield className="h-6 w-6 text-purple-400" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="rounded-2xl border border-pink-500/30 bg-gradient-to-br from-pink-600/20 to-pink-800/20 p-5 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-pink-300">Females</p>
                                <p className="mt-1 text-3xl font-bold text-white">
                                    {students.data.filter(s => s.gender === 'female').length}
                                </p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/20">
                                <Shield className="h-6 w-6 text-pink-400" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
                    <div className="border-b border-slate-700/50 p-4">
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <div className="relative flex-1">
                                <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search by name or roll number..."
                                    value={search}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="w-full rounded-xl border border-slate-600/50 bg-slate-900/50 py-3 pr-4 pl-12 text-white placeholder-slate-400 transition-all focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                                />
                            </div>
                            <div className="relative">
                                <Filter className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <select
                                    value={selectedClass}
                                    onChange={(e) => handleClassFilter(e.target.value)}
                                    className="min-w-[180px] cursor-pointer appearance-none rounded-xl border border-slate-600/50 bg-slate-900/50 py-3 pr-10 pl-10 text-white transition-all focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                                >
                                    <option value="">All Classes</option>
                                    {classes.map((cls) => (
                                        <option key={cls.id} value={cls.id}>
                                            {cls.name} {cls.section ? `(${cls.section})` : ''}
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
                                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                        Student
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                        Class
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                        Roll No
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                        Gender
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                        Parent
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                        Contact
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                {filteredStudents.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-16 text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-700/50">
                                                    <Search className="h-10 w-10 text-slate-500" />
                                                </div>
                                                <p className="text-lg font-medium text-slate-300">No students found</p>
                                                <p className="mt-1 text-sm text-slate-500">Try adjusting your search</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredStudents.map((student, index) => (
                                        <tr key={student.id} className="transition-all hover:bg-slate-700/30">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div
                                                        className={`h-10 w-10 rounded-xl bg-gradient-to-br ${avatarColors[index % 7]} flex items-center justify-center text-sm font-semibold text-white shadow-lg`}
                                                    >
                                                        {student.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-white">{student.name}</p>
                                                        <p className="text-sm text-slate-400">{student.date_of_birth || 'N/A'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="rounded-lg border border-blue-500/30 bg-blue-500/20 px-3 py-1.5 text-sm font-medium text-blue-300">
                                                    {student.class.name}
                                                    {student.class.section ? ` - ${student.class.section}` : ''}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-mono text-sm bg-slate-900/80 px-3 py-1.5 rounded-lg text-slate-300 border border-slate-700/50">
                                                    #{student.roll_number}
                                                </span>
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
                                                {student.parent ? (
                                                    <div>
                                                        <p className="text-sm font-medium text-white">{student.parent.name}</p>
                                                        <p className="text-xs text-slate-500">{student.parent.phone}</p>
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-slate-500 italic">Not linked</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    {student.phone && (
                                                        <a 
                                                            href={`tel:${student.phone}`}
                                                            className="rounded-lg p-2 transition-colors hover:bg-slate-600/50"
                                                            title="Call"
                                                        >
                                                            <Phone className="h-4 w-4 text-slate-400" />
                                                        </a>
                                                    )}
                                                    <button
                                                        onClick={() => setShowParentModal(showParentModal === student.id ? null : student.id)}
                                                        className="rounded-lg p-2 transition-colors hover:bg-slate-600/50"
                                                        title={student.parent ? "View Parent" : "No Parent"}
                                                    >
                                                        {student.parent ? (
                                                            <Eye className="h-4 w-4 text-slate-400" />
                                                        ) : (
                                                            <EyeOff className="h-4 w-4 text-slate-600" />
                                                        )}
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
        </AppLayout>
    );
}
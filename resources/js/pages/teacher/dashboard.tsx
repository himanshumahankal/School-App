import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { BookOpen, Calendar, Users } from 'lucide-react';

interface Subject {
    id: number;
    name: string;
}

interface Class {
    id: number;
    name: string;
    section: string | null;
}

interface PageProps {
    auth: { user: { name: string } };
    subjects: Subject[];
    classes: Class[];
}

export default function TeacherDashboard() {
    const { auth, subjects, classes } = usePage<PageProps>().props;
    const userName = auth?.user?.name || 'Teacher';

    return (
        <AppLayout>
            <Head title="Teacher Dashboard" />
            <div className="min-h-screen bg-slate-900 p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Welcome, {userName}!</h1>
                    <p className="mt-1 text-slate-400">Teacher Portal Dashboard</p>
                </div>

                <div className="mb-8 overflow-hidden rounded-2xl border border-slate-700 bg-slate-800">
                    <div className="flex items-center gap-3 border-b border-slate-700 p-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600">
                            <BookOpen className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h2 className="font-semibold text-white">My Assignment</h2>
                            <p className="text-sm text-slate-400">Subjects and classes assigned to you</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                        <div className="space-y-4">
                            <h3 className="flex items-center gap-2 text-lg font-medium text-white">
                                <BookOpen className="h-5 w-5 text-blue-400" />
                                My Subjects
                            </h3>
                            {subjects && subjects.length > 0 ? (
                                <div className="space-y-2">
                                    {subjects.map((subject) => (
                                        <div key={subject.id} className="flex items-center gap-3 rounded-xl border border-slate-600 bg-slate-900 p-4">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20">
                                                <BookOpen className="h-4 w-4 text-blue-400" />
                                            </div>
                                            <span className="text-slate-300">{subject.name}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="rounded-xl border border-slate-600 bg-slate-900 p-4 text-slate-500">No subjects assigned yet</p>
                            )}
                        </div>

                        <div className="space-y-4">
                            <h3 className="flex items-center gap-2 text-lg font-medium text-white">
                                <Users className="h-5 w-5 text-green-400" />
                                My Classes
                            </h3>
                            {classes && classes.length > 0 ? (
                                <div className="space-y-2">
                                    {classes.map((cls) => (
                                        <div key={cls.id} className="flex items-center gap-3 rounded-xl border border-slate-600 bg-slate-900 p-4">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600/20">
                                                <Users className="h-4 w-4 text-green-400" />
                                            </div>
                                            <span className="text-slate-300">
                                                {cls.name}
                                                {cls.section ? ` - Section ${cls.section}` : ''}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="rounded-xl border border-slate-600 bg-slate-900 p-4 text-slate-500">No classes assigned yet</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="group rounded-2xl border border-slate-700 bg-slate-800 p-6 transition-all duration-200 hover:border-blue-500">
                        <div className="flex items-center gap-4">
                            <div className="rounded-2xl bg-blue-600 p-4 group-hover:bg-blue-500">
                                <BookOpen className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Total Subjects</p>
                                <p className="text-2xl font-bold text-white">{subjects?.length || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="group rounded-2xl border border-slate-700 bg-slate-800 p-6 transition-all duration-200 hover:border-green-500">
                        <div className="flex items-center gap-4">
                            <div className="rounded-2xl bg-green-600 p-4 group-hover:bg-green-500">
                                <Users className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Total Classes</p>
                                <p className="text-2xl font-bold text-white">{classes?.length || 0}</p>
                            </div>
                        </div>
                    </div>

                    <div className="group rounded-2xl border border-slate-700 bg-slate-800 p-6 transition-all duration-200 hover:border-purple-500">
                        <div className="flex items-center gap-4">
                            <div className="rounded-2xl bg-purple-600 p-4 group-hover:bg-purple-500">
                                <Calendar className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">Today</p>
                                <p className="text-lg font-bold text-white">
                                    {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

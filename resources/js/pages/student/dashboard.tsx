import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Award, BookOpen, Calendar, Clock, FileText, MessageSquare, TrendingUp } from 'lucide-react';

interface PageProps {
    auth: { user: { name: string } };
}

export default function StudentDashboard() {
    const { auth } = usePage<PageProps>().props;
    const userName = auth?.user?.name || 'Student';

    return (
        <AppLayout>
            <Head title="Student Dashboard" />
            <div className="min-h-screen bg-slate-900 p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Welcome, {userName}!</h1>
                    <p className="mt-1 text-slate-400">Student Portal Dashboard</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="group rounded-2xl border border-slate-700 bg-slate-800 p-6 transition-all duration-200 hover:border-blue-500">
                        <div className="flex items-center gap-6">
                            <div className="rounded-2xl bg-blue-600 p-4 group-hover:bg-blue-500">
                                <BookOpen className="h-10 w-10 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white group-hover:text-blue-400">My Subjects</h2>
                                <p className="mt-1 text-slate-400">View enrolled subjects</p>
                            </div>
                        </div>
                    </div>

                    <div className="group rounded-2xl border border-slate-700 bg-slate-800 p-6 transition-all duration-200 hover:border-green-500">
                        <div className="flex items-center gap-6">
                            <div className="rounded-2xl bg-green-600 p-4 group-hover:bg-green-500">
                                <TrendingUp className="h-10 w-10 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white group-hover:text-green-400">My Grades</h2>
                                <p className="mt-1 text-slate-400">Check academic results</p>
                            </div>
                        </div>
                    </div>

                    <div className="group rounded-2xl border border-slate-700 bg-slate-800 p-6 transition-all duration-200 hover:border-purple-500">
                        <div className="flex items-center gap-6">
                            <div className="rounded-2xl bg-purple-600 p-4 group-hover:bg-purple-500">
                                <Calendar className="h-10 w-10 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white group-hover:text-purple-400">Attendance</h2>
                                <p className="mt-1 text-slate-400">My attendance record</p>
                            </div>
                        </div>
                    </div>

                    <div className="group rounded-2xl border border-slate-700 bg-slate-800 p-6 transition-all duration-200 hover:border-amber-500">
                        <div className="flex items-center gap-6">
                            <div className="rounded-2xl bg-amber-600 p-4 group-hover:bg-amber-500">
                                <Clock className="h-10 w-10 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white group-hover:text-amber-400">Timetable</h2>
                                <p className="mt-1 text-slate-400">Class schedule</p>
                            </div>
                        </div>
                    </div>

                    <div className="group rounded-2xl border border-slate-700 bg-slate-800 p-6 transition-all duration-200 hover:border-cyan-500">
                        <div className="flex items-center gap-6">
                            <div className="rounded-2xl bg-cyan-600 p-4 group-hover:bg-cyan-500">
                                <FileText className="h-10 w-10 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white group-hover:text-cyan-400">Homework</h2>
                                <p className="mt-1 text-slate-400">Assignments & tasks</p>
                            </div>
                        </div>
                    </div>

                    <div className="group rounded-2xl border border-slate-700 bg-slate-800 p-6 transition-all duration-200 hover:border-pink-500">
                        <div className="flex items-center gap-6">
                            <div className="rounded-2xl bg-pink-600 p-4 group-hover:bg-pink-500">
                                <Award className="h-10 w-10 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white group-hover:text-pink-400">Achievements</h2>
                                <p className="mt-1 text-slate-400">Awards & certificates</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="rounded-2xl bg-gradient-to-br from-green-600 to-green-800 p-6 text-white">
                        <div className="flex items-center gap-4">
                            <TrendingUp className="h-8 w-8 opacity-80" />
                            <div>
                                <p className="text-sm text-green-200">Average Grade</p>
                                <p className="mt-0.5 text-2xl font-bold">A</p>
                            </div>
                        </div>
                        <p className="mt-4 text-sm text-green-200">Great performance!</p>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 p-6 text-white">
                        <div className="flex items-center gap-4">
                            <MessageSquare className="h-8 w-8 opacity-80" />
                            <div>
                                <p className="text-sm text-purple-200">Messages</p>
                                <p className="mt-0.5 text-2xl font-bold">2</p>
                            </div>
                        </div>
                        <p className="mt-4 text-sm text-purple-200">From teachers</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Award, BookOpen, Calendar, FileText, GraduationCap, MessageSquare } from 'lucide-react';

interface PageProps {
    auth: { user: { name: string } };
}

export default function ParentDashboard() {
    const { auth } = usePage<PageProps>().props;
    const userName = auth?.user?.name || 'Parent';

    return (
        <AppLayout>
            <Head title="Parent Dashboard" />
            <div className="min-h-screen bg-slate-900 p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Welcome, {userName}!</h1>
                    <p className="mt-1 text-slate-400">Parent Portal Dashboard</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="group rounded-2xl border border-slate-700 bg-slate-800 p-6 transition-all duration-200 hover:border-blue-500">
                        <div className="flex items-center gap-6">
                            <div className="rounded-2xl bg-blue-600 p-4 group-hover:bg-blue-500">
                                <GraduationCap className="h-10 w-10 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white group-hover:text-blue-400">My Child</h2>
                                <p className="mt-1 text-slate-400">View child details</p>
                            </div>
                        </div>
                    </div>

                    <div className="group rounded-2xl border border-slate-700 bg-slate-800 p-6 transition-all duration-200 hover:border-green-500">
                        <div className="flex items-center gap-6">
                            <div className="rounded-2xl bg-green-600 p-4 group-hover:bg-green-500">
                                <BookOpen className="h-10 w-10 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white group-hover:text-green-400">Grades</h2>
                                <p className="mt-1 text-slate-400">View academic performance</p>
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
                                <p className="mt-1 text-slate-400">Track attendance records</p>
                            </div>
                        </div>
                    </div>

                    <div className="group rounded-2xl border border-slate-700 bg-slate-800 p-6 transition-all duration-200 hover:border-amber-500">
                        <div className="flex items-center gap-6">
                            <div className="rounded-2xl bg-amber-600 p-4 group-hover:bg-amber-500">
                                <FileText className="h-10 w-10 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white group-hover:text-amber-400">Announcements</h2>
                                <p className="mt-1 text-slate-400">School notices & updates</p>
                            </div>
                        </div>
                    </div>

                    <div className="group rounded-2xl border border-slate-700 bg-slate-800 p-6 transition-all duration-200 hover:border-cyan-500">
                        <div className="flex items-center gap-6">
                            <div className="rounded-2xl bg-cyan-600 p-4 group-hover:bg-cyan-500">
                                <MessageSquare className="h-10 w-10 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white group-hover:text-cyan-400">Messages</h2>
                                <p className="mt-1 text-slate-400">Communicate with teachers</p>
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
                                <p className="mt-1 text-slate-400">View awards & achievements</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-6 text-white">
                        <div className="flex items-center gap-4">
                            <Calendar className="h-8 w-8 opacity-80" />
                            <div>
                                <p className="text-sm text-blue-200">Next Event</p>
                                <p className="mt-0.5 font-medium">Parent-Teacher Meeting</p>
                            </div>
                        </div>
                        <p className="mt-4 text-sm text-blue-200">Scheduled for next week</p>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-green-600 to-green-800 p-6 text-white">
                        <div className="flex items-center gap-4">
                            <GraduationCap className="h-8 w-8 opacity-80" />
                            <div>
                                <p className="text-sm text-green-200">Current Class</p>
                                <p className="mt-0.5 font-medium">Grade 5 - Section A</p>
                            </div>
                        </div>
                        <p className="mt-4 text-sm text-green-200">Your child's current class</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { 
    BookOpen, Calendar, CheckSquare, Clock, FileText, FolderOpen, 
    GraduationCap, MessageSquare, MoreHorizontal, Users, UserCheck, 
    Video, FileBox, TrendingUp, Bell, ClipboardList, BarChart3
} from 'lucide-react';

interface Subject {
    id: number;
    name: string;
}

interface Class {
    id: number;
    name: string;
    section: string | null;
    studentCount?: number;
}

interface PageProps {
    auth: { user: { name: string } };
    stats: {
        totalStudents: number;
        todayAttendance: number;
        pendingAssignments: number;
        totalMaterials: number;
    };
    subjects: Subject[];
    classes: Class[];
}

export default function TeacherDashboard() {
    const { auth, stats, subjects, classes } = usePage<PageProps>().props;
    const userName = auth?.user?.name || 'Teacher';

    const attendancePercentage = stats.totalStudents > 0 
        ? Math.round((stats.todayAttendance / stats.totalStudents) * 100) 
        : 0;

    const quickActions = [
        { icon: UserCheck, label: 'Mark Attendance', href: '/teacher/attendance', color: 'green' },
        { icon: BarChart3, label: 'Analytics', href: '/teacher/charts', color: 'blue' },
        { icon: FolderOpen, label: 'Upload Material', href: '/teacher/materials', color: 'purple' },
        { icon: ClipboardList, label: 'Assignments', href: '/teacher/assignments', color: 'amber' },
    ];

    return (
        <AppLayout>
            <Head title="Teacher Dashboard" />
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Welcome back, {userName}!</h1>
                    <p className="mt-1 text-slate-400">Here's what's happening in your classes today</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <Link
                        href="/teacher/students"
                        className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm transition-all hover:border-blue-500/50"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                        <div className="relative flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-500/20">
                                <GraduationCap className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-blue-300 font-medium">Total Students</p>
                                <p className="text-3xl font-bold text-white">{stats?.totalStudents || 0}</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/teacher/attendance"
                        className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm transition-all hover:border-green-500/50"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                        <div className="relative flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-600 to-green-700 shadow-lg shadow-green-500/20">
                                <UserCheck className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-green-300 font-medium">Today's Present</p>
                                <p className="text-3xl font-bold text-white">{stats?.todayAttendance || 0}</p>
                                <p className="text-xs text-green-400/70">{attendancePercentage}% attendance</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/teacher/assignments"
                        className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm transition-all hover:border-amber-500/50"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                        <div className="relative flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-600 to-amber-700 shadow-lg shadow-amber-500/20">
                                <ClipboardList className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-amber-300 font-medium">Pending</p>
                                <p className="text-3xl font-bold text-white">{stats?.pendingAssignments || 0}</p>
                                <p className="text-xs text-amber-400/70">assignments</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/teacher/materials"
                        className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm transition-all hover:border-purple-500/50"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                        <div className="relative flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-purple-700 shadow-lg shadow-purple-500/20">
                                <FolderOpen className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-purple-300 font-medium">Materials</p>
                                <p className="text-3xl font-bold text-white">{stats?.totalMaterials || 0}</p>
                                <p className="text-xs text-purple-400/70">uploaded</p>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {quickActions.map((action, index) => {
                        const Icon = action.icon;
                        const colors: Record<string, string> = {
                            green: 'from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 border-green-500/30',
                            purple: 'from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 border-purple-500/30',
                            amber: 'from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 border-amber-500/30',
                            blue: 'from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 border-blue-500/30',
                        };
                        return (
                            <Link
                                key={index}
                                href={action.href}
                                className={`flex items-center gap-3 rounded-xl border border-slate-700/50 bg-slate-800/50 p-4 transition-all hover:border-${action.color}-500/50 hover:bg-slate-700/50`}
                            >
                                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${colors[action.color]} shadow-lg`}>
                                    <Icon className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-sm font-medium text-slate-300">{action.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}
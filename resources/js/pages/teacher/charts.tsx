import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { 
    BarChart3, Calendar, CheckCircle, TrendingUp, Users, 
    UserCheck, UserX, ArrowLeft, Download
} from 'lucide-react';

interface AttendanceDay {
    date: string;
    present: number;
    absent: number;
}

interface ClassStat {
    name: string;
    total: number;
    present: number;
    percentage: number;
}

interface PageProps {
    attendanceData: AttendanceDay[];
    classStats: ClassStat[];
}

export default function TeacherCharts() {
    const { attendanceData, classStats } = usePage<PageProps>().props;
    
    const maxPercentage = 100;
    
    return (
        <AppLayout>
            <Head title="Analytics & Charts" />
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
                <div className="mb-8 flex items-center gap-4">
                    <Link
                        href="/teacher/dashboard"
                        className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-2.5 transition-all hover:border-slate-600 hover:bg-slate-700"
                    >
                        <ArrowLeft className="h-5 w-5 text-slate-400" />
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-white">Analytics & Charts</h1>
                        <p className="mt-1 text-slate-400">Attendance trends and performance insights</p>
                    </div>
                    <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-white font-medium hover:bg-blue-500 transition-colors">
                        <Download className="h-4 w-4" />
                        Export
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-600/20 to-green-800/20 p-5 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-green-300">Avg Attendance</p>
                                <p className="mt-1 text-3xl font-bold text-white">
                                    {attendanceData && attendanceData.length > 0 
                                        ? Math.round(attendanceData.reduce((sum, d) => sum + d.present, 0) / attendanceData.length)
                                        : 0}%
                                </p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/20">
                                <TrendingUp className="h-6 w-6 text-green-400" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-600/20 to-blue-800/20 p-5 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-blue-300">Total Students</p>
                                <p className="mt-1 text-3xl font-bold text-white">
                                    {classStats?.reduce((sum, c) => sum + c.total, 0) || 0}
                                </p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20">
                                <Users className="h-6 w-6 text-blue-400" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-600/20 to-amber-800/20 p-5 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-amber-300">Classes</p>
                                <p className="mt-1 text-3xl font-bold text-white">
                                    {classStats?.length || 0}
                                </p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20">
                                <BarChart3 className="h-6 w-6 text-amber-400" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-600/20 to-purple-800/20 p-5 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-purple-300">Present Today</p>
                                <p className="mt-1 text-3xl font-bold text-white">
                                    {classStats?.reduce((sum, c) => sum + c.present, 0) || 0}
                                </p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
                                <UserCheck className="h-6 w-6 text-purple-400" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
                        <div className="border-b border-slate-700/50 bg-gradient-to-r from-blue-900/30 to-transparent p-5">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20">
                                    <BarChart3 className="h-5 w-5 text-blue-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white">Attendance Trend</h2>
                                    <p className="text-sm text-slate-400">Last 7 days overview</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-end justify-between gap-2 h-48">
                                {attendanceData && attendanceData.length > 0 ? (
                                    attendanceData.map((day, index) => (
                                        <div key={index} className="flex flex-col items-center flex-1">
                                            <div className="w-full flex flex-col items-center gap-1">
                                                <div 
                                                    className="w-full max-w-8 rounded-t-lg bg-gradient-to-t from-green-600 to-green-500 transition-all hover:from-green-500 hover:to-green-400"
                                                    style={{ height: `${(day.present / maxPercentage) * 100}%`, minHeight: day.present > 0 ? '8px' : '2px' }}
                                                />
                                                <div 
                                                    className="w-full max-w-8 rounded-t-lg bg-gradient-to-t from-red-600 to-red-500"
                                                    style={{ height: `${(day.absent / maxPercentage) * 100}%`, minHeight: '2px' }}
                                                />
                                            </div>
                                            <span className="text-xs text-slate-500 mt-2">{day.date}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center w-full h-full text-slate-500">
                                        <BarChart3 className="h-12 w-12 mb-2 opacity-50" />
                                        <p>No attendance data</p>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-slate-700/50">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                    <span className="text-sm text-slate-400">Present</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <span className="text-sm text-slate-400">Absent</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
                        <div className="border-b border-slate-700/50 bg-gradient-to-r from-purple-900/30 to-transparent p-5">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20">
                                    <Users className="h-5 w-5 text-purple-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white">Class Performance</h2>
                                    <p className="text-sm text-slate-400">Attendance by class</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-5 space-y-4">
                            {classStats && classStats.length > 0 ? (
                                classStats.map((cls, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-slate-300">{cls.name}</span>
                                            <span className={`text-sm font-medium ${
                                                cls.percentage >= 75 ? 'text-green-400' : 
                                                cls.percentage >= 50 ? 'text-amber-400' : 'text-red-400'
                                            }`}>
                                                {cls.percentage}%
                                            </span>
                                        </div>
                                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full rounded-full transition-all ${
                                                    cls.percentage >= 75 ? 'bg-green-500' : 
                                                    cls.percentage >= 50 ? 'bg-amber-500' : 'bg-red-500'
                                                }`}
                                                style={{ width: `${cls.percentage}%` }}
                                            />
                                        </div>
                                        <p className="text-xs text-slate-500">{cls.present} / {cls.total} students</p>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-8 text-slate-500">
                                    <Users className="h-12 w-12 mb-2 opacity-50" />
                                    <p>No class data</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                        href="/teacher/attendance"
                        className="flex items-center gap-4 rounded-xl border border-slate-700/50 bg-slate-800/50 p-5 hover:border-green-500/50 transition-colors"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/20">
                            <UserCheck className="h-6 w-6 text-green-400" />
                        </div>
                        <div>
                            <p className="font-medium text-white">Mark Attendance</p>
                            <p className="text-sm text-slate-400">Record daily attendance</p>
                        </div>
                    </Link>
                    
                    <Link
                        href="/teacher/students"
                        className="flex items-center gap-4 rounded-xl border border-slate-700/50 bg-slate-800/50 p-5 hover:border-blue-500/50 transition-colors"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20">
                            <Users className="h-6 w-6 text-blue-400" />
                        </div>
                        <div>
                            <p className="font-medium text-white">View Students</p>
                            <p className="text-sm text-slate-400">See student list</p>
                        </div>
                    </Link>
                    
                    <Link
                        href="/teacher/materials"
                        className="flex items-center gap-4 rounded-xl border border-slate-700/50 bg-slate-800/50 p-5 hover:border-purple-500/50 transition-colors"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
                            <Download className="h-6 w-6 text-purple-400" />
                        </div>
                        <div>
                            <p className="font-medium text-white">Materials</p>
                            <p className="text-sm text-slate-400">Access study materials</p>
                        </div>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
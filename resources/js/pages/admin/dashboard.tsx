import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Users, GraduationCap, UserSquare2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
    },
];

interface Props {
    teacherCount: number;
    studentCount: number;
    parentCount: number;
}

export default function AdminDashboard({ teacherCount, studentCount, parentCount }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-6 bg-white dark:bg-zinc-900 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                                <Users className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total Teachers</p>
                                <h3 className="text-2xl font-bold">{teacherCount}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-6 bg-white dark:bg-zinc-900 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                                <GraduationCap className="w-6 h-6 text-green-600 dark:text-green-300" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total Students</p>
                                <h3 className="text-2xl font-bold">{studentCount}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-6 bg-white dark:bg-zinc-900 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                                <UserSquare2 className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total Parents</p>
                                <h3 className="text-2xl font-bold">{parentCount}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[400px] flex-1 rounded-xl border p-6 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
                    <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                         <a href="/admin/teachers/create" className="p-4 border rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                            <p className="font-medium">Add Teacher</p>
                            <p className="text-sm text-zinc-500">Register a new teacher</p>
                         </a>
                         <a href="/admin/students/create" className="p-4 border rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                            <p className="font-medium">Add Student</p>
                            <p className="text-sm text-zinc-500">Register a new student</p>
                         </a>
                         <a href="/admin/exams" className="p-4 border rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                            <p className="font-medium">Manage Exams</p>
                            <p className="text-sm text-zinc-500">View and add exams</p>
                         </a>
                         <a href="/admin/fees" className="p-4 border rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                            <p className="font-medium">Fee Records</p>
                            <p className="text-sm text-zinc-500">Manage student fees</p>
                         </a>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

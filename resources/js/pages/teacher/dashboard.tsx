import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { GraduationCap, BookOpen } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Teacher Dashboard',
        href: '/teacher/dashboard',
    },
];

interface Props {
    studentsCount: number;
    materialsCount: number;
}

export default function TeacherDashboard({ studentsCount, materialsCount }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Teacher Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-6 bg-white dark:bg-zinc-900 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                                <GraduationCap className="w-6 h-6 text-green-600 dark:text-green-300" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total Students</p>
                                <h3 className="text-2xl font-bold">{studentsCount}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-6 bg-white dark:bg-zinc-900 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
                                <BookOpen className="w-6 h-6 text-orange-600 dark:text-orange-300" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total Materials</p>
                                <h3 className="text-2xl font-bold">{materialsCount}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[400px] flex-1 rounded-xl border p-6 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
                    <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                         <a href="/teacher/students" className="p-4 border rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                            <p className="font-medium">My Students</p>
                            <p className="text-sm text-zinc-500">View and manage your students</p>
                         </a>
                         <a href="/teacher/materials" className="p-4 border rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                            <p className="font-medium">Study Materials</p>
                            <p className="text-sm text-zinc-500">Upload notes and assignments</p>
                         </a>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

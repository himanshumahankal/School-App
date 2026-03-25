import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Student Dashboard',
        href: '/student/dashboard',
    },
];

export default function StudentDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Student Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 text-center">
                 <h1 className="text-2xl font-bold">Welcome, Student!</h1>
                 <p className="text-zinc-500 mt-2">View your classes and exams here.</p>
            </div>
        </AppLayout>
    );
}

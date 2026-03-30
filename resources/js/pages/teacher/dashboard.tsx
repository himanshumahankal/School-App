import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function TeacherDashboard() {
    return (
        <AppLayout>
            <Head title="Teacher Dashboard" />
            <div className="p-6">
                <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
                <p className="mt-2 text-gray-600">Welcome to the Teacher Panel</p>
            </div>
        </AppLayout>
    );
}

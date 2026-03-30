import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function StudentDashboard() {
    return (
        <AppLayout>
            <Head title="Student Dashboard" />
            <div className="p-6">
                <h1 className="text-2xl font-bold">Student Dashboard</h1>
                <p className="mt-2 text-gray-600">Welcome to the Student Panel</p>
            </div>
        </AppLayout>
    );
}

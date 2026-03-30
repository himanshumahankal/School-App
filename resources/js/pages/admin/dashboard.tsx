import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function AdminDashboard() {
    return (
        <AppLayout>
            <Head title="Admin Dashboard" />
            <div className="p-6">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="mt-2 text-gray-600">Welcome to the Admin Panel</p>
            </div>
        </AppLayout>
    );
}

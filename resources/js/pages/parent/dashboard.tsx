import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function ParentDashboard() {
    return (
        <AppLayout>
            <Head title="Parent Dashboard" />
            <div className="p-6">
                <h1 className="text-2xl font-bold">Parent Dashboard</h1>
                <p className="mt-2 text-gray-600">Welcome to the Parent Panel</p>
            </div>
        </AppLayout>
    );
}

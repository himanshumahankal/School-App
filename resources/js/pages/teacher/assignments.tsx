import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { ClipboardList } from 'lucide-react';

export default function TeacherAssignments() {
    return (
        <AppLayout>
            <Head title="Assignments" />
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">Assignments</h1>
                    <p className="mt-1 text-slate-400">Create and manage homework assignments</p>
                </div>
                
                <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-12 text-center">
                    <ClipboardList className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-xl font-medium text-slate-300">Coming Soon</p>
                    <p className="text-slate-500 mt-2">Assignments module is under development</p>
                </div>
            </div>
        </AppLayout>
    );
}
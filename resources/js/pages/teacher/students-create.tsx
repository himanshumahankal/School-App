import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { ArrowLeft, UserPlus, Loader2 } from 'lucide-react';
import { useState, FormEvent } from 'react';

interface Class {
    id: number;
    name: string;
    section: string | null;
}

interface PageProps {
    classes: Class[];
}

export default function StudentsCreate() {
    const { classes } = usePage<PageProps>().props;
    const [processing, setProcessing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        roll_number: '',
        class_id: '',
        date_of_birth: '',
        gender: 'male',
        phone: '',
        address: '',
        admission_date: new Date().toISOString().split('T')[0],
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        router.post('/teacher/students', formData, {
            onFinish: () => setProcessing(false),
            onError: (error) => {
                setErrors(error);
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Add Student" />
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
                <div className="mb-8 flex items-center gap-4">
                    <Link
                        href="/teacher/students"
                        className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-2.5 transition-all hover:border-slate-600 hover:bg-slate-700"
                    >
                        <ArrowLeft className="h-5 w-5 text-slate-400" />
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-white">Add New Student</h1>
                        <p className="mt-1 text-slate-400">Add a student to your class</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
                    <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Name *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full rounded-xl border border-slate-600 bg-slate-900 py-2.5 px-4 text-white"
                                    required
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Email *</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full rounded-xl border border-slate-600 bg-slate-900 py-2.5 px-4 text-white"
                                    required
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Roll Number *</label>
                                <input
                                    type="text"
                                    value={formData.roll_number}
                                    onChange={(e) => setFormData({...formData, roll_number: e.target.value})}
                                    className="w-full rounded-xl border border-slate-600 bg-slate-900 py-2.5 px-4 text-white"
                                    required
                                />
                                {errors.roll_number && <p className="mt-1 text-sm text-red-400">{errors.roll_number}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Class *</label>
                                <select
                                    value={formData.class_id}
                                    onChange={(e) => setFormData({...formData, class_id: e.target.value})}
                                    className="w-full rounded-xl border border-slate-600 bg-slate-900 py-2.5 px-4 text-white"
                                    required
                                >
                                    <option value="">Select Class</option>
                                    {classes.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name} {c.section ? `(${c.section})` : ''}
                                        </option>
                                    ))}
                                </select>
                                {errors.class_id && <p className="mt-1 text-sm text-red-400">{errors.class_id}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Date of Birth</label>
                                <input
                                    type="date"
                                    value={formData.date_of_birth}
                                    onChange={(e) => setFormData({...formData, date_of_birth: e.target.value})}
                                    className="w-full rounded-xl border border-slate-600 bg-slate-900 py-2.5 px-4 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Gender</label>
                                <select
                                    value={formData.gender}
                                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                                    className="w-full rounded-xl border border-slate-600 bg-slate-900 py-2.5 px-4 text-white"
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Phone</label>
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    className="w-full rounded-xl border border-slate-600 bg-slate-900 py-2.5 px-4 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Admission Date *</label>
                                <input
                                    type="date"
                                    value={formData.admission_date}
                                    onChange={(e) => setFormData({...formData, admission_date: e.target.value})}
                                    className="w-full rounded-xl border border-slate-600 bg-slate-900 py-2.5 px-4 text-white"
                                    required
                                />
                                {errors.admission_date && <p className="mt-1 text-sm text-red-400">{errors.admission_date}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Address</label>
                            <textarea
                                value={formData.address}
                                onChange={(e) => setFormData({...formData, address: e.target.value})}
                                className="w-full rounded-xl border border-slate-600 bg-slate-900 py-2.5 px-4 text-white"
                                rows={3}
                            />
                        </div>
                        <div className="flex items-center justify-end gap-4 pt-4">
                            <Link
                                href="/teacher/students"
                                className="border border-slate-600 px-6 py-2.5 rounded-xl text-slate-300"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-2.5 rounded-xl text-white font-medium disabled:opacity-50"
                            >
                                {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
                                {processing ? 'Adding...' : 'Add Student'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

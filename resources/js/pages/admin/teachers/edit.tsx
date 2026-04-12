import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, Save, User } from 'lucide-react';

interface Teacher {
    id: number;
    name: string;
    qualification: string | null;
    phone: string | null;
    joining_date: string;
    address: string | null;
    user: {
        email: string;
    };
}

interface PageProps {
    teacher: Teacher;
}

export default function EditTeacher() {
    const { teacher } = usePage<PageProps>().props;
    const { data, setData, post, processing, errors } = useForm({
        name: teacher.name,
        email: teacher.user.email,
        password: '',
        qualification: teacher.qualification || '',
        phone: teacher.phone || '',
        joining_date: teacher.joining_date,
        address: teacher.address || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.teachers.update', teacher.id));
    };

    return (
        <AppLayout>
            <Head title="Edit Teacher" />

            <div className="mx-auto min-h-screen max-w-5xl bg-slate-900 p-6">
                <div className="mb-8">
                    <Link href={route('admin.teachers.index')} className="mb-4 inline-flex items-center gap-2 text-slate-400 hover:text-white">
                        <ArrowLeft className="h-5 w-5" />
                        Back to Teachers
                    </Link>
                    <h1 className="text-3xl font-bold text-white">Edit Teacher</h1>
                    <p className="mt-1 text-slate-400">Update teacher details</p>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-800">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-8 p-8">
                            <div className="flex items-center gap-3 border-b border-slate-700 pb-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                                    <User className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-white">Personal Information</h2>
                                    <p className="text-sm text-slate-400">Basic teacher details</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-300">
                                        Full Name <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-2.5 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        required
                                    />
                                    {errors.name && <p className="text-sm text-red-400">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-300">
                                        Email <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-2.5 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        required
                                    />
                                    {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-300">
                                        Password <span className="text-slate-500">(leave blank to keep current)</span>
                                    </label>
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-2.5 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                    {errors.password && <p className="text-sm text-red-400">{errors.password}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-300">Qualification</label>
                                    <input
                                        type="text"
                                        value={data.qualification}
                                        onChange={(e) => setData('qualification', e.target.value)}
                                        className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-2.5 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="e.g. M.Sc, B.Ed"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-300">Phone</label>
                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-2.5 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="Phone number"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-300">
                                        Joining Date <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={data.joining_date}
                                        onChange={(e) => setData('joining_date', e.target.value)}
                                        className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        required
                                    />
                                    {errors.joining_date && <p className="text-sm text-red-400">{errors.joining_date}</p>}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-300">Address</label>
                                    <textarea
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        rows={3}
                                        className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-2.5 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="Enter address"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 border-t border-slate-700 bg-slate-900 px-8 py-6">
                            <Link
                                href={route('admin.teachers.index')}
                                className="rounded-xl border border-slate-600 px-6 py-2.5 font-medium text-slate-300 transition-colors hover:bg-slate-800"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                            >
                                <Save className="h-5 w-5" />
                                {processing ? 'Updating...' : 'Update Teacher'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

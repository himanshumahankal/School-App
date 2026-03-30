import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, Save, User } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function CreateTeacher() {
    const pageProps = usePage().props as unknown as {
        subjects: { id: number; name: string }[];
        classes: { id: number; name: string; section: string | null }[];
    };

    const { subjects, classes } = pageProps;
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        employee_id: '',
        qualification: '',
        phone: '',
        joining_date: '',
        address: '',
        subject_ids: [] as number[],
        class_ids: [] as number[],
    });

    const toggleSubject = (id: number) => {
        const ids = data.subject_ids.includes(id)
            ? data.subject_ids.filter((s) => s !== id)
            : [...data.subject_ids, id];
        setData('subject_ids', ids);
    };

    const toggleClass = (id: number) => {
        const ids = data.class_ids.includes(id)
            ? data.class_ids.filter((c) => c !== id)
            : [...data.class_ids, id];
        setData('class_ids', ids);
    };

    return (
        <AppLayout>
            <Head title="Add Teacher" />

            <div className="p-6 max-w-5xl mx-auto bg-slate-900 min-h-screen">
                <div className="mb-8">
                    <Link
                        href="/admin/teachers"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-4"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        Back to Teachers
                    </Link>
                    <h1 className="text-3xl font-bold text-white">Add New Teacher</h1>
                    <p className="text-slate-400 mt-1">Fill in the details to add a new teacher</p>
                </div>

                <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                    <form onSubmit={(e) => { e.preventDefault(); post('/admin/teachers'); }}>
                        <div className="p-8 space-y-8">
                            <div className="flex items-center gap-3 pb-4 border-b border-slate-700">
                                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                                    <User className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-white">Personal Information</h2>
                                    <p className="text-sm text-slate-400">Basic teacher details</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-300">
                                        Full Name <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter full name"
                                        required
                                    />
                                    {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-300">
                                        Employee ID <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.employee_id}
                                        onChange={(e) => setData('employee_id', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-400 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g. EMP001"
                                        required
                                    />
                                    {errors.employee_id && <p className="text-red-400 text-sm">{errors.employee_id}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-300">
                                        Email <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="teacher@school.com"
                                        required
                                    />
                                    {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-300">
                                        Password <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter password"
                                        required
                                    />
                                    {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-300">Qualification</label>
                                    <input
                                        type="text"
                                        value={data.qualification}
                                        onChange={(e) => setData('qualification', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g. M.Sc, B.Ed"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-300">Phone</label>
                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                    {errors.joining_date && <p className="text-red-400 text-sm">{errors.joining_date}</p>}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-300">Address</label>
                                    <textarea
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter address"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-4 border-t border-slate-700">
                                <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                                    <User className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-white">Assignment</h2>
                                    <p className="text-sm text-slate-400">Assign subjects and classes</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="block text-sm font-medium text-slate-300">Subjects</label>
                                    <div className="space-y-2 max-h-48 overflow-y-auto border border-slate-600 rounded-xl p-3 bg-slate-900">
                                        {subjects.map((subject) => (
                                            <label key={subject.id} className="flex items-center gap-3 p-2 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors">
                                                <input
                                                    type="checkbox"
                                                    checked={data.subject_ids.includes(subject.id)}
                                                    onChange={() => toggleSubject(subject.id)}
                                                    className="w-5 h-5 rounded border-slate-500 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="text-slate-300">{subject.name}</span>
                                            </label>
                                        ))}
                                        {subjects.length === 0 && (
                                            <p className="text-slate-500 text-sm p-2">No subjects available</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="block text-sm font-medium text-slate-300">Classes</label>
                                    <div className="space-y-2 max-h-48 overflow-y-auto border border-slate-600 rounded-xl p-3 bg-slate-900">
                                        {classes.map((cls) => (
                                            <label key={cls.id} className="flex items-center gap-3 p-2 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors">
                                                <input
                                                    type="checkbox"
                                                    checked={data.class_ids.includes(cls.id)}
                                                    onChange={() => toggleClass(cls.id)}
                                                    className="w-5 h-5 rounded border-slate-500 text-green-600 focus:ring-green-500"
                                                />
                                                <span className="text-slate-300">
                                                    {cls.name}{cls.section ? ` - Section ${cls.section}` : ''}
                                                </span>
                                            </label>
                                        ))}
                                        {classes.length === 0 && (
                                            <p className="text-slate-500 text-sm p-2">No classes available</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-8 py-6 bg-slate-900 border-t border-slate-700 flex justify-end gap-3">
                            <Link
                                href="/admin/teachers"
                                className="px-6 py-2.5 border border-slate-600 rounded-xl text-slate-300 font-medium hover:bg-slate-800 transition-colors"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 transition-colors"
                            >
                                <Save className="h-5 w-5" />
                                {processing ? 'Creating...' : 'Create Teacher'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

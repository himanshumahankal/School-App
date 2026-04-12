import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, Save, User } from 'lucide-react';

interface Student {
    id: number;
    name: string;
    roll_number: string;
    class: {
        id: number;
        name: string;
        section: string | null;
    } | null;
}

interface Parent {
    id: number;
    user_id: number;
    name: string;
    email: string;
    phone: string | null;
    occupation: string | null;
    address: string | null;
    user: {
        email: string;
    };
    students: {
        id: number;
        name: string;
        roll_number: string;
        class: {
            id: number;
            name: string;
            section: string | null;
        } | null;
        relation: string;
    }[];
}

interface PageProps {
    parent: Parent;
    students: Student[];
}

export default function EditParent() {
    const { parent, students } = usePage<PageProps>().props;

    const firstStudent = parent.students[0];

    const { data, setData, post, processing, errors } = useForm({
        name: parent.name,
        email: parent.user.email,
        password: '',
        phone: parent.phone || '',
        occupation: parent.occupation || '',
        address: parent.address || '',
        student_id: firstStudent?.id || ('' as number | ''),
        relation: firstStudent?.relation || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.parents.update', parent.id));
    };

    return (
        <AppLayout>
            <Head title="Edit Parent" />

            <div className="mx-auto min-h-screen max-w-5xl bg-slate-900 p-6">
                <div className="mb-8">
                    <Link href="/admin/parents" className="mb-4 inline-flex items-center gap-2 text-slate-400 hover:text-white">
                        <ArrowLeft className="h-5 w-5" />
                        Back to Parents
                    </Link>
                    <h1 className="text-3xl font-bold text-white">Edit Parent</h1>
                    <p className="mt-1 text-slate-400">Update parent details</p>
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
                                    <p className="text-sm text-slate-400">Basic parent details</p>
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
                                        placeholder="Enter new password"
                                    />
                                    {errors.password && <p className="text-sm text-red-400">{errors.password}</p>}
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
                                    <label className="block text-sm font-medium text-slate-300">Occupation</label>
                                    <input
                                        type="text"
                                        value={data.occupation}
                                        onChange={(e) => setData('occupation', e.target.value)}
                                        className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-2.5 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="e.g. Engineer, Doctor, Business"
                                    />
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

                            <div className="flex items-center gap-3 border-t border-slate-700 pt-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600">
                                    <User className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-white">Student Link</h2>
                                    <p className="text-sm text-slate-400">Link parent to a student</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-300">
                                        Select Student <span className="text-red-400">*</span>
                                    </label>
                                    <select
                                        value={data.student_id}
                                        onChange={(e) => setData('student_id', e.target.value ? Number(e.target.value) : '')}
                                        className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        required
                                    >
                                        <option value="">Select a student</option>
                                        {students.map((student) => (
                                            <option key={student.id} value={student.id}>
                                                {student.name} ({student.roll_number}) - {student.class?.name || 'No Class'}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.student_id && <p className="text-sm text-red-400">{errors.student_id}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-300">
                                        Relation to Student <span className="text-red-400">*</span>
                                    </label>
                                    <select
                                        value={data.relation}
                                        onChange={(e) => setData('relation', e.target.value)}
                                        className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        required
                                    >
                                        <option value="">Select relation</option>
                                        <option value="Father">Father</option>
                                        <option value="Mother">Mother</option>
                                        <option value="Guardian">Guardian</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {errors.relation && <p className="text-sm text-red-400">{errors.relation}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 border-t border-slate-700 bg-slate-900 px-8 py-6">
                            <Link
                                href="/admin/parents"
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
                                {processing ? 'Updating...' : 'Update Parent'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

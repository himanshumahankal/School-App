import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

interface Subject {
    id: number;
    name: string;
}

interface Class {
    id: number;
    name: string;
    section: string | null;
}

interface Teacher {
    id: number;
    name: string;
    employee_id: string;
    qualification: string | null;
    phone: string | null;
    joining_date: string;
    address: string | null;
    user: {
        email: string;
    };
    subjects: { id: number }[];
    classes: { id: number }[];
}

interface PageProps {
    teacher: Teacher;
    subjects: Subject[];
    classes: Class[];
}

export default function EditTeacher() {
    const { teacher } = usePage<PageProps>().props;
    const { data, setData, post, processing, errors } = useForm({
        name: teacher.name,
        email: teacher.user.email,
        password: '',
        employee_id: teacher.employee_id,
        qualification: teacher.qualification || '',
        phone: teacher.phone || '',
        joining_date: teacher.joining_date,
        address: teacher.address || '',
        subject_ids: teacher.subjects.map((s) => s.id),
        class_ids: teacher.classes.map((c) => c.id),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.teachers.update', teacher.id));
    };

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
            <Head title="Edit Teacher" />

            <div className="p-6">
                <div className="mb-6">
                    <Link
                        href={route('admin.teachers.index')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Teachers
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h1 className="text-xl font-bold mb-6">Edit Teacher</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Employee ID <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.employee_id}
                                    onChange={(e) => setData('employee_id', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    required
                                />
                                {errors.employee_id && <p className="text-red-500 text-sm mt-1">{errors.employee_id}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    required
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password <span className="text-gray-400">(leave blank to keep current)</span>
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Qualification
                                </label>
                                <input
                                    type="text"
                                    value={data.qualification}
                                    onChange={(e) => setData('qualification', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Joining Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={data.joining_date}
                                    onChange={(e) => setData('joining_date', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    required
                                />
                                {errors.joining_date && <p className="text-red-500 text-sm mt-1">{errors.joining_date}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Address
                                </label>
                                <textarea
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Subjects
                                </label>
                                <div className="space-y-2 max-h-48 overflow-y-auto border rounded-lg p-3">
                                    {usePage<PageProps>().props.subjects.map((subject) => (
                                        <label key={subject.id} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={data.subject_ids.includes(subject.id)}
                                                onChange={() => toggleSubject(subject.id)}
                                                className="rounded border-gray-300 text-primary focus:ring-primary"
                                            />
                                            <span className="text-sm">{subject.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Classes
                                </label>
                                <div className="space-y-2 max-h-48 overflow-y-auto border rounded-lg p-3">
                                    {usePage<PageProps>().props.classes.map((cls) => (
                                        <label key={cls.id} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={data.class_ids.includes(cls.id)}
                                                onChange={() => toggleClass(cls.id)}
                                                className="rounded border-gray-300 text-primary focus:ring-primary"
                                            />
                                            <span className="text-sm">{cls.name}{cls.section ? ` - Section ${cls.section}` : ''}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <Link
                                href={route('admin.teachers.index')}
                                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
                            >
                                {processing ? 'Updating...' : 'Update Teacher'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

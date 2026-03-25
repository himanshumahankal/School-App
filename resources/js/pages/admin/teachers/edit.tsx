import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Teachers',
        href: '/admin/teachers',
    },
    {
        title: 'Edit Teacher',
        href: '/admin/teachers/edit',
    },
];

interface TeacherProfile {
    phone: string | null;
    address: string | null;
}

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    teacher_profile: TeacherProfile | null;
}

interface Props {
    user: User;
}

export default function EditTeacher({ user }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.teacher_profile?.phone || '',
        address: user.teacher_profile?.address || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('admin.teachers.update', user.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Teacher" />
            <div className="p-4 flex justify-center">
                <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 border rounded-xl shadow-sm p-6">
                    <h1 className="text-2xl font-bold mb-6">Edit Teacher: {user.name}</h1>
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                required
                            />
                            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                            />
                            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                        </div>

                        <div className="flex justify-end gap-4 mt-6">
                            <Link href={route('admin.teachers.index')}>
                                <Button variant="outline">Cancel</Button>
                            </Link>
                            <Button disabled={processing} type="submit">
                                Update Teacher
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

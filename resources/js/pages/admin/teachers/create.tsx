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
        title: 'Add Teacher',
        href: '/admin/teachers/create',
    },
];

export default function CreateTeacher() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        username: '',
        email: '',
        phone: '',
        address: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.teachers.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Teacher" />
            <div className="p-4 flex justify-center">
                <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 border rounded-xl shadow-sm p-6">
                    <h1 className="text-2xl font-bold mb-6">Add New Teacher</h1>
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                placeholder="Enter full name"
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
                                placeholder="Enter username"
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
                                placeholder="Enter email address"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                placeholder="Enter phone number"
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                placeholder="Enter address"
                            />
                            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                        </div>

                        <div className="flex justify-end gap-4 mt-6">
                            <Link href={route('admin.teachers.index')}>
                                <Button variant="outline">Cancel</Button>
                            </Link>
                            <Button disabled={processing} type="submit">
                                Create Teacher
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

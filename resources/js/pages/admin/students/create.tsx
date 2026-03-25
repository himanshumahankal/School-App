import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Students',
        href: '/admin/students',
    },
    {
        title: 'Add Student',
        href: '/admin/students/create',
    },
];

interface SchoolClass {
    id: number;
    name: string;
}

interface Props {
    classes: SchoolClass[];
}

export default function CreateStudent({ classes }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        username: '',
        email: '',
        phone: '',
        address: '',
        roll_number: '',
        school_class_id: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.students.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Student" />
            <div className="p-4 flex justify-center">
                <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 border rounded-xl shadow-sm p-6">
                    <h1 className="text-2xl font-bold mb-6">Add New Student</h1>
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="roll_number">Roll Number</Label>
                                <Input
                                    id="roll_number"
                                    value={data.roll_number}
                                    onChange={(e) => setData('roll_number', e.target.value)}
                                    placeholder="Enter roll number"
                                />
                                {errors.roll_number && <p className="text-red-500 text-sm mt-1">{errors.roll_number}</p>}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="school_class_id">Class</Label>
                                <Select onValueChange={(value) => setData('school_class_id', value)} value={data.school_class_id}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a class" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {classes.map((cls) => (
                                            <SelectItem key={cls.id} value={cls.id.toString()}>
                                                {cls.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.school_class_id && <p className="text-red-500 text-sm mt-1">{errors.school_class_id}</p>}
                            </div>
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
                            <Link href={route('admin.students.index')}>
                                <Button variant="outline">Cancel</Button>
                            </Link>
                            <Button disabled={processing} type="submit">
                                Create Student
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

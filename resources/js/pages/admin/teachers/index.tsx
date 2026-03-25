import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Teachers',
        href: '/admin/teachers',
    },
];

interface TeacherProfile {
    phone: string | null;
    address: string | null;
}

interface Teacher {
    id: number;
    name: string;
    username: string;
    email: string;
    teacher_profile: TeacherProfile | null;
}

interface Props {
    teachers: Teacher[];
}

export default function TeachersIndex({ teachers }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this teacher?')) {
            destroy(route('admin.teachers.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Teachers" />
            <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Teachers</h1>
                    <Link href={route('admin.teachers.create')}>
                        <Button className="flex items-center gap-2">
                            <Plus className="w-4 h-4" /> Add Teacher
                        </Button>
                    </Link>
                </div>

                <div className="bg-white dark:bg-zinc-900 border rounded-xl overflow-hidden shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {teachers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10 text-zinc-500">
                                        No teachers found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                teachers.map((teacher) => (
                                    <TableRow key={teacher.id}>
                                        <TableCell className="font-medium">{teacher.name}</TableCell>
                                        <TableCell>{teacher.username}</TableCell>
                                        <TableCell>{teacher.email}</TableCell>
                                        <TableCell>{teacher.teacher_profile?.phone || 'N/A'}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={route('admin.teachers.edit', teacher.id)}>
                                                    <Button variant="outline" size="icon">
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button 
                                                    variant="destructive" 
                                                    size="icon"
                                                    onClick={() => handleDelete(teacher.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}

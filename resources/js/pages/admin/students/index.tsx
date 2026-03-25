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
        title: 'Students',
        href: '/admin/students',
    },
];

interface SchoolClass {
    id: number;
    name: string;
}

interface StudentProfile {
    phone: string | null;
    roll_number: string | null;
    school_class_id: number | null;
    school_class?: SchoolClass | null;
}

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    student_profile: StudentProfile | null;
}

interface Props {
    students: User[];
    classes: SchoolClass[];
}

export default function StudentsIndex({ students, classes }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this student?')) {
            destroy(route('admin.students.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Students" />
            <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Students</h1>
                    <Link href={route('admin.students.create')}>
                        <Button className="flex items-center gap-2">
                            <Plus className="w-4 h-4" /> Add Student
                        </Button>
                    </Link>
                </div>

                <div className="bg-white dark:bg-zinc-900 border rounded-xl overflow-hidden shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Roll No.</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Class</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-10 text-zinc-500">
                                        No students found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                students.map((student) => (
                                    <TableRow key={student.id}>
                                        <TableCell>{student.student_profile?.roll_number || 'N/A'}</TableCell>
                                        <TableCell className="font-medium">{student.name}</TableCell>
                                        <TableCell>{student.student_profile?.school_class?.name || 'N/A'}</TableCell>
                                        <TableCell>{student.username}</TableCell>
                                        <TableCell>{student.email}</TableCell>
                                        <TableCell>{student.student_profile?.phone || 'N/A'}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={route('admin.students.edit', student.id)}>
                                                    <Button variant="outline" size="icon">
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button 
                                                    variant="destructive" 
                                                    size="icon"
                                                    onClick={() => handleDelete(student.id)}
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

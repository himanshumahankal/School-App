import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Plus, Trash2, FileText } from 'lucide-react';
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Teacher Dashboard',
        href: '/teacher/dashboard',
    },
    {
        title: 'Materials',
        href: '/teacher/materials',
    },
];

interface SchoolClass {
    id: number;
    name: string;
}

interface Subject {
    id: number;
    name: string;
}

interface Material {
    id: number;
    title: string;
    type: string;
    school_class_id: number;
    subject_id: number;
    description: string | null;
    file_path: string | null;
    school_class?: SchoolClass;
    subject?: Subject;
}

interface Props {
    materials: Material[];
    classes: SchoolClass[];
    subjects: Subject[];
}

export default function MaterialsIndex({ materials, classes, subjects }: Props) {
    const { data, setData, post, processing, errors, reset, delete: destroy } = useForm({
        title: '',
        type: '',
        school_class_id: '',
        subject_id: '',
        description: '',
        file: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('teacher.materials.store'), {
            onSuccess: () => reset(),
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this material?')) {
            destroy(route('teacher.materials.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Study Materials" />
            <div className="p-4 space-y-8">
                <div className="bg-white dark:bg-zinc-900 border rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-bold mb-6">Upload New Study Material</h2>
                    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                required
                                placeholder="Chapter 1 Notes"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="type">Type</Label>
                            <Select onValueChange={(value) => setData('type', value)} value={data.type}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="homework">Homework</SelectItem>
                                    <SelectItem value="project">Project</SelectItem>
                                    <SelectItem value="assignment">Assignment</SelectItem>
                                    <SelectItem value="notes">Notes</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="school_class_id">Class</Label>
                            <Select onValueChange={(value) => setData('school_class_id', value)} value={data.school_class_id}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Class" />
                                </SelectTrigger>
                                <SelectContent>
                                    {classes.map((cls) => (
                                        <SelectItem key={cls.id} value={cls.id.toString()}>
                                            {cls.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="subject_id">Subject</Label>
                            <Select onValueChange={(value) => setData('subject_id', value)} value={data.subject_id}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Subject" />
                                </SelectTrigger>
                                <SelectContent>
                                    {subjects.map((sub) => (
                                        <SelectItem key={sub.id} value={sub.id.toString()}>
                                            {sub.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Brief description..."
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="file">File</Label>
                            <Input
                                id="file"
                                type="file"
                                onChange={(e) => setData('file', e.target.files ? e.target.files[0] : null)}
                                className="cursor-pointer"
                            />
                        </div>
                        <div className="md:col-span-3 flex justify-end">
                            <Button disabled={processing} type="submit" className="flex items-center gap-2">
                                <Plus className="w-4 h-4" /> Upload Material
                            </Button>
                        </div>
                    </form>
                    {Object.keys(errors).length > 0 && (
                        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {Object.values(errors).map((err, i) => <p key={i}>{err}</p>)}
                        </div>
                    )}
                </div>

                <div className="bg-white dark:bg-zinc-900 border rounded-xl overflow-hidden shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Class</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead>File</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {materials.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-10 text-zinc-500">
                                        No materials uploaded.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                materials.map((material) => (
                                    <TableRow key={material.id}>
                                        <TableCell className="font-medium">{material.title}</TableCell>
                                        <TableCell className="capitalize">{material.type}</TableCell>
                                        <TableCell>{material.school_class?.name}</TableCell>
                                        <TableCell>{material.subject?.name}</TableCell>
                                        <TableCell>
                                            {material.file_path ? (
                                                <a 
                                                    href={`/storage/${material.file_path}`} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1 text-blue-600 hover:underline"
                                                >
                                                    <FileText className="w-4 h-4" /> View File
                                                </a>
                                            ) : 'No file'}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button 
                                                variant="destructive" 
                                                size="icon"
                                                onClick={() => handleDelete(material.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
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

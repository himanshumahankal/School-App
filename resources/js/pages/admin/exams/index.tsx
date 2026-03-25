import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
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
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Exams',
        href: '/admin/exams',
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

interface Exam {
    id: number;
    name: string;
    class_id: number;
    subject_id: number;
    exam_date: string;
    start_time: string;
    end_time: string;
    total_marks: number;
    school_class?: SchoolClass;
    subject?: Subject;
}

interface Props {
    exams: Exam[];
    classes: SchoolClass[];
    subjects: Subject[];
}

export default function ExamsIndex({ exams, classes, subjects }: Props) {
    const { data, setData, post, processing, errors, reset, delete: destroy } = useForm({
        name: '',
        class_id: '',
        subject_id: '',
        exam_date: '',
        start_time: '',
        end_time: '',
        total_marks: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.exams.store'), {
            onSuccess: () => reset(),
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this exam?')) {
            destroy(route('admin.exams.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Exams" />
            <div className="p-4 space-y-8">
                <div className="bg-white dark:bg-zinc-900 border rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-bold mb-6">Add New Exam Timetable</h2>
                    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Exam Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                placeholder="Mid-term"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="class_id">Class</Label>
                            <Select onValueChange={(value) => setData('class_id', value)} value={data.class_id}>
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
                            <Label htmlFor="exam_date">Date</Label>
                            <Input
                                id="exam_date"
                                type="date"
                                value={data.exam_date}
                                onChange={(e) => setData('exam_date', e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="start_time">Start Time</Label>
                            <Input
                                id="start_time"
                                type="time"
                                value={data.start_time}
                                onChange={(e) => setData('start_time', e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="end_time">End Time</Label>
                            <Input
                                id="end_time"
                                type="time"
                                value={data.end_time}
                                onChange={(e) => setData('end_time', e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="total_marks">Total Marks</Label>
                            <Input
                                id="total_marks"
                                type="number"
                                value={data.total_marks}
                                onChange={(e) => setData('total_marks', e.target.value)}
                                required
                            />
                        </div>
                        <Button disabled={processing} type="submit" className="flex items-center gap-2">
                            <Plus className="w-4 h-4" /> Add Exam
                        </Button>
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
                                <TableHead>Exam Name</TableHead>
                                <TableHead>Class</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Marks</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {exams.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-10 text-zinc-500">
                                        No exams scheduled.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                exams.map((exam) => (
                                    <TableRow key={exam.id}>
                                        <TableCell className="font-medium">{exam.name}</TableCell>
                                        <TableCell>{exam.school_class?.name}</TableCell>
                                        <TableCell>{exam.subject?.name}</TableCell>
                                        <TableCell>{exam.exam_date}</TableCell>
                                        <TableCell>{exam.start_time} - {exam.end_time}</TableCell>
                                        <TableCell>{exam.total_marks}</TableCell>
                                        <TableCell className="text-right">
                                            <Button 
                                                variant="destructive" 
                                                size="icon"
                                                onClick={() => handleDelete(exam.id)}
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

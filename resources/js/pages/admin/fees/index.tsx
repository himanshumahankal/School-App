import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
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
        title: 'Fees',
        href: '/admin/fees',
    },
];

interface User {
    id: number;
    name: string;
}

interface Student {
    id: number;
    user?: User;
}

interface Fee {
    id: number;
    student_id: number;
    amount: number;
    due_date: string;
    status: 'paid' | 'unpaid' | 'partial';
    paid_date: string | null;
    student?: Student;
}

interface Props {
    fees: Fee[];
}

export default function FeesIndex({ fees }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Fees Management" />
            <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Fees Management</h1>
                </div>

                <div className="bg-white dark:bg-zinc-900 border rounded-xl overflow-hidden shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student Name</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Paid Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {fees.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10 text-zinc-500">
                                        No fee records found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                fees.map((fee) => (
                                    <TableRow key={fee.id}>
                                        <TableCell className="font-medium">{fee.student?.user?.name || 'N/A'}</TableCell>
                                        <TableCell>${fee.amount}</TableCell>
                                        <TableCell>{fee.due_date}</TableCell>
                                        <TableCell>
                                            <Badge variant={fee.status === 'paid' ? 'default' : (fee.status === 'unpaid' ? 'destructive' : 'secondary')}>
                                                {fee.status.toUpperCase()}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{fee.paid_date || 'N/A'}</TableCell>
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

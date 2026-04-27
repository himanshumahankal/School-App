import { LucideIcon, Search, Eye, Pencil, Trash2 } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { ReactNode } from 'react';
import { Card, CardContent, CardHeader } from './page-container';

interface Column<T> {
    key: string;
    label: string;
    sortable?: boolean;
    render?: (item: T) => ReactNode;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    searchPlaceholder?: string;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    emptyMessage?: string;
    onDelete?: (id: number) => void;
    showActions?: boolean;
    getId: (item: T) => number;
}

export function DataTable<T extends Record<string, unknown>>({
    data,
    columns,
    searchPlaceholder = 'Search...',
    searchValue = '',
    onSearchChange,
    emptyMessage = 'No data found',
    onDelete,
    showActions = true,
    getId,
}: DataTableProps<T>) {
    const handleDelete = (id: number) => {
        if (confirm(`Are you sure you want to delete this item?`)) {
            onDelete?.(id);
        }
    };

    return (
        <Card>
            {(onSearchChange || showActions) && (
                <CardHeader>
                    {onSearchChange && (
                        <div className="relative flex-1">
                            <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder={searchPlaceholder}
                                value={searchValue}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="w-full rounded-xl border border-slate-600/50 bg-slate-900/50 py-3 pr-4 pl-12 text-white placeholder-slate-400 transition-all focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                            />
                        </div>
                    )}
                </CardHeader>
            )}

            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-900/50">
                                {columns.map((col) => (
                                    <th
                                        key={col.key}
                                        className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase"
                                    >
                                        {col.label}
                                    </th>
                                ))}
                                {showActions && (
                                    <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                        Actions
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length + (showActions ? 1 : 0)} className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-700/50">
                                                <Search className="h-10 w-10 text-slate-500" />
                                            </div>
                                            <p className="text-lg font-medium text-slate-300">{emptyMessage}</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                data.map((item) => (
                                    <tr key={getId(item)} className="transition-all hover:bg-slate-700/30">
                                        {columns.map((col) => (
                                            <td key={col.key} className="px-6 py-4">
                                                {col.render ? col.render(item) : <span className="text-white">{(item[col.key] as string) || '-'}</span>}
                                            </td>
                                        ))}
                                        {showActions && (
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={route(getId(item).toString())}
                                                        className="rounded-lg p-2 transition-colors hover:bg-slate-600/50"
                                                        title="View"
                                                    >
                                                        <Eye className="h-4 w-4 text-slate-400" />
                                                    </Link>
                                                    <Link
                                                        href={`${getId(item)}/edit`}
                                                        className="rounded-lg p-2 transition-colors hover:bg-slate-600/50"
                                                        title="Edit"
                                                    >
                                                        <Pencil className="h-4 w-4 text-slate-400" />
                                                    </Link>
                                                    {onDelete && (
                                                        <button
                                                            onClick={() => handleDelete(getId(item))}
                                                            className="rounded-lg p-2 transition-colors hover:bg-red-500/20"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="h-4 w-4 text-red-400" />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}
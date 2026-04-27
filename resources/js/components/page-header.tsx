import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { ReactNode } from 'react';

interface PageHeaderProps {
    title: string;
    description?: string;
    backUrl?: string;
    actions?: ReactNode;
}

export function PageHeader({ title, description, backUrl, actions }: PageHeaderProps) {
    return (
        <div className="mb-6 flex items-center gap-4">
            {backUrl && (
                <Link
                    href={backUrl}
                    className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-2.5 transition-all hover:border-slate-600 hover:bg-slate-700"
                >
                    <ArrowLeft className="h-5 w-5 text-slate-400" />
                </Link>
            )}
            <div className="flex-1">
                <h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>
                {description && <p className="mt-1 text-slate-400">{description}</p>}
            </div>
            {actions && <div className="flex items-center gap-3">{actions}</div>}
        </div>
    );
}
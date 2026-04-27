import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    variant?: 'blue' | 'purple' | 'green' | 'amber' | 'pink' | 'cyan' | 'red';
    subtitle?: string;
    iconClassName?: string;
}

const variantStyles = {
    blue: {
        border: 'border-blue-500/30',
        bg: 'from-blue-600/20 to-blue-800/20',
        iconBg: 'bg-blue-500/20',
        text: 'text-blue-300',
        icon: 'text-blue-400',
    },
    purple: {
        border: 'border-purple-500/30',
        bg: 'from-purple-600/20 to-purple-800/20',
        iconBg: 'bg-purple-500/20',
        text: 'text-purple-300',
        icon: 'text-purple-400',
    },
    green: {
        border: 'border-green-500/30',
        bg: 'from-green-600/20 to-green-800/20',
        iconBg: 'bg-green-500/20',
        text: 'text-green-300',
        icon: 'text-green-400',
    },
    amber: {
        border: 'border-amber-500/30',
        bg: 'from-amber-600/20 to-amber-800/20',
        iconBg: 'bg-amber-500/20',
        text: 'text-amber-300',
        icon: 'text-amber-400',
    },
    pink: {
        border: 'border-pink-500/30',
        bg: 'from-pink-600/20 to-pink-800/20',
        iconBg: 'bg-pink-500/20',
        text: 'text-pink-300',
        icon: 'text-pink-400',
    },
    cyan: {
        border: 'border-cyan-500/30',
        bg: 'from-cyan-600/20 to-cyan-800/20',
        iconBg: 'bg-cyan-500/20',
        text: 'text-cyan-300',
        icon: 'text-cyan-400',
    },
    red: {
        border: 'border-red-500/30',
        bg: 'from-red-600/20 to-red-800/20',
        iconBg: 'bg-red-500/20',
        text: 'text-red-300',
        icon: 'text-red-400',
    },
};

export function StatsCard({ title, value, icon: Icon, variant = 'blue', subtitle, iconClassName }: StatsCardProps) {
    const styles = variantStyles[variant];

    return (
        <div className={`rounded-2xl border ${styles.border} bg-gradient-to-br ${styles.bg} p-5 backdrop-blur-sm`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className={`text-sm font-medium ${styles.text}`}>{title}</p>
                    <p className="mt-1 text-3xl font-bold text-white">{value}</p>
                    {subtitle && <p className="mt-2 text-sm text-slate-400">{subtitle}</p>}
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${styles.iconBg}`}>
                    <Icon className={`h-6 w-6 ${styles.icon} ${iconClassName || ''}`} />
                </div>
            </div>
        </div>
    );
}

interface StatsGridProps {
    children: ReactNode;
    columns?: 2 | 3 | 4;
}

export function StatsGrid({ children, columns = 4 }: StatsGridProps) {
    const gridCols = {
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-4',
    };

    return <div className={`grid ${gridCols[columns]} gap-4`}>{children}</div>;
}
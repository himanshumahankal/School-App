import { AppSidebar } from '@/components/app-sidebar';
import { PageHeader } from '@/components/page-header';
import { type BreadcrumbItem } from '@/types';
import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebarHeader } from '@/components/app-sidebar-header';

interface PanelLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    title: string;
    description?: string;
    backUrl?: string;
    actions?: React.ReactNode;
}

export function PanelLayout({ 
    children, 
    breadcrumbs = [], 
    title, 
    description, 
    backUrl, 
    actions 
}: PanelLayoutProps) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                    <div className="mx-auto max-w-7xl p-6">
                        <PageHeader 
                            title={title} 
                            description={description}
                            backUrl={backUrl}
                            actions={actions}
                        />
                        {children}
                    </div>
                </div>
            </AppContent>
        </AppShell>
    );
}
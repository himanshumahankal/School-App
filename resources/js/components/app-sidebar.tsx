import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Users, GraduationCap, Calendar, CreditCard, FileText } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage().props as any;
    const user = auth.user;

    const getNavItems = (): NavItem[] => {
        const baseItems: NavItem[] = [
            {
                title: 'Dashboard',
                url: '/dashboard',
                icon: LayoutGrid,
            },
        ];

        if (user.role === 'admin') {
            return [
                ...baseItems,
                {
                    title: 'Teachers',
                    url: '/admin/teachers',
                    icon: Users,
                },
                {
                    title: 'Students',
                    url: '/admin/students',
                    icon: GraduationCap,
                },
                {
                    title: 'Exams',
                    url: '/admin/exams',
                    icon: Calendar,
                },
                {
                    title: 'Fees',
                    url: '/admin/fees',
                    icon: CreditCard,
                },
            ];
        }

        if (user.role === 'teacher') {
            return [
                ...baseItems,
                {
                    title: 'My Students',
                    url: '/teacher/students',
                    icon: GraduationCap,
                },
                {
                    title: 'Study Materials',
                    url: '/teacher/materials',
                    icon: FileText,
                },
            ];
        }

        return baseItems;
    };

    const footerNavItems: NavItem[] = [
        /* {
            title: 'Repository',
            url: 'https://github.com/laravel/react-starter-kit',
            icon: Folder,
        },
        {
            title: 'Documentation',
            url: 'https://laravel.com/docs/starter-kits',
            icon: BookOpen,
        }, */
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={getNavItems()} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

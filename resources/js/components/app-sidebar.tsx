import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, GraduationCap, LayoutDashboard, Users, UsersRound } from 'lucide-react';
import { useState } from 'react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth, classes } = usePage().props as unknown as {
        auth: { user: { role: string } };
        classes?: { id: number; name: string; section: string | null }[];
    };
    const userRole = auth?.user?.role;
    const allClasses = classes || [];
    const [studentsOpen, setStudentsOpen] = useState(false);

    const uniqueClassNames = [...new Set(allClasses.map((cls: { name: string }) => cls.name))].sort((a, b) => {
        const numA = parseInt(a.replace(/\D/g, ''));
        const numB = parseInt(b.replace(/\D/g, ''));
        return numA - numB;
    });

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard">
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/dashboard">
                                <LayoutDashboard className="h-5 w-5" />
                                <span>Dashboard</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {userRole === 'admin' && (
                        <>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/admin/teachers">
                                        <Users className="h-5 w-5" />
                                        <span>Teachers</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/admin/parents">
                                        <UsersRound className="h-5 w-5" />
                                        <span>Parents</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton onClick={() => setStudentsOpen(!studentsOpen)} className="w-full cursor-pointer">
                                    <GraduationCap className="h-5 w-5" />
                                    <span className="flex-1">Students</span>
                                    <ChevronDown className={`h-4 w-4 transition-transform ${studentsOpen ? 'rotate-180' : ''}`} />
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            {studentsOpen && (
                                <div className="ml-4 space-y-1">
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild className="text-sm">
                                            <Link href="/admin/students" className="text-slate-400 hover:text-white">
                                                All Students
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    {uniqueClassNames.map((className: string) => (
                                        <SidebarMenuItem key={className}>
                                            <SidebarMenuButton asChild className="text-sm">
                                                <Link
                                                    href={`/admin/students?class=${encodeURIComponent(className)}`}
                                                    className="text-slate-400 hover:text-white"
                                                >
                                                    {className}
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

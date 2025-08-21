import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, LayoutGrid, ShoppingBag, ShoppingCart, Heart, Package, Users, BarChart3, Tag, Megaphone } from 'lucide-react';
import AppLogo from './app-logo';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

const userNavItems: NavItem[] = [
    {
        title: 'Home',
        href: '/',
        icon: LayoutGrid,
    },
    {
        title: 'Products',
        href: '/products',
        icon: ShoppingBag,
    },
    {
        title: 'Cart',
        href: '/cart',
        icon: ShoppingCart,
    },
    {
        title: 'Wishlist',
        href: '/wishlist',
        icon: Heart,
    },
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
];

const adminNavItems: NavItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin',
        icon: BarChart3,
    },
    {
        title: 'Products',
        href: '/admin/products',
        icon: Package,
    },
    {
        title: 'Categories',
        href: '/admin/categories',
        icon: Tag,
    },
    {
        title: 'Orders',
        href: '/admin/orders',
        icon: ShoppingCart,
    },
    {
        title: 'Customers',
        href: '/admin/users',
        icon: Users,
    },
    {
        title: 'Promotions',
        href: '/admin/promo-codes',
        icon: Megaphone,
    },
    {
        title: 'Store Front',
        href: '/',
        icon: ShoppingBag,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'ShopEase',
        href: '/',
        icon: ShoppingBag,
    },
    {
        title: 'Support',
        href: 'https://wa.me/1234567890',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const page = usePage();
    const auth = page.props.auth as { user?: User } | undefined;
    const user = auth?.user;
    
    const isAdmin = user?.role === 'admin';
    const mainNavItems = isAdmin ? adminNavItems : userNavItems;
    
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={isAdmin ? "/admin" : "/dashboard"} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
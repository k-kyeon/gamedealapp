import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

import { Home, Settings, Users } from 'lucide-react';

const menuItems = [
  { key: 'dashboard', label: 'Admin Dashboard', icon: <Home className="" /> },
  { key: 'pending-users', label: 'Pending Users', icon: <Users className="" /> },
  { key: 'order-history', label: 'Order History', icon: <Settings className="" /> },
];

export default function AdminSidebar({ activePage, setActivePage }) {
  return (
    <NavigationMenu className="w-64 bg-gray-900 text-white p-4 border border-blue-400 rounded-lg shadow-md">
      <NavigationMenuList className="flex flex-col w-full space-y-1 border border-orange-400">
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.to} className="w-full border border-green-300">
            <NavigationMenuLink asChild>
              <button
                onClick={() => setActivePage(item.key)}
                className={`w-full rounded-md transition-colors duration-200 ${
                  activePage === item.key ? 'bg-gray-700' : 'hover:bg-gray-800 hover:text-white'
                }`}
              >
                <div className="flex flex-row items-center">
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </div>
              </button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

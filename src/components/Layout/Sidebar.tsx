import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ChartBarIcon,
  DocumentTextIcon,
  CogIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

const Sidebar: React.FC = () => {
  const navigation = [
    { name: 'Pipeline', href: '/pipeline', icon: ChartBarIcon },
    { name: 'Results', href: '/results', icon: DocumentTextIcon },
    { name: 'Leaderboard', href: '/leaderboard', icon: UserGroupIcon },
    { name: 'Goals', href: '/goals', icon: CogIcon },
    { name: 'Revenue Tracker', href: '/expenses', icon: CurrencyDollarIcon, current: true },
    { name: 'Resources', href: '/resources', icon: DocumentTextIcon },
    { name: 'Admin', href: '/admin', icon: CogIcon },
  ];

  return (
    <div className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <nav className="p-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive || item.current
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
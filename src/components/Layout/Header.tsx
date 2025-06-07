import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">OWE</span>
            </div>
            <span className="font-semibold text-gray-900">HUB</span>
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">v1.0</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-6">
            <select className="bg-transparent border-none text-sm font-medium text-gray-700 focus:outline-none">
              <option>2025</option>
              <option>2024</option>
            </select>
            
            <select className="bg-transparent border-none text-sm font-medium text-gray-700 focus:outline-none">
              <option>January</option>
              <option>February</option>
              <option>March</option>
            </select>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">523 Partners</span>
              <ChevronDownIcon className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {user?.name.charAt(0)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">
                Hello, {user?.name}
              </span>
              <span className="text-xs text-gray-500 capitalize">
                {user?.role.replace('_', ' ')}
              </span>
            </div>
            <ChevronDownIcon className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import { LogOut, User, Shield, Building2, Bell, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  const getRoleIcon = () => {
    switch (user?.role) {
      case 'student':
        return <User className="w-5 h-5" />;
      case 'institution':
        return <Shield className="w-5 h-5" />;
      case 'employer':
        return <Building2 className="w-5 h-5" />;
      default:
        return <User className="w-5 h-5" />;
    }
  };

  const getRoleColor = () => {
    switch (user?.role) {
      case 'student':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'institution':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'employer':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Side - Logo and Branding */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">GITAM Portal</h1>
                <p className="text-xs text-gray-500">Blockchain Secured</p>
              </div>
            </div>
            
            {/* Role Badge */}
            <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium border ${getRoleColor()}`}>
              {getRoleIcon()}
              <span className="capitalize">{user?.role}</span>
            </div>
          </div>

          {/* Right Side - User Info and Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Settings */}
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>

            {/* User Profile */}
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-200"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900">{user?.name}</span>
                <span className="text-xs text-gray-500">
                  {user?.institutionName || user?.companyName || 'Student Portal'}
                </span>
              </div>
            </div>
            
            {/* Logout Button */}
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 hover:border-gray-300"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import Header from './components/Layout/Header';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import InstitutionDashboard from './components/Dashboard/InstitutionDashboard';
import EmployerDashboard from './components/Dashboard/EmployerDashboard';
import BlockchainViewer from './components/Blockchain/BlockchainViewer';

const AppContent: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = React.useState<'dashboard' | 'blockchain'>('dashboard');

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const renderDashboard = () => {
    switch (user?.role) {
      case 'student':
        return <StudentDashboard />;
      case 'institution':
        return <InstitutionDashboard />;
      case 'employer':
        return <EmployerDashboard />;
      default:
        return <div>Invalid user role</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 py-4">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                currentView === 'dashboard'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentView('blockchain')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                currentView === 'blockchain'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Blockchain Explorer
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-8">
        {currentView === 'dashboard' ? renderDashboard() : <BlockchainViewer />}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
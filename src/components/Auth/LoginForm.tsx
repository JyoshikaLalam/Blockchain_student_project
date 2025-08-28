import React, { useState } from 'react';
import { Shield, User, Building2, GraduationCap, AlertCircle, Lock, Mail } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'institution' | 'employer'>('student');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(email, password, role);
      if (!success) {
        setError('Invalid credentials. Please check your email and role selection.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const demoCredentials = {
    student: 'john.student@gitam.edu',
    institution: 'admin@gitam.edu',
    employer: 'hr@techcorp.com'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="text-center lg:text-left text-white space-y-6">
          <div className="flex items-center justify-center lg:justify-start space-x-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">GITAM</h1>
              <p className="text-blue-200 text-sm">Blockchain Portal</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl font-bold leading-tight">
              Secure Student Information Management System
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Experience the future of academic credential management with blockchain technology. 
              Secure, transparent, and tamper-proof student records.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 text-center">
              <Shield className="w-8 h-8 text-blue-200 mx-auto mb-2" />
              <h3 className="font-semibold text-sm">Secure</h3>
              <p className="text-xs text-blue-200">Blockchain Protected</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 text-center">
              <GraduationCap className="w-8 h-8 text-blue-200 mx-auto mb-2" />
              <h3 className="font-semibold text-sm">Academic</h3>
              <p className="text-xs text-blue-200">Credential Management</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 text-center">
              <Building2 className="w-8 h-8 text-blue-200 mx-auto mb-2" />
              <h3 className="font-semibold text-sm">Institutional</h3>
              <p className="text-xs text-blue-200">Multi-Role Access</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Welcome Back</h3>
            <p className="text-gray-600 mt-2">Sign in to access your blockchain portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Your Role
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['student', 'institution', 'employer'] as const).map((roleOption) => (
                  <button
                    key={roleOption}
                    type="button"
                    onClick={() => {
                      setRole(roleOption);
                      setEmail(demoCredentials[roleOption]);
                      setPassword('password123');
                    }}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      role === roleOption
                        ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      {roleOption === 'student' && <User className="w-6 h-6" />}
                      {roleOption === 'institution' && <Shield className="w-6 h-6" />}
                      {roleOption === 'employer' && <Building2 className="w-6 h-6" />}
                      <span className="text-xs font-semibold capitalize">{roleOption}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In to Portal'
              )}
            </button>

            {/* Additional Options */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-gray-600">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                Forgot password?
              </a>
            </div>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-gray-50 rounded-xl border">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <Shield className="w-4 h-4 mr-2 text-blue-600" />
              Demo Accounts
            </h4>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span className="font-medium">Student:</span>
                <span className="font-mono">john.student@gitam.edu</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Institution:</span>
                <span className="font-mono">admin@gitam.edu</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Employer:</span>
                <span className="font-mono">hr@techcorp.com</span>
              </div>
              <div className="mt-3 pt-2 border-t border-gray-200 text-center">
                <span className="text-gray-500">Password: </span>
                <span className="font-mono font-medium">password123</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>© 2024 GITAM Blockchain Portal. All rights reserved.</p>
            <p className="mt-1">Secured by blockchain technology</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
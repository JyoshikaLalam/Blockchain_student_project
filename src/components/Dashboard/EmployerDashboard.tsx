import React, { useState, useEffect } from 'react';
import { Search, Shield, CheckCircle, XCircle, Clock, Eye, Download, AlertTriangle } from 'lucide-react';
import { StudentRecord, VerificationRequest } from '../../types';
import { blockchain } from '../../utils/blockchain';

const EmployerDashboard: React.FC = () => {
  const [verificationRequests, setVerificationRequests] = useState<VerificationRequest[]>([]);
  const [verifyCode, setVerifyCode] = useState('');
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<StudentRecord[]>([]);
  const [showVerificationForm, setShowVerificationForm] = useState(false);

  useEffect(() => {
    // Mock verification requests
    const mockRequests: VerificationRequest[] = [
      {
        id: 'req_001',
        employerName: 'TechCorp Inc.',
        employerEmail: 'hr@techcorp.com',
        studentId: 'STU2021001',
        requestedRecords: ['Bachelor of Science in Computer Science'],
        status: 'approved',
        requestDate: '2024-01-15',
        responseDate: '2024-01-16'
      },
      {
        id: 'req_002',
        employerName: 'TechCorp Inc.',
        employerEmail: 'hr@techcorp.com',
        studentId: 'STU2021002',
        requestedRecords: ['Master of Science in Data Science'],
        status: 'pending',
        requestDate: '2024-01-18'
      }
    ];
    
    setVerificationRequests(mockRequests);
  }, []);

  const handleVerifyCredential = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock verification - in real app, this would verify against blockchain
    const mockResults = [
      {
        verificationCode: 'VER-2024-CS-001',
        isValid: true,
        studentName: 'John Doe',
        institution: 'Tech University',
        certificateTitle: 'Bachelor of Science in Computer Science',
        issueDate: '2024-05-15',
        blockHash: blockchain.getLatestBlock().hash,
        verificationDate: new Date().toISOString()
      },
      {
        verificationCode: 'VER-2023-DSA-045',
        isValid: true,
        studentName: 'John Doe',
        institution: 'Tech University',
        certificateTitle: 'Data Structures and Algorithms Certification',
        issueDate: '2023-12-10',
        blockHash: blockchain.getLatestBlock().hash,
        verificationDate: new Date().toISOString()
      }
    ];

    const result = mockResults.find(r => r.verificationCode === verifyCode) || {
      verificationCode: verifyCode,
      isValid: false,
      error: 'Verification code not found or invalid'
    };

    setVerificationResult(result);
  };

  const requestVerification = (studentId: string) => {
    const newRequest: VerificationRequest = {
      id: `req_${Date.now()}`,
      employerName: 'TechCorp Inc.',
      employerEmail: 'hr@techcorp.com',
      studentId,
      requestedRecords: ['All available records'],
      status: 'pending',
      requestDate: new Date().toISOString().split('T')[0]
    };
    
    setVerificationRequests([newRequest, ...verificationRequests]);
    setShowVerificationForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'denied':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'denied':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Verification Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Credential Verification</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Verify by Code */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Verify by Code</h3>
            <form onSubmit={handleVerifyCredential} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  placeholder="Enter verification code (e.g., VER-2024-CS-001)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Shield className="w-4 h-4" />
                <span>Verify Credential</span>
              </button>
            </form>

            {/* Verification Result */}
            {verificationResult && (
              <div className={`mt-4 p-4 rounded-lg border ${
                verificationResult.isValid 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center space-x-2 mb-3">
                  {verificationResult.isValid ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className={`font-semibold ${
                    verificationResult.isValid ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {verificationResult.isValid ? 'Valid Credential' : 'Invalid Credential'}
                  </span>
                </div>
                
                {verificationResult.isValid ? (
                  <div className="space-y-2 text-sm">
                    <p><strong>Student:</strong> {verificationResult.studentName}</p>
                    <p><strong>Institution:</strong> {verificationResult.institution}</p>
                    <p><strong>Certificate:</strong> {verificationResult.certificateTitle}</p>
                    <p><strong>Issue Date:</strong> {verificationResult.issueDate}</p>
                    <p><strong>Blockchain Hash:</strong> {verificationResult.blockHash.substring(0, 16)}...</p>
                  </div>
                ) : (
                  <p className="text-red-700 text-sm">{verificationResult.error}</p>
                )}
              </div>
            )}
          </div>

          {/* Quick Verification Codes */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Test Codes</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-3">Try these demo verification codes:</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <code className="bg-white px-2 py-1 rounded">VER-2024-CS-001</code>
                  <button 
                    onClick={() => setVerifyCode('VER-2024-CS-001')}
                    className="text-blue-600 hover:text-blue-800 text-xs"
                  >
                    Use
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <code className="bg-white px-2 py-1 rounded">VER-2023-DSA-045</code>
                  <button 
                    onClick={() => setVerifyCode('VER-2023-DSA-045')}
                    className="text-blue-600 hover:text-blue-800 text-xs"
                  >
                    Use
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <code className="bg-white px-2 py-1 rounded">VER-INVALID-123</code>
                  <button 
                    onClick={() => setVerifyCode('VER-INVALID-123')}
                    className="text-blue-600 hover:text-blue-800 text-xs"
                  >
                    Use
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Requests */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Verification Requests</h2>
          <button
            onClick={() => setShowVerificationForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            New Request
          </button>
        </div>

        <div className="space-y-4">
          {verificationRequests.map((request) => (
            <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                    {getStatusIcon(request.status)}
                    <span className="capitalize">{request.status}</span>
                  </span>
                  <span className="text-sm text-gray-600">Request #{request.id}</span>
                </div>
                <span className="text-sm text-gray-500">Requested: {request.requestDate}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Student ID:</span>
                  <p className="font-medium">{request.studentId}</p>
                </div>
                <div>
                  <span className="text-gray-500">Records Requested:</span>
                  <p className="font-medium">{request.requestedRecords.join(', ')}</p>
                </div>
                <div>
                  <span className="text-gray-500">Status:</span>
                  <p className="font-medium">{request.responseDate ? `Responded: ${request.responseDate}` : 'Awaiting response'}</p>
                </div>
              </div>
              
              {request.status === 'approved' && (
                <div className="mt-4 flex space-x-2">
                  <button className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                    <Eye className="w-4 h-4" />
                    <span>View Records</span>
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded-md transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Blockchain Status */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Blockchain Status</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Network Status</h3>
            <p className="text-sm text-green-600">Operational</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Total Blocks</h3>
            <p className="text-sm text-gray-600">{blockchain.getChain().length}</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Chain Integrity</h3>
            <p className={`text-sm ${blockchain.isChainValid() ? 'text-green-600' : 'text-red-600'}`}>
              {blockchain.isChainValid() ? 'Valid' : 'Invalid'}
            </p>
          </div>
        </div>
      </div>

      {/* New Request Modal */}
      {showVerificationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Request Verification</h3>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                requestVerification(formData.get('studentId') as string);
              }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                  <input
                    name="studentId"
                    type="text"
                    placeholder="e.g., STU2021001"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowVerificationForm(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Send Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerDashboard;
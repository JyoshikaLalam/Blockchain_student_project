import React, { useState, useEffect } from 'react';
import { Award, Calendar, GraduationCap, Shield, Eye, Download, BookOpen, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { StudentRecord, Certificate } from '../../types';
import { blockchain } from '../../utils/blockchain';

const StudentDashboard: React.FC = () => {
  const [studentRecord, setStudentRecord] = useState<StudentRecord | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    // Mock student data - in real app, this would fetch from blockchain
    const mockRecord: StudentRecord = {
      id: 'student_001',
      studentId: 'GU21CSE001',
      studentName: 'John Doe',
      institution: 'GITAM University',
      degree: 'Bachelor of Technology',
      major: 'Computer Science & Engineering',
      gpa: 8.75,
      graduationDate: '2024-05-15',
      certificates: [],
      blockHash: blockchain.getLatestBlock().hash,
      previousHash: blockchain.getChain()[0].hash,
      timestamp: Date.now(),
      isVerified: true
    };

    const mockCertificates: Certificate[] = [
      {
        id: 'cert_001',
        title: 'Bachelor of Technology in Computer Science & Engineering',
        type: 'degree',
        issueDate: '2024-05-15',
        institution: 'GITAM University',
        grade: 'First Class with Distinction',
        credits: 160,
        description: 'Four-year undergraduate program in Computer Science & Engineering with specialization in AI/ML.',
        blockHash: blockchain.addBlock(mockRecord).hash,
        verificationCode: 'GITAM-2024-CSE-001'
      },
      {
        id: 'cert_002',
        title: 'Advanced Data Structures & Algorithms',
        type: 'certification',
        issueDate: '2023-12-10',
        institution: 'GITAM University',
        grade: 'A+',
        credits: 4,
        description: 'Advanced certification in data structures, algorithms, and computational complexity analysis.',
        blockHash: blockchain.addBlock({ certId: 'cert_002', studentId: 'GU21CSE001' }).hash,
        verificationCode: 'GITAM-2023-DSA-045'
      },
      {
        id: 'cert_003',
        title: 'Machine Learning Specialization',
        type: 'course',
        issueDate: '2023-08-20',
        institution: 'GITAM University',
        grade: 'A',
        credits: 6,
        description: 'Comprehensive machine learning course covering supervised, unsupervised, and deep learning.',
        blockHash: blockchain.addBlock({ certId: 'cert_003', studentId: 'GU21CSE001' }).hash,
        verificationCode: 'GITAM-2023-ML-128'
      },
      {
        id: 'cert_004',
        title: 'Industry Internship Certificate',
        type: 'certification',
        issueDate: '2023-06-30',
        institution: 'GITAM University',
        grade: 'Excellent',
        credits: 8,
        description: 'Six-month industry internship at leading technology company with project completion.',
        blockHash: blockchain.addBlock({ certId: 'cert_004', studentId: 'GU21CSE001' }).hash,
        verificationCode: 'GITAM-2023-INT-089'
      }
    ];

    setStudentRecord(mockRecord);
    setCertificates(mockCertificates);
  }, []);

  const getCertificateIcon = (type: string) => {
    switch (type) {
      case 'degree':
        return <GraduationCap className="w-5 h-5" />;
      case 'certification':
        return <Award className="w-5 h-5" />;
      case 'course':
        return <BookOpen className="w-5 h-5" />;
      default:
        return <Award className="w-5 h-5" />;
    }
  };

  const getCertificateColor = (type: string) => {
    switch (type) {
      case 'degree':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'certification':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'course':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!studentRecord) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-pulse text-center">
          <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading student records from blockchain...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 text-white relative">
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
            <GraduationCap className="w-full h-full" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <GraduationCap className="w-12 h-12" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Welcome, {studentRecord.studentName}</h1>
                <p className="text-blue-100 text-lg">Student ID: {studentRecord.studentId}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span className="text-green-300 font-medium">Verified on Blockchain</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                <h3 className="font-semibold text-blue-100 mb-2">Institution</h3>
                <p className="text-white font-medium">{studentRecord.institution}</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                <h3 className="font-semibold text-blue-100 mb-2">Program</h3>
                <p className="text-white font-medium">{studentRecord.degree}</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                <h3 className="font-semibold text-blue-100 mb-2">CGPA</h3>
                <p className="text-white font-medium text-2xl">{studentRecord.gpa.toFixed(2)}</p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                <h3 className="font-semibold text-blue-100 mb-2">Certificates</h3>
                <p className="text-white font-medium text-2xl">{certificates.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Academic Progress</p>
              <p className="text-2xl font-bold text-gray-900">85%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Credits Earned</p>
              <p className="text-2xl font-bold text-gray-900">142/160</p>
            </div>
            <BookOpen className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Blockchain Records</p>
              <p className="text-2xl font-bold text-gray-900">{certificates.length}</p>
            </div>
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Days to Graduation</p>
              <p className="text-2xl font-bold text-gray-900">45</p>
            </div>
            <Calendar className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Academic Certificates */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Academic Certificates</h2>
            <p className="text-gray-600 mt-1">Your blockchain-verified academic achievements</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
            <Shield className="w-4 h-4" />
            <span className="font-medium">Blockchain Verified</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <div key={cert.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-xl ${getCertificateColor(cert.type)}`}>
                    {getCertificateIcon(cert.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 leading-tight">{cert.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{cert.institution}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize border ${getCertificateColor(cert.type)}`}>
                  {cert.type}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{cert.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <span className="text-gray-500 font-medium">Issue Date:</span>
                  <p className="font-semibold text-gray-900">{cert.issueDate}</p>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">Grade:</span>
                  <p className="font-semibold text-gray-900">{cert.grade}</p>
                </div>
                {cert.credits && (
                  <div>
                    <span className="text-gray-500 font-medium">Credits:</span>
                    <p className="font-semibold text-gray-900">{cert.credits}</p>
                  </div>
                )}
                <div>
                  <span className="text-gray-500 font-medium">Verification:</span>
                  <p className="font-mono text-xs font-semibold text-blue-600">{cert.verificationCode}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Shield className="w-3 h-3" />
                  <span>Hash: {cert.blockHash.substring(0, 12)}...</span>
                </div>
                <div className="flex space-x-2">
                  <button className="flex items-center space-x-1 px-3 py-2 text-xs text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium">
                    <Eye className="w-3 h-3" />
                    <span>View Details</span>
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-2 text-xs text-green-600 hover:bg-green-50 rounded-lg transition-colors font-medium">
                    <Download className="w-3 h-3" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blockchain Information */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
        <div className="text-center">
          <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Blockchain Security</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Your academic records are secured using blockchain technology, ensuring they are tamper-proof, 
            transparent, and permanently verifiable by employers and institutions worldwide.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900 text-sm">Timestamp</h4>
              <p className="text-xs text-gray-600">{new Date(studentRecord.timestamp).toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <Shield className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900 text-sm">Block Hash</h4>
              <p className="text-xs text-gray-600 font-mono">{studentRecord.blockHash.substring(0, 16)}...</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <CheckCircle className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900 text-sm">Status</h4>
              <p className="text-xs text-green-600 font-semibold">Verified & Immutable</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
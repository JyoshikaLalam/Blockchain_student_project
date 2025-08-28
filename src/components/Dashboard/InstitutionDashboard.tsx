import React, { useState, useEffect } from 'react';
import { Plus, Users, Award, TrendingUp, Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import { StudentRecord, Certificate } from '../../types';
import { blockchain } from '../../utils/blockchain';

const InstitutionDashboard: React.FC = () => {
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Mock students data
    const mockStudents: StudentRecord[] = [
      {
        id: 'student_001',
        studentId: 'STU2021001',
        studentName: 'John Doe',
        institution: 'Tech University',
        degree: 'Bachelor of Science',
        major: 'Computer Science',
        gpa: 3.85,
        graduationDate: '2024-05-15',
        certificates: [],
        blockHash: blockchain.getLatestBlock().hash,
        previousHash: blockchain.getChain()[0].hash,
        timestamp: Date.now() - 86400000,
        isVerified: true
      },
      {
        id: 'student_002',
        studentId: 'STU2021002',
        studentName: 'Jane Smith',
        institution: 'Tech University',
        degree: 'Master of Science',
        major: 'Data Science',
        gpa: 3.92,
        graduationDate: '2024-12-20',
        certificates: [],
        blockHash: blockchain.addBlock({ studentId: 'STU2021002' }).hash,
        previousHash: blockchain.getLatestBlock().hash,
        timestamp: Date.now() - 172800000,
        isVerified: true
      },
      {
        id: 'student_003',
        studentId: 'STU2022001',
        studentName: 'Michael Johnson',
        institution: 'Tech University',
        degree: 'Bachelor of Arts',
        major: 'Digital Media',
        gpa: 3.67,
        graduationDate: '2025-05-15',
        certificates: [],
        blockHash: blockchain.addBlock({ studentId: 'STU2022001' }).hash,
        previousHash: blockchain.getLatestBlock().hash,
        timestamp: Date.now() - 259200000,
        isVerified: false
      }
    ];
    
    setStudents(mockStudents);
  }, []);

  const [newRecord, setNewRecord] = useState({
    studentId: '',
    studentName: '',
    degree: '',
    major: '',
    gpa: '',
    graduationDate: '',
    certificateTitle: '',
    certificateType: 'degree' as 'degree' | 'diploma' | 'certification' | 'course',
    certificateGrade: ''
  });

  const handleCreateRecord = (e: React.FormEvent) => {
    e.preventDefault();
    
    const certificate: Certificate = {
      id: `cert_${Date.now()}`,
      title: newRecord.certificateTitle,
      type: newRecord.certificateType,
      issueDate: newRecord.graduationDate,
      institution: 'Tech University',
      grade: newRecord.certificateGrade,
      credits: newRecord.certificateType === 'degree' ? 120 : 3,
      description: `${newRecord.certificateTitle} issued to ${newRecord.studentName}`,
      blockHash: '',
      verificationCode: `VER-${Date.now().toString().slice(-6)}`
    };

    const studentRecord: StudentRecord = {
      id: `student_${Date.now()}`,
      studentId: newRecord.studentId,
      studentName: newRecord.studentName,
      institution: 'Tech University',
      degree: newRecord.degree,
      major: newRecord.major,
      gpa: parseFloat(newRecord.gpa),
      graduationDate: newRecord.graduationDate,
      certificates: [certificate],
      blockHash: '',
      previousHash: blockchain.getLatestBlock().hash,
      timestamp: Date.now(),
      isVerified: true
    };

    // Add to blockchain
    const block = blockchain.addBlock(studentRecord);
    studentRecord.blockHash = block.hash;
    certificate.blockHash = block.hash;

    setStudents([...students, studentRecord]);
    setNewRecord({
      studentId: '',
      studentName: '',
      degree: '',
      major: '',
      gpa: '',
      graduationDate: '',
      certificateTitle: '',
      certificateType: 'degree',
      certificateGrade: ''
    });
    setShowCreateForm(false);
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'verified' && student.isVerified) ||
                         (filterStatus === 'pending' && !student.isVerified);
    return matchesSearch && matchesFilter;
  });

  const stats = {
    totalStudents: students.length,
    verifiedRecords: students.filter(s => s.isVerified).length,
    pendingVerification: students.filter(s => !s.isVerified).length,
    averageGPA: students.reduce((acc, s) => acc + s.gpa, 0) / students.length || 0
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Verified Records</p>
              <p className="text-3xl font-bold text-green-600">{stats.verifiedRecords}</p>
            </div>
            <Award className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Verification</p>
              <p className="text-3xl font-bold text-orange-600">{stats.pendingVerification}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average GPA</p>
              <p className="text-3xl font-bold text-purple-600">{stats.averageGPA.toFixed(2)}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Actions and Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Records</option>
              <option value="verified">Verified Only</option>
              <option value="pending">Pending Verification</option>
            </select>
          </div>
          
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Student Record</span>
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Student Records</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Degree</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GPA</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Graduation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{student.studentName}</div>
                      <div className="text-sm text-gray-500">{student.studentId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.degree}</div>
                    <div className="text-sm text-gray-500">{student.major}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.gpa.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      student.isVerified 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {student.isVerified ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.graduationDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Record Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Add New Student Record</h3>
              
              <form onSubmit={handleCreateRecord} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newRecord.studentId}
                      onChange={(e) => setNewRecord({...newRecord, studentId: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newRecord.studentName}
                      onChange={(e) => setNewRecord({...newRecord, studentName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newRecord.degree}
                      onChange={(e) => setNewRecord({...newRecord, degree: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Major</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newRecord.major}
                      onChange={(e) => setNewRecord({...newRecord, major: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GPA</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="4"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newRecord.gpa}
                      onChange={(e) => setNewRecord({...newRecord, gpa: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Date</label>
                    <input
                      type="date"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newRecord.graduationDate}
                      onChange={(e) => setNewRecord({...newRecord, graduationDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Title</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newRecord.certificateTitle}
                      onChange={(e) => setNewRecord({...newRecord, certificateTitle: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Type</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newRecord.certificateType}
                      onChange={(e) => setNewRecord({...newRecord, certificateType: e.target.value as any})}
                    >
                      <option value="degree">Degree</option>
                      <option value="diploma">Diploma</option>
                      <option value="certification">Certification</option>
                      <option value="course">Course</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newRecord.certificateGrade}
                      onChange={(e) => setNewRecord({...newRecord, certificateGrade: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Add to Blockchain
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

export default InstitutionDashboard;
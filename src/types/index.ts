export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'institution' | 'employer';
  avatar?: string;
  institutionName?: string;
  companyName?: string;
}

export interface StudentRecord {
  id: string;
  studentId: string;
  studentName: string;
  institution: string;
  degree: string;
  major: string;
  gpa: number;
  graduationDate: string;
  certificates: Certificate[];
  blockHash: string;
  previousHash: string;
  timestamp: number;
  isVerified: boolean;
}

export interface Certificate {
  id: string;
  title: string;
  type: 'degree' | 'diploma' | 'certification' | 'course';
  issueDate: string;
  institution: string;
  grade?: string;
  credits?: number;
  description: string;
  blockHash: string;
  verificationCode: string;
}

export interface VerificationRequest {
  id: string;
  employerName: string;
  employerEmail: string;
  studentId: string;
  requestedRecords: string[];
  status: 'pending' | 'approved' | 'denied';
  requestDate: string;
  responseDate?: string;
}

export interface BlockchainBlock {
  index: number;
  timestamp: number;
  data: any;
  previousHash: string;
  hash: string;
  nonce: number;
}
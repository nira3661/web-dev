/**
 * Frontend HTTP Client & Biometric Service
 * Connects to the backend REST endpoints; provides immediate mock fallbacks
 * so the frontend runs out-of-the-box.
 */
const BASE_URL = 'http://localhost:5000/api';

export const API = {
  // Authentication
  login: async (credentials) => {
    // Replace with: return fetch(`${BASE_URL}/auth/login`, { ... });
    return {
      token: 'jwt_mock_token_pub_9941',
      user: {
        id: 'USR-89',
        name: credentials.email.includes('teacher') ? 'Prof. Charles Anderson' : 'Alex Rivera',
        role: credentials.email.includes('teacher') ? 'teacher' : 'student',
        studentId: 'ST-1001'
      }
    };
  },

  // Teacher Classroom Session
  fetchSessionRoster: async (courseId) => {
    return [
      { studentId: 'ST-1001', name: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120', status: 'Present', checkInTime: '09:02 AM', method: 'Live Camera' },
      { studentId: 'ST-1002', name: 'Devon Vance', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120', status: 'Present', checkInTime: '09:03 AM', method: 'Live Camera' },
      { studentId: 'ST-1003', name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120', status: 'Absent', method: 'Pending' },
      { studentId: 'ST-1004', name: 'Marcus Brody', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120', status: 'Present', checkInTime: '09:05 AM', method: 'Live Camera' }
    ];
  },

  // Save manual attendance correction with reason (Feature #6)
  overrideAttendance: async (payload) => {
    console.log('[AUDIT LOG ENTRY SAVED]:', payload);
    return { success: true, timestamp: new Date().toISOString() };
  },

  // Biometric Vector Registration (Feature #1)
  registerEmbeddings: async (studentId, vectorEmbeddings) => {
    console.log(`[BIOMETRICS SAVED] Enrolled 512-d array for ${studentId}:`, vectorEmbeddings);
    return { status: 201, message: 'Facial signature safely cataloged.' };
  }
};
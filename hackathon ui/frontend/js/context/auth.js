/**
 * State store managing role privileges and authentication status
 */
class AuthState {
  constructor() {
    this.user = JSON.parse(localStorage.getItem('attendeye_user')) || {
      id: 'USR-89',
      name: 'Prof. Charles Anderson',
      role: 'teacher' // Options: 'student' | 'teacher' | 'admin'
    };
  }

  getUser() { return this.user; }

  setRole(role) {
    this.user.role = role;
    this.user.name = role === 'teacher' ? 'Prof. Charles Anderson' : (role === 'student' ? 'Alex Rivera' : 'Administrator');
    localStorage.setItem('attendeye_user', JSON.stringify(this.user));
    window.dispatchEvent(new CustomEvent('auth-changed'));
  }
}

export const authContext = new AuthState();
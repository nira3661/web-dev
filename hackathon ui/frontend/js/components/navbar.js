import { authContext } from '../context/auth.js';

export function renderNavbar(activeRoute) {
  const user = authContext.getUser();

  return `
    <nav class="navbar">
      <div class="nav-brand">
        <div class="brand-icon"><i class="ph-bold ph-eye"></i></div>
        <div>
          <span>PUB AttendEye</span>
          <span class="badge badge-warning" style="margin-left: 6px; font-size: 0.65rem;">VISION ENGINE</span>
        </div>
      </div>

      <div class="nav-links">
        <a class="nav-link ${activeRoute === 'teacher-live' ? 'active' : ''}" data-route="teacher-live">
          <i class="ph ph-video-camera"></i> Live Session
        </a>
        <a class="nav-link ${activeRoute === 'student-enroll' ? 'active' : ''}" data-route="student-enroll">
          <i class="ph ph-fingerprint"></i> Enrolment
        </a>
        <a class="nav-link ${activeRoute === 'student-dash' ? 'active' : ''}" data-route="student-dash">
          <i class="ph ph-user"></i> Student View
        </a>
        <a class="nav-link ${activeRoute === 'admin-reports' ? 'active' : ''}" data-route="admin-reports">
          <i class="ph ph-chart-polar"></i> Reports & AI Metrics
        </a>
      </div>

      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <span style="font-size: 0.8rem; color: var(--text-muted);">Simulate Role:</span>
        <select id="role-selector" style="background: var(--bg-surface); color: #fff; border: 1px solid var(--border-medium); padding: 4px 10px; border-radius: var(--radius-sm); font-size: 0.8rem; cursor: pointer;">
          <option value="teacher" ${user.role === 'teacher' ? 'selected' : ''}>Teacher</option>
          <option value="student" ${user.role === 'student' ? 'selected' : ''}>Student</option>
          <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
        </select>
      </div>
    </nav>
  `;
}
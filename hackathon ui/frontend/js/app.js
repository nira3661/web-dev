import { renderNavbar } from './components/navbar.js';
import { authContext } from './context/auth.js';
import { renderTeacherLiveSession } from './pages/teacher/liveSession.js';
import { renderStudentEnrollment } from './pages/student/enroll.js';
import { renderStudentDashboard } from './pages/student/dashboard.js';
import { renderAdminReports } from './pages/admin/reports.js';

class App {
  constructor() {
    this.currentRoute = 'teacher-live';
    this.init();
  }

  init() {
    this.renderLayout();
    this.bindEvents();

    window.addEventListener('auth-changed', () => {
      this.renderLayout();
    });
  }

  async navigate(route) {
    this.currentRoute = route;
    const viewEl = document.getElementById('app-view');
    
    // Update view based on route
    switch (route) {
      case 'teacher-live':
        viewEl.innerHTML = await renderTeacherLiveSession();
        break;
      case 'student-enroll':
        viewEl.innerHTML = renderStudentEnrollment();
        break;
      case 'student-dash':
        viewEl.innerHTML = renderStudentDashboard();
        break;
      case 'admin-reports':
        viewEl.innerHTML = renderAdminReports();
        break;
      default:
        viewEl.innerHTML = `<h2>Route not found</h2>`;
    }

    // Refresh navbar active state
    document.getElementById('site-header').innerHTML = renderNavbar(this.currentRoute);
    this.bindNavbarEvents();
  }

  renderLayout() {
    document.getElementById('site-header').innerHTML = renderNavbar(this.currentRoute);
    this.navigate(this.currentRoute);
  }

  bindNavbarEvents() {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        this.navigate(link.dataset.route);
      });
    });

    const roleSelector = document.getElementById('role-selector');
    if (roleSelector) {
      roleSelector.addEventListener('change', (e) => {
        authContext.setRole(e.target.value);
      });
    }
  }

  bindEvents() {
    this.bindNavbarEvents();
  }
}

// Bootstrap application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
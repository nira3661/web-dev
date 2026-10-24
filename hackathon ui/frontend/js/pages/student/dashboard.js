export function renderStudentDashboard() {
  const courses = [
    { code: 'CS402', name: 'Deep Neural Networks', attended: 22, total: 24, pct: 91.6 },
    { code: 'CS301', name: 'Operating Systems', attended: 15, total: 22, pct: 68.1 },
    { code: 'CS305', name: 'Database Management', attended: 17, total: 20, pct: 85.0 }
  ];

  return `
    <div style="max-width: 1200px; margin: 0 auto;">
      <!-- Attendance Warning Banner (Feature #7) -->
      <div class="defaulter-alert">
        <i class="ph-bold ph-warning-octagon" style="font-size: 1.75rem;"></i>
        <div>
          <strong style="color: #fff; font-size: 0.95rem;">Attendance Warning: CS301 (Operating Systems) is below 75%</strong>
          <div style="font-size: 0.8rem; margin-top: 2px;">Your current standing is 68.1%. You must attend the next 2 classes to avoid debarment.</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem;">
        ${courses.map(c => `
          <div class="viewport-card" style="padding: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
              <div>
                <span class="font-mono" style="font-size: 0.75rem; background: var(--bg-surface-elevated); padding: 2px 8px; border-radius: 4px;">${c.code}</span>
                <h3 style="margin-top: 6px; font-size: 1.1rem;">${c.name}</h3>
              </div>
              <span class="font-mono" style="font-size: 1.25rem; font-weight: 800; color: ${c.pct < 75 ? 'var(--color-danger)' : 'var(--color-success)'}">
                ${c.pct}%
              </span>
            </div>
            
            <div style="background: var(--bg-primary); height: 8px; border-radius: var(--radius-full); overflow: hidden; margin-bottom: 0.5rem;">
              <div style="background: ${c.pct < 75 ? 'var(--color-danger)' : 'var(--color-success)'}; width: ${c.pct}%; height: 100%;"></div>
            </div>
            
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted);">
              <span>Classes Attended: ${c.attended} / ${c.total}</span>
              <span>Req: 75%</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
export function renderAdminReports() {
  const downloadCSV = () => {
    const csvData = "StudentID,Name,Course,Status,Date\nST-1001,Alex Rivera,CS402,Present,2025-05-10\nST-1002,Devon Vance,CS402,Present,2025-05-10";
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'PUB_AttendEye_FullReport.csv';
    a.click();
  };

  setTimeout(() => {
    document.getElementById('csv-btn')?.addEventListener('click', downloadCSV);
  }, 0);

  return `
    <div style="max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h2>System Performance & Audit Logs</h2>
          <p style="color: var(--text-muted); font-size: 0.85rem;">Evaluation metrics on ResNet-50 / ArcFace test suite (Feature #9)</p>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-secondary" id="csv-btn"><i class="ph-bold ph-file-csv"></i> Download CSV</button>
          <button class="btn btn-primary" onclick="alert('Generating audited PDF...')"><i class="ph-bold ph-file-pdf"></i> Download PDF</button>
        </div>
      </div>

      <!-- Precision / Recall Matrix Cards -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">
        <div class="viewport-card" style="padding: 1.25rem;">
          <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">PRECISION</span>
          <div class="font-mono" style="font-size: 1.75rem; font-weight: 800; color: var(--color-success); margin-top: 4px;">98.4%</div>
        </div>
        <div class="viewport-card" style="padding: 1.25rem;">
          <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">RECALL</span>
          <div class="font-mono" style="font-size: 1.75rem; font-weight: 800; color: var(--color-primary); margin-top: 4px;">96.2%</div>
        </div>
        <div class="viewport-card" style="padding: 1.25rem;">
          <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">FALSE ACCEPT (FAR)</span>
          <div class="font-mono" style="font-size: 1.75rem; font-weight: 800; color: #fff; margin-top: 4px;">0.04%</div>
        </div>
        <div class="viewport-card" style="padding: 1.25rem;">
          <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">FALSE REJECT (FRR)</span>
          <div class="font-mono" style="font-size: 1.75rem; font-weight: 800; color: var(--color-warning); margin-top: 4px;">1.20%</div>
        </div>
      </div>
    </div>
  `;
}
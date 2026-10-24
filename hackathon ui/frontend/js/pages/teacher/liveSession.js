import { renderBoundingBoxes } from '../../components/canvasOverlay.js';
import { openOverrideModal } from '../../components/modal.js';
import { API } from '../../services/api.js';

export async function renderTeacherLiveSession() {
  const records = await API.fetchSessionRoster('CS402');

  const html = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
      <div>
        <h2 style="font-size: 1.5rem;">CS402: Deep Neural Networks (Sec B)</h2>
        <p style="color: var(--text-muted); font-size: 0.85rem;">Active Real-Time Computer Vision Pipeline</p>
      </div>
      <div style="display: flex; gap: 0.75rem; align-items: center;">
        <span class="badge badge-success font-mono"><i class="ph-bold ph-broadcast"></i> CAMERA SCANNING ACTIVE</span>
        <button class="btn btn-danger" id="end-session-btn"><i class="ph-bold ph-stop"></i> Finalize Session</button>
      </div>
    </div>

    <div class="live-grid">
      <!-- Left: Real-time Video Stream Viewport -->
      <div class="viewport-card">
        <div class="video-container" id="camera-stream-box">
          <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200" class="video-element" alt="Classroom Stream">
          
          <div class="stream-overlay-controls">
            <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem;" class="font-mono">
              <i class="ph-fill ph-shield-check" style="color: var(--color-success)"></i> Anti-Spoof Protection Active
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <button class="btn btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.75rem;">
                <i class="ph-bold ph-upload"></i> Upload Photo Instead
              </button>
              <button class="btn btn-primary" style="padding: 0.4rem 0.8rem; font-size: 0.75rem;">
                <i class="ph-bold ph-camera"></i> Snapshot Frame
              </button>
            </div>
          </div>
        </div>

        <!-- Attendance Roster Below Video -->
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Check-In Time</th>
                <th>Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody id="roster-rows">
              ${records.map(r => `
                <tr data-id="${r.studentId}" class="roster-row">
                  <td style="display: flex; align-items: center; gap: 12px;">
                    <img src="${r.avatar}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;">
                    <div>
                      <div style="font-weight: 600; color: #fff;">${r.name}</div>
                      <div class="font-mono" style="font-size: 0.75rem; color: var(--text-muted);">${r.studentId}</div>
                    </div>
                  </td>
                  <td class="font-mono">${r.checkInTime || '--:--'}</td>
                  <td style="color: var(--text-muted); font-size: 0.8rem;">${r.method}</td>
                  <td>
                    <span class="badge ${r.status === 'Present' ? 'badge-success' : 'badge-danger'}">
                      ${r.status}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Right: Low-Confidence Verification Queue -->
      <div class="review-queue-card">
        <h4 style="display: flex; align-items: center; justify-content: space-between; font-size: 0.9rem;">
          <span style="color: var(--color-warning); display: flex; align-items: center; gap: 6px;">
            <i class="ph-bold ph-warning"></i> Needs Review (1)
          </span>
          <span class="font-mono" style="font-size: 0.75rem; color: var(--text-muted);">&lt; 75% Conf.</span>
        </h4>

        <div class="candidate-card" id="review-card-st1003">
          <div style="display: flex; justify-content: space-between; font-size: 0.75rem;">
            <span class="font-mono text-muted">09:05:12 AM</span>
            <span class="badge badge-warning font-mono">62% Match</span>
          </div>

          <div class="comparison-box">
            <div style="text-align: center;">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100" class="crop-preview" alt="Live Face">
              <span style="font-size: 0.65rem; color: var(--text-muted); display: block; margin-top: 4px;">Live Detected</span>
            </div>
            <i class="ph-bold ph-arrows-left-right" style="color: var(--text-faint);"></i>
            <div style="text-align: center;">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" class="crop-preview" style="border-color: var(--border-medium);" alt="Database Face">
              <span style="font-size: 0.65rem; color: var(--text-muted); display: block; margin-top: 4px;">Enrolled</span>
            </div>
          </div>

          <div style="text-align: center;">
            <div style="font-weight: 700; font-size: 0.85rem;">Elena Rostova</div>
            <div class="font-mono" style="font-size: 0.75rem; color: var(--text-muted);">ST-1003</div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
            <button class="btn btn-secondary" id="reject-candidate-btn" style="justify-content: center; font-size: 0.75rem;">Reject</button>
            <button class="btn btn-primary" id="confirm-candidate-btn" style="justify-content: center; font-size: 0.75rem; background: var(--color-success);">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    // Render mocked visual bounding boxes on classroom canvas
    const container = document.getElementById('camera-stream-box');
    if (container) {
      renderBoundingBoxes(container, [
        { x: 18, y: 22, w: 22, h: 42, label: 'Alex Rivera', confidence: 0.94, status: 'verified' },
        { x: 50, y: 28, w: 20, h: 38, label: 'Devon Vance', confidence: 0.88, status: 'verified', isMask: true },
        { x: 76, y: 20, w: 21, h: 40, label: 'Phone Screen Spoof', confidence: 0.21, status: 'spoof' }
      ]);
    }

    // Bind manual correction rows to Audit Modal
    document.querySelectorAll('.roster-row').forEach(row => {
      row.addEventListener('click', () => {
        const id = row.dataset.id;
        const rec = records.find(r => r.studentId === id);
        openOverrideModal(rec, (studentId, updatedStatus) => {
          row.querySelector('td:last-child').innerHTML = `<span class="badge ${updatedStatus === 'Present' ? 'badge-success' : 'badge-danger'}">${updatedStatus} (Override)</span>`;
        });
      });
    });

    // Review Card Quick Actions
    const revCard = document.getElementById('review-card-st1003');
    document.getElementById('confirm-candidate-btn')?.addEventListener('click', () => {
      revCard.remove();
      alert('Elena Rostova confirmed and attendance recorded.');
    });
    document.getElementById('reject-candidate-btn')?.addEventListener('click', () => {
      revCard.remove();
    });
  }, 0);

  return html;
}
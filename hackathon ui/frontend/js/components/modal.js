import { API } from '../services/api.js';

export function openOverrideModal(record, onSaveCallback) {
  const modalContainer = document.getElementById('modal-container');
  
  modalContainer.innerHTML = `
    <div class="modal-card">
      <div class="modal-header">
        <h4 style="display: flex; align-items: center; gap: 8px;">
          <i class="ph-bold ph-shield-check" style="color: var(--color-primary);"></i>
          Manual Attendance Override
        </h4>
        <button id="modal-close" class="btn" style="padding: 4px; background: none; color: var(--text-muted);"><i class="ph-bold ph-x"></i></button>
      </div>
      <div class="modal-body" style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; gap: 1rem; align-items: center; background: var(--bg-surface-elevated); padding: 0.75rem; border-radius: var(--radius-sm);">
          <img src="${record.avatar}" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover;">
          <div>
            <div style="font-weight: 700; color: #fff;">${record.name}</div>
            <div class="font-mono" style="font-size: 0.75rem; color: var(--text-muted);">${record.studentId}</div>
          </div>
        </div>

        <div>
          <label style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 6px;">
            Set New Status
          </label>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem;">
            <button type="button" class="btn btn-secondary override-status-btn active" data-status="Present">Present</button>
            <button type="button" class="btn btn-secondary override-status-btn" data-status="Late">Late</button>
            <button type="button" class="btn btn-secondary override-status-btn" data-status="Absent">Absent</button>
          </div>
        </div>

        <div>
          <label style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 6px;">
            Audited Reason for Adjustment
          </label>
          <textarea id="override-reason" rows="3" placeholder="e.g. Backlight prevented identification; arrived 5 mins late" style="width: 100%; background: var(--bg-primary); border: 1px solid var(--border-medium); border-radius: var(--radius-sm); color: #fff; padding: 0.75rem; font-family: inherit; font-size: 0.85rem; resize: none;"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button id="modal-cancel" class="btn btn-secondary">Cancel</button>
        <button id="modal-submit" class="btn btn-primary">Save & Audit</button>
      </div>
    </div>
  `;

  modalContainer.classList.remove('hidden');

  let selectedStatus = 'Present';
  modalContainer.querySelectorAll('.override-status-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      modalContainer.querySelectorAll('.override-status-btn').forEach(b => b.classList.remove('active', 'btn-primary'));
      btn.classList.add('active', 'btn-primary');
      selectedStatus = btn.dataset.status;
    });
  });

  const close = () => modalContainer.classList.add('hidden');
  modalContainer.querySelector('#modal-close').onclick = close;
  modalContainer.querySelector('#modal-cancel').onclick = close;

  modalContainer.querySelector('#modal-submit').onclick = async () => {
    const reason = modalContainer.querySelector('#override-reason').value;
    if (!reason.trim()) {
      alert('A valid reason is required for the compliance audit trail.');
      return;
    }
    await API.overrideAttendance({ studentId: record.studentId, newStatus: selectedStatus, reason });
    onSaveCallback(record.studentId, selectedStatus);
    close();
  };
}
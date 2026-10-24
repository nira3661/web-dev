import { API } from '../../services/api.js';

export function renderStudentEnrollment() {
  return `
    <div class="wizard-box">
      <div style="display: inline-flex; padding: 12px; border-radius: var(--radius-md); background: rgba(99, 102, 241, 0.1); color: var(--color-primary); margin-bottom: 1rem;">
        <i class="ph-bold ph-fingerprint" style="font-size: 2rem;"></i>
      </div>
      <h2>Biometric Face Vector Enrolment</h2>
      <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.5rem;">
        We convert your facial contours into an irreversible 512-dimensional vector. 
        Raw camera images are purged immediately post-feature extraction.
      </p>

      <div class="camera-guide-ring">
        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500" style="width: 100%; height: 100%; object-fit: cover;">
      </div>

      <div style="margin-bottom: 1.5rem;">
        <span class="badge badge-success font-mono">Stage 1 of 4: Center Face Aligned</span>
      </div>

      <div style="background: var(--bg-primary); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); text-align: left; margin-bottom: 1.5rem;">
        <label style="display: flex; gap: 10px; font-size: 0.8rem; color: var(--text-muted); cursor: pointer;">
          <input type="checkbox" id="consent-check" checked>
          <span>I consent to storing encrypted facial embedding math vectors for proxy-prevention.</span>
        </label>
      </div>

      <button id="capture-sample-btn" class="btn btn-primary" style="width: 100%; justify-content: center; padding: 0.8rem;">
        <i class="ph-bold ph-camera"></i> Capture Vector Sample
      </button>
    </div>
  `;
}
/**
 * Dynamic Computer Vision Bounding Box Canvas Renderer
 */
export function renderBoundingBoxes(containerEl, detections) {
  let overlay = containerEl.querySelector('.box-overlay-container');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'box-overlay-container';
    containerEl.appendChild(overlay);
  }

  overlay.innerHTML = detections.map(d => `
    <div class="bounding-box ${d.status}" style="left:${d.x}%; top:${d.y}%; width:${d.w}%; height:${d.h}%;">
      <div class="bbox-label">
        <i class="ph-bold ${d.status === 'spoof' ? 'ph-warning-octagon' : (d.status === 'review' ? 'ph-question' : 'ph-check-circle')}"></i>
        <span>${d.label}</span>
        <span class="font-mono">${(d.confidence * 100).toFixed(0)}%</span>
        ${d.isMask ? '<span class="badge badge-warning" style="font-size:0.6rem; padding:1px 4px;">MASK</span>' : ''}
      </div>
    </div>
  `).join('');
}
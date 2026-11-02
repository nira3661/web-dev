// Initialize Lucide Icons
lucide.createIcons();

// 1. Navigation View Switcher
function switchView(viewId) {
  document.querySelectorAll('.view-panel').forEach(panel => panel.classList.add('hidden'));
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.classList.remove('bg-sakura-400', 'text-white', 'shadow-sm');
    tab.classList.add('text-cocoa-400');
  });

  const targetPanel = document.getElementById(`view-${viewId}`);
  const targetNav = document.getElementById(`nav-${viewId}`);

  if (targetPanel) targetPanel.classList.remove('hidden');
  if (targetNav) {
    targetNav.classList.remove('text-cocoa-400');
    targetNav.classList.add('bg-sakura-400', 'text-white', 'shadow-sm');
  }

  lucide.createIcons();
}

// 2. Role Selector Controller
function onRoleChange(role) {
  if (role === 'participant') switchView('events');
  else if (role === 'organiser') switchView('ops');
  else if (role === 'volunteer') switchView('volunteer');
  else if (role === 'judge') switchView('judge');
}

// 3. Problem Set Loader & Sub-Tabs
const problems = {
  'A': {
    title: "A. Bitwise Vault",
    desc: "You are given an array of N integers. A vault opens if you can partition the array into two non-empty subsets such that the bitwise XOR sum of elements in both subsets are equal. Determine if it is possible.",
    input: "2\n4\n1 2 4 7\n3\n3 3 0",
    output: "YES\nYES"
  },
  'B': {
    title: "B. Campus Pathways",
    desc: "The campus has V seminar halls and E bidirectional pathways. Find the minimum total distance to visit every building at least once starting from Auditorium (Hall 1).",
    input: "4 4\n1 2 3\n2 3 1\n3 4 2\n4 1 5",
    output: "6"
  },
  'C': {
    title: "C. Subsequence Clash",
    desc: "Given two strings S and T, determine the lexicographically smallest common subsequence of maximum possible length.",
    input: "abacaba\naabc",
    output: "aac"
  }
};

function loadProblem(key) {
  const p = problems[key];
  document.getElementById('prob-title').innerText = p.title;
  document.getElementById('prob-desc').innerText = p.desc;
  document.getElementById('sample-input').innerText = p.input;
  document.getElementById('sample-output').innerText = p.output;

  const pills = document.querySelectorAll('#problem-pills button');
  pills.forEach((btn, idx) => {
    if ((key === 'A' && idx === 0) || (key === 'B' && idx === 1) || (key === 'C' && idx === 2)) {
      btn.className = "px-4 py-1.5 rounded-full text-xs font-bold bg-sakura-400 text-white shadow-sm";
    } else {
      btn.className = "px-4 py-1.5 rounded-full text-xs font-bold bg-white text-cocoa-400 border border-sakura-100 hover:bg-sakura-50";
    }
  });
}

function switchProblemTab(tab) {
  document.getElementById('pcontent-desc').classList.add('hidden');
  document.getElementById('pcontent-subs').classList.add('hidden');
  document.getElementById('pcontent-progress').classList.add('hidden');

  document.getElementById('ptab-desc').className = "px-3 py-1 rounded-full font-bold text-cocoa-400 hover:bg-sakura-100 text-[11px]";
  document.getElementById('ptab-subs').className = "px-3 py-1 rounded-full font-bold text-cocoa-400 hover:bg-sakura-100 text-[11px]";
  document.getElementById('ptab-progress').className = "px-3 py-1 rounded-full font-bold text-cocoa-400 hover:bg-sakura-100 text-[11px]";

  document.getElementById(`pcontent-${tab}`).classList.remove('hidden');
  document.getElementById(`ptab-${tab}`).className = "px-3 py-1 rounded-full font-bold bg-sakura-400 text-white text-[11px]";
}

function copySample() {
  navigator.clipboard.writeText(document.getElementById('sample-input').innerText);
  alert('Sample copied to clipboard.');
}

function toggleCustomInput() {
  const box = document.getElementById('custom-input-box');
  box.classList.toggle('hidden');
}

document.getElementById('practice-toggle').addEventListener('change', function (e) {
  const box = document.getElementById('editorial-box');
  if (e.target.checked) box.classList.remove('hidden');
  else box.classList.add('hidden');
});

// 4. Sandbox Code Execution Simulation
function runCode(isSubmit) {
  const consoleBox = document.getElementById('judge-console');
  const status = document.getElementById('judge-status');
  const pill = document.getElementById('verdict-pill');
  const output = document.getElementById('console-output');
  const verdict = document.getElementById('simulated-verdict').value;

  consoleBox.classList.remove('hidden');
  status.innerText = "Evaluating in sandbox...";
  pill.innerHTML = `<span class="text-sakura-500 font-bold">Running...</span>`;
  output.innerText = "Compiling source via g++ -O3 -std=c++20...\nExecuting isolated testcases...";

  setTimeout(() => {
    if (!isSubmit) {
      status.innerText = "Sample tests passed";
      pill.innerHTML = `<span class="badge-ac-soft px-3 py-1 rounded-full text-[10px] font-bold">SAMPLE MATCH</span>`;
      output.innerText = "Compilation successful (0.02s)\nRunning Sample 1: PASSED\nExecution Time: 0.003s\nOutputs match expected.";
    } else {
      if (verdict === 'AC') {
        status.innerText = "Solution Accepted";
        pill.innerHTML = `<span class="badge-ac-soft px-3 py-1 rounded-full text-[10px] font-bold">ACCEPTED (AC)</span>`;
        output.innerText = "Test 1: AC (0.01s)\nTest 2: AC (0.02s)\nTest 3: AC (0.04s)\nAll 15 test cases passed successfully.\nJudged by Container #02.";
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#FFB6C1', '#FFC0CB', '#FFAFC0', '#FFD1DC', '#FFF9F2', '#E3EDE2']
        });
      } else if (verdict === 'TLE') {
        status.innerText = "Time Limit Exceeded";
        pill.innerHTML = `<span class="badge-tle-soft px-3 py-1 rounded-full text-[10px] font-bold">TIME LIMIT EXCEEDED (TLE)</span>`;
        output.innerText = "Test 1: AC (0.02s)\nTest 2: AC (0.03s)\nTest 3: TLE (> 1.00s)\nExecution exceeded CPU limit.";
      } else if (verdict === 'WA') {
        status.innerText = "Wrong Answer";
        pill.innerHTML = `<span class="badge-wa-soft px-3 py-1 rounded-full text-[10px] font-bold">WRONG ANSWER (WA)</span>`;
        output.innerText = "Test 1: AC\nTest 2: AC\nTest 3: AC\nTest 4: WA\nOutput: NO\nExpected: YES";
      } else if (verdict === 'RE') {
        status.innerText = "Runtime Error (SIGSEGV)";
        pill.innerHTML = `<span class="badge-wa-soft px-3 py-1 rounded-full text-[10px] font-bold">RUNTIME ERROR (RE)</span>`;
        output.innerText = "Exit code 139 (Segmentation fault)\nCheck array bounds.";
      } else if (verdict === 'CE') {
        status.innerText = "Compilation Error";
        pill.innerHTML = `<span class="badge-wa-soft px-3 py-1 rounded-full text-[10px] font-bold">COMPILATION ERROR (CE)</span>`;
        output.innerText = "error: expected ';' before '}' token in line 16.";
      }
    }
  }, 700);
}

// 5. Scoreboard Freeze Simulator
function toggleScoreboardFreeze() {
  const isFrozen = document.getElementById('freeze-toggle').checked;
  const indicator = document.getElementById('freeze-indicator');
  const cell = document.getElementById('null-problem-c');

  if (isFrozen) {
    indicator.classList.remove('hidden');
    cell.innerHTML = `<span class="badge-freeze-soft px-3 py-1 rounded-full font-bold animate-pulse">? (2)</span>`;
  } else {
    indicator.classList.add('hidden');
    cell.innerHTML = `<span class="badge-wa-soft px-3 py-1 rounded-full font-bold">-1</span>`;
  }
}

// 6. Ops Conflict & Resolution Functions
function reassignVenue() {
  const clashItem = document.getElementById('clash-item');
  clashItem.className = "p-4 bg-cream-50 border border-sakura-100 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4";
  clashItem.innerHTML = `
    <div class="flex items-start gap-3">
      <i data-lucide="check" class="w-5 h-5 text-matcha-600 shrink-0 mt-0.5"></i>
      <div>
        <span class="font-bold text-cocoa-900 text-xs">RESOLVED: Robotics Moved to Lab 05</span>
        <p class="text-xs text-cocoa-400 mt-0.5">Both events scheduled without conflicts for 02:00 PM slot.</p>
      </div>
    </div>
    <span class="text-xs font-bold text-matcha-600 bg-matcha-100 px-3 py-1 rounded-full">Resolved</span>
  `;
  document.getElementById('clash-count').innerText = "1 Clash";
  document.getElementById('clash-badge').classList.add('hidden');
  document.getElementById('readiness-pct').innerText = "94%";
  document.getElementById('readiness-bar').style.width = "94%";
  lucide.createIcons();
}

function resolveClashDemo() {
  reassignVenue();
  alert('Conflicts automatically resolved and shifted to reserve laboratories.');
}

function approveSwap(btn) {
  btn.parentElement.innerHTML = `<span class="text-matcha-600 font-bold text-xs">Swap Approved</span>`;
  document.getElementById('uncovered-shifts-count').innerText = "2 Slots";
  alert("Shift replacement approved and roster updated.");
}

function resolveIssue(btn) {
  const row = btn.closest('tr');
  row.children[2].innerHTML = `<span class="badge-ac-soft px-2 py-0.5 rounded-full text-[10px] font-bold">Resolved</span>`;
  btn.outerHTML = `<span class="text-cocoa-300">Closed</span>`;
  alert("Ticket updated to Resolved.");
}

function approveResultsAndCertificates() {
  alert("Results approved by Coordinator. Verified certificates generated for participant portals.");
}

function updateReadinessProgress() {
  document.getElementById('readiness-pct').innerText = "98%";
  document.getElementById('readiness-bar').style.width = "98%";
}

function clockInVolunteer(btn) {
  btn.className = "bg-matcha-500 text-white px-3 py-1 rounded-full text-xs font-bold";
  btn.innerText = "Attended (Clocked-in)";
  alert("Attendance recorded for this shift.");
}

// 7. QR Scanner Simulation
function scanTicketSimulation() {
  const val = document.getElementById('manual-ticket-id').value || "TICKET-9921";
  const card = document.getElementById('scan-result-card');
  card.classList.remove('hidden');

  if (val.includes('9921')) {
    document.getElementById('scan-name').innerText = "Tanvir Ahmed (ByteBenders)";
    document.getElementById('scan-meta').innerText = "Clearance: CSE Lab 3 Seat Confirmed • Refreshment Kit Issued";
  } else {
    document.getElementById('scan-name').innerText = "Visitor ID #" + val;
    document.getElementById('scan-meta').innerText = "General Entry Authorized";
  }
}

function requestSwapModal() {
  const reason = prompt("Enter reason for shift swap request:", "Academic presentation conflict at 2 PM");
  if (reason) alert("Swap request submitted to coordinator queue.");
}

function submitIssue() {
  const desc = document.getElementById('issue-desc').value;
  if (!desc) return alert("Please specify the issue description.");

  const tbody = document.getElementById('issue-table-body');
  const cat = document.getElementById('issue-category').value;
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td class="py-2.5">
      <span class="font-bold text-cocoa-900 font-soft block">${desc}</span>
      <span class="text-[10px] text-cocoa-400">${cat}</span>
    </td>
    <td class="py-2.5 font-soft">Floor Lead (You)</td>
    <td class="py-2.5"><span class="badge-wa-soft px-2 py-0.5 rounded-full text-[10px] font-bold">New Ticket</span></td>
    <td class="py-2.5 text-right"><button onclick="resolveIssue(this)" class="text-matcha-600 font-bold hover:underline">Mark Resolved</button></td>
  `;
  tbody.prepend(tr);

  alert("Ticket dispatched to floor coordinator log.");
  document.getElementById('issue-desc').value = '';
}

// 8. Juror Rubric Updates & Versioning
function updateRubric() {
  const s1 = parseInt(document.getElementById('slider-1').value);
  const s2 = parseInt(document.getElementById('slider-2').value);
  const s3 = parseInt(document.getElementById('slider-3').value);

  document.getElementById('score-val-1').innerText = `${s1} / 10`;
  document.getElementById('score-val-2').innerText = `${s2} / 10`;
  document.getElementById('score-val-3').innerText = `${s3} / 10`;
  document.getElementById('total-rubric-score').innerText = (s1 + s2 + s3);
}

function submitScores() {
  const total = document.getElementById('total-rubric-score').innerText;
  alert(`Score of ${total}/30 recorded in the central jury ledger.`);
}

function loadTeamSubmission(teamKey) {
  if (teamKey === 'smart') {
    document.getElementById('team-abstract').innerText = '"SmartGrid IoT enables self-healing energy distribution using microcontroller meshing."';
  } else {
    document.getElementById('team-abstract').innerText = '"NeuroPulse is an on-device lightweight edge model for predictive maintenance in electrical labs using sound vibrations."';
  }
}

function changeVersion(ver) {
  alert(`Loaded submission version ${ver}.`);
}

// 9. Modals & Helpers
let qrGenerated = false;

function openTicketModal() {
  openModal('modal-ticket');
  if (!qrGenerated) {
    new QRCode(document.getElementById("qrcode-container"), {
      text: "PUB-FEST26-SAKURA-PASS-9921",
      width: 140,
      height: 140,
      colorDark: "#4A3B35",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
    qrGenerated = true;
  }
}

function openModal(id) {
  document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
}

function submitRegistration() {
  const team = document.getElementById('reg-team-name').value || "ByteBenders";
  alert(`Team "${team}" registered. Invitations sent and pass generated.`);
  closeModal('modal-reg');
}

function cancelRegistration(team) {
  if (confirm(`Cancel registration for ${team}? Slot will open for waitlisted participants.`)) {
    alert("Registration cancelled.");
  }
}

function saveNewEvent() {
  alert("New campus event published and logged in Coordinator Ops.");
  closeModal('modal-create-event');
}
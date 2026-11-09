import React, { useState, useRef, useEffect } from 'react';
import { 
  GraduationCap, 
  UserPlus, 
  Check, 
  PaperPlaneTilt, 
  X 
} from './icons.jsx';

export default function App() {
  // Current active view role
  const [role, setRole] = useState('coordinator');
  
  // Active modal state: null | 'proposal' | 'assign' | 'progress' | 'meeting'
  const [activeModal, setActiveModal] = useState(null);

  // Rubric state (Examiner View)
  const [rubric, setRubric] = useState({
    c1: 26,
    c2: 25,
    c3: 18,
    c4: 17
  });
  const totalScore = rubric.c1 + rubric.c2 + rubric.c3 + rubric.c4;

  // Chat messages state (Student View)
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'Dr. Alan Turing',
      text: 'Check the sampling cutoff for the 256Hz notch filter. Ensure no signal noise degrades classifier accuracy.',
      time: '10:14 AM',
      isSelf: false,
    },
    {
      id: 2,
      sender: 'You',
      text: 'Calibrated and uploaded in package v2.1 archive for verification.',
      time: '10:22 AM',
      isSelf: true,
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Supervisor assignment dropdown state
  const [selectedSupervisor, setSelectedSupervisor] = useState('hopper');

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'You',
        text: chatInput.trim(),
        time: 'Just now',
        isSelf: true,
      }
    ]);
    setChatInput('');
  };

  return (
    <div className="bg-sand-150 text-sand-800 font-sans min-h-screen flex flex-col antialiased animate-fade-in">

      {/* Header */}
      <header className="bg-sand-900 text-sand-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-leaf-800 rounded-lg flex items-center justify-center text-leaf-200">
              <GraduationCap size={18} weight="bold" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[15px] font-bold tracking-tight text-white">PUB SuperVise</span>
              <span className="text-[11px] text-sand-400 font-medium hidden sm:inline">Project &amp; Thesis Supervision Portal</span>
            </div>
          </div>
          <select 
            id="plotStationSelector" 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            className="text-xs font-medium bg-sand-800 border border-sand-700 rounded-lg px-3 py-1.5 text-sand-200 focus:outline-none focus:ring-2 focus:ring-leaf-600 cursor-pointer"
          >
            <option value="coordinator">Coordinator &mdash; Master Oversight</option>
            <option value="student">Student / Researcher &mdash; Project Workspace</option>
            <option value="supervisor">Supervisor &mdash; Review &amp; Mentorship</option>
            <option value="board">Examiner &mdash; Defence &amp; Evaluation Board</option>
          </select>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-5 sm:px-8 py-6 lg:py-8">

        {/* ======================================================== */}
        {/* 1. COORDINATOR VIEW                                      */}
        {/* ======================================================== */}
        {role === 'coordinator' && (
          <section id="coordinatorView" className="space-y-5">
            
            {/* Hero Banner — warm terracotta gradient */}
            <div className="rounded-2xl overflow-hidden flex flex-col md:flex-row border border-sand-300/50" style={{ background: 'linear-gradient(135deg, #faf5f0 0%, #f5ebe0 60%, #eeddd0 100%)' }}>
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-clay-600 text-[11px] font-semibold tracking-wide bg-clay-100 rounded-full mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-clay-500"></span>
                    Coordinator Master Console
                  </span>
                  <h1 className="text-2xl sm:text-[28px] font-bold text-sand-900 leading-tight">Project &amp; Thesis Supervision Overview</h1>
                  <p className="text-[13px] text-sand-600 mt-2 max-w-xl leading-relaxed">
                    Supervising all final-year projects and theses across academic cohorts. Monitoring progress milestones, enforcing faculty load limits, and managing at-risk projects prior to defence scheduling.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  <button onClick={() => setActiveModal('assign')} className="px-4 py-2 bg-leaf-700 hover:bg-leaf-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-sm">
                    <UserPlus size={16} weight="bold" />
                    Assign Supervisor
                  </button>
                  <button onClick={() => alert('Supervision cohort capacity audit exported.')} className="px-4 py-2 bg-sand-50/70 border border-sand-300 hover:border-sand-400 text-sand-700 text-xs font-medium rounded-lg transition-colors">
                    Export Capacity Census
                  </button>
                </div>
              </div>
              <div className="w-full md:w-72 h-44 md:h-auto relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80" alt="Supervision Environment" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#f5ebe0] via-[#f5ebe0]/30 to-transparent"></div>
              </div>
            </div>

            {/* Health Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div className="bg-leaf-50 p-4 rounded-xl border border-leaf-200/50">
                <span className="text-[11px] font-medium text-leaf-700/70 tracking-wide">Total Active Projects</span>
                <p className="text-xl font-bold text-sand-900 mt-0.5">42 Projects</p>
                <span className="text-[11px] text-leaf-600 font-medium">100% Cohort Registered</span>
              </div>
              <div className="bg-clay-50 p-4 rounded-xl border border-clay-100">
                <span className="text-[11px] font-medium text-clay-600 tracking-wide">Projects At Risk</span>
                <p className="text-xl font-bold text-clay-600 mt-0.5">3 Projects</p>
                <span className="text-[11px] text-clay-600/80 font-medium">&gt;7 days milestone delay</span>
              </div>
              <div className="bg-honey-50 p-4 rounded-xl border border-honey-200/50">
                <span className="text-[11px] font-medium text-honey-600/80 tracking-wide">Supervisor Capacity Load</span>
                <p className="text-xl font-bold text-sand-900 mt-0.5">84% Capacity</p>
                <span className="text-[11px] text-honey-500 font-medium">2 supervisors at ceiling</span>
              </div>
              <div className="bg-leaf-50 p-4 rounded-xl border border-leaf-200/50">
                <span className="text-[11px] font-medium text-leaf-700/70 tracking-wide">Defences Scheduled</span>
                <p className="text-xl font-bold text-leaf-700 mt-0.5">8 Defences</p>
                <span className="text-[11px] text-sand-500 font-medium">Pre-defence verified</span>
              </div>
            </div>

            {/* Supervisor Quota & Delay Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              
              <div className="p-5 rounded-xl border border-sand-200 space-y-4" style={{ background: 'linear-gradient(180deg, #faf8f3 0%, #f5efe6 100%)' }}>
                <div className="flex items-center justify-between pb-3 border-b border-sand-200/60">
                  <h3 className="font-semibold text-sm text-sand-900">Supervisor Load Limits</h3>
                  <span className="text-[11px] text-sand-500 font-medium">Max 4 projects</span>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <div className="flex justify-between font-medium text-sand-800 mb-1.5">
                      <span>Dr. Alan Turing</span>
                      <span className="text-clay-600 font-semibold">4 / 4 &mdash; Full</span>
                    </div>
                    <div className="w-full bg-sand-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-clay-500 h-full w-full rounded-full"></div>
                    </div>
                    <p className="text-[11px] text-sand-500 mt-1">Allocation locked by maximum capacity rule.</p>
                  </div>

                  <div>
                    <div className="flex justify-between font-medium text-sand-800 mb-1.5">
                      <span>Dr. Sarah Connor</span>
                      <span className="text-sand-700 font-medium">3 / 4 &mdash; 75%</span>
                    </div>
                    <div className="w-full bg-sand-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-honey-500 h-full w-3/4 rounded-full"></div>
                    </div>
                    <p className="text-[11px] text-sand-500 mt-1">1 project allocation slot remaining.</p>
                  </div>

                  <div>
                    <div className="flex justify-between font-medium text-sand-800 mb-1.5">
                      <span>Dr. Grace Hopper</span>
                      <span className="text-leaf-600 font-medium">1 / 4 &mdash; Open</span>
                    </div>
                    <div className="w-full bg-sand-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-leaf-500 h-full w-1/4 rounded-full"></div>
                    </div>
                    <p className="text-[11px] text-sand-500 mt-1">Available for incoming proposal assignments.</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 p-5 rounded-xl border border-clay-100/80 space-y-4" style={{ background: 'linear-gradient(180deg, #fcf7f5 0%, #f8f0ed 100%)' }}>
                <div className="flex items-center justify-between pb-3 border-b border-clay-100/60">
                  <h3 className="font-semibold text-sm text-clay-700">Projects At Risk &amp; Delay Warnings</h3>
                  <span className="text-[11px] text-sand-500 font-medium">Overdue milestones</span>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 bg-clay-50 border border-clay-100 rounded-lg flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-clay-600 text-white font-semibold text-[10px] rounded">OVERDUE 11 DAYS</span>
                        <span className="text-xs font-medium text-sand-700">CS-402</span>
                      </div>
                      <h4 className="font-semibold text-[13px] text-sand-900 mt-1">Neural EEG Prosthetics Control Pipeline</h4>
                      <p className="text-xs text-sand-600">K. Miller, T. Davis &middot; Supervisor: Dr. Alan Turing</p>
                      <p className="text-xs text-clay-600 mt-1">Blocker: Biosensor laboratory equipment calibration failure</p>
                    </div>
                    <button className="shrink-0 px-3.5 py-1.5 bg-sand-50/80 border border-clay-400/30 text-clay-700 font-medium text-xs rounded-lg hover:bg-clay-50 transition-colors">
                      Inspect Project
                    </button>
                  </div>

                  <div className="p-3.5 bg-honey-50 border border-honey-100 rounded-lg flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-honey-500 text-white font-semibold text-[10px] rounded">UNASSIGNED PROPOSAL</span>
                        <span className="text-xs font-medium text-sand-700">CS-415</span>
                      </div>
                      <h4 className="font-semibold text-[13px] text-sand-900 mt-1">Microgrid Energy Storage Self-Balancing Architecture</h4>
                      <p className="text-xs text-sand-600">P. Adams, E. Stone &middot; Preferred: Dr. Hopper</p>
                    </div>
                    <button onClick={() => setActiveModal('assign')} className="shrink-0 px-3.5 py-1.5 bg-honey-500 text-white font-medium text-xs rounded-lg hover:bg-honey-600 transition-colors shadow-sm">
                      Assign Supervisor
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Master Register Table */}
            <div className="bg-sand-50 rounded-xl border border-sand-200 overflow-hidden">
              <div className="p-4 bg-leaf-50/60 border-b border-leaf-200/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <h3 className="font-semibold text-sm text-sand-900">Active Thesis &amp; Project Register</h3>
                <input type="text" placeholder="Search project ID, student, supervisor..." className="text-xs bg-sand-50 border border-sand-200 rounded-lg px-3 py-1.5 w-64 focus:outline-none focus:ring-1 focus:ring-leaf-600/50 placeholder:text-sand-400" />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-leaf-50/40 text-sand-500 text-[11px] tracking-wide border-b border-sand-200/60">
                    <tr>
                      <th className="p-3 font-medium">Project Code &amp; Title</th>
                      <th className="p-3 font-medium">Research Area</th>
                      <th className="p-3 font-medium">Team Members</th>
                      <th className="p-3 font-medium">Supervisor</th>
                      <th className="p-3 font-medium">Current Milestone</th>
                      <th className="p-3 font-medium">Status</th>
                      <th className="p-3 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sand-150 text-sand-700">
                    <tr className="hover:bg-leaf-50/30 transition-colors">
                      <td className="p-3 font-semibold text-sand-900">CS-101: Vision AI Swarm Coordination</td>
                      <td className="p-3">Robotics &amp; CV</td>
                      <td className="p-3">Alex Vance, Eli Vance</td>
                      <td className="p-3 font-medium text-leaf-700">Dr. Alan Turing</td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-leaf-100 text-leaf-700 rounded-full text-[11px] font-medium">Stage 3: Implementation</span></td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-leaf-100 text-leaf-700 rounded-full text-[11px] font-medium">On Schedule</span></td>
                      <td className="p-3 text-right"><button className="text-leaf-700 font-medium hover:underline">Inspect</button></td>
                    </tr>
                    <tr className="hover:bg-leaf-50/30 transition-colors">
                      <td className="p-3 font-semibold text-sand-900">CS-102: Zero-Knowledge Verification Architecture</td>
                      <td className="p-3">Applied Cryptography</td>
                      <td className="p-3">Sarah J., Gordon F.</td>
                      <td className="p-3 font-medium text-leaf-700">Dr. Sarah Connor</td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-honey-100 text-honey-600 rounded-full text-[11px] font-medium">Stage 4: Draft Report</span></td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-clay-50 text-clay-600 rounded-full text-[11px] font-medium">Overdue</span></td>
                      <td className="p-3 text-right"><button className="text-leaf-700 font-medium hover:underline">Inspect</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ======================================================== */}
        {/* 2. STUDENT VIEW                                          */}
        {/* ======================================================== */}
        {role === 'student' && (
          <section id="studentView" className="space-y-5">

            {/* Hero Banner */}
            <div className="rounded-2xl overflow-hidden flex flex-col md:flex-row border border-plum-200/50" style={{ background: 'linear-gradient(135deg, #f8f3fb 0%, #f2eaf7 60%, #eadff0 100%)' }}>
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-plum-600 text-[11px] font-semibold tracking-wide bg-plum-100 rounded-full mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-plum-500"></span>
                    Student Research Workspace
                  </span>
                  <h1 className="text-2xl sm:text-[28px] font-bold text-sand-900 leading-tight">Neural EEG Prosthetics Control Pipeline</h1>
                  <p className="text-xs text-sand-500 mt-1">Project ID: CS-2024-401 &middot; Supervisor: Dr. Alan Turing</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  <button onClick={() => setActiveModal('proposal')} className="px-4 py-2 bg-sand-50/70 border border-plum-200 hover:border-plum-300 text-plum-700 text-xs font-medium rounded-lg transition-colors">
                    Revise Proposal (Scope v1.2)
                  </button>
                  <button onClick={() => setActiveModal('progress')} className="px-4 py-2 bg-plum-600 hover:bg-plum-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm">
                    Submit Progress Deliverable
                  </button>
                </div>
              </div>
              <div className="w-full md:w-72 h-44 md:h-auto relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=800&q=80" alt="Student Research Project" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#f2eaf7] via-[#f2eaf7]/30 to-transparent"></div>
              </div>
            </div>

            {/* Sandbox Notice */}
            <div className="p-3 bg-plum-50 border-l-[3px] border-plum-400 rounded-r-lg text-xs text-plum-800 flex justify-between items-center">
              <span><strong>Project Sandboxing Active:</strong> You can only access your designated project. Historical deliverables are permanently archived and cannot be overwritten.</span>
              <span className="text-[10px] font-medium bg-plum-100 px-2 py-0.5 rounded-full text-plum-700 shrink-0 ml-3">Immutable Versions</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              
              {/* Milestones & Version History */}
              <div className="lg:col-span-2 space-y-5">
                <div className="p-5 rounded-xl border border-plum-200/40 space-y-4" style={{ background: 'linear-gradient(180deg, #faf7fc 0%, #f5f0f8 100%)' }}>
                  <div className="flex justify-between items-center pb-3 border-b border-plum-200/30">
                    <h3 className="font-semibold text-sm text-sand-900">Project Milestones &amp; Deliverables</h3>
                    <span className="text-xs text-leaf-600 font-medium">3 of 5 completed</span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 bg-leaf-50/60 rounded-lg border border-leaf-200/30 flex justify-between items-start">
                      <div>
                        <span className="font-medium text-sand-800">1. Literature Review &amp; Background Study</span>
                        <p className="text-sand-500 mt-0.5">Alex Vance &middot; Approved by Dr. Turing (Scope v1.1)</p>
                      </div>
                      <span className="px-2 py-0.5 bg-leaf-100 text-leaf-700 font-medium rounded-full text-[11px] shrink-0">Completed Oct 12</span>
                    </div>

                    <div className="p-3 bg-leaf-50/60 rounded-lg border border-leaf-200/30 flex justify-between items-start">
                      <div>
                        <span className="font-medium text-sand-800">2. System Architecture &amp; Neural Filter Design</span>
                        <p className="text-sand-500 mt-0.5">Eli Vance &middot; Approved by Dr. Turing (Scope v1.0)</p>
                      </div>
                      <span className="px-2 py-0.5 bg-leaf-100 text-leaf-700 font-medium rounded-full text-[11px] shrink-0">Completed Nov 02</span>
                    </div>

                    <div className="p-3 bg-plum-50 rounded-lg border border-plum-200/50 flex justify-between items-start">
                      <div>
                        <span className="font-medium text-plum-800">3. Firmware Prototype &amp; Code Implementation</span>
                        <p className="text-sand-500 mt-0.5">Alex &amp; Eli &middot; 85% completed; signal filter integration active</p>
                      </div>
                      <span className="px-2 py-0.5 bg-plum-100 text-plum-700 font-medium rounded-full text-[11px] shrink-0">Due in 3 Days</span>
                    </div>

                    <div className="p-3 bg-clay-50 rounded-lg border border-clay-100 flex justify-between items-start">
                      <div>
                        <span className="font-medium text-clay-700">4. Draft Thesis Report &amp; Benchmark Documentation</span>
                        <p className="text-clay-600/80 mt-0.5">Deadline lapsed Nov 20 &middot; Flagged automatically on coordinator dashboard</p>
                      </div>
                      <span className="px-2 py-0.5 bg-clay-600 text-white font-medium rounded-full text-[11px] shrink-0">Overdue</span>
                    </div>

                    <div className="p-3 bg-sand-100/60 rounded-lg opacity-50 flex justify-between items-start">
                      <div>
                        <span className="font-medium text-sand-700">5. Final Report, Code Digest &amp; Board Defence</span>
                        <p className="text-sand-500 mt-0.5">Scheduled upon draft thesis approval</p>
                      </div>
                      <span className="px-2 py-0.5 bg-sand-200 text-sand-600 font-medium rounded-full text-[11px] shrink-0">Due Dec 15</span>
                    </div>
                  </div>
                </div>

                <div className="bg-sand-50 p-5 rounded-xl border border-plum-200/30 space-y-3">
                  <h3 className="font-semibold text-sm text-sand-900">Submission History &amp; Versioned Deliverables</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-plum-50/50 border-b border-plum-200/30 text-sand-500 text-[11px] tracking-wide">
                        <tr>
                          <th className="p-2.5 font-medium">Version</th>
                          <th className="p-2.5 font-medium">Deliverable File</th>
                          <th className="p-2.5 font-medium">Timestamp</th>
                          <th className="p-2.5 font-medium">Reported Blockers</th>
                          <th className="p-2.5 font-medium">Supervisor Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-sand-150 text-sand-700">
                        <tr className="hover:bg-plum-50/30 transition-colors">
                          <td className="p-2.5 font-semibold text-plum-600">v2.1</td>
                          <td className="p-2.5 font-medium">Signal_Filter_Code_Nov.zip</td>
                          <td className="p-2.5 text-sand-500">Yesterday, 14:22</td>
                          <td className="p-2.5 text-sand-500">Hardware amplifier recalibration</td>
                          <td className="p-2.5"><span className="px-2 py-0.5 bg-honey-100 text-honey-600 rounded-full font-medium text-[11px]">Pending Review</span></td>
                        </tr>
                        <tr className="hover:bg-plum-50/30 transition-colors">
                          <td className="p-2.5 font-semibold text-plum-600">v2.0</td>
                          <td className="p-2.5 font-medium">EEG_PreProcessing_Model.pdf</td>
                          <td className="p-2.5 text-sand-500">Nov 10, 09:15</td>
                          <td className="p-2.5 text-sand-500">None</td>
                          <td className="p-2.5"><span className="px-2 py-0.5 bg-leaf-100 text-leaf-700 rounded-full font-medium text-[11px]">Approved with Notes</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Chat & Checklist sidebar */}
              <div className="space-y-5">
                
                <div className="rounded-xl border border-plum-200/40 flex flex-col h-96 overflow-hidden" style={{ background: '#faf7fc' }}>
                  <div className="p-3 bg-plum-50 border-b border-plum-200/30 flex justify-between items-center">
                    <span className="text-xs font-semibold text-sand-800">Project Chat Channel</span>
                    <span className="text-[10px] bg-clay-500 text-white font-medium px-2 py-0.5 rounded-full">1 Unread</span>
                  </div>
                  <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
                    {chatMessages.map(msg => (
                      <div 
                        key={msg.id} 
                        className={msg.isSelf 
                          ? "bg-plum-600 text-white p-2.5 rounded-xl rounded-tr-sm max-w-[85%] ml-auto" 
                          : "bg-sand-150 p-2.5 rounded-xl rounded-tl-sm max-w-[85%]"
                        }
                      >
                        <span className={msg.isSelf ? "font-semibold text-plum-200 text-[11px]" : "font-semibold text-sand-700 text-[11px]"}>
                          {msg.sender}
                        </span>
                        <p className={msg.isSelf ? "mt-1 leading-relaxed" : "text-sand-800 mt-1 leading-relaxed"}>
                          {msg.text}
                        </p>
                        <span className={msg.isSelf ? "text-[10px] text-plum-300 block text-right mt-1" : "text-[10px] text-sand-400 block mt-1"}>
                          {msg.time}
                        </span>
                      </div>
                    ))}
                    <div ref={chatBottomRef} />
                  </div>
                  <form onSubmit={handleSendMessage} className="p-2.5 bg-plum-50/60 border-t border-plum-200/30 flex gap-2">
                    <input 
                      type="text" 
                      value={chatInput} 
                      onChange={(e) => setChatInput(e.target.value)} 
                      placeholder="Message supervisor &amp; team..." 
                      className="text-xs flex-1 border border-plum-200/50 bg-sand-50 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-plum-500/40 placeholder:text-sand-400" 
                    />
                    <button type="submit" className="px-3 py-1.5 bg-plum-600 text-white text-xs font-medium rounded-lg hover:bg-plum-700 transition-colors">
                      Send
                    </button>
                  </form>
                </div>

                <div className="bg-leaf-50/50 p-5 rounded-xl border border-leaf-200/40 space-y-3">
                  <h4 className="font-semibold text-xs text-sand-800">Final Submission Checklist</h4>
                  <div className="space-y-2.5 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sand-700">Final Thesis Report (PDF)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sand-700">Verified Code Repository Link</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sand-700">A1 Project Poster (PDF)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sand-700">Similarity Report (Turnitin &lt; 15%)</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ======================================================== */}
        {/* 3. SUPERVISOR VIEW                                       */}
        {/* ======================================================== */}
        {role === 'supervisor' && (
          <section id="supervisorView" className="space-y-5">

            <div className="rounded-2xl overflow-hidden flex flex-col md:flex-row border border-leaf-200/50" style={{ background: 'linear-gradient(135deg, #f2f7f3 0%, #e8f0eb 60%, #dfe9e2 100%)' }}>
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-leaf-700 text-[11px] font-semibold tracking-wide bg-leaf-100 rounded-full mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-leaf-500"></span>
                    Supervisor Review Console
                  </span>
                  <h1 className="text-2xl sm:text-[28px] font-bold text-sand-900 leading-tight">Supervisor Console: Dr. Sarah Connor</h1>
                  <p className="text-xs text-sand-500 mt-1">Supervision Load: Carrying 3 of 4 Maximum Allocated Projects</p>
                </div>
                <div className="mt-6">
                  <button onClick={() => setActiveModal('meeting')} className="px-4 py-2 bg-leaf-700 hover:bg-leaf-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm">
                    Log Supervision Meeting
                  </button>
                </div>
              </div>
              <div className="w-full md:w-72 h-44 md:h-auto relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80" alt="Supervision Office" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#e8f0eb] via-[#e8f0eb]/30 to-transparent"></div>
              </div>
            </div>

            <div className="rounded-xl border border-leaf-200/40 p-5 space-y-4" style={{ background: 'linear-gradient(180deg, #f5f9f6 0%, #eff5f1 100%)' }}>
              <h3 className="font-semibold text-sm text-sand-900">Deliverables Awaiting Review &amp; Approval</h3>

              <div className="border border-sand-200/60 rounded-lg p-4 space-y-3 bg-sand-50/60">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="px-2 py-0.5 bg-honey-100 text-honey-600 text-[10px] font-semibold rounded-full">REVISION REQUESTED</span>
                    <h4 className="font-semibold text-[13px] text-sand-900 mt-1">Zero-Knowledge Verification Architecture (v2.0)</h4>
                    <p className="text-xs text-sand-600">Sarah J., Gordon F. &middot; Milestone: Code Implementation</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => alert('Revision notice committed with supervisor comments.')} className="px-3.5 py-1.5 bg-honey-500 hover:bg-honey-600 text-white font-medium text-xs rounded-lg transition-colors">
                      Request Revision
                    </button>
                    <button onClick={() => alert('Stage approved and scope stamped as new approved version!')} className="px-3.5 py-1.5 bg-leaf-600 hover:bg-leaf-700 text-white font-medium text-xs rounded-lg transition-colors shadow-sm">
                      Approve Deliverable
                    </button>
                  </div>
                </div>
                <div className="text-xs bg-sand-50 p-3 rounded-lg border border-sand-200/60">
                  <label className="block font-medium text-sand-700 mb-1">Supervisor Guidance &amp; Scope Amendments:</label>
                  <textarea className="w-full text-xs p-2 border border-sand-200 rounded-lg bg-sand-50 focus:outline-none focus:ring-1 focus:ring-leaf-600/40" rows={2} placeholder="Specify technical issues or required scope revisions..."></textarea>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-sand-200 p-5 space-y-4" style={{ background: 'linear-gradient(180deg, #faf8f3 0%, #f5efe6 100%)' }}>
              <div className="flex justify-between items-center pb-3 border-b border-sand-200/60">
                <h3 className="font-semibold text-sm text-sand-900">Supervision Meeting Register</h3>
                <span className="text-[11px] text-sand-500 font-medium">Official university audit trail</span>
              </div>
              <div className="p-3.5 bg-sand-50/80 border border-sand-200/60 rounded-lg text-xs space-y-2">
                <div className="flex justify-between font-medium text-sand-800">
                  <span>Bi-Weekly Sync: Architecture Review</span>
                  <span className="text-sand-500">Nov 18, 2024</span>
                </div>
                <p className="text-sand-600"><strong className="text-sand-700">Present:</strong> Dr. S. Connor, Sarah J., Gordon F.</p>
                <p className="text-sand-600"><strong className="text-sand-700">Decisions:</strong> Refactor verifier module to reduce memory overhead on edge devices.</p>
                <div className="p-2.5 bg-honey-50 border border-honey-200/50 rounded-lg text-honey-700 flex flex-col sm:flex-row justify-between gap-1">
                  <span><strong>Follow-up Action:</strong> Benchmark memory allocation across 500 test batches</span>
                  <span className="font-medium shrink-0">Gordon F. &mdash; Due Nov 28</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ======================================================== */}
        {/* 4. BOARD VIEW                                            */}
        {/* ======================================================== */}
        {role === 'board' && (
          <section id="boardView" className="space-y-5">

            <div className="rounded-2xl overflow-hidden flex flex-col md:flex-row border border-sand-300/50" style={{ background: 'linear-gradient(135deg, #fbf8f2 0%, #f5efe3 60%, #efe6d6 100%)' }}>
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-sand-600 text-[11px] font-semibold tracking-wide bg-honey-100 rounded-full mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-honey-500"></span>
                    Examination Board Evaluation
                  </span>
                  <h1 className="text-2xl sm:text-[28px] font-bold text-sand-900 leading-tight">Final Thesis Defence &amp; Evaluation Board</h1>
                  <p className="text-xs text-sand-500 mt-1">Scheduled Defence Session: Today, 14:00 PM (Auditorium 1)</p>
                </div>
              </div>
              
              <div className="w-full md:w-72 h-44 md:h-auto relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80" alt="Examination Hall" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#f5efe3] via-[#f5efe3]/30 to-transparent"></div>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-sand-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" style={{ background: 'linear-gradient(135deg, #faf8f3 0%, #f5efe6 100%)' }}>
              <div>
                <span className="text-[11px] font-medium text-sand-500">Candidate Project: CS-2024-401</span>
                <h2 className="text-lg font-bold text-sand-900 mt-0.5">Neural EEG Prosthetics Control Pipeline</h2>
                <p className="text-xs text-sand-600">Alex Vance, Eli Vance &middot; Supervisor: Dr. Alan Turing</p>
              </div>
              <div className="bg-leaf-50 p-4 rounded-xl border border-leaf-200/40 text-right min-w-[130px]">
                <span className="text-[10px] font-medium text-leaf-700/60 block">Computed Grade</span>
                <span id="totalRubricScore" className="text-3xl font-bold text-leaf-700">{totalScore}</span>
                <span className="text-xs text-sand-500">/ 100</span>
              </div>
            </div>

            {/* Rubric */}
            <div className="rounded-xl border border-sand-200 p-5 space-y-5" style={{ background: 'linear-gradient(180deg, #faf8f3 0%, #f5f0e8 100%)' }}>
              <h3 className="font-semibold text-sm text-sand-900 pb-2 border-b border-sand-200/60">Academic Assessment Rubric Matrix</h3>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-sand-800">
                  <span className="font-medium">1. Methodological Soundness &amp; Theory (30%)</span>
                  <span className="text-leaf-700 font-semibold">{rubric.c1} / 30</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="30" 
                  value={rubric.c1} 
                  onChange={(e) => setRubric(r => ({ ...r, c1: parseInt(e.target.value) || 0 }))} 
                  className="w-full h-1.5 bg-sand-200 rounded-full appearance-none cursor-pointer" 
                />
                <p className="text-[11px] text-sand-500">Mathematical controls, signal filtering validation, theoretical soundness.</p>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-sand-800">
                  <span className="font-medium">2. Practical Implementation &amp; Code Quality (30%)</span>
                  <span className="text-leaf-700 font-semibold">{rubric.c2} / 30</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="30" 
                  value={rubric.c2} 
                  onChange={(e) => setRubric(r => ({ ...r, c2: parseInt(e.target.value) || 0 }))} 
                  className="w-full h-1.5 bg-sand-200 rounded-full appearance-none cursor-pointer" 
                />
                <p className="text-[11px] text-sand-500">Working prototype, unit testing, latency benchmarks, edge hardware integration.</p>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-sand-800">
                  <span className="font-medium">3. Oral Defense Presentation &amp; Q&amp;A (20%)</span>
                  <span className="text-leaf-700 font-semibold">{rubric.c3} / 20</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="20" 
                  value={rubric.c3} 
                  onChange={(e) => setRubric(r => ({ ...r, c3: parseInt(e.target.value) || 0 }))} 
                  className="w-full h-1.5 bg-sand-200 rounded-full appearance-none cursor-pointer" 
                />
                <p className="text-[11px] text-sand-500">Clarity of defense, slide presentation, handling board critiques.</p>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-sand-800">
                  <span className="font-medium">4. Thesis Report Formatting &amp; Citation Integrity (20%)</span>
                  <span className="text-leaf-700 font-semibold">{rubric.c4} / 20</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="20" 
                  value={rubric.c4} 
                  onChange={(e) => setRubric(r => ({ ...r, c4: parseInt(e.target.value) || 0 }))} 
                  className="w-full h-1.5 bg-sand-200 rounded-full appearance-none cursor-pointer" 
                />
                <p className="text-[11px] text-sand-500">Turnitin index &lt; 15%, rigorous citations, formatting compliance.</p>
              </div>

              <div className="pt-4 border-t border-sand-200/60">
                <label className="block text-xs font-medium text-sand-700 mb-1.5">Board Verdict &amp; Required Revisions:</label>
                <textarea rows={2} className="w-full text-xs p-2.5 border border-sand-200 bg-sand-50 rounded-lg focus:outline-none focus:ring-1 focus:ring-leaf-600/40" placeholder="e.g., Passed with minor revisions required on Section 4 before final repository release."></textarea>
              </div>

              <div className="flex justify-end gap-2.5 pt-1">
                <button className="px-4 py-2 text-xs font-medium bg-sand-50/80 border border-sand-300 text-sand-700 rounded-lg hover:border-sand-400 transition-colors">Save Draft</button>
                <button onClick={() => alert('Final certification committed to University Registry.')} className="px-4 py-2 text-xs font-semibold bg-leaf-600 hover:bg-leaf-700 text-white rounded-lg transition-colors shadow-sm">Submit Final Evaluation</button>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-sand-200/60 py-4 bg-sand-100/50">
        <p className="text-center text-[11px] text-sand-400">PUB SuperVise &middot; Project and Thesis Supervision and Collaboration Portal</p>
      </footer>

      {/* ======================================================== */}
      {/* MODALS                                                    */}
      {/* ======================================================== */}

      {/* Modal 1: Proposal Submission */}
      {activeModal === 'proposal' && (
        <div className="fixed inset-0 bg-sand-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4 border border-sand-200/80" style={{ background: 'linear-gradient(180deg, #faf8f3 0%, #f5f0e8 100%)' }}>
            <div className="flex justify-between items-center pb-3 border-b border-sand-200/60">
              <h3 className="text-sm font-semibold text-sand-900">Project / Thesis Proposal Submission</h3>
              <button onClick={() => setActiveModal(null)} className="text-sand-400 hover:text-sand-700 text-lg leading-none">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); alert('Proposal submitted successfully. Awaiting coordinator review.'); setActiveModal(null); }} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-sand-600 mb-1">Project Title</label>
                <input required type="text" className="w-full p-2.5 bg-sand-50 border border-sand-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-leaf-600/40" defaultValue="Neural EEG Prosthetics Control Pipeline" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-sand-600 mb-1">Research Area</label>
                  <input required type="text" className="w-full p-2.5 bg-sand-50 border border-sand-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-leaf-600/40" defaultValue="Biomedical / Machine Learning" />
                </div>
                <div>
                  <label className="block font-medium text-sand-600 mb-1">Preferred Supervisor</label>
                  <select className="w-full p-2.5 bg-sand-50 border border-sand-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-leaf-600/40">
                    <option>Dr. Alan Turing</option>
                    <option>Dr. Sarah Connor</option>
                    <option>Dr. Grace Hopper</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-medium text-sand-600 mb-1">Team Members (Names &amp; IDs)</label>
                <input required type="text" className="w-full p-2.5 bg-sand-50 border border-sand-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-leaf-600/40" defaultValue="Alex Vance (CS101), Eli Vance (CS102)" />
              </div>
              <div>
                <label className="block font-medium text-sand-600 mb-1">Abstract &amp; Research Scope</label>
                <textarea rows={3} className="w-full p-2.5 bg-sand-50 border border-sand-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-leaf-600/40" defaultValue="Design an end-to-end edge-computed embedded prosthetic limb decoder using deep temporal convolutional networks on multi-channel EEG."></textarea>
              </div>
              <div className="flex justify-end gap-2.5 pt-2 border-t border-sand-200/60">
                <button type="button" onClick={() => setActiveModal(null)} className="px-3.5 py-1.5 border border-sand-300 rounded-lg text-sand-600 hover:border-sand-400 transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-1.5 bg-leaf-700 text-white rounded-lg font-semibold hover:bg-leaf-800 transition-colors shadow-sm">Submit Proposal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Assign Supervisor */}
      {activeModal === 'assign' && (
        <div className="fixed inset-0 bg-sand-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 border border-sand-200/80" style={{ background: 'linear-gradient(180deg, #faf8f3 0%, #f5f0e8 100%)' }}>
            <div className="flex justify-between items-center pb-3 border-b border-sand-200/60">
              <h3 className="text-sm font-semibold text-sand-900">Coordinator: Assign Supervisor</h3>
              <button onClick={() => setActiveModal(null)} className="text-sand-400 hover:text-sand-700 text-lg leading-none">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-sand-600 mb-1">Target Project</label>
                <select className="w-full p-2.5 bg-sand-50 border border-sand-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-leaf-600/40">
                  <option>CS-415: Microgrid Energy Storage Architecture</option>
                  <option>CS-419: Autonomous Drone Swarm</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-sand-600 mb-1">Select Supervisor</label>
                <select 
                  value={selectedSupervisor} 
                  onChange={(e) => setSelectedSupervisor(e.target.value)} 
                  className="w-full p-2.5 bg-sand-50 border border-sand-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-leaf-600/40"
                >
                  <option value="hopper">Dr. Grace Hopper (1/4 &mdash; Capacity Available)</option>
                  <option value="connor">Dr. Sarah Connor (3/4 &mdash; 1 Slot Remaining)</option>
                  <option value="turing" disabled>Dr. Alan Turing (4/4 &mdash; Full)</option>
                </select>
                {selectedSupervisor === 'turing' ? (
                  <p className="text-[11px] text-clay-600 mt-1.5 font-medium">Cannot allocate: Supervisor at maximum capacity quota (4/4).</p>
                ) : (
                  <p className="text-[11px] text-leaf-600 mt-1.5 font-medium">Selected supervisor has capacity available.</p>
                )}
              </div>
              <div className="flex justify-end gap-2.5 pt-2 border-t border-sand-200/60">
                <button type="button" onClick={() => setActiveModal(null)} className="px-3.5 py-1.5 border border-sand-300 rounded-lg text-sand-600 hover:border-sand-400 transition-colors">Cancel</button>
                <button onClick={() => { alert('Supervisor assignment confirmed and logged to project registry.'); setActiveModal(null); }} className="px-4 py-1.5 bg-leaf-700 text-white rounded-lg font-semibold hover:bg-leaf-800 transition-colors shadow-sm">Confirm Allocation</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: Progress Report */}
      {activeModal === 'progress' && (
        <div className="fixed inset-0 bg-sand-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4 border border-plum-200/50" style={{ background: 'linear-gradient(180deg, #faf7fc 0%, #f5f0f8 100%)' }}>
            <div className="flex justify-between items-center pb-3 border-b border-plum-200/30">
              <h3 className="text-sm font-semibold text-sand-900">Upload Progress Report &amp; Deliverables</h3>
              <button onClick={() => setActiveModal(null)} className="text-sand-400 hover:text-sand-700 text-lg leading-none">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); alert('Progress deliverable submitted and archived under new immutable version tag.'); setActiveModal(null); }} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-sand-600 mb-1">Work Accomplished &amp; Evidence</label>
                <textarea rows={2} required placeholder="State benchmark results, code commits..." className="w-full p-2.5 bg-sand-50 border border-plum-200/40 rounded-lg focus:outline-none focus:ring-1 focus:ring-plum-500/40"></textarea>
              </div>
              <div>
                <label className="block font-medium text-sand-600 mb-1">Current Blockers / Impediments</label>
                <input type="text" placeholder="e.g., Compute queue delays, sensor shortages..." className="w-full p-2.5 bg-sand-50 border border-plum-200/40 rounded-lg focus:outline-none focus:ring-1 focus:ring-plum-500/40" />
              </div>
              <div>
                <label className="block font-medium text-sand-600 mb-1">Next Immediate Action</label>
                <input type="text" placeholder="e.g., Train transformer model on new patient cohort..." className="w-full p-2.5 bg-sand-50 border border-plum-200/40 rounded-lg focus:outline-none focus:ring-1 focus:ring-plum-500/40" />
              </div>
              <div>
                <label className="block font-medium text-sand-600 mb-1">Deliverable Archive (ZIP / PDF)</label>
                <input type="file" className="w-full text-sand-600 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-plum-100 file:text-plum-700 file:cursor-pointer" />
                <p className="text-[10px] text-sand-400 mt-1">Permanently archived under a new version tag; prior submissions remain read-only.</p>
              </div>
              <div className="flex justify-end gap-2.5 pt-2 border-t border-plum-200/30">
                <button type="button" onClick={() => setActiveModal(null)} className="px-3.5 py-1.5 border border-sand-300 rounded-lg text-sand-600 hover:border-sand-400 transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-1.5 bg-plum-600 text-white rounded-lg font-semibold hover:bg-plum-700 transition-colors shadow-sm">Commit Deliverable</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 4: Meeting Log */}
      {activeModal === 'meeting' && (
        <div className="fixed inset-0 bg-sand-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 border border-leaf-200/40" style={{ background: 'linear-gradient(180deg, #f5f9f6 0%, #eff5f1 100%)' }}>
            <div className="flex justify-between items-center pb-3 border-b border-leaf-200/30">
              <h3 className="text-sm font-semibold text-sand-900">Record Supervision Meeting</h3>
              <button onClick={() => setActiveModal(null)} className="text-sand-400 hover:text-sand-700 text-lg leading-none">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); alert('Supervision meeting log and follow-up actions saved to university audit register.'); setActiveModal(null); }} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-sand-600 mb-1">Date</label>
                <input type="date" required className="w-full p-2.5 bg-sand-50 border border-leaf-200/40 rounded-lg focus:outline-none focus:ring-1 focus:ring-leaf-600/40" defaultValue="2024-11-25" />
              </div>
              <div>
                <label className="block font-medium text-sand-600 mb-1">Attendees</label>
                <input type="text" required placeholder="Staff and students present" className="w-full p-2.5 bg-sand-50 border border-leaf-200/40 rounded-lg focus:outline-none focus:ring-1 focus:ring-leaf-600/40" />
              </div>
              <div>
                <label className="block font-medium text-sand-600 mb-1">Technical Decisions</label>
                <textarea rows={2} placeholder="Agreed scope adjustments, methodology shifts..." className="w-full p-2.5 bg-sand-50 border border-leaf-200/40 rounded-lg focus:outline-none focus:ring-1 focus:ring-leaf-600/40"></textarea>
              </div>
              <div>
                <label className="block font-medium text-sand-600 mb-1">Action Item &amp; Deadline</label>
                <input type="text" placeholder="Owner, task description, and due date" className="w-full p-2.5 bg-sand-50 border border-leaf-200/40 rounded-lg focus:outline-none focus:ring-1 focus:ring-leaf-600/40" />
              </div>
              <div className="flex justify-end gap-2.5 pt-2 border-t border-leaf-200/30">
                <button type="button" onClick={() => setActiveModal(null)} className="px-3.5 py-1.5 border border-sand-300 rounded-lg text-sand-600 hover:border-sand-400 transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-1.5 bg-leaf-700 text-white rounded-lg font-semibold hover:bg-leaf-800 transition-colors shadow-sm">Save Meeting Log</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
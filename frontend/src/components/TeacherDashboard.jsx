import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MOCK_STUDENTS = [
  { name: 'Priya S.', initials: 'PS', games: 12, score: 89, time: '4.2h', streak: '7d', status: 'Excelling', trend: [72, 78, 80, 85, 88, 90, 89] },
  { name: 'Arjun M.', initials: 'AM', games: 8, score: 64, time: '2.8h', streak: '3d', status: 'On Track', trend: [60, 58, 62, 65, 64, 66, 64] },
  { name: 'Sneha R.', initials: 'SR', games: 15, score: 94, time: '5.1h', streak: '12d', status: 'Excelling', trend: [80, 84, 88, 90, 92, 94, 94] },
  { name: 'Dev K.', initials: 'DK', games: 5, score: 42, time: '1.2h', streak: '1d', status: 'Needs Help', trend: [50, 46, 44, 43, 40, 42, 42] },
  { name: 'Isha P.', initials: 'IP', games: 10, score: 77, time: '3.5h', streak: '5d', status: 'On Track', trend: [65, 70, 72, 75, 76, 77, 77] },
];

const CHART_DATA = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => ({
  day,
  Priya: MOCK_STUDENTS[0].trend[i],
  Arjun: MOCK_STUDENTS[1].trend[i],
  Sneha: MOCK_STUDENTS[2].trend[i],
  Dev: MOCK_STUDENTS[3].trend[i],
  Isha: MOCK_STUDENTS[4].trend[i],
}));

const HEATMAP_TOPICS = ['History', 'Maths', 'Science', 'Geography', 'Civics'];
const HEATMAP_DATA = [
  [85, 72, 90, 65, 78],
  [60, 55, 70, 45, 62],
  [92, 88, 96, 84, 90],
  [38, 45, 42, 50, 40],
  [75, 80, 68, 73, 77],
];

const STATUS_STYLES = {
  'Excelling': { bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.2)', text: 'white' },
  'On Track': { bg: 'rgba(255,255,255,0.03)', border: 'rgba(255,255,255,0.1)', text: 'rgba(255,255,255,0.65)' },
  'Needs Help': { bg: 'rgba(255,80,80,0.08)', border: 'rgba(255,80,80,0.25)', text: 'rgba(255,120,120,0.9)' },
};

const LINE_COLORS = ['rgba(255,255,255,0.85)', 'rgba(255,255,255,0.45)', '#FFD60A', 'rgba(255,255,255,0.3)', 'rgba(255,255,255,0.6)'];

function StatCard({ icon, label, value, color }) {
  return (
    <div className="stat-card" data-testid={`stat-card-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <span style={{ fontSize: 28, display: 'block', marginBottom: 8 }}>{icon}</span>
      <span className="stat-card-number" style={{ color: color || 'white' }}>{value}</span>
      <span className="stat-card-label">{label}</span>
    </div>
  );
}

function StudentTable({ expandable }) {
  const [expandedRow, setExpandedRow] = useState(null);
  return (
    <div
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, overflow: 'hidden' }}
      data-testid="student-table"
    >
      <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <span style={{ fontFamily: 'Orbitron', fontSize: 14, fontWeight: 700, color: 'white' }}>Student Performance</span>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            {['Name', 'Score', 'Time', 'Streak', 'Status'].map(h => (
              <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontFamily: 'Space Grotesk', fontSize: 11, letterSpacing: 2, color: 'var(--text-muted)', fontWeight: 600 }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MOCK_STUDENTS.map((student, i) => (
            <React.Fragment key={student.name}>
              <tr
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.03)',
                  cursor: expandable ? 'none' : 'default',
                  background: expandedRow === i ? 'rgba(255,255,255,0.02)' : 'transparent',
                  transition: 'background 0.2s',
                }}
                onClick={() => expandable && setExpandedRow(expandedRow === i ? null : i)}
                data-testid={`student-row-${i}`}
              >
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: `rgba(255,255,255,${0.05 + i * 0.025})`,
                      border: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 12, color: 'white',
                    }}>
                      {student.initials}
                    </div>
                    <span style={{ fontFamily: 'Space Grotesk', fontSize: 13, color: 'white' }}>{student.name}</span>
                  </div>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 60, height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{
                        width: `${student.score}%`, height: '100%',
                        background: student.score >= 80 ? 'rgba(255,255,255,0.7)' : student.score >= 60 ? '#FFD60A' : 'rgba(255,80,80,0.7)',
                        borderRadius: 2,
                      }} />
                    </div>
                    <span style={{ fontFamily: 'Space Grotesk', fontSize: 13, color: 'white' }}>{student.score}%</span>
                  </div>
                </td>
                <td style={{ padding: '12px 16px', fontFamily: 'Space Grotesk', fontSize: 13, color: 'var(--text-secondary)' }}>{student.time}</td>
                <td style={{ padding: '12px 16px', fontFamily: 'Space Grotesk', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{student.streak}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    fontFamily: 'Space Grotesk', fontSize: 11, fontWeight: 700,
                    padding: '3px 10px', borderRadius: 100,
                    background: STATUS_STYLES[student.status].bg,
                    border: `1px solid ${STATUS_STYLES[student.status].border}`,
                    color: STATUS_STYLES[student.status].text,
                  }}>
                    {student.status}
                  </span>
                </td>
              </tr>
              {expandable && expandedRow === i && (
                <tr>
                  <td colSpan={5} style={{ padding: '0 16px 16px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 10, padding: '12px 16px' }}>
                      <span style={{ fontFamily: 'Space Grotesk', fontSize: 12, color: 'var(--text-muted)' }}>
                        Games played: {student.games} · Top subject: History · Last active: Today
                      </span>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PerformanceChart() {
  return (
    <div
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 24 }}
      data-testid="performance-chart"
    >
      <div style={{ marginBottom: 20 }}>
        <span style={{ fontFamily: 'Orbitron', fontSize: 14, fontWeight: 700, color: 'white' }}>Score Trend (7 Days)</span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={CHART_DATA}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontFamily: 'Space Grotesk', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: 'var(--text-muted)', fontFamily: 'Space Grotesk', fontSize: 11 }} axisLine={false} tickLine={false} domain={[30, 100]} />
          <Tooltip contentStyle={{ background: 'rgba(8,8,12,0.97)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontFamily: 'Space Grotesk', fontSize: 12 }} />
          {MOCK_STUDENTS.map((s, i) => (
            <Line key={s.name} type="monotone" dataKey={s.name.split(' ')[0]} stroke={LINE_COLORS[i]} strokeWidth={2} dot={false} activeDot={{ r: 4, fill: LINE_COLORS[i] }} />
          ))}
        </LineChart>
      </ResponsiveContainer>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 12 }}>
        {MOCK_STUDENTS.map((s, i) => (
          <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 12, height: 2, background: LINE_COLORS[i], borderRadius: 1 }} />
            <span style={{ fontFamily: 'Space Grotesk', fontSize: 11, color: 'var(--text-muted)' }}>{s.name.split(' ')[0]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeatmapSection() {
  return (
    <div
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 24 }}
      data-testid="heatmap"
    >
      <div style={{ marginBottom: 20 }}>
        <span style={{ fontFamily: 'Orbitron', fontSize: 14, fontWeight: 700, color: 'white' }}>Topic Mastery Heatmap</span>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'separate', borderSpacing: 4, minWidth: 400 }}>
          <thead>
            <tr>
              <th style={{ padding: '4px 8px', fontFamily: 'Space Grotesk', fontSize: 11, color: 'var(--text-muted)' }} />
              {HEATMAP_TOPICS.map(t => (
                <th key={t} style={{ padding: '4px 8px', fontFamily: 'Space Grotesk', fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', minWidth: 70 }}>{t}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_STUDENTS.map((student, i) => (
              <tr key={student.name}>
                <td style={{ padding: '4px 8px', fontFamily: 'Space Grotesk', fontSize: 12, color: 'white', whiteSpace: 'nowrap' }}>
                  {student.name.split(' ')[0]}
                </td>
                {HEATMAP_DATA[i].map((val, j) => (
                  <td key={j} style={{ padding: '4px 8px', textAlign: 'center' }}>
                    <div
                      title={`${student.name}: ${HEATMAP_TOPICS[j]} — ${val}%`}
                      style={{
                        width: 28, height: 28, borderRadius: 6,
                        background: `rgba(255,255,255,${(val / 100) * 0.15 + 0.02})`,
                        border: `1px solid rgba(255,255,255,${(val / 100) * 0.3 + 0.04})`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'Space Grotesk', fontSize: 10,
                        color: `rgba(255,255,255,${(val / 100) * 0.6 + 0.3})`,
                        margin: '0 auto',
                      }}
                    >
                      {val}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ExportPanel() {
  return (
    <div data-testid="export-panel">
      <div style={{
        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 20, padding: 40, marginBottom: 24,
      }}>
        <h3 style={{ fontFamily: 'Orbitron', fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 8 }}>
          Export & Reports
        </h3>
        <p style={{ fontFamily: 'Inter', fontSize: 14, color: 'var(--text-muted)', marginBottom: 32 }}>
          Download detailed analytics, share reports with parents, or integrate with your school's LMS.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
          {[
            { icon: '📄', label: 'PDF Report', desc: 'Full class analytics in PDF format', btn: 'Download PDF' },
            { icon: '📊', label: 'CSV Data', desc: 'Raw data for Excel/Sheets analysis', btn: 'Export CSV' },
            { icon: '📧', label: 'Email Parents', desc: 'Send progress reports to all parents', btn: 'Send Emails' },
            { icon: '🔗', label: 'Share Dashboard', desc: 'Generate a read-only shareable link', btn: 'Copy Link' },
          ].map(item => (
            <div key={item.label} style={{
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 14, padding: 24,
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
              <div style={{ fontFamily: 'Orbitron', fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 6 }}>{item.label}</div>
              <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.5 }}>{item.desc}</p>
              <button
                className="btn-ghost"
                style={{ fontSize: 12, padding: '8px 16px' }}
                data-testid={`export-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.btn}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TeacherDashboard({ activeTab = 'overview' }) {
  const showStats = activeTab === 'overview' || activeTab === 'analytics';

  return (
    <div className="teacher-dash" data-testid="teacher-dashboard">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 100px' }}>

        {/* Stats — Overview & Analytics */}
        {showStats && (
          <div className="stats-grid-4" data-testid="teacher-stats" style={{ marginTop: 40 }}>
            <StatCard icon="👥" label="Students" value="24" color="white" />
            <StatCard icon="⭐" label="Avg Score" value="78%" color="#FFD60A" />
            <StatCard icon="⏱" label="Hours Played" value="12.4" color="rgba(255,255,255,0.7)" />
            <StatCard icon="📚" label="Topics Covered" value="18" color="rgba(255,255,255,0.55)" />
          </div>
        )}

        {/* Overview: Table + Chart */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, marginTop: 24 }}>
            <StudentTable />
            <PerformanceChart />
          </div>
        )}

        {/* Students: Full expandable table */}
        {activeTab === 'students' && (
          <div style={{ marginTop: 40 }}>
            <StudentTable expandable />
          </div>
        )}

        {/* Analytics: Chart + Heatmap */}
        {activeTab === 'analytics' && (
          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <PerformanceChart />
            <HeatmapSection />
          </div>
        )}

        {/* Export */}
        {activeTab === 'export' && (
          <div style={{ marginTop: 40 }}>
            <ExportPanel />
          </div>
        )}
      </div>
    </div>
  );
}

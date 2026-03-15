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
const HEATMAP_DATA = MOCK_STUDENTS.map(s => HEATMAP_TOPICS.map(() => Math.floor(Math.random() * 100)));

const STATUS_COLORS = {
  'Excelling': { bg: 'rgba(0,255,135,0.1)', border: 'rgba(0,255,135,0.4)', text: '#00FF87' },
  'On Track': { bg: 'rgba(0,245,255,0.1)', border: 'rgba(0,245,255,0.4)', text: '#00F5FF' },
  'Needs Help': { bg: 'rgba(255,45,107,0.1)', border: 'rgba(255,45,107,0.4)', text: '#FF2D6B' },
};

const LINE_COLORS = ['#00F5FF', '#FF2D6B', '#00FF87', '#8B5CF6', '#FFD60A'];

export default function TeacherDashboard() {
  const [expandedRow, setExpandedRow] = useState(null);

  const StatCard = ({ icon, label, value, color }) => (
    <div className="stat-card" data-testid={`stat-card-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <span style={{ fontSize: 28, display: 'block', marginBottom: 8 }}>{icon}</span>
      <span className="stat-card-number" style={{ color }}>{value}</span>
      <span className="stat-card-label">{label}</span>
    </div>
  );

  return (
    <div className="teacher-dash" data-testid="teacher-dashboard">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="section-eyebrow">TEACHER MODE</span>
          <h2 className="section-title">Command Center</h2>
          <p className="section-subtitle">Real-time learning analytics for your classroom</p>
        </div>

        {/* Stats */}
        <div className="stats-grid-4" data-testid="teacher-stats">
          <StatCard icon="👥" label="Students" value="24" color="var(--neon-cyan)" />
          <StatCard icon="⭐" label="Avg Score" value="78%" color="var(--neon-yellow)" />
          <StatCard icon="⏱" label="Hours Played" value="12.4" color="var(--neon-green)" />
          <StatCard icon="📚" label="Topics Covered" value="18" color="var(--neon-purple)" />
        </div>

        {/* Two column: Table + Chart */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, marginBottom: 32 }}>
          {/* Student Table */}
          <div
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 20,
              overflow: 'hidden',
            }}
            data-testid="student-table"
          >
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontFamily: 'Orbitron', fontSize: 14, fontWeight: 700, color: 'white' }}>
                Student Performance
              </span>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  {['Name', 'Score', 'Time', 'Streak', 'Status'].map(h => (
                    <th key={h} style={{
                      padding: '10px 16px', textAlign: 'left',
                      fontFamily: 'Space Grotesk', fontSize: 11, letterSpacing: 2,
                      color: 'var(--text-muted)', fontWeight: 600,
                    }}>
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
                        cursor: 'none',
                        background: expandedRow === i ? 'rgba(255,214,10,0.03)' : 'transparent',
                        transition: 'background 0.2s',
                      }}
                      onClick={() => setExpandedRow(expandedRow === i ? null : i)}
                      data-testid={`student-row-${i}`}
                    >
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{
                            width: 32, height: 32, borderRadius: '50%',
                            background: `hsl(${i * 60}, 60%, 40%)`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 12, color: 'white',
                          }}>
                            {student.initials}
                          </div>
                          <span style={{ fontFamily: 'Space Grotesk', fontSize: 13, color: 'white' }}>
                            {student.name}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{
                            width: 60, height: 4, background: 'rgba(255,255,255,0.06)',
                            borderRadius: 2, overflow: 'hidden',
                          }}>
                            <div style={{
                              width: `${student.score}%`, height: '100%',
                              background: student.score >= 80 ? 'var(--neon-green)' : student.score >= 60 ? 'var(--neon-yellow)' : 'var(--neon-pink)',
                              borderRadius: 2,
                            }} />
                          </div>
                          <span style={{ fontFamily: 'Space Grotesk', fontSize: 13, color: 'white' }}>
                            {student.score}%
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', fontFamily: 'Space Grotesk', fontSize: 13, color: 'var(--text-secondary)' }}>
                        {student.time}
                      </td>
                      <td style={{ padding: '12px 16px', fontFamily: 'Space Grotesk', fontSize: 13, color: 'var(--neon-cyan)' }}>
                        {student.streak}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{
                          fontFamily: 'Space Grotesk', fontSize: 11, fontWeight: 700,
                          padding: '3px 10px', borderRadius: 100,
                          background: STATUS_COLORS[student.status].bg,
                          border: `1px solid ${STATUS_COLORS[student.status].border}`,
                          color: STATUS_COLORS[student.status].text,
                        }}>
                          {student.status}
                        </span>
                      </td>
                    </tr>
                    {expandedRow === i && (
                      <tr>
                        <td colSpan={5} style={{ padding: '0 16px 16px' }}>
                          <div style={{
                            background: 'rgba(255,255,255,0.02)',
                            borderRadius: 10,
                            padding: '12px 16px',
                          }}>
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

          {/* Performance Chart */}
          <div
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 20,
              padding: 24,
            }}
            data-testid="performance-chart"
          >
            <div style={{ marginBottom: 20 }}>
              <span style={{ fontFamily: 'Orbitron', fontSize: 14, fontWeight: 700, color: 'white' }}>
                Score Trend (7 Days)
              </span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis
                  dataKey="day"
                  tick={{ fill: 'var(--text-muted)', fontFamily: 'Space Grotesk', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: 'var(--text-muted)', fontFamily: 'Space Grotesk', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  domain={[30, 100]}
                />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(10,10,20,0.95)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 8,
                    fontFamily: 'Space Grotesk',
                    fontSize: 12,
                  }}
                />
                {MOCK_STUDENTS.slice(0, 5).map((s, i) => (
                  <Line
                    key={s.name}
                    type="monotone"
                    dataKey={s.name.split(' ')[0]}
                    stroke={LINE_COLORS[i]}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: LINE_COLORS[i] }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 12 }}>
              {MOCK_STUDENTS.slice(0, 5).map((s, i) => (
                <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 12, height: 2, background: LINE_COLORS[i], borderRadius: 1 }} />
                  <span style={{ fontFamily: 'Space Grotesk', fontSize: 11, color: 'var(--text-muted)' }}>
                    {s.name.split(' ')[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Heatmap */}
        <div
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 20,
            padding: 24,
            marginBottom: 32,
          }}
          data-testid="heatmap"
        >
          <div style={{ marginBottom: 20 }}>
            <span style={{ fontFamily: 'Orbitron', fontSize: 14, fontWeight: 700, color: 'white' }}>
              Topic Mastery Heatmap
            </span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'separate', borderSpacing: 4, minWidth: 400 }}>
              <thead>
                <tr>
                  <th style={{ padding: '4px 8px', fontFamily: 'Space Grotesk', fontSize: 11, color: 'var(--text-muted)' }} />
                  {HEATMAP_TOPICS.map(t => (
                    <th key={t} style={{ padding: '4px 8px', fontFamily: 'Space Grotesk', fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', minWidth: 70 }}>
                      {t}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MOCK_STUDENTS.map((student, i) => (
                  <tr key={student.name}>
                    <td style={{ padding: '4px 8px', fontFamily: 'Space Grotesk', fontSize: 12, color: 'white', whiteSpace: 'nowrap' }}>
                      {student.name.split(' ')[0]}
                    </td>
                    {HEATMAP_DATA[i].map((val, j) => {
                      const color = val >= 70 ? '#00FF87' : val >= 40 ? '#FFD60A' : '#FF2D6B';
                      return (
                        <td key={j} style={{ padding: '4px 8px', textAlign: 'center' }}>
                          <div
                            title={`${student.name}: ${HEATMAP_TOPICS[j]} — ${val}%`}
                            style={{
                              width: 28, height: 28, borderRadius: '50%',
                              background: `${color}25`,
                              border: `2px solid ${color}50`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontFamily: 'Space Grotesk', fontSize: 10, color, margin: '0 auto',
                            }}
                          >
                            {val}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }} data-testid="export-panel">
          {['📄 PDF Report', '📊 CSV Data', '📧 Email Parents', '🔗 Share Link'].map(btn => (
            <button key={btn} className="toolbar-btn" data-testid={`export-${btn.split(' ')[1]?.toLowerCase()}`}>
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

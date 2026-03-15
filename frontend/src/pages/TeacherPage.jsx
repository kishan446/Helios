import React, { useState } from 'react';
import TeacherDashboard from '../components/TeacherDashboard';

export default function TeacherPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const TABS = [
    { key: 'overview', label: 'Overview' },
    { key: 'students', label: 'Students' },
    { key: 'analytics', label: 'Analytics' },
    { key: 'export', label: 'Export' },
  ];

  return (
    <div style={{ minHeight: '100vh', paddingTop: 64 }}>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-container">
          <span className="section-eyebrow">TEACHER MODE</span>
          <h1 className="section-title">Command Center</h1>
          <p className="section-subtitle">Real-time learning analytics for your classroom. Track every student's progress.</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: '#030303', position: 'sticky', top: 64, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px', display: 'flex', gap: 0 }}>
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                background: 'none', border: 'none', cursor: 'none',
                fontFamily: 'Space Grotesk', fontSize: 14, fontWeight: 600,
                color: activeTab === tab.key ? 'white' : 'rgba(255,255,255,0.35)',
                padding: '18px 24px', borderBottom: activeTab === tab.key ? '2px solid #FFD60A' : '2px solid transparent',
                transition: 'all 0.2s',
              }}
              data-testid={`teacher-tab-${tab.key}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard Content */}
      <TeacherDashboard activeTab={activeTab} />

      {/* Quick Actions Bar */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'rgba(0,0,0,0.97)', borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '14px 48px', display: 'flex', gap: 10, zIndex: 100,
        backdropFilter: 'blur(20px)',
      }}
        data-testid="quick-actions-bar"
      >
        <span style={{ fontFamily: 'Space Grotesk', fontSize: 12, color: 'rgba(255,255,255,0.3)', letterSpacing: 3, marginRight: 8, alignSelf: 'center' }}>QUICK ACTIONS:</span>
        {['📊 Export Report', '📧 Email Parents', '📤 Share Dashboard', '⚡ Forge New Game'].map(action => (
          <button key={action} className="btn-ghost" style={{ fontSize: 12, padding: '8px 16px' }} data-testid={`action-${action.split(' ')[1]?.toLowerCase()}`}>
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}

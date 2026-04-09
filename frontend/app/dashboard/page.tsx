'use client';
import Navbar from '../components/Navbar';
import ItemCard from '../components/ItemCard';
import Link from 'next/link';
import { mockItems, stats, mockNotifications } from '../data';
import { Package, CheckCircle, Clock, Users, Plus, TrendingUp, Bell, ArrowRight, Zap } from 'lucide-react';

export default function DashboardPage() {
  const myItems = mockItems.slice(0, 3);
  const recentActivity = mockItems.slice(0, 5);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />

      <main style={{ paddingTop: 80, maxWidth: 1200, margin: '0 auto', padding: '80px 24px 48px' }}>
        {/* Welcome header */}
        <div className="animate-fadeUp" style={{ marginBottom: 32 }}>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, fontFamily: 'Syne', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
            Welcome back
          </p>
          <h1 style={{ fontFamily: 'Syne', fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8 }}>
            Nakul Thakur
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
            Student · E22CSE · Bennett University
          </p>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { icon: Package, label: 'Total Items', value: stats.totalItems, color: 'var(--accent)', bg: 'var(--accent-glow)' },
            { icon: CheckCircle, label: 'Resolved This Month', value: stats.resolvedThisMonth, color: 'var(--accent-2)', bg: 'var(--accent-2-glow)' },
            { icon: Clock, label: 'Pending Claims', value: stats.pendingClaims, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
            { icon: Users, label: 'Active Users', value: stats.activeUsers, color: '#a78bfa', bg: 'rgba(167,139,250,0.1)' },
          ].map(({ icon: Icon, label, value, color, bg }, i) => (
            <div key={label} className={`card animate-fadeUp stagger-${i+1}`} style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={22} color={color} />
              </div>
              <div>
                <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 26, color: 'var(--text-primary)', lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }}>
          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Quick actions */}
            <div className="card animate-fadeUp" style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 16 }}>Quick Actions</h2>
                <Zap size={16} color="var(--accent)" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Link href="/report?type=lost" className="btn-primary" style={{ justifyContent: 'center', padding: '14px' }}>
                  <Plus size={16} /> Report Lost
                </Link>
                <Link href="/report?type=found" className="btn-success" style={{ justifyContent: 'center', padding: '14px' }}>
                  <Plus size={16} /> Report Found
                </Link>
                <Link href="/browse" className="btn-ghost" style={{ justifyContent: 'center', padding: '14px' }}>
                  Browse All Items
                </Link>
                <Link href="/claims" className="btn-ghost" style={{ justifyContent: 'center', padding: '14px' }}>
                  My Claims
                </Link>
              </div>
            </div>

            {/* My items */}
            <div className="animate-fadeUp stagger-2">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 18 }}>My Posts</h2>
                <Link href="/browse" style={{ color: 'var(--accent)', fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}>
                  View all <ArrowRight size={13} />
                </Link>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {myItems.map((item, i) => (
                  <ItemCard key={item.id} item={item} delay={i * 0.07} />
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Notifications */}
            <div className="card animate-fadeUp stagger-1" style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Bell size={15} color="var(--accent)" />
                  <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 14 }}>Notifications</h3>
                </div>
                <span style={{ background: 'var(--accent)', color: '#fff', borderRadius: 99, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>
                  {mockNotifications.filter(n => !n.read).length}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {mockNotifications.map(n => (
                  <div key={n.id} style={{
                    padding: '12px 14px', borderRadius: 10,
                    background: n.read ? 'transparent' : 'rgba(79,110,247,0.06)',
                    border: `1px solid ${n.read ? 'var(--border)' : 'rgba(79,110,247,0.2)'}`,
                    cursor: 'pointer',
                  }}>
                    <p style={{ fontSize: 12, color: n.read ? 'var(--text-muted)' : 'var(--text-secondary)', lineHeight: 1.5 }}>{n.message}</p>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{n.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trend widget */}
            <div className="card animate-fadeUp stagger-2" style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <TrendingUp size={15} color="var(--accent-2)" />
                <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 14 }}>Recovery Rate</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { label: 'Electronics', pct: 72 },
                  { label: 'Documents', pct: 88 },
                  { label: 'Accessories', pct: 55 },
                  { label: 'Keys', pct: 90 },
                ].map(({ label, pct }) => (
                  <div key={label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 12 }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                      <span style={{ color: 'var(--text-muted)' }}>{pct}%</span>
                    </div>
                    <div style={{ height: 5, background: 'var(--border)', borderRadius: 99 }}>
                      <div style={{ height: '100%', width: `${pct}%`, borderRadius: 99, background: pct > 80 ? 'var(--accent-2)' : pct > 60 ? 'var(--accent)' : '#f59e0b', transition: 'width 0.8s ease' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

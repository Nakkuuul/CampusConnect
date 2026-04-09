'use client';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { mockItems } from '../data';
import { CheckCircle, Clock, XCircle, Eye, Shield, ChevronDown, ChevronUp } from 'lucide-react';

const claimData = [
  { id: 'c1', itemId: '2', status: 'approved', submittedAt: 'Jan 13, 2025', notes: 'Ownership verified via photo evidence and enrollment number.', questions: ['What color is the card holder?', 'Which department are you enrolled in?'] },
  { id: 'c2', itemId: '4', status: 'pending', submittedAt: 'Jan 15, 2025', notes: 'Under review by admin.', questions: ['Describe any distinctive features of the charger', 'Which lab did you leave it in?'] },
  { id: 'c3', itemId: '7', status: 'rejected', submittedAt: 'Jan 10, 2025', notes: 'Could not provide sufficient proof of ownership.', questions: ['What keys were on the bunch?', 'What is the fob color?'] },
];

const statusConfig = {
  approved: { label: 'Approved', icon: CheckCircle, color: 'var(--accent-2)', bg: 'rgba(34,211,165,0.1)', border: 'rgba(34,211,165,0.25)' },
  pending:  { label: 'Pending Review', icon: Clock, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)' },
  rejected: { label: 'Rejected', icon: XCircle, color: '#ef4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.25)' },
};

export default function ClaimsPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [claimForm, setClaimForm] = useState({ itemId: '', answer1: '', answer2: '', proof: '' });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />
      <main style={{ paddingTop: 80, maxWidth: 800, margin: '0 auto', padding: '80px 24px 48px' }}>
        <div className="animate-fadeUp" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontFamily: 'Syne', fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 6 }}>My Claims</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Track verification status for items you've claimed</p>
          </div>
          <button className="btn-primary" onClick={() => setShowForm(!showForm)} style={{ marginTop: 4 }}>
            <Shield size={15} /> New Claim
          </button>
        </div>

        {/* New claim form */}
        {showForm && (
          <div className="card animate-fadeUp" style={{ padding: 24, marginBottom: 24 }}>
            <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 16, marginBottom: 20 }}>Submit a Claim</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label className="label">Select Item to Claim</label>
                <select className="input" value={claimForm.itemId} onChange={e => setClaimForm(f => ({...f, itemId: e.target.value}))}>
                  <option value="">Choose an item…</option>
                  {mockItems.filter(i => i.type === 'found' && i.status === 'posted').map(i => (
                    <option key={i.id} value={i.id}>{i.title} — {i.location}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Verification Answer 1</label>
                <input className="input" placeholder="Describe a unique feature of the item…" value={claimForm.answer1} onChange={e => setClaimForm(f => ({...f, answer1: e.target.value}))} />
              </div>
              <div>
                <label className="label">Verification Answer 2</label>
                <input className="input" placeholder="Any serial number, inscription, or other identifier…" value={claimForm.answer2} onChange={e => setClaimForm(f => ({...f, answer2: e.target.value}))} />
              </div>
              <div>
                <label className="label">Supporting Evidence (optional)</label>
                <textarea className="input" placeholder="Describe or paste links to supporting evidence (purchase receipt, photo, etc.)" value={claimForm.proof} onChange={e => setClaimForm(f => ({...f, proof: e.target.value}))} />
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn-ghost" onClick={() => setShowForm(false)} style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
                <button className="btn-primary" onClick={() => setShowForm(false)} style={{ flex: 2, justifyContent: 'center' }}>Submit Claim</button>
              </div>
            </div>
          </div>
        )}

        {/* Claims list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {claimData.map((claim, i) => {
            const item = mockItems.find(it => it.id === claim.itemId);
            const cfg = statusConfig[claim.status as keyof typeof statusConfig];
            const Icon = cfg.icon;
            const isOpen = expanded === claim.id;

            return (
              <div key={claim.id} className={`card animate-fadeUp stagger-${i+1}`} style={{ overflow: 'hidden' }}>
                {/* Header */}
                <div
                  onClick={() => setExpanded(isOpen ? null : claim.id)}
                  style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 10, background: cfg.bg, border: `1px solid ${cfg.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={20} color={cfg.color} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 15, marginBottom: 3 }}>{item?.title || 'Unknown Item'}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Submitted {claim.submittedAt}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ padding: '4px 12px', borderRadius: 99, background: cfg.bg, border: `1px solid ${cfg.border}`, fontSize: 12, fontWeight: 600, fontFamily: 'Syne', color: cfg.color }}>
                      {cfg.label}
                    </span>
                    {isOpen ? <ChevronUp size={16} color="var(--text-muted)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
                  </div>
                </div>

                {/* Expanded */}
                {isOpen && (
                  <div style={{ padding: '0 24px 24px', borderTop: '1px solid var(--border)', paddingTop: 20 }}>
                    <div style={{ marginBottom: 14 }}>
                      <p className="section-title">Admin Notes</p>
                      <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{claim.notes}</p>
                    </div>
                    <div>
                      <p className="section-title">Verification Questions</p>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {claim.questions.map(q => (
                          <li key={q} style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'flex', gap: 8 }}>
                            <Eye size={13} color="var(--text-muted)" style={{ flexShrink: 0, marginTop: 2 }} /> {q}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {claim.status === 'approved' && (
                      <div style={{ marginTop: 16, padding: '12px 16px', background: 'rgba(34,211,165,0.06)', border: '1px solid rgba(34,211,165,0.2)', borderRadius: 8, fontSize: 13, color: '#34d399' }}>
                        🎉 Your claim has been approved. Please visit the admin office to collect your item.
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

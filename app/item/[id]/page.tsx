'use client';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import { mockItems } from '../../data';
import { MapPin, Calendar, Tag, User, ArrowLeft, Shield, Share2, Flag, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const categoryEmoji: Record<string, string> = {
  Electronics: '💻', Documents: '📄', Accessories: '👜',
  Stationery: '✏️', 'ID/Cards': '🪪', Clothing: '👕', Keys: '🔑', Other: '📦',
};

export default function ItemDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const item = mockItems.find(i => i.id === id);
  const [claimOpen, setClaimOpen] = useState(false);
  const [claimSent, setClaimSent] = useState(false);
  const [answer, setAnswer] = useState('');

  if (!item) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Navbar />
      <p style={{ color: 'var(--text-muted)', fontSize: 16 }}>Item not found.</p>
      <Link href="/browse" className="btn-ghost" style={{ marginTop: 16 }}>← Back to browse</Link>
    </div>
  );

  const isLost = item.type === 'lost';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />
      <main style={{ paddingTop: 80, maxWidth: 800, margin: '0 auto', padding: '80px 24px 48px' }}>
        {/* Back */}
        <button onClick={() => router.back()} className="btn-ghost" style={{ marginBottom: 24, padding: '8px 14px' }}>
          <ArrowLeft size={14} /> Back
        </button>

        {/* Main card */}
        <div className="card animate-fadeUp" style={{ overflow: 'hidden', marginBottom: 20 }}>
          {/* Top stripe */}
          <div style={{ height: 4, background: isLost ? 'linear-gradient(90deg, #ef4444, #f97316)' : 'linear-gradient(90deg, #22d3a5, #4f6ef7)' }} />

          <div style={{ padding: '28px 32px' }}>
            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 64, height: 64, borderRadius: 14, background: isLost ? 'rgba(239,68,68,0.1)' : 'rgba(34,211,165,0.1)', border: `1px solid ${isLost ? 'rgba(239,68,68,0.2)' : 'rgba(34,211,165,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
                  {categoryEmoji[item.category] || '📦'}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'Syne', textTransform: 'uppercase', letterSpacing: '0.08em', color: isLost ? '#f97316' : '#22d3a5' }}>
                      ● {isLost ? 'Lost Item' : 'Found Item'}
                    </span>
                    <span className={`badge badge-${item.status}`}>{item.status}</span>
                  </div>
                  <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 22, letterSpacing: '-0.01em' }}>{item.title}</h1>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button className="btn-ghost" style={{ padding: '8px 12px' }}><Share2 size={14} /></button>
                <button className="btn-ghost" style={{ padding: '8px 12px' }}><Flag size={14} /></button>
              </div>
            </div>

            <div className="divider" />

            {/* Details grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              {[
                { icon: MapPin, label: 'Location', value: item.location },
                { icon: Calendar, label: 'Date', value: item.date },
                { icon: Tag, label: 'Category', value: item.category },
                { icon: User, label: 'Reported by', value: item.postedBy },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'var(--bg)', borderRadius: 10, border: '1px solid var(--border)' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={15} color="var(--accent)" />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>{label}</div>
                    <div style={{ fontSize: 14, color: 'var(--text-primary)', marginTop: 2 }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div style={{ marginBottom: 24 }}>
              <p className="section-title">Description</p>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{item.description}</p>
            </div>

            {/* Action */}
            {item.type === 'found' && item.status === 'posted' && !claimSent && (
              <div>
                {!claimOpen ? (
                  <button className="btn-primary" onClick={() => setClaimOpen(true)} style={{ padding: '12px 24px' }}>
                    <Shield size={15} /> Claim this item
                  </button>
                ) : (
                  <div style={{ padding: '20px', background: 'var(--bg)', borderRadius: 12, border: '1px solid var(--border)' }}>
                    <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>Verify Ownership</h3>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>Answer the following to prove this item is yours:</p>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>Describe a unique identifying feature of this item:</p>
                    <textarea className="input" value={answer} onChange={e => setAnswer(e.target.value)} style={{ minHeight: 80, marginBottom: 14 }} placeholder="e.g. There's a sticker of…" />
                    <div style={{ display: 'flex', gap: 10 }}>
                      <button className="btn-ghost" onClick={() => setClaimOpen(false)}>Cancel</button>
                      <button className="btn-primary" onClick={() => { setClaimSent(true); setClaimOpen(false); }}>Submit Claim</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {claimSent && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px', background: 'rgba(34,211,165,0.08)', border: '1px solid rgba(34,211,165,0.25)', borderRadius: 10 }}>
                <CheckCircle size={18} color="var(--accent-2)" />
                <span style={{ fontSize: 14, color: '#34d399' }}>Claim submitted! You'll be notified within 24 hours.</span>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        <div className="animate-fadeUp stagger-2">
          <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 16, marginBottom: 14 }}>Related Items</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {mockItems.filter(i => i.id !== item.id && i.category === item.category).slice(0, 2).map(rel => (
              <Link key={rel.id} href={`/item/${rel.id}`} style={{ textDecoration: 'none', display: 'block', padding: '14px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg-card)', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                <div style={{ fontFamily: 'Syne', fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', marginBottom: 4 }}>{rel.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{rel.location} · {rel.date}</div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

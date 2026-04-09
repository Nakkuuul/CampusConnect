'use client';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import ItemCard from '../components/ItemCard';
import { mockItems } from '../data';
import { Search, Filter, SlidersHorizontal, X } from 'lucide-react';

const categories = ['All', 'Electronics', 'Documents', 'Accessories', 'Stationery', 'ID/Cards', 'Clothing', 'Keys', 'Other'];
const locations = ['All', 'Main Library', 'Cafeteria Block C', 'Sports Complex', 'Computer Lab 101', 'Lecture Hall B2', 'Hostel Block A', 'Parking Area', 'Gym'];
const statuses = ['All', 'posted', 'matched', 'claimed', 'resolved'];

export default function BrowsePage() {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'lost' | 'found'>('all');
  const [category, setCategory] = useState('All');
  const [location, setLocation] = useState('All');
  const [status, setStatus] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = mockItems.filter(item => {
    const matchQ = query === '' || item.title.toLowerCase().includes(query.toLowerCase()) || item.description.toLowerCase().includes(query.toLowerCase());
    const matchType = typeFilter === 'all' || item.type === typeFilter;
    const matchCat = category === 'All' || item.category === category;
    const matchLoc = location === 'All' || item.location.includes(location);
    const matchStatus = status === 'All' || item.status === status;
    return matchQ && matchType && matchCat && matchLoc && matchStatus;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />
      <main style={{ paddingTop: 80, maxWidth: 1200, margin: '0 auto', padding: '80px 24px 48px' }}>
        {/* Header */}
        <div className="animate-fadeUp" style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: 'Syne', fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 6 }}>Browse Items</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{filtered.length} items found across campus</p>
        </div>

        {/* Search + controls */}
        <div className="animate-fadeUp stagger-1" style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
            {/* Search bar */}
            <div style={{ flex: 1, position: 'relative' }}>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                className="input"
                style={{ paddingLeft: 42 }}
                placeholder="Search by keyword, item name, description…"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              {query && (
                <button onClick={() => setQuery('')} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  <X size={14} color="var(--text-muted)" />
                </button>
              )}
            </div>

            {/* Type toggle */}
            <div style={{ display: 'flex', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
              {(['all', 'lost', 'found'] as const).map(t => (
                <button key={t} onClick={() => setTypeFilter(t)} style={{
                  padding: '10px 16px', border: 'none', cursor: 'pointer',
                  fontFamily: 'Syne', fontWeight: 600, fontSize: 13,
                  background: typeFilter === t ? 'var(--accent)' : 'transparent',
                  color: typeFilter === t ? '#fff' : 'var(--text-muted)',
                  transition: 'all 0.2s',
                  textTransform: 'capitalize',
                }}>
                  {t}
                </button>
              ))}
            </div>

            {/* Filter toggle */}
            <button onClick={() => setShowFilters(!showFilters)} className={showFilters ? 'btn-primary' : 'btn-ghost'} style={{ padding: '10px 16px' }}>
              <SlidersHorizontal size={15} /> Filters
            </button>
          </div>

          {/* Advanced filters */}
          {showFilters && (
            <div className="card animate-fadeUp" style={{ padding: 20, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              <div>
                <label className="label">Category</label>
                <select className="input" value={category} onChange={e => setCategory(e.target.value)}>
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Location</label>
                <select className="input" value={location} onChange={e => setLocation(e.target.value)}>
                  {locations.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Status</label>
                <select className="input" value={status} onChange={e => setStatus(e.target.value)}>
                  {statuses.map(s => <option key={s} style={{ textTransform: 'capitalize' }}>{s}</option>)}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--text-muted)' }}>
            <Filter size={40} style={{ margin: '0 auto 16px', display: 'block' }} />
            <p style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>No items found</p>
            <p style={{ fontSize: 14 }}>Try adjusting your filters or search query</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
            {filtered.map((item, i) => (
              <ItemCard key={item.id} item={item} delay={i * 0.05} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

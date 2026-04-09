'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MapPin, Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', enrollment: '', password: '', role: 'student' });

  const handleStep1 = (e: React.FormEvent) => { e.preventDefault(); setStep(2); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setStep(3);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, background: 'radial-gradient(circle, rgba(34,211,165,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="animate-fadeUp" style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 10 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <MapPin size={24} color="#fff" />
          </div>
          <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 24, letterSpacing: '-0.02em' }}>Create your account</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 6 }}>Join the CampusConnect community</p>
        </div>

        {/* Step indicator */}
        {step < 3 && (
          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            {[1, 2].map(s => (
              <div key={s} style={{ flex: 1, height: 4, borderRadius: 4, background: s <= step ? 'var(--accent)' : 'var(--border)', transition: 'background 0.3s' }} />
            ))}
          </div>
        )}

        <div className="card" style={{ padding: 32 }}>
          {step === 1 && (
            <form onSubmit={handleStep1}>
              <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 16, marginBottom: 20 }}>Personal Info</h3>
              <div style={{ marginBottom: 16 }}>
                <label className="label">Full Name</label>
                <input className="input" type="text" placeholder="Nakul Thakur" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} required />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label className="label">Enrollment Number</label>
                <input className="input" type="text" placeholder="E22CSE..." value={form.enrollment} onChange={e => setForm(f => ({...f, enrollment: e.target.value}))} required />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label className="label">Role</label>
                <select className="input" value={form.role} onChange={e => setForm(f => ({...f, role: e.target.value}))}>
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="staff">Administrative Staff</option>
                </select>
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                Continue <ArrowRight size={16} />
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit}>
              <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 16, marginBottom: 20 }}>Account Setup</h3>
              <div style={{ marginBottom: 16 }}>
                <label className="label">University Email</label>
                <input className="input" type="email" placeholder="you@bennett.edu.in" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} required />
                <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 5 }}>Must be your @bennett.edu.in address</p>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label className="label">Password</label>
                <div style={{ position: 'relative' }}>
                  <input className="input" type={showPass ? 'text' : 'password'} placeholder="Min. 8 characters" value={form.password} onChange={e => setForm(f => ({...f, password: e.target.value}))} style={{ paddingRight: 44 }} required minLength={8} />
                  <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>
                    {showPass ? <EyeOff size={16} color="var(--text-muted)" /> : <Eye size={16} color="var(--text-muted)" />}
                  </button>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button type="button" className="btn-ghost" onClick={() => setStep(1)} style={{ flex: 1, justifyContent: 'center' }}>Back</button>
                <button type="submit" className="btn-primary" style={{ flex: 2, justifyContent: 'center' }} disabled={loading}>
                  {loading ? 'Creating…' : 'Create account'}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div className="animate-float" style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(34,211,165,0.12)', border: '1px solid rgba(34,211,165,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <CheckCircle size={30} color="var(--accent-2)" />
              </div>
              <h3 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 20, marginBottom: 10 }}>You're in!</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
                Account created. Check your email to verify.
              </p>
              <Link href="/dashboard" className="btn-primary" style={{ justifyContent: 'center', padding: '12px 28px' }}>
                Go to Dashboard <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>

        {step < 3 && (
          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)', marginTop: 20 }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
          </p>
        )}
      </div>
    </div>
  );
}

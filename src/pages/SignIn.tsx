import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EyeIcon = ({ show }: { show: boolean }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {show ? (
            <>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
            </>
        ) : (
            <>
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
            </>
        )}
    </svg>
);

const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
);

const AppleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
);

const CheckIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const ChevR = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

type FormMode = 'signin' | 'signup';

const SignIn = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState<FormMode>('signin');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    // Form state
    const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const update = (field: string, val: string) => {
        setForm(f => ({ ...f, [field]: val }));
        setErrors(e => ({ ...e, [field]: '' }));
    };

    const validate = () => {
        const errs: Record<string, string> = {};
        if (mode === 'signup' && form.name.trim().length < 2) errs.name = 'Name must be at least 2 characters';
        if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email address';
        if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
        if (mode === 'signup' && form.confirm !== form.password) errs.confirm = 'Passwords do not match';
        return errs;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => navigate('/'), 1800);
        }, 1400);
    };

    const FEATURES = [
        'Exclusive member-only discounts',
        'Early access to new arrivals',
        'Free express shipping on all orders',
        'Easy order tracking & returns',
    ];

    return (
        <div className="signin-page">
            {/* Left panel — brand / features */}
            <div className="signin-left">
                <div className="signin-left-inner">
                    <Link to="/" className="signin-logo">FAKESTORE</Link>
                    <h2 className="signin-tagline">
                        {mode === 'signin'
                            ? 'Welcome back! Great style awaits you.'
                            : 'Join thousands of happy customers.'}
                    </h2>
                    <ul className="signin-features">
                        {FEATURES.map(f => (
                            <li key={f} className="signin-feature-item">
                                <span className="signin-check"><CheckIcon /></span>
                                {f}
                            </li>
                        ))}
                    </ul>

                    {/* Decorative fashion card */}
                    <div className="signin-fashion-card">
                        <img
                            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80&auto=format&fit=crop"
                            alt="Fashion"
                            className="signin-fashion-img"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                        <div className="signin-fashion-overlay">
                            <p className="signin-fashion-text">New Season Collection 2025</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right panel — form */}
            <div className="signin-right">
                <div className="signin-form-wrap">
                    {/* Breadcrumb */}
                    <nav className="breadcrumb" style={{ marginBottom: 28 }}>
                        <Link to="/">Home</Link>
                        <span className="crumb-sep"><ChevR /></span>
                        <span className="crumb-active">{mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
                    </nav>

                    {success ? (
                        /* ── SUCCESS STATE ── */
                        <div className="signin-success">
                            <div className="signin-success-icon">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <h2>{mode === 'signin' ? 'Welcome back!' : 'Account created!'}</h2>
                            <p>Redirecting you to the store…</p>
                            <div className="signin-progress"><div className="signin-progress-bar" /></div>
                        </div>
                    ) : (
                        <>
                            {/* ── TABS ── */}
                            <div className="signin-tabs">
                                <button
                                    className={`signin-tab${mode === 'signin' ? ' signin-tab-active' : ''}`}
                                    onClick={() => { setMode('signin'); setErrors({}); setForm({ name: '', email: '', password: '', confirm: '' }); }}
                                >
                                    Sign In
                                </button>
                                <button
                                    className={`signin-tab${mode === 'signup' ? ' signin-tab-active' : ''}`}
                                    onClick={() => { setMode('signup'); setErrors({}); setForm({ name: '', email: '', password: '', confirm: '' }); }}
                                >
                                    Create Account
                                </button>
                            </div>

                            <h1 className="signin-title">
                                {mode === 'signin' ? 'Sign in to your account' : 'Create a new account'}
                            </h1>

                            {/* ── SOCIAL BUTTONS ── */}
                            <div className="social-btns">
                                <button className="social-btn">
                                    <GoogleIcon /> Continue with Google
                                </button>
                                <button className="social-btn social-btn-dark">
                                    <AppleIcon /> Continue with Apple
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="signin-divider">
                                <span className="signin-divider-line" />
                                <span className="signin-divider-text">or continue with email</span>
                                <span className="signin-divider-line" />
                            </div>

                            {/* ── FORM ── */}
                            <form onSubmit={handleSubmit} noValidate>
                                {mode === 'signup' && (
                                    <div className="sfield">
                                        <label className="slabel">Full Name</label>
                                        <input
                                            type="text"
                                            className={`sinput${errors.name ? ' sinput-error' : ''}`}
                                            placeholder="John Doe"
                                            value={form.name}
                                            onChange={e => update('name', e.target.value)}
                                        />
                                        {errors.name && <p className="serror">{errors.name}</p>}
                                    </div>
                                )}

                                <div className="sfield">
                                    <label className="slabel">Email Address</label>
                                    <input
                                        type="email"
                                        className={`sinput${errors.email ? ' sinput-error' : ''}`}
                                        placeholder="you@example.com"
                                        value={form.email}
                                        onChange={e => update('email', e.target.value)}
                                    />
                                    {errors.email && <p className="serror">{errors.email}</p>}
                                </div>

                                <div className="sfield">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <label className="slabel">Password</label>
                                        {mode === 'signin' && (
                                            <a href="#" className="sforgot">Forgot password?</a>
                                        )}
                                    </div>
                                    <div className="sinput-wrap">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className={`sinput sinput-pw${errors.password ? ' sinput-error' : ''}`}
                                            placeholder="Min. 6 characters"
                                            value={form.password}
                                            onChange={e => update('password', e.target.value)}
                                        />
                                        <button type="button" className="pw-toggle" onClick={() => setShowPassword(!showPassword)}>
                                            <EyeIcon show={showPassword} />
                                        </button>
                                    </div>
                                    {errors.password && <p className="serror">{errors.password}</p>}
                                </div>

                                {mode === 'signup' && (
                                    <div className="sfield">
                                        <label className="slabel">Confirm Password</label>
                                        <div className="sinput-wrap">
                                            <input
                                                type={showConfirm ? 'text' : 'password'}
                                                className={`sinput sinput-pw${errors.confirm ? ' sinput-error' : ''}`}
                                                placeholder="Repeat your password"
                                                value={form.confirm}
                                                onChange={e => update('confirm', e.target.value)}
                                            />
                                            <button type="button" className="pw-toggle" onClick={() => setShowConfirm(!showConfirm)}>
                                                <EyeIcon show={showConfirm} />
                                            </button>
                                        </div>
                                        {errors.confirm && <p className="serror">{errors.confirm}</p>}
                                    </div>
                                )}

                                {/* Password strength indicator (signup only) */}
                                {mode === 'signup' && form.password.length > 0 && (
                                    <div className="pw-strength">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className={`pw-bar ${form.password.length >= i * 3 ? (form.password.length >= 10 ? 'pw-bar-strong' : form.password.length >= 6 ? 'pw-bar-medium' : 'pw-bar-weak') : ''}`} />
                                        ))}
                                        <span className="pw-label">
                                            {form.password.length >= 10 ? 'Strong' : form.password.length >= 6 ? 'Medium' : 'Weak'}
                                        </span>
                                    </div>
                                )}

                                {mode === 'signin' && (
                                    <div className="sremember">
                                        <label className="scheck-label">
                                            <span
                                                className={`scheck${rememberMe ? ' scheck-checked' : ''}`}
                                                onClick={() => setRememberMe(!rememberMe)}
                                            >
                                                {rememberMe && <CheckIcon />}
                                            </span>
                                            Remember me for 30 days
                                        </label>
                                    </div>
                                )}

                                {mode === 'signup' && (
                                    <div className="sremember">
                                        <label className="scheck-label">
                                            <span className="scheck scheck-checked"><CheckIcon /></span>
                                            I agree to the <a href="#" className="slink">Terms & Conditions</a> and <a href="#" className="slink">Privacy Policy</a>
                                        </label>
                                    </div>
                                )}

                                <button type="submit" className="ssubmit" disabled={loading}>
                                    {loading
                                        ? <><span className="sloader" /> Processing…</>
                                        : mode === 'signin' ? 'Sign In →' : 'Create Account →'}
                                </button>
                            </form>

                            <p className="signin-switch">
                                {mode === 'signin'
                                    ? <>Don't have an account? <button className="slink-btn" onClick={() => setMode('signup')}>Sign up free</button></>
                                    : <>Already have an account? <button className="slink-btn" onClick={() => setMode('signin')}>Sign in</button></>
                                }
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SignIn;

import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

const CartIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
);

const UserIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
);

const ChevronDown = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

const HamburgerIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);

const MARQUEE_MESSAGES = [
    "🔥 Sign up now and get 20% off your first order!",
    "🚚 Free shipping on orders over $100",
    "⭐ New Arrivals every week — stay fresh!",
    "💳 Secure checkout with SSL encryption",
    "🎁 Gift wrapping available on all orders",
    "✅ 30-day hassle-free returns",
];

const Navbar = () => {
    const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAnnouncement, setShowAnnouncement] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => { setMobileOpen(false); }, [location]);

    const marqueeText = MARQUEE_MESSAGES.join('   •••   ');

    return (
        <header style={{ position: 'sticky', top: 0, zIndex: 200 }}>
            {/* ── MARQUEE ANNOUNCEMENT BAR ── */}
            {showAnnouncement && (
                <div className="announcement-bar">
                    <div className="marquee-track">
                        <span className="marquee-content">{marqueeText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}</span>
                    </div>
                    <button
                        className="announcement-close"
                        onClick={() => setShowAnnouncement(false)}
                        aria-label="Close"
                    >✕</button>
                </div>
            )}

            {/* ── MAIN NAV ── */}
            <nav className={`navbar${scrolled ? ' navbar-scrolled' : ''}`}>
                {/* Logo */}
                <Link to="/" className="navbar-logo">FAKESTORE</Link>

                {/* Desktop Links */}
                <ul className="navbar-links">
                    <li className="has-dropdown">
                        <span className="navbar-dropdown-trigger">
                            Shop <ChevronDown />
                        </span>
                        <div className="mega-dropdown">
                            <div className="mega-col">
                                <p className="mega-label">Men</p>
                                <a href="#">T-Shirts</a>
                                <a href="#">Jeans</a>
                                <a href="#">Jackets</a>
                                <a href="#">Shorts</a>
                            </div>
                            <div className="mega-col">
                                <p className="mega-label">Women</p>
                                <a href="#">Dresses</a>
                                <a href="#">Tops</a>
                                <a href="#">Skirts</a>
                                <a href="#">Activewear</a>
                            </div>
                            <div className="mega-col">
                                <p className="mega-label">Accessories</p>
                                <a href="#">Bags</a>
                                <a href="#">Shoes</a>
                                <a href="#">Watches</a>
                                <a href="#">Sunglasses</a>
                            </div>
                        </div>
                    </li>
                    <li><Link to="#" className="nav-link">On Sale</Link></li>
                    <li><Link to="#" className="nav-link">New Arrivals</Link></li>
                    <li><Link to="#" className="nav-link">Brands</Link></li>
                </ul>

                {/* Search */}
                <div className="navbar-search">
                    <span className="search-icon-pos"><SearchIcon /></span>
                    <input
                        ref={searchRef}
                        type="text"
                        placeholder="Search for products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Actions */}
                <div className="navbar-actions">
                    <Link to="/signin" className="navbar-icon-btn" aria-label="Account" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <UserIcon />
                    </Link>
                    <Link to="/cart" className="navbar-icon-btn cart-btn" style={{ position: 'relative', textDecoration: 'none', color: 'inherit' }}>
                        <CartIcon />
                        {totalQuantity > 0 && (
                            <span className="cart-badge">{totalQuantity > 9 ? '9+' : totalQuantity}</span>
                        )}
                    </Link>
                    <button className="navbar-icon-btn mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
                        <HamburgerIcon />
                    </button>
                </div>
            </nav>

            {/* ── MOBILE MENU ── */}
            {mobileOpen && (
                <div className="mobile-menu">
                    <Link to="/" className="mobile-link">Home</Link>
                    <Link to="#" className="mobile-link">Shop</Link>
                    <Link to="#" className="mobile-link">On Sale</Link>
                    <Link to="#" className="mobile-link">New Arrivals</Link>
                    <Link to="#" className="mobile-link">Brands</Link>
                    <Link to="/cart" className="mobile-link">Cart ({totalQuantity})</Link>
                </div>
            )}
        </header>
    );
};

export default Navbar;

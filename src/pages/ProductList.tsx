import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/productSlice';
import { addToCart } from '../features/cartSlice';
import type { Product } from '../types';

/* ─── Icons ─── */
const HeartIcon = ({ filled = false }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? '#e53535' : 'none'} stroke={filled ? '#e53535' : '#999'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
);
const CartPlusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        <line x1="16" y1="10" x2="19" y2="10" /><line x1="17.5" y1="8.5" x2="17.5" y2="11.5" />
    </svg>
);
const ArrowRight = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
);
const StarFull = () => <span style={{ color: '#FFAD33', fontSize: 14 }}>★</span>;
const StarEmpty = () => <span style={{ color: '#ddd', fontSize: 14 }}>★</span>;

/* ─── Star Rating ─── */
const StarRating = ({ rating = 4.5, count = 0 }: { rating?: number; count?: number }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <div style={{ display: 'flex' }}>
            {[1, 2, 3, 4, 5].map(i => i <= Math.round(rating) ? <StarFull key={i} /> : <StarEmpty key={i} />)}
        </div>
        <span style={{ fontSize: 12, color: '#777' }}>{rating}/5 ({count})</span>
    </div>
);

/* ─── Product Card ─── */
const ProductCard = ({ product }: { product: Product }) => {
    const dispatch = useAppDispatch();
    const [liked, setLiked] = useState(false);
    const [added, setAdded] = useState(false);

    const imgSrc = product.images[0]?.replace(/^\[?"?/, '').replace(/"?\]?$/, '') ||
        'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80';
    const discount = [10, 15, 20, 25, 30][product.id % 5];
    const originalPrice = Math.round(product.price * (100 / (100 - discount)));
    const rating = 3.5 + (product.id % 3) * 0.5;
    const ratingCount = 50 + (product.id * 13 % 200);

    const handleAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(addToCart(product));
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    return (
        <div className="pcard">
            <Link to={`/product/${product.id}`} className="pcard-image-link">
                <div className="pcard-img-wrap">
                    <img
                        src={imgSrc}
                        alt={product.title}
                        className="pcard-img"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80'; }}
                    />
                    {/* Badges */}
                    <div className="pcard-badges">
                        <span className="badge-new">NEW</span>
                        <span className="badge-discount">-{discount}%</span>
                    </div>
                    {/* Hover actions */}
                    <div className="pcard-hover-actions">
                        <button className="pcard-action-btn" onClick={(e) => { e.preventDefault(); setLiked(!liked); }} title="Wishlist">
                            <HeartIcon filled={liked} />
                        </button>
                        <button
                            className={`pcard-add-btn${added ? ' added' : ''}`}
                            onClick={handleAdd}
                        >
                            {added ? '✓ Added' : <><CartPlusIcon /> Add</>}
                        </button>
                    </div>
                </div>
            </Link>
            <div className="pcard-info">
                <p className="pcard-cat">{product.category?.name || 'Fashion'}</p>
                <Link to={`/product/${product.id}`} className="pcard-title">{product.title}</Link>
                <StarRating rating={rating} count={ratingCount} />
                <div className="pcard-price-row">
                    <span className="pcard-price">${product.price}</span>
                    <span className="pcard-original">${originalPrice}</span>
                    <span className="pcard-disc-badge">-{discount}%</span>
                </div>
            </div>
        </div>
    );
};

/* ─── Hero ─── */
const HeroSection = () => (
    <section className="hero-section">
        <div className="hero-content">
            <div className="hero-label">✦ New Collection 2025</div>
            <h1 className="hero-h1">
                FIND CLOTHES<br />
                <span className="hero-accent">THAT MATCH</span><br />
                YOUR STYLE<br />PERFECTLY
            </h1>
            <p className="hero-sub">
                Browse through our diverse range of meticulously crafted garments,
                designed to bring out your individuality and cater to your sense of style.
            </p>
            <div className="hero-cta-row">
                <Link to="#" className="btn-primary">Shop Now →</Link>
            </div>
            <div className="hero-stats">
                <div className="hero-stat">
                    <span className="hero-stat-num">200+</span>
                    <span className="hero-stat-lbl">International Brands</span>
                </div>
                <div className="hero-stat-divider" />
                <div className="hero-stat">
                    <span className="hero-stat-num">2,000+</span>
                    <span className="hero-stat-lbl">High-Quality Products</span>
                </div>
                <div className="hero-stat-divider" />
                <div className="hero-stat">
                    <span className="hero-stat-num">30,000+</span>
                    <span className="hero-stat-lbl">Happy Customers</span>
                </div>
            </div>
        </div>
        {/* Hero image using Unsplash */}
        <div className="hero-img-wrap">
            <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&q=85&auto=format&fit=crop"
                alt="Fashion hero"
                className="hero-img"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=700&q=85';
                }}
            />
            {/* Floating badge */}
            <div className="hero-float-badge">
                <div className="hero-float-text">
                    <span style={{ fontWeight: 800, fontSize: 15 }}>★ 4.9</span>
                    <span style={{ fontSize: 11, color: '#555' }}>Our Happy Customer</span>
                </div>
            </div>
        </div>
    </section>
);

/* ─── Brand Strip ─── */
const BrandStrip = () => {
    const brands = ['VERSACE', 'ZARA', 'GUCCI', 'PRADA', 'Calvin Klein', 'ARMANI', 'H &amp; M', 'RALPH LAUREN'];
    return (
        <div className="brand-strip">
            <div className="brand-marquee">
                <div className="brand-marquee-track">
                    {[...brands, ...brands].map((b, i) => (
                        <span key={i} className="brand-marquee-item" dangerouslySetInnerHTML={{ __html: b }} />
                    ))}
                </div>
            </div>
        </div>
    );
};

/* ─── Section Header ─── */
const SectionHeader = ({ title, linkText = 'View All', linkHref = '#' }: { title: string; linkText?: string; linkHref?: string }) => (
    <div className="section-header-flex">
        <h2 className="section-title">{title}</h2>
        <a href={linkHref} className="view-all-btn">{linkText} <ArrowRight /></a>
    </div>
);

/* ─── BROWSE BY STYLE cards ─── */
const STYLES = [
    {
        name: 'Casual',
        img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80&auto=format&fit=crop',
        span: '1',
    },
    {
        name: 'Formal',
        img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80&auto=format&fit=crop',
        span: '1',
    },
    {
        name: 'Party',
        img: 'https://images.unsplash.com/photo-1529635696741-ef77e01f3a86?w=600&q=80&auto=format&fit=crop',
        span: '1',
    },
    {
        name: 'Gym',
        img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80&auto=format&fit=crop',
        span: '1',
    },
];

const BrowseByStyle = () => (
    <section className="browse-section">
        <h2 className="browse-title">BROWSE BY STYLE</h2>
        <div className="browse-grid">
            {STYLES.map((s) => (
                <a key={s.name} href="#" className="style-card-new">
                    <img
                        src={s.img}
                        alt={s.name}
                        className="style-card-img"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80'; }}
                    />
                    <div className="style-card-overlay">
                        <span className="style-card-name-new">{s.name}</span>
                    </div>
                </a>
            ))}
        </div>
    </section>
);

/* ─── Newsletter ─── */
const Newsletter = () => (
    <section className="newsletter-section">
        <div className="newsletter-inner">
            <h2 className="newsletter-title">STAY UP TO DATE ABOUT<br />OUR LATEST OFFERS</h2>
            <div className="newsletter-form">
                <div className="newsletter-input-wrap">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                    </svg>
                    <input type="email" placeholder="Enter your email address" className="newsletter-input" />
                </div>
                <button className="btn-primary newsletter-btn">Subscribe to Newsletter</button>
            </div>
        </div>
    </section>
);

/* ─── Tabs for product sections ─── */
const TABS = ['All', 'New Arrivals', 'Top Selling', 'On Sale'];

/* ─── MAIN COMPONENT ─── */
const ProductList = () => {
    const dispatch = useAppDispatch();
    const { items, status, error } = useAppSelector((state) => state.products);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [activeTab, setActiveTab] = useState('New Arrivals');
    const [visibleCount, setVisibleCount] = useState(8);

    useEffect(() => {
        if (status === 'idle') dispatch(fetchProducts());
    }, [status, dispatch]);

    const categories: string[] = ['All', ...Array.from(new Set((items || []).map((p: Product) => p.category?.name).filter((n): n is string => !!n)))];

    const filteredItems = (items || []).filter((p: Product) =>
        selectedCategory === 'All' || p.category?.name === selectedCategory
    );

    if (status === 'loading') {
        return (
            <div className="loading-screen">
                <div className="spinner" />
                <p style={{ fontSize: 13, color: '#999', marginTop: 12 }}>Loading products...</p>
            </div>
        );
    }

    if (status === 'failed') {
        return (
            <div className="empty-state">
                <p style={{ color: '#e53535', marginBottom: 16 }}>Failed to load: {error}</p>
                <button className="btn-primary" onClick={() => dispatch(fetchProducts())}>Try Again</button>
            </div>
        );
    }

    const newArrivals = (items || []).slice(0, 4);
    const casualItems = filteredItems.slice(0, visibleCount);
    const showLoadMore = filteredItems.length > visibleCount;

    return (
        <div className="pl-root">
            {/* ── HERO ── */}
            <div className="container">
                <HeroSection />
            </div>

            {/* ── BRANDS MARQUEE ── */}
            <BrandStrip />

            {/* ── NEW ARRIVALS ── */}
            <div className="container section-gap">
                <SectionHeader title="NEW ARRIVALS" />
                <div className="products-grid-4">
                    {newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
                <div className="center-row" style={{ marginTop: 40 }}>
                    <a href="#" className="btn-outline">View All →</a>
                </div>
            </div>

            <div className="section-divider" />

            {/* ── TOP SELLING (same products, offset) ── */}
            <div className="container section-gap">
                <SectionHeader title="TOP SELLING" />
                <div className="products-grid-4">
                    {(items || []).slice(4, 8).map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
                <div className="center-row" style={{ marginTop: 40 }}>
                    <a href="#" className="btn-outline">View All →</a>
                </div>
            </div>

            {/* ── BROWSE BY STYLE ── */}
            <div className="container section-gap">
                <BrowseByStyle />
            </div>

            {/* ── ALL PRODUCTS WITH FILTER ── */}
            <div className="container section-gap">
                <SectionHeader title="OUR PRODUCTS" />

                {/* Tabs */}
                <div className="tabs-row">
                    {TABS.map(t => (
                        <button key={t} className={`tab-btn${activeTab === t ? ' tab-active' : ''}`} onClick={() => setActiveTab(t)}>
                            {t}
                        </button>
                    ))}
                </div>

                {/* Category Chips */}
                <div className="filter-chips-row">
                    {categories.slice(0, 10).map((cat) => (
                        <button key={cat} className={`chip${selectedCategory === cat ? ' chip-active' : ''}`} onClick={() => { setSelectedCategory(cat); setVisibleCount(8); }}>
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="products-grid-4">
                    {casualItems.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>

                {filteredItems.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-state-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                        </div>
                        <h2>No products found</h2>
                        <p>Try a different category.</p>
                    </div>
                )}

                {showLoadMore && (
                    <div className="center-row" style={{ marginTop: 40 }}>
                        <button className="btn-outline" onClick={() => setVisibleCount(v => v + 8)}>
                            Load More Products
                        </button>
                    </div>
                )}
            </div>

            {/* ── NEWSLETTER ── */}
            <div className="container" style={{ paddingBottom: 60 }}>
                <Newsletter />
            </div>
        </div>
    );
};

export default ProductList;

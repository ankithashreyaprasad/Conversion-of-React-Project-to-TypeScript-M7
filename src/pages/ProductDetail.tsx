import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/productSlice';
import { addToCart } from '../features/cartSlice';
import type { Product } from '../types';

const ChevR = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

const StarRating = ({ rating = 4.5, count = 128 }: { rating?: number; count?: number }) => (
    <div className="product-rating">
        <div className="product-stars">
            {[1, 2, 3, 4, 5].map(i => (
                <span key={i} className={i <= Math.round(rating) ? 'filled-star' : 'empty-star'}>★</span>
            ))}
        </div>
        <span className="rating-text">{rating}/5 ({count} Reviews)</span>
    </div>
);

const COLORS = [
    { label: 'Olive', hex: '#7d7c5f' },
    { label: 'Forest Green', hex: '#4a6c5a' },
    { label: 'Navy Blue', hex: '#2a3f6c' },
];
const SIZES = ['Small', 'Medium', 'Large', 'X-Large'];

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { items, status } = useAppSelector((state) => state.products);

    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState(2);
    const [quantity, setQuantity] = useState(1);
    const [activeThumb, setActiveThumb] = useState(0);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        if (status === 'idle') dispatch(fetchProducts());
        window.scrollTo(0, 0);
    }, [status, dispatch]);

    const product = items.find((item: Product) => item.id === Number(id));

    if (status === 'loading') {
        return <div className="loading-screen"><div className="spinner" /><p style={{ fontSize: 13, color: '#999', marginTop: 12 }}>Loading...</p></div>;
    }

    if (!product) {
        return (
            <div className="container">
                <div className="empty-state">
                    <div className="empty-state-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                    </div>
                    <h2>Product not found</h2>
                    <p>This item is no longer available.</p>
                    <Link to="/" className="btn-primary" style={{ marginTop: 16 }}>Back to Shop</Link>
                </div>
            </div>
        );
    }

    const imgSrc = product.images[0]?.replace(/^\[?"?/, '').replace(/"?\]?$/, '') ||
        'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80';

    const discount = [10, 15, 20, 25, 30][product.id % 5];
    const originalPrice = Math.round(product.price * (100 / (100 - discount)));
    const rating = 3.5 + (product.id % 3) * 0.5;
    const ratingCount = 50 + (product.id * 13 % 200);

    // Use same image for all thumbs as a demo
    const thumbImages = [imgSrc, imgSrc, imgSrc];

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) dispatch(addToCart(product));
        setAdded(true);
        setTimeout(() => setAdded(false), 1800);
    };

    return (
        <div className="container">
            {/* Breadcrumb */}
            <nav className="breadcrumb">
                <Link to="/">Home</Link>
                <span className="crumb-sep"><ChevR /></span>
                <a href="#">Shop</a>
                <span className="crumb-sep"><ChevR /></span>
                <a href="#">{product.category?.name || 'Men'}</a>
                <span className="crumb-sep"><ChevR /></span>
                <span className="crumb-active">{product.title.split(' ').slice(0, 3).join(' ')}</span>
            </nav>

            {/* Layout */}
            <div className="product-detail-layout">
                {/* Left: Images */}
                <div className="product-image-col">
                    {/* Thumbnails */}
                    <div className="product-thumb-list">
                        {thumbImages.map((src, i) => (
                            <div
                                key={i}
                                className={`product-thumb${activeThumb === i ? ' active' : ''}`}
                                onClick={() => setActiveThumb(i)}
                            >
                                <img src={src} alt={`View ${i + 1}`} onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/88x96/e8e8e8/999'; }} />
                            </div>
                        ))}
                    </div>

                    {/* Main image */}
                    <div className="product-main-image">
                        <img
                            src={thumbImages[activeThumb]}
                            alt={product.title}
                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80'; }}
                        />
                    </div>
                </div>

                {/* Right: Info */}
                <div className="product-info-col">
                    <h1>{product.title}</h1>

                    <StarRating rating={rating} count={ratingCount} />

                    {/* Price */}
                    <div className="product-price-row">
                        <span className="product-price">${product.price}</span>
                        <span className="product-original-price">${originalPrice}</span>
                        <span className="product-discount">-{discount}%</span>
                    </div>

                    <p className="product-description">{product.description}</p>

                    <p className="product-description" style={{ fontWeight: 600, color: '#333', marginBottom: 6 }}>Key Features:</p>
                    <ul className="key-features">
                        <li>Premium 100% Cotton fabric for all-day comfort</li>
                        <li>High-quality screen-printed graphic for long-lasting durability</li>
                        <li>Classic crew neck and short sleeves for a timeless fit</li>
                        <li>Available in Black, White, and Navy Blue</li>
                        <li>Unisex design, suitable for both men and women</li>
                    </ul>

                    <div className="product-divider" />

                    {/* Colors */}
                    <p className="product-section-label">Select Colors</p>
                    <div className="color-swatches">
                        {COLORS.map((c, i) => (
                            <button
                                key={i}
                                className={`color-swatch${selectedColor === i ? ' active' : ''}`}
                                style={{ background: c.hex, border: 'none' }}
                                onClick={() => setSelectedColor(i)}
                                title={c.label}
                            />
                        ))}
                    </div>

                    <div className="product-divider" />

                    {/* Sizes */}
                    <p className="product-section-label">Choose Size</p>
                    <div className="size-buttons">
                        {SIZES.map((sz, i) => (
                            <button
                                key={i}
                                className={`size-btn${selectedSize === i ? ' active' : ''}`}
                                onClick={() => setSelectedSize(i)}
                            >
                                {sz}
                            </button>
                        ))}
                    </div>

                    <div className="product-divider" />

                    {/* Qty + Add to Cart */}
                    <div className="qty-row">
                        <div className="qty-control">
                            <button className="qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                            <span className="qty-value">{quantity}</span>
                            <button className="qty-btn" onClick={() => setQuantity(q => q + 1)}>+</button>
                        </div>
                        <button
                            className="add-to-cart-btn"
                            onClick={handleAddToCart}
                            style={added ? { background: '#22c55e' } : {}}
                        >
                            {added ? '✓ Added to Cart!' : 'Add to Cart'}
                        </button>
                    </div>

                    {/* Trust badges */}
                    <div style={{ display: 'flex', gap: 16, marginTop: 24, flexWrap: 'wrap' }}>
                        {[['🚚', 'Free Shipping', 'On orders over $100'], ['🔄', '30-Day Returns', 'No questions asked'], ['🔒', 'Secure Payment', 'SSL encrypted']].map(([icon, title, sub]) => (
                            <div key={title} style={{
                                display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
                                background: '#f9f9f9', borderRadius: 12, border: '1px solid #eee', flex: '1', minWidth: 140
                            }}>
                                <span style={{ fontSize: 20 }}>{icon}</span>
                                <div>
                                    <p style={{ fontSize: 12, fontWeight: 700, color: '#111' }}>{title}</p>
                                    <p style={{ fontSize: 11, color: '#888', marginTop: 1 }}>{sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;

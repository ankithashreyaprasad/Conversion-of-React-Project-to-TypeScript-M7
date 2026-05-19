import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { removeFromCart, updateQuantity, clearCart } from '../features/cartSlice';
import CheckoutForm from '../components/CheckoutForm';
import type { CheckoutFormData } from '../types';

const TrashIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14H6L5 6" />
        <path d="M10 11v6M14 11v6" />
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
);

const ChevR = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

const Cart = () => {
    const { items, totalPrice, totalQuantity } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const [promoCode, setPromoCode] = useState('');
    const [promoApplied, setPromoApplied] = useState(false);

    const handleCheckoutSubmit = (data: CheckoutFormData) => {
        console.log('Order Data:', data);
        setIsOrderPlaced(true);
        setTimeout(() => { dispatch(clearCart()); }, 6000);
    };

    const handlePromo = () => {
        if (promoCode.toUpperCase() === 'SAVE20') setPromoApplied(true);
    };

    const promoDiscount = promoApplied ? totalPrice * 0.2 : totalPrice * 0.2; // always 20% as demo
    const deliveryFee = totalPrice >= 100 ? 0 : 15;
    const finalTotal = totalPrice - promoDiscount + deliveryFee;

    // Order Success
    if (isOrderPlaced) {
        return (
            <div className="container">
                <div className="order-success">
                    <div className="success-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                    <h2>Order Placed Successfully!</h2>
                    <p>Thank you for your purchase. A confirmation email has been sent. Your order will arrive in 2-5 business days.</p>
                    <Link to="/" className="btn-primary">Continue Shopping</Link>
                </div>
            </div>
        );
    }

    // Empty cart
    if (items.length === 0) {
        return (
            <div className="container">
                <div className="empty-state">
                    <div className="empty-state-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                    </div>
                    <h2>Your cart is empty</h2>
                    <p>Looks like you haven't added anything yet.</p>
                    <Link to="/" className="btn-primary" style={{ marginTop: 8 }}>Explore Products</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            {/* Breadcrumb */}
            <nav className="breadcrumb">
                <Link to="/">Home</Link>
                <span className="crumb-sep"><ChevR /></span>
                <span className="crumb-active">Cart</span>
            </nav>

            <h1 className="cart-page-title">
                {isCheckingOut ? 'Checkout' : 'YOUR CART'}
            </h1>

            {!isCheckingOut ? (
                <div className="cart-layout">
                    {/* Items */}
                    <main>
                        {items.map((item: any) => {
                            const imgSrc = item.images?.[0]?.replace(/^\[?"?/, '').replace(/"?\]?$/, '') ||
                                'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&q=80';
                            return (
                                <div key={item.id} className="cart-item">
                                    <div className="cart-item-image">
                                        <img src={imgSrc} alt={item.title}
                                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/110x120/e8e8e8/999'; }}
                                        />
                                    </div>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                                            <Link to={`/product/${item.id}`} className="cart-item-title" style={{ textDecoration: 'none', color: 'inherit' }}>
                                                {item.title}
                                            </Link>
                                            <button className="cart-trash-btn" onClick={() => dispatch(removeFromCart(item.id))} aria-label="Remove">
                                                <TrashIcon />
                                            </button>
                                        </div>
                                        <p className="cart-item-meta">
                                            Size: M &nbsp;•&nbsp; Color: Black &nbsp;•&nbsp; Category: {item.category?.name || 'General'}
                                        </p>
                                        <div className="cart-item-row">
                                            <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                                            <div className="qty-control">
                                                <button className="qty-btn" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>−</button>
                                                <span className="qty-value">{item.quantity}</span>
                                                <button className="qty-btn" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Clear cart */}
                        <div style={{ paddingTop: 16 }}>
                            <button onClick={() => dispatch(clearCart())} style={{ background: 'none', border: 'none', fontSize: 13, color: '#999', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                                <TrashIcon /> Clear entire cart
                            </button>
                        </div>
                    </main>

                    {/* Summary */}
                    <aside>
                        <div className="order-summary">
                            <h2>Order Summary</h2>
                            <div className="order-row">
                                <span>Subtotal ({totalQuantity} items)</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="order-row">
                                <span>Discount (20%)</span>
                                <span style={{ color: '#e53535' }}>-${promoDiscount.toFixed(2)}</span>
                            </div>
                            <div className="order-row">
                                <span>Delivery Fee</span>
                                {deliveryFee === 0
                                    ? <span style={{ color: '#22c55e', fontWeight: 700 }}>FREE</span>
                                    : <span>${deliveryFee.toFixed(2)}</span>
                                }
                            </div>
                            <div className="order-row total">
                                <span>Total</span>
                                <span>${finalTotal.toFixed(2)}</span>
                            </div>

                            {/* Promo */}
                            <div className="promo-input-row">
                                <input
                                    type="text"
                                    className="promo-input"
                                    placeholder="Add promo code"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                />
                                <button
                                    className="btn-primary"
                                    style={{ padding: '10px 18px', fontSize: 13, borderRadius: 62 }}
                                    onClick={handlePromo}
                                >
                                    Apply
                                </button>
                            </div>
                            {promoApplied && <p style={{ fontSize: 12, color: '#22c55e', marginTop: 8 }}>✓ Promo code applied!</p>}

                            <button
                                className="btn-primary"
                                style={{ width: '100%', marginTop: 20, padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                                onClick={() => setIsCheckingOut(true)}
                            >
                                Go to Checkout →
                            </button>

                            {/* Trust */}
                            <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #eee', display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {[['🔒', 'Secure SSL Payment'], ['🚚', 'Free Shipping Over $100'], ['🔄', '30-Day Returns']].map(([icon, text]) => (
                                    <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#666' }}>
                                        <span>{icon}</span><span>{text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            ) : (
                <div className="cart-layout">
                    <main>
                        <button className="back-link" onClick={() => setIsCheckingOut(false)}>← Back to Cart</button>
                        <CheckoutForm onSubmit={handleCheckoutSubmit} />
                    </main>
                    <aside>
                        <div className="order-summary">
                            <h2>Order Summary</h2>
                            <div className="order-row"><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
                            <div className="order-row"><span>Discount</span><span style={{ color: '#e53535' }}>-${promoDiscount.toFixed(2)}</span></div>
                            <div className="order-row"><span>Delivery</span><span style={{ color: '#22c55e' }}>FREE</span></div>
                            <div className="order-row total"><span>Total</span><span>${finalTotal.toFixed(2)}</span></div>
                        </div>
                    </aside>
                </div>
            )}
        </div>
    );
};

export default Cart;

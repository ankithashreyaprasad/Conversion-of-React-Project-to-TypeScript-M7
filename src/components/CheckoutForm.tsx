import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { CheckoutFormData } from '../types';

const checkoutSchema = z.object({
    fullName: z.string().min(3, 'Full name required (min 3 chars)'),
    email: z.string().email('Invalid email address'),
    address: z.string().min(5, 'Address is too short'),
    city: z.string().min(2, 'City required'),
    zipCode: z.string().regex(/^\d{5,6}$/, 'ZIP code must be 5-6 digits'),
    cardNumber: z.string().regex(/^\d{16}$/, 'Card number must be 16 digits'),
    expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Format: MM/YY'),
    cvv: z.string().regex(/^\d{3}$/, 'CVV must be 3 digits'),
});

interface CheckoutFormProps {
    onSubmit: (data: CheckoutFormData) => void;
    isSubmitting?: boolean;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, isSubmitting }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 24, letterSpacing: '-0.02em' }}>
                Shipping Information
            </h2>

            <div className="form-grid-2">
                <div className="form-field">
                    <label className="form-label">Full Name</label>
                    <input
                        {...register('fullName')}
                        className={`form-input ${errors.fullName ? 'error' : ''}`}
                        placeholder="John Doe"
                    />
                    {errors.fullName && <p className="form-error">{errors.fullName.message}</p>}
                </div>

                <div className="form-field">
                    <label className="form-label">Email Address</label>
                    <input
                        {...register('email')}
                        className={`form-input ${errors.email ? 'error' : ''}`}
                        placeholder="john@example.com"
                    />
                    {errors.email && <p className="form-error">{errors.email.message}</p>}
                </div>
            </div>

            <div className="form-field">
                <label className="form-label">Address</label>
                <input
                    {...register('address')}
                    className={`form-input ${errors.address ? 'error' : ''}`}
                    placeholder="123 Main Street"
                />
                {errors.address && <p className="form-error">{errors.address.message}</p>}
            </div>

            <div className="form-grid-2">
                <div className="form-field">
                    <label className="form-label">City</label>
                    <input
                        {...register('city')}
                        className={`form-input ${errors.city ? 'error' : ''}`}
                        placeholder="New York"
                    />
                    {errors.city && <p className="form-error">{errors.city.message}</p>}
                </div>

                <div className="form-field">
                    <label className="form-label">ZIP / Postal Code</label>
                    <input
                        {...register('zipCode')}
                        className={`form-input ${errors.zipCode ? 'error' : ''}`}
                        placeholder="10001"
                    />
                    {errors.zipCode && <p className="form-error">{errors.zipCode.message}</p>}
                </div>
            </div>

            <h2 style={{ fontSize: 22, fontWeight: 800, margin: '28px 0 20px', letterSpacing: '-0.02em' }}>
                Payment Details
            </h2>

            <div className="form-field">
                <label className="form-label">Card Number</label>
                <input
                    {...register('cardNumber')}
                    className={`form-input ${errors.cardNumber ? 'error' : ''}`}
                    placeholder="0000 0000 0000 0000"
                    maxLength={16}
                />
                {errors.cardNumber && <p className="form-error">{errors.cardNumber.message}</p>}
            </div>

            <div className="form-grid-2">
                <div className="form-field">
                    <label className="form-label">Expiry Date</label>
                    <input
                        {...register('expiryDate')}
                        className={`form-input ${errors.expiryDate ? 'error' : ''}`}
                        placeholder="MM/YY"
                    />
                    {errors.expiryDate && <p className="form-error">{errors.expiryDate.message}</p>}
                </div>

                <div className="form-field">
                    <label className="form-label">CVV</label>
                    <input
                        {...register('cvv')}
                        className={`form-input ${errors.cvv ? 'error' : ''}`}
                        placeholder="***"
                        type="password"
                        maxLength={3}
                    />
                    {errors.cvv && <p className="form-error">{errors.cvv.message}</p>}
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{ width: '100%', marginTop: 16, padding: '16px', fontSize: 16, opacity: isSubmitting ? 0.7 : 1 }}
            >
                {isSubmitting ? 'Processing...' : 'Place Order'}
            </button>

            <p style={{ textAlign: 'center', fontSize: 12, color: '#999', marginTop: 12 }}>
                🔒 Secure SSL Encrypted Payment
            </p>
        </form>
    );
};

export default CheckoutForm;

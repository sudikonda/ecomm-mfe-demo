import { faker } from '@faker-js/faker';

console.log('Cart MFE loaded!');

const randomInt = faker.number.int({ min: 2, max: 6 });

const cartItems = Array.from({ length: randomInt }).map(() => ({
    name: faker.commerce.productName(),
    price: faker.commerce.price(50, 500, 2, '$'),
    quantity: faker.number.int({ min: 1, max: 3 }),
    image: `https://picsum.photos/seed/${faker.string.alphanumeric(8)}/80/80`
}));

const subtotal = cartItems.reduce((sum, item) => {
    return sum + (parseFloat(item.price.replace('$', '')) * item.quantity);
}, 0);

const tax = subtotal * 0.08;
const total = subtotal + tax;

const cartHtml = `
    <style>
        .cart-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        
        .cart-title {
            font-size: 1.25rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .cart-title::before {
            content: '🛒';
        }
        
        .cart-badge {
            background: linear-gradient(135deg, #2ec4b6, #20a89d);
            color: white;
            font-size: 0.75rem;
            font-weight: 600;
            padding: 0.25rem 0.6rem;
            border-radius: 10px;
            min-width: 24px;
            text-align: center;
        }
        
        .cart-items {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 1.5rem;
            max-height: 400px;
            overflow-y: auto;
            padding-right: 0.5rem;
        }
        
        .cart-items::-webkit-scrollbar {
            width: 4px;
        }
        
        .cart-items::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 4px;
        }
        
        .cart-items::-webkit-scrollbar-thumb {
            background: rgba(255, 107, 53, 0.5);
            border-radius: 4px;
        }
        
        .cart-item {
            display: flex;
            gap: 1rem;
            padding: 0.75rem;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.05);
            transition: all 0.2s ease;
        }
        
        .cart-item:hover {
            background: rgba(255, 255, 255, 0.05);
            border-color: rgba(255, 255, 255, 0.1);
        }
        
        .cart-item-image {
            width: 56px;
            height: 56px;
            border-radius: 10px;
            object-fit: cover;
            flex-shrink: 0;
        }
        
        .cart-item-details {
            flex: 1;
            min-width: 0;
        }
        
        .cart-item-name {
            font-size: 0.9rem;
            font-weight: 500;
            color: #ffffff;
            margin-bottom: 0.35rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .cart-item-meta {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
        }
        
        .cart-item-quantity {
            font-size: 0.75rem;
            color: #a0a0b8;
            background: rgba(46, 196, 182, 0.1);
            padding: 0.2rem 0.5rem;
            border-radius: 6px;
        }
        
        .cart-item-price {
            font-size: 0.9rem;
            font-weight: 600;
            color: #ff6b35;
        }
        
        .cart-item-remove {
            background: none;
            border: none;
            color: #6c6c8a;
            cursor: pointer;
            padding: 0.25rem;
            font-size: 1rem;
            transition: color 0.2s ease;
        }
        
        .cart-item-remove:hover {
            color: #ff4757;
        }
        
        .cart-divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            margin: 1rem 0;
        }
        
        .cart-summary {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }
        
        .summary-row {
            display: flex;
            justify-content: space-between;
            font-size: 0.9rem;
        }
        
        .summary-label {
            color: #a0a0b8;
        }
        
        .summary-value {
            color: #ffffff;
            font-weight: 500;
        }
        
        .summary-row.total {
            padding-top: 0.75rem;
            border-top: 1px dashed rgba(255, 255, 255, 0.1);
            margin-top: 0.25rem;
        }
        
        .summary-row.total .summary-label {
            font-size: 1rem;
            font-weight: 600;
            color: #ffffff;
        }
        
        .summary-row.total .summary-value {
            font-size: 1.25rem;
            font-weight: 700;
            background: linear-gradient(135deg, #ff6b35, #f7c59f);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .checkout-btn {
            width: 100%;
            padding: 1rem;
            margin-top: 1.25rem;
            background: linear-gradient(135deg, #2ec4b6, #20a89d);
            border: none;
            border-radius: 12px;
            color: white;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: inherit;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }
        
        .checkout-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(46, 196, 182, 0.35);
        }
        
        .checkout-btn::after {
            content: '→';
            font-size: 1.1rem;
        }
        
        .empty-cart {
            text-align: center;
            padding: 2rem;
            color: #6c6c8a;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .cart-item {
            animation: slideIn 0.4s ease forwards;
        }
        
        ${cartItems.map((_, i) => `.cart-item:nth-child(${i + 1}) { animation-delay: ${i * 0.1}s; opacity: 0; }`).join('\n')}
    </style>
    
    <div class="cart-header">
        <h2 class="cart-title">Your Cart</h2>
        <span class="cart-badge">${randomInt}</span>
    </div>
    
    <div class="cart-items">
        ${cartItems.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-meta">
                        <span class="cart-item-quantity">Qty: ${item.quantity}</span>
                        <span class="cart-item-price">${item.price}</span>
                    </div>
                </div>
                <button class="cart-item-remove">×</button>
            </div>
        `).join('')}
    </div>
    
    <div class="cart-divider"></div>
    
    <div class="cart-summary">
        <div class="summary-row">
            <span class="summary-label">Subtotal</span>
            <span class="summary-value">$${subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-row">
            <span class="summary-label">Tax (8%)</span>
            <span class="summary-value">$${tax.toFixed(2)}</span>
        </div>
        <div class="summary-row total">
            <span class="summary-label">Total</span>
            <span class="summary-value">$${total.toFixed(2)}</span>
        </div>
    </div>
    
    <button class="checkout-btn">Checkout</button>
`;

document.getElementById('cart-show').innerHTML = cartHtml;

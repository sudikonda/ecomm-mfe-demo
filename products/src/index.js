import faker from "faker";

let products = [];

for (let i = 0; i < 8; i++) {
    products.push({
        name: faker.commerce.productName(),
        price: faker.commerce.price(100, 2000, 2, '$'),
        category: faker.commerce.department(),
        image: `https://picsum.photos/seed/${faker.random.alphaNumeric(8)}/300/200`
    });
}

console.log('Products MFE loaded!', products);

const productsHtml = `
    <style>
        .products-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        
        .products-title {
            font-size: 1.5rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .products-title::before {
            content: '🛍️';
        }
        
        .products-count {
            font-size: 0.85rem;
            color: #a0a0b8;
            background: rgba(255, 107, 53, 0.1);
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            border: 1px solid rgba(255, 107, 53, 0.2);
        }
        
        .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
            gap: 1.25rem;
        }
        
        .product-card {
            background: linear-gradient(145deg, #242442, #1e1e38);
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.06);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
        }
        
        .product-card:hover {
            transform: translateY(-4px);
            border-color: rgba(255, 107, 53, 0.3);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 107, 53, 0.1);
        }
        
        .product-image {
            width: 100%;
            height: 160px;
            object-fit: cover;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        
        .product-info {
            padding: 1.25rem;
        }
        
        .product-category {
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #2ec4b6;
            font-weight: 500;
            margin-bottom: 0.5rem;
        }
        
        .product-name {
            font-size: 1rem;
            font-weight: 500;
            color: #ffffff;
            margin-bottom: 0.75rem;
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        
        .product-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .product-price {
            font-size: 1.25rem;
            font-weight: 700;
            background: linear-gradient(135deg, #ff6b35, #f7c59f);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .add-to-cart-btn {
            background: linear-gradient(135deg, #ff6b35, #e85a2a);
            border: none;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-size: 0.8rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: inherit;
        }
        
        .add-to-cart-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .product-card {
            animation: fadeInUp 0.5s ease forwards;
        }
        
        ${products.map((_, i) => `.product-card:nth-child(${i + 1}) { animation-delay: ${i * 0.08}s; opacity: 0; }`).join('\n')}
    </style>
    
    <div class="products-header">
        <h2 class="products-title">Products</h2>
        <span class="products-count">${products.length} items</span>
    </div>
    
    <div class="products-grid">
        ${products.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-footer">
                        <span class="product-price">${product.price}</span>
                        <button class="add-to-cart-btn">+ Add</button>
                    </div>
                </div>
            </div>
        `).join('')}
    </div>
`;

document.getElementById('products-index').innerHTML = productsHtml;

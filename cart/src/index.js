import { faker } from '@faker-js/faker';

console.log('Cart !! -- from cart app');

const randomInt = faker.number.int({min: 1, max: 10});

const cartText = `<div>
    <h1>You have ${randomInt} items in your cart</h1>
    ${Array.from({length: randomInt}).map(() => `<p>${faker.commerce.productName()}</p>`).join('')}
</div>`;

document.getElementById('cart-show').innerHTML = cartText;

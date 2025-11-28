import faker from "faker";

let products = [];
let productsHtml = '';

for (let i = 0; i < 10; i++) {
    products.push({
        name: faker.commerce.productName(),
        price: faker.commerce.price(100, 2000, 2, '$'),
    });
}

console.log(products);

productsHtml = products.map(product => {
    return `
        <div>
            <h1>${product.name}</h1>
            <h2>${product.price}</h2>
        </div>
    `;
}).join('');

document.getElementById('root').innerHTML = productsHtml;



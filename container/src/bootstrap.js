import {mount as mountProductsIndex} from 'products/ProductsIndex';
import {mount as mountCartShow} from 'cart/CartShow';

console.log('Container !! -- from container app');

mountProductsIndex(document.querySelector('#products-index'));
mountCartShow(document.querySelector('#cart-show'));

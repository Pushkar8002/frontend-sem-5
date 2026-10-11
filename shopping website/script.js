
const products = [
    { brand: 'Nike', name: 'Cortez Sneakers', price: 999, image: 'images/nike-cortez.jpg' },
    { brand: 'Adidas', name: 'Yeezy Slide', price: 999, image: 'images/adidas-yeezy-slide.jpg' },
    { brand: "Levi's", name: '501 Jeans', price: 499, image: 'images/levis-501.jpg' },
    { brand: 'Polo Ralph Lauren', name: 'Polo Shirt', price: 499, image: 'images/ralph-lauren-polo.jpg' },
    { brand: 'Casio', name: 'G-Shock DW-5600E', price: 799, image: 'images/casio-g-shock.jpg' },
    { brand: 'Fossil', name: 'Classic Wristwatch', price: 799, image: 'images/fossil-watch.jpg' }
];

const cart = [];
const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const totalLabel = document.getElementById('total');

function render() {
    productList.innerHTML = products.map((product, index) => `
        <article class="product">
            <img src="${product.image}" alt="${product.brand} ${product.name}">
            <p class="brand">${product.brand}</p>
            <h3>${product.name}</h3>
            <p>Price: ₹${product.price}</p>
            <button type="button" data-action="add" data-index="${index}">Add to Cart</button>
        </article>
    `).join('');

    cartItems.innerHTML = cart.map((item, index) => `
        <li>${item.name} - ₹${item.price}
            <button type="button" data-action="remove" data-index="${index}">Remove</button>
        </li>
    `).join('');

    totalLabel.textContent = cart.reduce((total, item) => total + item.price, 0);
}

document.addEventListener('click', event => {
    const button = event.target.closest('[data-action], #checkout-btn');
    if (!button) return;

    if (button.dataset.action === 'add') {
        cart.push(products[Number(button.dataset.index)]);
    } else if (button.dataset.action === 'remove') {
        cart.splice(Number(button.dataset.index), 1);
    } else if (button.id === 'checkout-btn') {
        if (!cart.length) {
            alert('Your cart is empty!');
            return;
        }

        const total = cart.reduce((sum, item) => sum + item.price, 0);
        alert(`Order placed successfully! Total: ₹${total}`);
        cart.length = 0;
    } else {
        return;
    }

    render();
});

render();

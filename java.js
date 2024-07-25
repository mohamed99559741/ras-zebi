document.addEventListener('DOMContentLoaded', function() {
    const cart = {};
    const cartSection = document.getElementById('cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const toggleCartButton = document.getElementById('toggle-cart');
    const checkoutButton = document.getElementById('checkout');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));

            if (!cart[name]) {
                cart[name] = { name: name, price: price, quantity: 0 };
            }
            cart[name].quantity += 1;
            updateCart();
        });
    });

    toggleCartButton.addEventListener('click', function() {
        cartSection.style.display = cartSection.style.display === 'none' ? 'block' : 'none';
    });

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let itemCount = 0;

        for (const item in cart) {
            const product = cart[item];
            total += product.price * product.quantity;
            itemCount += product.quantity;

            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <p>${product.name}</p>
                <p>Price: $${product.price.toFixed(2)}</p>
                <p>Quantity: ${product.quantity}</p>
                <p>Total: $${(product.price * product.quantity).toFixed(2)}</p>
                <button data-name="${product.name}">Remove</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        }

        cartTotal.textContent = `$${total.toFixed(2)}`;
        cartCount.textContent = itemCount;
        cartSection.style.display = total > 0 ? 'block' : 'none';

        // Add event listeners to remove buttons
        document.querySelectorAll('.cart-item button').forEach(button => {
            button.addEventListener('click', function() {
                const name = this.getAttribute('data-name');
                delete cart[name];
                updateCart();
            });
        });
    }
});

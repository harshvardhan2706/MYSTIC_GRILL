// Basic Add to Cart functionality for Mystic Grill

// Helper to get cart from localStorage
function getCart() {
    let cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Helper to save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Main addtocart function
function addtocart(itemDiv) {
    // Get item name, price, and quantity
    const name = itemDiv.querySelector('label').innerText;
    const priceText = itemDiv.querySelectorAll('label')[1].innerText;
    const price = parseInt(priceText.replace(/[^0-9]/g, ''));
    const qty = parseInt(itemDiv.querySelector('select').value) || 1;

    let cart = getCart();
    // Check if item already in cart
    let found = cart.find(i => i.name === name);
    if (found) {
        found.qty += qty;
    } else {
        cart.push({ name, price, qty });
    }
    saveCart(cart);
    updateCartDisplay();
}

// Enhanced updateCartDisplay for menu page with styled cards, images, and delete option
function updateCartDisplay() {
    const cartDiv = document.getElementById('cart');
    if (!cartDiv) return;
    let cart = getCart();
    let maincart = cartDiv.querySelector('.maincart');
    // Set fixed height and enable scroll for cart
    maincart.style.maxHeight = '250px';
    maincart.style.overflowY = 'auto';
    if (cart.length === 0) {
        maincart.innerHTML = '<div class="text">Your Cart is Empty</div>';
    } else {
        maincart.innerHTML = cart.map((item, idx) => `
            <div class="cart-card" style="display:flex;align-items:center;gap:12px;margin-bottom:10px;padding:8px;background:#fff;border-radius:8px;box-shadow:0 1px 4px #0001;">
                <img src="${getImageForItem(item.name)}" alt="${item.name}" style="width:45px;height:45px;object-fit:cover;border-radius:6px;">
                <div style="flex:1;">
                    <div style="font-weight:bold;">${item.name}</div>
                    <div>Qty: ${item.qty}</div>
                    <div>Rs.${item.price * item.qty}</div>
                </div>
                <button onclick="deleteCartItem(${idx});updateCartDisplay();" style="background:#e74c3c;color:#fff;border:none;padding:5px 10px;border-radius:5px;cursor:pointer;font-size:0.9em;">Delete</button>
            </div>
        `).join('');
    }
}

// Helper to get image path for item name (shared with cart.html)
function getImageForItem(name) {
    const map = {
        'TEA': 'images/tea.jpg',
        'COFFEE': 'images/coffe.jpg',
        'MAAZA': 'images/maaza.webp',
        'STING': 'images/sting.webp',
        'FIZZ': 'images/fizz.jpg',
        'SAMOSA': 'images/samosa.webp',
        'VADA-PAW': 'images/vadapaw.jpg',
        'PATTIES': 'images/patties.jpg',
        'MASALA-SANDWICH': 'images/masalasandwich.jpg',
        'CHEESE-SANDWICH': 'images/cheesegrilledsandwich.jpg',
        'FRENCH FRIES': 'images/frenchfries.jpg',
        'MAGGI': 'images/maggi1.jpg',
        'CHEESE-MAGGI': 'images/cheesemaggi.jpg',
        'BURGER': 'images/burger.jpg',
        'PIZZA': 'images/pizza.jpg'
    };
    return map[name] || 'images/logo.webp';
}

// Delete item from cart (shared with cart.html)
function deleteCartItem(idx) {
    let cart = getCart();
    cart.splice(idx, 1);
    saveCart(cart);
    updateCartDisplay();
}

// On page load, update cart display if cart exists
window.onload = updateCartDisplay;

//JS FILE


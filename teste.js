function addToCart(image, name, price) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let item = cartItems.find(item => item.name === name);
    if (item) item.quantity += 1; 
    else cartItems.push({ image, name, price, quantity: 1 });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
}

function updateCartCount() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('itemCount').textContent = itemCount;
}

function calculateShipping() {
    const postalCode = document.getElementById('postalCode').value;
    const shippingCostElement = document.getElementById('shippingCost');
    if (postalCode.length === 8 && /^\d+$/.test(postalCode)) {
        const baseCost = 10.00;
        const distanceFactor = Math.floor(Math.random() * 20);
        const shippingCost = baseCost + distanceFactor;
        shippingCostElement.textContent = `O frete estimado é: R$ ${shippingCost.toFixed(2)}`;
    } else {
        shippingCostElement.textContent = "Por favor, insira um CEP válido (8 dígitos).";
    }
}

function search() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const items = document.querySelectorAll('.product-item');
    items.forEach(item => {
        const name = item.querySelector('h3').textContent.toLowerCase();
        item.style.display = name.includes(query) ? 'flex' : 'none';
    });
}

document.addEventListener('DOMContentLoaded', updateCartCount);
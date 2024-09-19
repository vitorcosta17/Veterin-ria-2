// Função para adicionar um produto ao carrinho
function addToCart(image, name, price) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItemIndex = cartItems.findIndex(item => item.name === name);

    if (existingItemIndex > -1) {
        cartItems[existingItemIndex].quantity += 1;
    } else {
        cartItems.push({ image, name, price, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
}

// Função para atualizar a contagem de itens no carrinho
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('itemCount').textContent = itemCount;
}

// Atualiza a contagem de itens no carrinho quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    updateCart(); // Atualiza o carrinho na página inicial
});

// Função para buscar produtos
function search() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    if (query) {
        alert(`Você pesquisou por: ${query}`);
        // Aqui você pode adicionar a lógica para filtrar produtos
    }
}

// Atualiza o carrinho na página de carrinho
function updateCart() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceElem = document.getElementById('totalPrice');
    const discountElem = document.getElementById('discount');

    let totalPrice = 0;
    let discount = 0;

    cartItemsContainer.innerHTML = ''; // Limpa o carrinho

    cartItems.forEach((item, index) => {
        totalPrice += item.price * item.quantity;

        const itemElem = document.createElement('div');
        itemElem.classList.add('cart-item');

        itemElem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" onerror="this.src='FOTOS/default.jpg';" style="width: 100px; height: auto;">
            <div style="margin-left: 10px;">
                <h3>${item.name}</h3>
                <p>Preço: R$ ${item.price.toFixed(2)}</p>
                <p>Quantidade: ${item.quantity}</p>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
                <button onclick="removeItem(${index})">Remover</button>
            </div>
        `;

        cartItemsContainer.appendChild(itemElem);
    });

    // Atualiza o total do carrinho
    totalPriceElem.textContent = `Total: R$ ${totalPrice.toFixed(2)}`;
    discountElem.textContent = `Desconto: R$ ${discount.toFixed(2)}`; // Mostra desconto
}

// Atualiza a quantidade de itens no carrinho
window.updateQuantity = (index, quantity) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems[index].quantity = parseInt(quantity, 10);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCart();
};

// Remove item do carrinho
window.removeItem = (index) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCart();
};

// Lida com a aplicação de cupons de desconto
document.getElementById('couponForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const couponCode = document.getElementById('couponCode').value.trim().toUpperCase();

    const coupons = {
        'DESCONTO10': 0.10,
        'DESCONTO20': 0.20,
        'oi':0.50
    };

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    if (coupons[couponCode]) {
        const discount = totalPrice * coupons[couponCode];
        const discountedTotal = totalPrice - discount;
        document.getElementById('discount').textContent = `Desconto: R$ ${discount.toFixed(2)}`;
        document.getElementById('totalPrice').textContent = `Total: R$ ${discountedTotal.toFixed(2)}`;
    } else {
        alert('Código do cupom inválido.');
    }
});

// Função para finalizar a compra
function finalizePurchase() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    if (cartItems.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    // Mensagem de confirmação
    alert('Compra finalizada com sucesso! Obrigado pela sua compra.');

    // Limpa o carrinho
    localStorage.removeItem('cartItems');
    updateCartCount();
    updateCart(); // Atualiza a visualização do carrinho
}

// Adiciona evento ao botão de finalizar compra
document.getElementById('finalizeButton').addEventListener('click', finalizePurchase);

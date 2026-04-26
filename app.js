const whatsappPhone = '6281270517527';
const whatsappBase = 'https://api.whatsapp.com/send';

const productList = document.getElementById('productList');
const cartToggle = document.getElementById('cartToggle');
const startOrder = document.getElementById('startOrder');
const cartPanel = document.getElementById('cartPanel');
const cartBackdrop = document.getElementById('cartBackdrop');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutButton = document.getElementById('checkoutButton');
const cartView = document.getElementById('cartView');
const checkoutSection = document.getElementById('checkoutSection');
const backToCart = document.getElementById('backToCart');
const checkoutForm = document.getElementById('checkoutForm');
const checkoutSuccess = document.getElementById('checkoutSuccess');
const checkoutWhatsappLink = document.getElementById('checkoutWhatsappLink');

let cart = [];

function formatRupiah(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function renderProducts() {
  productList.innerHTML = products
    .map(
      (product) => `
      <article class="product-card">
        <h4>${product.name}</h4>
        <p>${product.description}</p>
        <div class="product-price">Rp ${formatRupiah(product.price)}</div>
        <button data-id="${product.id}">Tambahkan ke Keranjang</button>
      </article>
    `
    )
    .join('');
}

function updateCartCount() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalQuantity;
}

function updateCartTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = formatRupiah(total);
}

function renderCartItems() {
  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="cart-item"><p>Keranjang kosong.</p></div>';
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
      <div class="cart-item">
        <div class="item-info">
          <strong>${item.name}</strong>
          <p>SKU: ${item.sku}</p>
          <p>Jumlah: ${item.quantity} × Rp ${formatRupiah(item.price)}</p>
        </div>
        <button data-id="${item.id}">Hapus</button>
      </div>
    `
    )
    .join('');
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  const cartItem = cart.find((item) => item.id === productId);
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCartItems();
  updateCartCount();
  updateCartTotal();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  renderCartItems();
  updateCartCount();
  updateCartTotal();
}

function openCart() {
  closeCheckoutPanel();
  cartPanel.classList.add('open');
}

function openCheckout() {
  if (cart.length === 0) {
    alert('Keranjang kosong. Silakan tambahkan produk terlebih dahulu.');
    return;
  }
  cartView.classList.add('hidden');
  checkoutSection.classList.remove('hidden');
}

function closeCheckoutPanel() {
  checkoutSection.classList.add('hidden');
  checkoutSuccess.classList.add('hidden');
  checkoutForm.classList.remove('hidden');
  checkoutForm.reset();
  cartView.classList.remove('hidden');
}

function createWhatsappMessage(name, email) {
  const total = formatRupiah(cart.reduce((sum, item) => sum + item.price * item.quantity, 0));
  const itemsText = cart
    .map((item) => `- ${item.name} (${item.quantity}x) = Rp ${formatRupiah(item.price * item.quantity)}`)
    .join('%0A');

  const message = `Halo,%20saya%20ingin%20memesan%20lisensi%20Windows.%0A%0ANama%20:%20${encodeURIComponent(name)}%0AEmail%20:%20${encodeURIComponent(email)}%0A%0AProduk:%0A${itemsText}%0A%0ATotal%20pesanan%20:%20Rp%20${encodeURIComponent(total)}%0A%0AMohon%20proses%20pembayaran%20dan%20kirim%20lisensi.`;
  return message;
}

function openWhatsappChat(message) {
  const url = `${whatsappBase}?phone=${whatsappPhone}&text=${message}`;
  window.open(url, '_blank');
  checkoutWhatsappLink.href = url;
}

function closeCartPanel() {
  cartPanel.classList.remove('open');
  closeCheckoutPanel();
}

productList.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-id]');
  if (!button) return;
  const productId = Number(button.dataset.id);
  addToCart(productId);
  openCart();
});

cartToggle.addEventListener('click', openCart);
startOrder.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartPanel);
cartBackdrop.addEventListener('click', closeCartPanel);
checkoutButton.addEventListener('click', openCheckout);
backToCart.addEventListener('click', closeCheckoutPanel);
cartItems.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-id]');
  if (!button) return;
  const productId = Number(button.dataset.id);
  removeFromCart(productId);
});

checkoutForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('customerName').value.trim();
  const email = document.getElementById('customerEmail').value.trim();
  const message = createWhatsappMessage(name, email);
  openWhatsappChat(message);
  checkoutForm.classList.add('hidden');
  checkoutSuccess.classList.remove('hidden');
  cart = [];
  renderCartItems();
  updateCartCount();
  updateCartTotal();
});

renderCartItems();
updateCartTotal();

// Load products from API and render
loadProducts().then(() => {
  renderProducts();
  renderCartItems();
  updateCartTotal();
}).catch(() => {
  // If API fails, render with default products
  renderProducts();
});

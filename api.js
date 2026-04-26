const apiBase = window.location.origin + '/api';
const localProductsKey = 'wls_custom_products';

let products = [
  {
    id: 1,
    name: 'Windows 11 Home (Digital License)',
    description: 'Lisensi resmi Windows 11 Home untuk pengguna pribadi dan laptop rumahan.',
    price: 1390000,
    sku: 'WIN11HOME',
  },
  {
    id: 2,
    name: 'Windows 11 Pro (Digital License)',
    description: 'Lisensi resmi Windows 11 Pro untuk bisnis kecil dan pengguna power.',
    price: 2090000,
    sku: 'WIN11PRO',
  },
  {
    id: 3,
    name: 'Windows 10 Pro (Digital License)',
    description: 'Upgrade lisensi Windows 10 Pro untuk fitur keamanan dan manajemen lanjutan.',
    price: 1190000,
    sku: 'WIN10PRO',
  },
  {
    id: 4,
    name: 'Windows 10 Home (Digital License)',
    description: 'Lisensi Windows 10 Home resmi dengan aktivasi cepat dan aman.',
    price: 950000,
    sku: 'WIN10HOME',
  },
];

function getStoredProducts() {
  try {
    const saved = localStorage.getItem(localProductsKey);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];
  }
}

function saveStoredProducts(products) {
  try {
    localStorage.setItem(localProductsKey, JSON.stringify(products));
  } catch (error) {
    console.warn('Gagal menyimpan produk ke localStorage.', error);
  }
}

async function loadProducts() {
  try {
    console.log('Loading products from API:', `${apiBase}/products`);
    const response = await fetch(`${apiBase}/products`);
    console.log('API response status:', response.status);
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    const data = await response.json();
    console.log('Products loaded from API:', data.length);
    products = data;
  } catch (error) {
    console.error('Failed to load products from API:', error);
    console.warn('Using local storage fallback');
    const storedProducts = getStoredProducts();
    products = products.concat(storedProducts);
  }
}

async function addProductToServer(product) {
  try {
    const response = await fetch(`${apiBase}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Gagal menambahkan produk');
    }

    return response.json();
  } catch (error) {
    console.warn('API tidak tersedia, menyimpan produk ke localStorage.', error);
    const storedProducts = getStoredProducts();
    const newProduct = {
      id: storedProducts.length ? storedProducts[storedProducts.length - 1].id + 1 : 1000,
      ...product,
    };
    storedProducts.push(newProduct);
    saveStoredProducts(storedProducts);
    return newProduct;
  }
}

async function deleteProductFromServer(productId) {
  try {
    const response = await fetch(`${apiBase}/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Gagal menghapus produk');
    }

    return response.json();
  } catch (error) {
    console.warn('API tidak tersedia, menghapus produk dari localStorage.', error);
    const storedProducts = getStoredProducts();
    const filtered = storedProducts.filter((p) => p.id !== productId);
    saveStoredProducts(filtered);
    return { success: true };
  }
}

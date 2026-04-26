const productForm = document.getElementById('productForm');
const newName = document.getElementById('newName');
const newDescription = document.getElementById('newDescription');
const newPrice = document.getElementById('newPrice');
const newSku = document.getElementById('newSku');
const productFormMessage = document.getElementById('productFormMessage');

productForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const newProduct = {
    name: newName.value.trim(),
    description: newDescription.value.trim(),
    price: Number(newPrice.value),
    sku: newSku.value.trim(),
  };

  try {
    await addProductToServer(newProduct);
    productFormMessage.textContent = 'Produk berhasil ditambahkan.';
    productFormMessage.style.color = '#065f46';
    productForm.reset();
  } catch (error) {
    productFormMessage.textContent = error.message;
    productFormMessage.style.color = '#b91c1c';
  }
});

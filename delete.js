const deleteList = document.getElementById('deleteList');
const deleteMessage = document.getElementById('deleteMessage');

function formatRupiah(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

async function renderDeleteList() {
  await loadProducts();
  
  if (products.length === 0) {
    deleteList.innerHTML = '<p>Tidak ada produk untuk dihapus.</p>';
    return;
  }

  deleteList.innerHTML = products
    .map(
      (product) => `
      <div class="delete-item">
        <div class="item-info">
          <strong>${product.name}</strong>
          <p>SKU: ${product.sku}</p>
          <p>Harga: Rp ${formatRupiah(product.price)}</p>
          <p>${product.description}</p>
        </div>
        <button data-id="${product.id}" class="delete-button">Hapus</button>
      </div>
    `
    )
    .join('');

  deleteList.querySelectorAll('.delete-button').forEach((button) => {
    button.addEventListener('click', async (event) => {
      const productId = Number(event.target.dataset.id);
      try {
        await deleteProductFromServer(productId);
        deleteMessage.textContent = 'Produk berhasil dihapus.';
        deleteMessage.style.color = '#065f46';
        await renderDeleteList();
      } catch (error) {
        deleteMessage.textContent = error.message;
        deleteMessage.style.color = '#b91c1c';
      }
    });
  });
}

renderDeleteList();
loadProducts().then(() => renderDeleteList());

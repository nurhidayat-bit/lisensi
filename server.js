const express = require('express');
const cors = require('cors');

const app = express();

// CORS configuration for Vercel
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Allow all origins for now (you can restrict this later)
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

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

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/products', (req, res) => {
  const { name, description, price, sku } = req.body;

  if (!name || !description || !price || !sku) {
    return res.status(400).json({ error: 'Semua field produk harus diisi.' });
  }

  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    name,
    description,
    price: Number(price),
    sku,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.delete('/api/products/:id', (req, res) => {
  const productId = Number(req.params.id);
  const index = products.findIndex((p) => p.id === productId);

  if (index === -1) {
    return res.status(404).json({ error: 'Produk tidak ditemukan.' });
  }

  const deletedProduct = products.splice(index, 1);
  res.json({ success: true, deleted: deletedProduct[0] });
});

// For Vercel deployment
module.exports = app;

// For local development
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server API berjalan di http://localhost:${PORT}`);
  });
}

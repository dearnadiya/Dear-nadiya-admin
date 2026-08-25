// DEAR NADIYA ADMIN

function changePage(name) {

  const title = document.getElementById("title");
  const content = document.getElementById("content");

  if (!title || !content) return;

  if (name === "dash") {
    title.textContent = "Dashboard";

    content.innerHTML = `
      <div class="cards">
        <div class="stat">
          <p>Total Pesanan</p>
          <h2>0</h2>
        </div>

        <div class="stat">
          <p>Total Pembayaran</p>
          <h2>Rp0</h2>
        </div>

        <div class="stat">
          <p>GO Aktif</p>
          <h2>0</h2>
        </div>
      </div>

      <div class="panel">
        <h2>Selamat datang di Dear Nadiya Admin</h2>
        <p>Kelola produk, pesanan, pembayaran, dan Group Order dari dashboard ini.</p>
      </div>
    `;
  }

  if (name === "products") {

  title.textContent = "Produk & GO";

  content.innerHTML = `

    <div class="toolbar">

      <div>
        <h2>Produk & GO</h2>
        <p>Kelola produk dan Group Order Dear Nadiya.</p>
      </div>

      <button
        type="button"
        class="btn"
        id="btn-add-product"
      >
        + Tambah Produk
      </button>

    </div>


    <div
      id="product-form-area"
      class="hidden"
    >
    </div>


    <div
      id="product-list"
      class="product-list"
    >
    </div>

  `;


  renderProducts();


  document
    .getElementById("btn-add-product")
    .addEventListener("click", function () {

      showProductForm();

    });

  }

  if (name === "orders") {
    title.textContent = "Pesanan";

    content.innerHTML = `
      <div class="panel">
        <h2>Daftar Pesanan</h2>
        <p>Halaman Pesanan berhasil dibuka.</p>
      </div>
    `;
  }

  if (name === "payments") {
    title.textContent = "Pembayaran";

    content.innerHTML = `
      <div class="panel">
        <h2>Data Pembayaran</h2>
        <p>Halaman Pembayaran berhasil dibuka.</p>
      </div>
    `;
  }

  if (name === "recap") {
    title.textContent = "Rekap GO";

    content.innerHTML = `
      <div class="panel">
        <h2>Rekap Group Order</h2>
        <p>Halaman Rekap GO berhasil dibuka.</p>
      </div>
    `;
  }
}


// Tombol Dashboard
document.getElementById("btn-dashboard").addEventListener("click", function () {
  changePage("dash");
});


// Tombol Produk
document.getElementById("btn-products").addEventListener("click", function () {
  changePage("products");
});


// Tombol Pesanan
document.getElementById("btn-orders").addEventListener("click", function () {
  changePage("orders");
});


// Tombol Pembayaran
document.getElementById("btn-payments").addEventListener("click", function () {
  changePage("payments");
});


// Tombol Rekap
document.getElementById("btn-recap").addEventListener("click", function () {
  changePage("recap");
});

// ============================================
// DATA PRODUK
// ============================================

function getProducts() {

  const data = localStorage.getItem(
    "dearNadiyaProducts"
  );

  if (!data) {
    return [];
  }

  return JSON.parse(data);

}


// ============================================
// SIMPAN PRODUK
// ============================================

function saveProducts(products) {

  localStorage.setItem(
    "dearNadiyaProducts",
    JSON.stringify(products)
  );

}


// ============================================
// TAMPILKAN FORM PRODUK
// ============================================

function showProductForm() {

  const area = document.getElementById(
    "product-form-area"
  );

  if (!area) {
    return;
  }


  area.classList.remove("hidden");


  area.innerHTML = `

    <div class="panel">

      <h2>Tambah Produk / GO</h2>


      <form id="form-product">


        <label>Nama Produk / GO</label>

        <input
          type="text"
          id="product-name"
          placeholder="Contoh: TREASURE Album Baru"
          required
        >


        <label>Jenis</label>

        <select id="product-type">

          <option value="GO">
            Group Order
          </option>

          <option value="READY STOCK">
            Ready Stock
          </option>

          <option value="PRE ORDER">
            Pre Order
          </option>

        </select>


        <label>Harga</label>

        <input
          type="number"
          id="product-price"
          placeholder="Contoh: 350000"
          required
        >


        <label>Status</label>

        <select id="product-status">

          <option value="Aktif">
            Aktif
          </option>

          <option value="Tidak Aktif">
            Tidak Aktif
          </option>

          <option value="Selesai">
            Selesai
          </option>

        </select>


        <div class="form-actions">

          <button
            type="submit"
            class="btn"
          >
            Simpan Produk
          </button>


          <button
            type="button"
            class="btn-secondary"
            id="btn-cancel-product"
          >
            Batal
          </button>

        </div>


      </form>

    </div>

  `;


  document
    .getElementById("form-product")
    .addEventListener("submit", function (event) {

      event.preventDefault();

      addProduct();

    });


  document
    .getElementById("btn-cancel-product")
    .addEventListener("click", function () {

      area.classList.add("hidden");

      area.innerHTML = "";

    });

}


// ============================================
// TAMBAH PRODUK
// ============================================

function addProduct() {

  const name = document
    .getElementById("product-name")
    .value
    .trim();


  const type = document
    .getElementById("product-type")
    .value;


  const price = document
    .getElementById("product-price")
    .value;


  const status = document
    .getElementById("product-status")
    .value;


  if (!name || !price) {

    alert(
      "Nama produk dan harga wajib diisi."
    );

    return;

  }


  const products = getProducts();


  const product = {

    id: Date.now(),

    name: name,

    type: type,

    price: Number(price),

    status: status

  };


  products.push(product);


  saveProducts(products);


  const area = document.getElementById(
    "product-form-area"
  );


  if (area) {

    area.classList.add("hidden");

    area.innerHTML = "";

  }


  renderProducts();

}


// ============================================
// TAMPILKAN PRODUK
// ============================================

function renderProducts() {

  const list = document.getElementById(
    "product-list"
  );


  if (!list) {
    return;
  }


  const products = getProducts();


  if (products.length === 0) {

    list.innerHTML = `

      <div class="panel">

        <h3>Belum ada produk</h3>

        <p>
          Klik tombol
          <b>Tambah Produk</b>
          untuk membuat produk atau GO baru.
        </p>

      </div>

    `;

    return;

  }


  let html = "";


  products.forEach(function (product) {

    html += `

      <div class="product-card">

        <div>

          <h3>
            ${product.name}
          </h3>


          <p>
            ${product.type}
          </p>


          <p>
            Harga:
            <b>
              Rp${product.price.toLocaleString("id-ID")}
            </b>
          </p>


          <p>
            Status:
            <b>
              ${product.status}
            </b>
          </p>

        </div>


        <button
          type="button"
          class="btn-delete-product"
          data-product-id="${product.id}"
        >
          Hapus
        </button>

      </div>

    `;

  });


  list.innerHTML = html;


  const deleteButtons = document.querySelectorAll(
    ".btn-delete-product"
  );


  deleteButtons.forEach(function (button) {

    button.addEventListener(
      "click",
      function () {

        const id = Number(
          button.dataset.productId
        );

        deleteProduct(id);

      }
    );

  });

}


// ============================================
// HAPUS PRODUK
// ============================================

function deleteProduct(id) {

  const products = getProducts();


  const newProducts = products.filter(
    function (product) {

      return product.id !== id;

    }
  );


  saveProducts(newProducts);


  renderProducts();

      }

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

// ============================================
// DEAR NADIYA
// FITUR PRODUK & GO
// ============================================


// ============================================
// AMBIL DATA PRODUK
// ============================================

function getProducts() {

  const data = localStorage.getItem("dearNadiyaProducts");

  if (!data) {
    return [];
  }

  return JSON.parse(data);

}


// ============================================
// SIMPAN DATA PRODUK
// ============================================

function saveProducts(products) {

  localStorage.setItem(
    "dearNadiyaProducts",
    JSON.stringify(products)
  );

}


// ============================================
// TAMPILKAN HALAMAN PRODUK
// ============================================

function renderProducts() {

  const content = document.getElementById("content");

  if (!content) {
    return;
  }


  const products = getProducts();


  let html = `

    <div class="products-header">

      <div>

        <h2>Produk & GO</h2>

        <p>
          Kelola produk dan Group Order Dear Nadiya.
        </p>

      </div>


      <button
        type="button"
        class="btn add-product-btn"
        onclick="showProductForm()"
      >
        ➕ Tambah Produk
      </button>

    </div>


    <div
      id="productFormArea"
      class="product-form-area hidden"
    >
    </div>


    <div class="product-list">

  `;


  if (products.length === 0) {

    html += `

      <div class="empty-product">

        <h2>Belum ada produk</h2>

        <p>
          Klik tombol <b>Tambah Produk</b>
          untuk membuat produk atau GO baru.
        </p>

      </div>

    `;

  } else {

    products.forEach(function(product) {

      let statusClass = "status-open";

      if (product.status === "Closed") {
        statusClass = "status-closed";
      }

      if (product.status === "Selesai") {
        statusClass = "status-finished";
      }


      html += `

        <div class="product-card">

          <div class="product-card-top">

            <div>

              <span class="product-type">
                ${product.type}
              </span>

              <h3>
                ${product.name}
              </h3>

            </div>


            <span class="product-status ${statusClass}">

              ${product.status}

            </span>

          </div>


          <div class="product-info-grid">

            <div>

              <small>💰 Harga</small>

              <b>
                Rp${formatPrice(product.price)}
              </b>

            </div>


            <div>

              <small>💵 DP</small>

              <b>
                Rp${formatPrice(product.dp)}
              </b>

            </div>


            <div>

              <small>📅 Deadline List</small>

              <b>
                ${formatDate(product.deadlineList)}
              </b>

            </div>


            <div>

              <small>‼️ Deadline Pembayaran</small>

              <b>
                ${formatDate(product.deadlinePayment)}
              </b>

            </div>


            <div>

              <small>👥 Pesanan / Member</small>

              <b>
                ${product.members}
              </b>

            </div>


            <div>

              <small>🌐 Website Customer</small>

              <b>
                ${product.showWebsite ? "Tampil" : "Tidak tampil"}
              </b>

            </div>

          </div>


          <div class="product-actions">

            <button
              type="button"
              class="btn-edit"
              onclick="editProduct(${product.id})"
            >
              📝 Edit
            </button>


            <button
              type="button"
              class="btn-delete"
              onclick="deleteProduct(${product.id})"
            >
              🗑️ Hapus
            </button>

          </div>

        </div>

      `;

    });

  }


  html += `

    </div>

  `;


  content.innerHTML = html;

}


// ============================================
// FORM TAMBAH PRODUK
// ============================================

function showProductForm() {

  const area =
    document.getElementById("productFormArea");

  if (!area) {
    return;
  }


  area.classList.remove("hidden");


  area.innerHTML = `

    <div class="product-form">

      <h2>Tambah Produk / GO</h2>


      <div class="form-grid">


        <div class="form-group">

          <label>
            Nama Produk / GO
          </label>

          <input
            id="productName"
            type="text"
            placeholder="Contoh: TREASURE Album Baru"
          >

        </div>


        <div class="form-group">

          <label>
            Jenis
          </label>

          <select id="productType">

            <option value="Produk">
              Produk
            </option>

            <option value="Group Order">
              Group Order
            </option>

          </select>

        </div>


        <div class="form-group">

          <label>
            Harga
          </label>

          <input
            id="productPrice"
            type="number"
            placeholder="Contoh: 350000"
          >

        </div>


        <div class="form-group">

          <label>
            DP
          </label>

          <input
            id="productDP"
            type="number"
            placeholder="Contoh: 100000"
          >

        </div>


        <div class="form-group">

          <label>
            Status GO
          </label>

          <select id="productStatus">

            <option value="Open">
              Open
            </option>

            <option value="Closed">
              Closed
            </option>

            <option value="Selesai">
              Selesai
            </option>

          </select>

        </div>


        <div class="form-group">

          <label>
            Jumlah Pesanan / Member
          </label>

          <input
            id="productMembers"
            type="number"
            value="0"
            min="0"
          >

        </div>


        <div class="form-group">

          <label>
            Deadline List
          </label>

          <input
            id="deadlineList"
            type="date"
          >

        </div>


        <div class="form-group">

          <label>
            Deadline Pembayaran
          </label>

          <input
            id="deadlinePayment"
            type="date"
          >

        </div>


      </div>


      <label class="website-check">

        <input
          id="showWebsite"
          type="checkbox"
          checked
        >

        🌐 Tampilkan produk ini
        di Website Customer

      </label>


      <div class="form-actions">

        <button
          type="button"
          class="btn"
          onclick="saveNewProduct()"
        >
          💾 Simpan Produk
        </button>


        <button
          type="button"
          class="btn-cancel"
          onclick="cancelProductForm()"
        >
          Batal
        </button>

      </div>

    </div>

  `;

}


// ============================================
// BATAL TAMBAH PRODUK
// ============================================

function cancelProductForm() {

  const area =
    document.getElementById("productFormArea");

  if (area) {

    area.innerHTML = "";

    area.classList.add("hidden");

  }

}


// ============================================
// SIMPAN PRODUK BARU
// ============================================

function saveNewProduct() {

  const name =
    document.getElementById("productName").value.trim();

  const type =
    document.getElementById("productType").value;

  const price =
    Number(
      document.getElementById("productPrice").value
    );

  const dp =
    Number(
      document.getElementById("productDP").value
    );

  const status =
    document.getElementById("productStatus").value;

  const members =
    Number(
      document.getElementById("productMembers").value
    );

  const deadlineList =
    document.getElementById("deadlineList").value;

  const deadlinePayment =
    document.getElementById("deadlinePayment").value;

  const showWebsite =
    document.getElementById("showWebsite").checked;


  if (!name) {

    alert(
      "Nama produk / GO wajib diisi."
    );

    return;

  }


  const products =
    getProducts();


  const product = {

    id: Date.now(),

    name: name,

    type: type,

    price: price,

    dp: dp,

    status: status,

    members: members,

    deadlineList: deadlineList,

    deadlinePayment: deadlinePayment,

    showWebsite: showWebsite

  };


  products.push(product);


  saveProducts(products);


  alert(
    "Produk berhasil ditambahkan!"
  );


  renderProducts();

}


// ============================================
// EDIT PRODUK
// ============================================

function editProduct(id) {

  const products =
    getProducts();


  const product =
    products.find(function(item) {

      return item.id === id;

    });


  if (!product) {
    return;
  }


  const content =
    document.getElementById("content");


  content.innerHTML = `

    <div class="product-form">

      <h2>Edit Produk / GO</h2>


      <div class="form-grid">


        <div class="form-group">

          <label>Nama Produk / GO</label>

          <input
            id="editName"
            value="${product.name}"
          >

        </div>


        <div class="form-group">

          <label>Jenis</label>

          <select id="editType">

            <option
              value="Produk"
              ${product.type === "Produk" ? "selected" : ""}
            >
              Produk
            </option>

            <option
              value="Group Order"
              ${product.type === "Group Order" ? "selected" : ""}
            >
              Group Order
            </option>

          </select>

        </div>


        <div class="form-group">

          <label>Harga</label>

          <input
            id="editPrice"
            type="number"
            value="${product.price}"
          >

        </div>


        <div class="form-group">

          <label>DP</label>

          <input
            id="editDP"
            type="number"
            value="${product.dp}"
          >

        </div>


        <div class="form-group">

          <label>Status</label>

          <select id="editStatus">

            <option
              value="Open"
              ${product.status === "Open" ? "selected" : ""}
            >
              Open
            </option>

            <option
              value="Closed"
              ${product.status === "Closed" ? "selected" : ""}
            >
              Closed
            </option>

            <option
              value="Selesai"
              ${product.status === "Selesai" ? "selected" : ""}
            >
              Selesai
            </option>

          </select>

        </div>


        <div class="form-group">

          <label>Jumlah Pesanan / Member</label>

          <input
            id="editMembers"
            type="number"
            value="${product.members}"
          >

        </div>


        <div class="form-group">

          <label>Deadline List</label>

          <input
            id="editDeadlineList"
            type="date"
            value="${product.deadlineList}"
          >

        </div>


        <div class="form-group">

          <label>Deadline Pembayaran</label>

          <

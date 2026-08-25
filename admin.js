// ============================================
// DEAR NADIYA ADMIN
// ============================================


// ============================================
// FUNGSI PINDAH HALAMAN
// ============================================

function changePage(name) {

  const title = document.getElementById("title");
  const content = document.getElementById("content");

  if (!title || !content) {
    return;
  }


  // DASHBOARD
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
          <h2>${getProducts().filter(product => product.status === "Open").length}</h2>
        </div>

      </div>

      <div class="panel">
        <h2>Selamat datang di Dear Nadiya Admin</h2>
        <p>
          Kelola produk, pesanan, pembayaran,
          dan Group Order dari dashboard ini.
        </p>
      </div>
    `;

  }


  // PRODUK & GO
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
          ➕ Tambah Produk
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


    const addButton =
      document.getElementById("btn-add-product");


    if (addButton) {

      addButton.addEventListener(
        "click",
        function () {
          showProductForm();
        }
      );

    }

  }


  // PESANAN
  if (name === "orders") {

    title.textContent = "Pesanan";

    content.innerHTML = `
      <div class="panel">
        <h2>Daftar Pesanan</h2>
        <p>Halaman Pesanan berhasil dibuka.</p>
      </div>
    `;

  }


  // PEMBAYARAN
  if (name === "payments") {

    title.textContent = "Pembayaran";

    content.innerHTML = `
      <div class="panel">
        <h2>Data Pembayaran</h2>
        <p>Halaman Pembayaran berhasil dibuka.</p>
      </div>
    `;

  }


  // REKAP GO
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


// Agar kompatibel dengan onclick="page(...)"
function page(name) {
  changePage(name);
}


// ============================================
// DATA PRODUK
// ============================================

function getProducts() {

  try {

    const data =
      localStorage.getItem("dearNadiyaProducts");

    if (!data) {
      return [];
    }

    return JSON.parse(data);

  } catch (error) {

    console.error(error);

    return [];

  }

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
// FORM TAMBAH PRODUK
// ============================================

function showProductForm() {

  const area =
    document.getElementById("product-form-area");

  if (!area) {
    return;
  }


  area.classList.remove("hidden");


  area.innerHTML = `

    <div class="panel product-form">

      <h2>Tambah Produk / GO</h2>


      <form id="form-product">


        <div class="form-grid">


          <div class="form-group">

            <label>Nama Produk / GO</label>

            <input
              type="text"
              id="product-name"
              placeholder="Contoh: TREASURE Album Baru"
              required
            >

          </div>


          <div class="form-group">

            <label>Jenis</label>

            <select id="product-type">

              <option value="Group Order">
                Group Order
              </option>

              <option value="Ready Stock">
                Ready Stock
              </option>

              <option value="Pre Order">
                Pre Order
              </option>

            </select>

          </div>


          <div class="form-group">

            <label>Harga</label>

            <input
              type="number"
              id="product-price"
              placeholder="Contoh: 350000"
              required
            >

          </div>


          <div class="form-group">

            <label>DP</label>

            <input
              type="number"
              id="product-dp"
              placeholder="Contoh: 100000"
              value="0"
            >

          </div>


          <div class="form-group">

            <label>Status GO</label>

            <select id="product-status">

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

            <label>Jumlah Pesanan / Member</label>

            <input
              type="number"
              id="product-members"
              value="0"
              min="0"
            >

          </div>


          <div class="form-group">

            <label>Deadline List</label>

            <input
              type="date"
              id="product-deadline-list"
            >

          </div>


          <div class="form-group">

            <label>Deadline Pembayaran</label>

            <input
              type="date"
              id="product-deadline-payment"
            >

          </div>


        </div>


        <label class="website-check">

          <input
            type="checkbox"
            id="product-show-website"
            checked
          >

          Tampilkan produk ini di Website Customer

        </label>


        <div class="form-actions">

          <button
            type="submit"
            class="btn"
          >
            💾 Simpan Produk
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


  const form =
    document.getElementById("form-product");


  if (form) {

    form.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();

        addProduct();

      }
    );

  }


  const cancelButton =
    document.getElementById("btn-cancel-product");


  if (cancelButton) {

    cancelButton.addEventListener(
      "click",
      function () {

        area.classList.add("hidden");

        area.innerHTML = "";

      }
    );

  }

}


// ============================================
// TAMBAH PRODUK
// ============================================

function addProduct() {

  const name =
    document.getElementById("product-name").value.trim();

  const type =
    document.getElementById("product-type").value;

  const price =
    Number(
      document.getElementById("product-price").value
    );

  const dp =
    Number(
      document.getElementById("product-dp").value
    );

  const status =
    document.getElementById("product-status").value;

  const members =
    Number(
      document.getElementById("product-members").value
    );

  const deadlineList =
    document.getElementById(
      "product-deadline-list"
    ).value;

  const deadlinePayment =
    document.getElementById(
      "product-deadline-payment"
    ).value;

  const showWebsite =
    document.getElementById(
      "product-show-website"
    ).checked;


  if (!name || !price) {

    alert(
      "Nama produk dan harga wajib diisi."
    );

    return;

  }


  const products =
    getProducts();


  products.push({

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

  });


  saveProducts(products);


  renderProducts();


  const area =
    document.getElementById("product-form-area");


  if (area) {

    area.classList.add("hidden");

    area.innerHTML = "";

  }

}


// ============================================
// TAMPILKAN PRODUK
// ============================================

function renderProducts() {

  const list =
    document.getElementById("product-list");


  if (!list) {
    return;
  }


  const products =
    getProducts();


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


  products.forEach(
    function (product) {

      const price =
        Number(product.price || 0);

      const dp =
        Number(product.dp || 0);

      const members =
        Number(product.members || 0);


      html += `

        <div class="product-card">

          <div>

            <h3>${product.name || "-"}</h3>

            <p>
              📦 Jenis:
              <b>${product.type || "-"}</b>
            </p>

            <p>
              💰 Harga:
              <b>
                Rp${price.toLocaleString("id-ID")}
              </b>
            </p>

            <p>
              💵 DP:
              <b>
                Rp${dp.toLocaleString("id-ID")}
              </b>
            </p>

            <p>
              📊 Status:
              <b>${product.status || "Open"}</b>
            </p>

            <p>
              📅 Deadline List:
              <b>
                ${product.deadlineList || "-"}
              </b>
            </p>

            <p>
              ‼️ Deadline Pembayaran:
              <b>
                ${product.deadlinePayment || "-"}
              </b>
            </p>

            <p>
              👥 Jumlah Pesanan / Member:
              <b>${members}</b>
            </p>

            <p>
              🔗 Website Customer:
              <b>
                ${product.showWebsite ? "Tampil" : "Tidak tampil"}
              </b>
            </p>

          </div>


          <div class="product-actions">

            <button
              type="button"
              class="btn-edit-product"
              data-product-id="${product.id}"
            >
              📝 Edit
            </button>


            <button
              type="button"
              class="btn-delete-product"
              data-product-id="${product.id}"
            >
              🗑️ Hapus
            </button>

          </div>

        </div>
      `;

    }
  );


  list.innerHTML = html;


  // EDIT
  document
    .querySelectorAll(".btn-edit-product")
    .forEach(
      function (button) {

        button.addEventListener(
          "click",
          function () {

            editProduct(
              Number(button.dataset.productId)
            );

          }
        );

      }
    );


  // HAPUS
  document
    .querySelectorAll(".btn-delete-product")
    .forEach(
      function (button) {

        button.addEventListener(
          "click",
          function () {

            deleteProduct(
              Number(button.dataset.productId)
            );

          }
        );

      }
    );

}


// ============================================
// EDIT PRODUK
// ============================================

function editProduct(id) {

  const products =
    getProducts();


  const product =
    products.find(
      function (item) {

        return item.id === id;

      }
    );


  if (!product) {
    return;
  }


  const area =
    document.getElementById("product-form-area");


  if (!area) {
    return;
  }


  area.classList.remove("hidden");


  area.innerHTML = `

    <div class="panel product-form">

      <h2>Edit Produk / GO</h2>


      <form id="form-edit-product">


        <div class="form-grid">


          <div class="form-group">

            <label>Nama Produk / GO</label>

            <input
              id="edit-name"
              value="${product.name || ""}"
              required
            >

          </div>


          <div class="form-group">

            <label>Jenis</label>

            <select id="edit-type">

              <option value="Group Order">
                Group Order
              </option>

              <option value="Ready Stock">
                Ready Stock
              </option>

              <option value="Pre Order">
                Pre Order
              </option>

            </select>

          </div>


          <div class="form-group">

            <label>Harga</label>

            <input
              type="number"
              id="edit-price"
              value="${product.price || 0}"
            >

          </div>


          <div class="form-group">

            <label>DP</label>

            <input
              type="number"
              id="edit-dp"
              value="${product.dp || 0}"
            >

          </div>


          <div class="form-group">

            <label>Status GO</label>

            <select id="edit-status">

              <option value="Open">Open</option>

              <option value="Closed">Closed</option>

              <option value="Selesai">Selesai</option>

            </select>

          </div>


          <div class="form-group">

            <label>Jumlah Pesanan / Member</label>

            <input
              type="number"
              id="edit-members"
              value="${product.members || 0}"
            >

          </div>


          <div class="form-group">

            <label>Deadline List</label>

            <input
              type="date"
              id="edit-deadline-list"
              value="${product.deadlineList || ""}"
            >

          </div>


          <div class="form-group">

            <label>Deadline Pembayaran</label>

            <input
              type="date"
              id="edit-deadline-payment"
              value="${product.deadlinePayment || ""}"
            >

          </div>


        </div>


        <label class="website-check">

          <input
            type="checkbox"
            id="edit-show-website"
            ${product.showWebsite ? "checked" : ""}
          >

          Tampilkan produk ini di Website Customer

        </label>


        <div class="form-actions">

          <button
            type="submit"
            class="btn"
          >
            💾 Simpan Perubahan
          </button>


          <button
            type="button"
            class="btn-secondary"
            id="btn-cancel-edit"
          >
            Batal
          </button>

        </div>


      </form>

    </div>
  `;


  document.getElementById("edit-type").value =
    product.type || "Group Order";

  document.getElementById("edit-status").value =
    product.status || "Open";


  document
    .getElementById("form-edit-product")
    .addEventListener(
      "submit",
      function (event) {

        event.preventDefault();

        saveEditProduct(id);

      }
    );


  document
    .getElementById("btn-cancel-edit")
    .addEventListener(
      "click",
      function () {

        area.classList.add("hidden");

        area.innerHTML = "";

      }
    );

}


// ============================================
// SIMPAN EDIT
// ============================================

function saveEditProduct(id) {

  const products =
    getProducts();


  const product =
    products.find(
      function (item) {

        return item.id === id;

      }
    );


  if (!product) {
    return;
  }


  product.name =
    document.getElementById("edit-name").value.trim();

  product.type =
    document.getElementById("edit-type").value;

  product.price =
    Number(
      document.getElementById("edit-price").value
    );

  product.dp =
    Number(
      document.getElementById("edit-dp").value
    );

  product.status =
    document.getElementById("edit-status").value;

  product.members =
    Number(
      document.getElementById("edit-members").value
    );

  product.deadlineList =
    document.getElementById(
      "edit-deadline-list"
    ).value;

  product.deadlinePayment =
    document.getElementById(
      "edit-deadline-payment"
    ).value

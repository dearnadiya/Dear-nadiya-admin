// ============================================
// DEAR NADIYA ADMIN
// ============================================
// Versi lengkap
// - Dashboard
// - Produk & GO
// - Pesanan
// - Pembayaran Customer
// - Verifikasi / Tolak Pembayaran
// - Rekap GO
// - Logout kompatibel dengan login.js
// ============================================


// ============================================
// SUPABASE
// ============================================

const SUPABASE_URL =
  "https://cwwzsbqfznzwfclajwnw.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_ADa_gyMfyBZ1ZcdUO8FRfw_iELzOmbQ";

const adminSupabase =
  window.supabase
    ? window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
      )
    : null;


// ============================================
// HELPER
// ============================================

function rupiah(value) {

  const number =
    Number(value || 0);

  return new Intl.NumberFormat(
    "id-ID",
    {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }
  ).format(number);

}


function escapeHtml(value) {

  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


function formatDate(value) {

  if (!value) {
    return "-";
  }

  try {

    return new Date(value)
      .toLocaleDateString(
        "id-ID",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        }
      );

  } catch (error) {

    return value;

  }

}


function statusBadge(status) {

  const value =
    String(status || "pending")
      .toLowerCase();

  let label =
    "Menunggu Verifikasi";

  if (
    value === "verified" ||
    value === "approved" ||
    value === "terverifikasi"
  ) {

    label =
      "Terverifikasi";

  }

  if (
    value === "rejected" ||
    value === "tolak" ||
    value === "ditolak"
  ) {

    label =
      "Ditolak";

  }

  return `
    <span class="status">
      ${escapeHtml(label)}
    </span>
  `;

}


// ============================================
// PINDAH HALAMAN
// ============================================

function changePage(name) {

  const title =
    document.getElementById("title");

  const content =
    document.getElementById("content");

  if (!title || !content) {
    return;
  }


  // ==========================================
  // DASHBOARD
  // ==========================================

  if (name === "dash") {

    title.textContent =
      "Dashboard";

    content.innerHTML = `

      <div class="cards">

        <div class="stat">
          <p>Total Pesanan</p>
          <h2 id="dash-total-orders">0</h2>
        </div>

        <div class="stat">
          <p>Total Pembayaran</p>
          <h2 id="dash-total-payments">
            Rp0
          </h2>
        </div>

        <div class="stat">
          <p>GO Aktif</p>
          <h2 id="dash-total-go">
            0
          </h2>
        </div>

      </div>


      <div class="panel">

        <h2>
          Selamat datang di Dear Nadiya Admin ♥
        </h2>

        <p>
          Kelola produk, pesanan, pembayaran,
          dan Group Order dari dashboard ini.
        </p>

      </div>

    `;

    loadDashboard();

    return;
  }


  // ==========================================
  // PRODUK & GO
  // ==========================================

  if (name === "products") {

    title.textContent =
      "Produk & GO";

    content.innerHTML = `

      <div class="toolbar">

        <div>

          <h2>
            Produk & GO
          </h2>

          <p>
            Kelola produk dan Group Order
            Dear Nadiya.
          </p>

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
      ></div>


      <div
        id="product-list"
        class="product-list"
      ></div>

    `;


    renderProducts();


    const addButton =
      document.getElementById(
        "btn-add-product"
      );


    if (addButton) {

      addButton.addEventListener(
        "click",
        showProductForm
      );

    }

    return;
  }


  // ==========================================
  // PESANAN
  // ==========================================

  if (name === "orders") {

    title.textContent =
      "Pesanan";

    content.innerHTML = `

      <div class="panel">

        <h2>
          Daftar Pesanan
        </h2>

        <p>
          Data pesanan akan ditampilkan
          di sini.
        </p>

      </div>

    `;

    return;
  }


  // ==========================================
  // PEMBAYARAN
  // ==========================================

  if (name === "payments") {

    title.textContent =
      "Pembayaran";

    content.innerHTML = `

      <div class="toolbar">

        <div>

          <h2>
            Pembayaran Customer
          </h2>

          <p>
            Periksa bukti pembayaran yang
            dikirim melalui Customer Portal.
          </p>

        </div>


        <button
          type="button"
          class="btn"
          id="btn-refresh-payments"
        >
          🔄 Refresh
        </button>

      </div>


      <div
        id="payment-admin-message"
        class="panel"
        style="display:none;"
      ></div>


      <div
        id="payment-list"
        class="product-list"
      >

        <div class="panel">
          Memuat pembayaran...
        </div>

      </div>

    `;


    const refreshButton =
      document.getElementById(
        "btn-refresh-payments"
      );


    if (refreshButton) {

      refreshButton.addEventListener(
        "click",
        loadPayments
      );

    }


    loadPayments();

    return;
  }


  // ==========================================
  // REKAP GO
  // ==========================================

  if (name === "recap") {

    title.textContent =
      "Rekap GO";

    content.innerHTML = `

      <div class="toolbar">

        <div>

          <h2>
            Rekap Group Order
          </h2>

          <p>
            Rekap seluruh pesanan
            Dear Nadiya.
          </p>

        </div>


        <button
          type="button"
          class="btn"
          id="btn-refresh-recap"
        >
          🔄 Refresh
        </button>

      </div>


      <div
        id="admin-recap-area"
      >

        <div class="panel">
          Memuat rekap...
        </div>

      </div>

    `;


    const refreshButton =
      document.getElementById(
        "btn-refresh-recap"
      );


    if (refreshButton) {

      refreshButton.addEventListener(
        "click",
        loadAdminRecap
      );

    }


    loadAdminRecap();

    return;
  }

}


// ============================================
// KOMPATIBILITAS page()
// ============================================

function page(name) {

  changePage(name);

}


// ============================================
// DATA PRODUK LOCAL STORAGE
// ============================================

function getProducts() {

  try {

    const data =
      localStorage.getItem(
        "dearNadiyaProducts"
      );


    if (!data) {
      return [];
    }


    const products =
      JSON.parse(data);


    return Array.isArray(products)
      ? products
      : [];

  } catch (error) {

    console.error(
      "Gagal membaca produk:",
      error
    );

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
    document.getElementById(
      "product-form-area"
    );


  if (!area) {
    return;
  }


  area.classList.remove("hidden");


  area.innerHTML = `

    <div class="panel product-form">

      <h2>
        Tambah Produk / GO
      </h2>


      <form id="form-product">

        <div class="form-grid">


          <div class="form-group">

            <label>
              Nama Produk / GO
            </label>

            <input
              type="text"
              id="product-name"
              placeholder="Contoh: TREASURE Album Baru"
              required
            >

          </div>


          <div class="form-group">

            <label>
              Jenis
            </label>

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

            <label>
              Harga
            </label>

            <input
              type="number"
              id="product-price"
              placeholder="Contoh: 350000"
              min="0"
              required
            >

          </div>


          <div class="form-group">

            <label>
              DP
            </label>

            <input
              type="number"
              id="product-dp"
              placeholder="Contoh: 100000"
              value="0"
              min="0"
            >

          </div>


          <div class="form-group">

            <label>
              Status GO
            </label>

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

            <label>
              Jumlah Pesanan / Member
            </label>

            <input
              type="number"
              id="product-members"
              value="0"
              min="0"
            >

          </div>


          <div class="form-group">

            <label>
              Deadline List
            </label>

            <input
              type="date"
              id="product-deadline-list"
            >

          </div>


          <div class="form-group">

            <label>
              Deadline Pembayaran
            </label>

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

          Tampilkan produk ini
          di Website Customer

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
    document.getElementById(
      "form-product"
    );


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
    document.getElementById(
      "btn-cancel-product"
    );


  if (cancelButton) {

    cancelButton.addEventListener(
      "click",
      function () {

        area.classList.add(
          "hidden"
        );

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
    document
      .getElementById("product-name")
      .value
      .trim();


  const type =
    document
      .getElementById("product-type")
      .value;


  const price =
    Number(
      document
        .getElementById("product-price")
        .value
    );


  const dp =
    Number(
      document
        .getElementById("product-dp")
        .value
    );


  const status =
    document
      .getElementById("product-status")
      .value;


  const members =
    Number(
      document
        .getElementById("product-members")
        .value
    );


  const deadlineList =
    document
      .getElementById(
        "product-deadline-list"
      )
      .value;


  const deadlinePayment =
    document
      .getElementById(
        "product-deadline-payment"
      )
      .value;


  const showWebsite =
    document
      .getElementById(
        "product-show-website"
      )
      .checked;


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

    name,

    type,

    price,

    dp,

    status,

    members,

    deadlineList,

    deadlinePayment,

    showWebsite

  });


  saveProducts(products);


  renderProducts();


  const area =
    document.getElementById(
      "product-form-area"
    );


  if (area) {

    area.classList.add(
      "hidden"
    );

    area.innerHTML = "";

  }

}


// ============================================
// TAMPILKAN PRODUK
// ============================================

function renderProducts() {

  const list =
    document.getElementById(
      "product-list"
    );


  if (!list) {
    return;
  }


  const products =
    getProducts();


  if (!products.length) {

    list.innerHTML = `

      <div class="panel">

        <h3>
          Belum ada produk
        </h3>

        <p>
          Klik
          <b>Tambah Produk</b>
          untuk membuat produk atau GO baru.
        </p>

      </div>

    `;

    return;

  }


  list.innerHTML =
    products.map(
      function (product) {

        const price =
          Number(
            product.price || 0
          );


        const dp =
          Number(
            product.dp || 0
          );


        const members =
          Number(
            product.members || 0
          );


        return `

          <div class="product-card">

            <div>

              <h3>
                ${escapeHtml(
                  product.name || "-"
                )}
              </h3>


              <p>
                📦 Jenis:
                <b>
                  ${escapeHtml(
                    product.type || "-"
                  )}
                </b>
              </p>


              <p>
                💰 Harga:
                <b>
                  ${rupiah(price)}
                </b>
              </p>


              <p>
                💵 DP:
                <b>
                  ${rupiah(dp)}
                </b>
              </p>


              <p>
                📊 Status:
                <b>
                  ${escapeHtml(
                    product.status || "Open"
                  )}
                </b>
              </p>


              <p>
                📅 Deadline List:
                <b>
                  ${escapeHtml(
                    product.deadlineList || "-"
                  )}
                </b>
              </p>


              <p>
                ‼️ Deadline Pembayaran:
                <b>
                  ${escapeHtml(
                    product.deadlinePayment || "-"
                  )}
                </b>
              </p>


              <p>
                👥 Jumlah Pesanan / Member:
                <b>
                  ${members}
                </b>
              </p>


              <p>
                🔗 Website Customer:
                <b>
                  ${
                    product.showWebsite
                      ? "Tampil"
                      : "Tidak tampil"
                  }
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
    )
    .join("");


  document
    .querySelectorAll(
      ".btn-edit-product"
    )
    .forEach(
      function (button) {

        button.addEventListener(
          "click",
          function () {

            editProduct(
              Number(
                button.dataset.productId
              )
            );

          }
        );

      }
    );


  document
    .querySelectorAll(
      ".btn-delete-product"
    )
    .forEach(
      function (button) {

        button.addEventListener(
          "click",
          function () {

            deleteProduct(
              Number(
                button.dataset.productId
              )
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

    alert(
      "Produk tidak ditemukan."
    );

    return;

  }


  const area =
    document.getElementById(
      "product-form-area"
    );


  if (!area) {
    return;
  }


  area.classList.remove(
    "hidden"
  );


  area.innerHTML = `

    <div class="panel product-form">

      <h2>
        Edit Produk / GO
      </h2>


      <form id="form-edit-product">


        <div class="form-grid">


          <div class="form-group">

            <label>
              Nama Produk / GO
            </label>

            <input
              type="text"
              id="edit-name"
              value="${escapeHtml(
                product.name || ""
              )}"
              required
            >

          </div>


          <div class="form-group">

            <label>
              Jenis
            </label>

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

            <label>
              Harga
            </label>

            <input
              type="number"
              id="edit-price"
              value="${Number(
                product.price || 0
              )}"
              min="0"
              required
            >

          </div>


          <div class="form-group">

            <label>
              DP
            </label>

            <input
              type="number"
              id="edit-dp"
              value="${Number(
                product.dp || 0
              )}"
              min="0"
            >

          </div>


          <div class="form-group">

            <label>
              Status GO
            </label>

            <select id="edit-status">

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
              type="number"
              id="edit-members"
              value="${Number(
                product.members || 0
              )}"
              min="0"
            >

          </div>


          <div class="form-group">

            <label>
              Deadline List
            </label>

            <input
              type="date"
              id="edit-deadline-list"
              value="${escapeHtml(
                product.deadlineList || ""
              )}"
            >

          </div>


          <div class="form-group">

            <label>
              Deadline Pembayaran
            </label>

            <input
              type="date"
              id="edit-deadline-payment"
              value="${escapeHtml(
                product.deadlinePayment || ""
              )}"
            >

          </div>


        </div>


        <label class="website-check">

          <input
            type="checkbox"
            id="edit-show-website"
            ${
              product.showWebsite
                ? "checked"
                : ""
            }
          >

          Tampilkan produk ini
          di Website Customer

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


  const typeInput =
    document.getElementById(
      "edit-type"
    );


  if (typeInput) {

    typeInput.value =
      product.type ||
      "Group Order";

  }


  const statusInput =
    document.getElementById(
      "edit-status"
    );


  if (statusInput) {

    statusInput.value =
      product.status ||
      "Open";

  }


  const form =
    document.getElementById(
      "form-edit-product"
    );


  if (form) {

    form.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();

        saveEditProduct(id);

      }
    );

  }


  const cancelButton =
    document.getElementById(
      "btn-cancel-edit"
    );


  if (cancelButton) {

    cancelButton.addEventListener(
      "click",
      function () {

        area.classList.add(
          "hidden"
        );

        area.innerHTML = "";

      }
    );

  }

}


// ============================================
// SIMPAN EDIT PRODUK
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

    alert(
      "Produk tidak ditemukan."
    );

    return;

  }


  const nameInput =
    document.getElementById(
      "edit-name"
    );


  const typeInput =
    document.getElementById(
      "edit-type"
    );


  const priceInput =
    document.getElementById(
      "edit-price"
    );


  const dpInput =
    document.getElementById(
      "edit-dp"
    );


  const statusInput =
    document.getElementById(
      "edit-status"
    );


  const membersInput =
    document.getElementById(
      "edit-members"
    );


  const deadlineListInput =
    document.getElementById(
      "edit-deadline-list"
    );


  const deadlinePaymentInput =
    document.getElementById(
      "edit-deadline-payment"
    );


  const showWebsiteInput =
    document.getElementById(
      "edit-show-website"
    );


  if (
    !nameInput ||
    !typeInput ||
    !priceInput ||
    !dpInput ||
    !statusInput ||
    !membersInput ||
    !deadlineListInput ||
    !deadlinePaymentInput ||
    !showWebsiteInput
  ) {

    alert(
      "Form edit produk tidak lengkap."
    );

    return;

  }


  const name =
    nameInput.value.trim();


  const price =
    Number(
      priceInput.value
    );


  const dp =
    Number(
      dpInput.value || 0
    );


  const members =
    Number(
      membersInput.value || 0
    );


  if (!name) {

    alert(
      "Nama produk wajib diisi."
    );

    return;

  }


  if (price <= 0) {

    alert(
      "Harga produk harus lebih dari 0."
    );

    return;

  }


  if (dp < 0) {

    alert(
      "DP tidak boleh kurang dari 0."
    );

    return;

  }


  product.name =
    name;


  product.type =
    typeInput.value;


  product.price =
    price;


  product.dp =
    dp;


  product.status =
    statusInput.value;


  product.members =
    members;


  product.deadlineList =
    deadlineListInput.value;


  product.deadlinePayment =
    deadlinePaymentInput.value;


  product.showWebsite =
    showWebsiteInput.checked;


  saveProducts(
    products
  );


  renderProducts();


  const area =
    document.getElementById(
      "product-form-area"
    );


  if (area) {

    area.classList.add(
      "hidden"
    );

    area.innerHTML = "";

  }


  alert(
    "Produk berhasil diperbarui."
  );

}


// ============================================
// HAPUS PRODUK
// ============================================

function deleteProduct(id) {

  const products =
    getProducts();


  const product =
    products.find(
      function (item) {

        return item.id === id;

      }
    );


  if (!product) {

    alert(
      "Produk tidak ditemukan."
    );

    return;

  }


  const confirmed =
    confirm(
      `Apakah kamu yakin ingin menghapus produk "${product.name}"?`
    );


  if (!confirmed) {
    return;
  }


  const filtered =
    products.filter(
      function (item) {

        return item.id !== id;

      }
    );


  saveProducts(
    filtered
  );


  renderProducts();


  alert(
    "Produk berhasil dihapus."
  );

}


// ============================================
// DASHBOARD
// ============================================

async function loadDashboard() {

  const products =
    getProducts();


  const activeGo =
    products.filter(
      function (product) {

        return product.status === "Open";

      }
    ).length;


  const goElement =
    document.getElementById(
      "dash-total-go"
    );


  if (goElement) {

    goElement.textContent =
      activeGo;

  }


  if (!adminSupabase) {
    return;
  }


  try {

    const result =
      await adminSupabase
        .from(
          "dn_payment_submissions"
        )
        .select(
          "amount"
        );


    if (result.error) {
      throw result.error;
    }


    const rows =
      result.data || [];


    const totalPayment =
      rows.reduce(
        function (
          total,
          item
        ) {

          return (
            total +
            Number(
              item.amount || 0
            )
          );

        },
        0
      );


    const paymentElement =
      document.getElementById(
        "dash-total-payments"
      );


    if (paymentElement) {

      paymentElement.textContent =
        rupiah(
          totalPayment
        );

    }


    const orderElement =
      document.getElementById(
        "dash-total-orders"
      );


    if (orderElement) {

      orderElement.textContent =
        rows.length;

    }

  } catch (error) {

    console.error(
      "Dashboard error:",
      error
    );

  }

}

// ============================================
// LOAD PEMBAYARAN
// ============================================

async function loadPayments() {

  const list =
    document.getElementById(
      "payment-list"
    );

  if (!list) {
    return;
  }


  if (!adminSupabase) {

    list.innerHTML = `
      <div class="panel error">
        Supabase belum terhubung.
      </div>
    `;

    return;
  }


  list.innerHTML = `
    <div class="panel">
      Memuat data pembayaran...
    </div>
  `;


  try {

    const result =
      await adminSupabase
        .from("dn_payment_submissions")
        .select("*")
        .order("id", {
          ascending: false
        });


    if (result.error) {
      throw result.error;
    }


    const payments =
      result.data || [];


    if (!payments.length) {

      list.innerHTML = `
        <div class="panel">

          <h3>
            Belum ada pembayaran
          </h3>

          <p>
            Belum ada customer yang
            mengirim bukti pembayaran.
          </p>

        </div>
      `;

      return;
    }


    list.innerHTML =
      payments.map(
        function (payment) {

          const status =
            String(
              payment.status || "pending"
            ).toLowerCase();


          const isPending =
            status === "pending" ||
            status === "menunggu" ||
            status === "waiting";


          return `

            <div class="product-card payment-card">

              <div>

                <h3>
                  ${escapeHtml(
                    payment.customer_name || "-"
                  )}
                  •
                  ${escapeHtml(
                    payment.whatsapp_last4 || "----"
                  )}
                </h3>


                <p>
                  📦 Kode Produk:
                  <b>
                    ${escapeHtml(
                      payment.product_code || "-"
                    )}
                  </b>
                </p>


                <p>
                  🏷️ Versi Produk:
                  <b>
                    ${escapeHtml(
                      payment.product_version || "-"
                    )}
                  </b>
                </p>


                <p>
                  💰 Nominal:
                  <b>
                    ${rupiah(
                      payment.amount
                    )}
                  </b>
                </p>


                <p>
                  📅 Tanggal Transfer:
                  <b>
                    ${formatDate(
                      payment.payment_date
                    )}
                  </b>
                </p>


                <p>
                  📌 Status:
                  ${statusBadge(
                    payment.status
                  )}
                </p>


                ${
                  payment.admin_note
                    ? `
                      <p>
                        📝 Catatan Admin:
                        <b>
                          ${escapeHtml(
                            payment.admin_note
                          )}
                        </b>
                      </p>
                    `
                    : ""
                }


                <div
                  class="product-actions"
                  style="margin-top:15px;"
                >

                  ${
                    payment.proof_path
                      ? `
                        <button
                          type="button"
                          class="btn-view-proof"
                          data-proof-path="${escapeHtml(
                            payment.proof_path
                          )}"
                        >
                          👁 Lihat Bukti
                        </button>
                      `
                      : `
                        <span>
                          Bukti tidak tersedia
                        </span>
                      `
                  }


                  ${
                    isPending
                      ? `

                        <button
                          type="button"
                          class="btn"
                          data-action="verify"
                          data-payment-id="${payment.id}"
                        >
                          ✅ Verifikasi
                        </button>


                        <button
                          type="button"
                          class="btn-secondary"
                          data-action="reject"
                          data-payment-id="${payment.id}"
                        >
                          ❌ Tolak
                        </button>

                      `
                      : ""
                  }

                </div>

              </div>

            </div>

          `;

        }
      )
      .join("");


    // ==========================================
    // TOMBOL LIHAT BUKTI
    // ==========================================

    document
      .querySelectorAll(
        ".btn-view-proof"
      )
      .forEach(
        function (button) {

          button.addEventListener(
            "click",
            function () {

              openPaymentProof(
                button.dataset.proofPath
              );

            }
          );

        }
      );


    // ==========================================
    // TOMBOL VERIFIKASI
    // ==========================================

    document
      .querySelectorAll(
        '[data-action="verify"]'
      )
      .forEach(
        function (button) {

          button.addEventListener(
            "click",
            function () {

              updatePaymentStatus(
                Number(
                  button.dataset.paymentId
                ),
                "verified"
              );

            }
          );

        }
      );

  // ============================================
// TOMBOL TOLAK
// ============================================

document
  .querySelectorAll(
    '[data-action="reject"]'
  )
  .forEach(
    function (button) {

      button.addEventListener(
        "click",
        function () {

          updatePaymentStatus(
            Number(
              button.dataset.paymentId
            ),
            "rejected"
          );

        }
      );

    }
  );


// ============================================
// LIHAT BUKTI PEMBAYARAN
// ============================================

async function openPaymentProof(
  proofPath
) {

  if (!proofPath) {

    alert(
      "Bukti pembayaran tidak tersedia."
    );

    return;

  }


  if (!adminSupabase) {

    alert(
      "Supabase belum terhubung."
    );

    return;

  }


  try {

    const result =
      await adminSupabase
        .storage
        .from("payment-proofs")
        .createSignedUrl(
          proofPath,
          600
        );


    if (result.error) {
      throw result.error;
    }


    if (
      !result.data ||
      !result.data.signedUrl
    ) {

      throw new Error(
        "URL bukti pembayaran tidak tersedia."
      );

    }


    window.open(
      result.data.signedUrl,
      "_blank"
    );


  } catch (error) {

    console.error(
      "Gagal membuka bukti:",
      error
    );


    alert(
      "Bukti belum dapat dibuka.\n\n" +
      error.message
    );

  }

}


// ============================================
// UPDATE STATUS PEMBAYARAN
// ============================================

async function updatePaymentStatus(
  paymentId,
  newStatus
) {

  if (!adminSupabase) {

    alert(
      "Supabase belum terhubung."
    );

    return;

  }


  const confirmText =
    newStatus === "verified"
      ? "Verifikasi pembayaran ini?"
      : "Tolak pembayaran ini?";


  if (!confirm(confirmText)) {
    return;
  }


  try {

    const result =
      await adminSupabase
        .from("dn_payment_submissions")
        .update({
          status: newStatus
        })
        .eq(
          "id",
          paymentId
        );


    if (result.error) {
      throw result.error;
    }


    alert(
      newStatus === "verified"
        ? "Pembayaran berhasil diverifikasi."
        : "Pembayaran berhasil ditolak."
    );


    await loadPayments();


  } catch (error) {

    console.error(
      "Gagal mengubah status pembayaran:",
      error
    );


    alert(
      "Gagal mengubah status pembayaran.\n\n" +
      error.message
    );

  }

}


// ============================================
// REKAP GO ADMIN
// ============================================

async function loadAdminRecap() {

  const area =
    document.getElementById(
      "admin-recap-area"
    );


  if (!area) {
    return;
  }


  if (!adminSupabase) {

    area.innerHTML = `
      <div class="panel error">
        Supabase belum terhubung.
      </div>
    `;

    return;

  }


  area.innerHTML = `
    <div class="panel">
      Memuat rekap GO...
    </div>
  `;


  try {

    const result =
      await adminSupabase
        .from("go_rekap_public")
        .select("*");


    if (result.error) {
      throw result.error;
    }


    const data =
      result.data || [];


    if (!data.length) {

      area.innerHTML = `
        <div class="panel">

          <h3>
            Belum ada data rekap
          </h3>

          <p>
            Data akan muncul setelah
            pesanan tersedia.
          </p>

        </div>
      `;

      return;

    }


    area.innerHTML = `

      <div class="table-wrap">

        <table>

          <thead>

            <tr>

              <th>Kode Produk</th>

              <th>Nama Produk</th>

              <th>Customer</th>

              <th>Versi</th>

              <th>Harga</th>

              <th>DP</th>

              <th>Pelunasan</th>

              <th>Status Barang</th>

            </tr>

          </thead>


          <tbody>

            ${data.map(
              function (item) {

                return `

                  <tr>

                    <td>
                      ${escapeHtml(
                        item.product_code || "-"
                      )}
                    </td>


                    <td>
                      ${escapeHtml(
                        item.product_name || "-"
                      )}
                    </td>


                    <td>
                      ${escapeHtml(
                        item.customer_name || "-"
                      )}
                    </td>


                    <td>
                      ${escapeHtml(
                        item.product_version || "-"
                      )}
                    </td>


                    <td>
                      ${rupiah(
                        item.price
                      )}
                    </td>


                    <td>
                      ${rupiah(
                        item.dp
                      )}
                    </td>


                    <td>
                      ${rupiah(
                        item.pelunasan
                      )}
                    </td>


                    <td>
                      ${escapeHtml(
                        item.item_status || "-"
                      )}
                    </td>

                  </tr>

                `;

              }
            ).join("")}

          </tbody>

        </table>

      </div>

    `;


  } catch (error) {

    console.error(
      "Gagal memuat rekap:",
      error
    );


    area.innerHTML = `
      <div class="panel error">

        <h3>
          Gagal memuat rekap
        </h3>

        <p>
          ${escapeHtml(
            error.message
          )}
        </p>

      </div>
    `;

  }

}


// ============================================
// NAVIGASI ADMIN
// ============================================

function setupNavigation() {

  const buttons = {

    "btn-dashboard": "dash",

    "btn-products": "products",

    "btn-orders": "orders",

    "btn-payments": "payments",

    "btn-recap": "recap"

  };


  Object.keys(
    buttons
  ).forEach(
    function (buttonId) {

      const button =
        document.getElementById(
          buttonId
        );


      if (!button) {
        return;
      }


      button.addEventListener(
        "click",
        function () {

          changePage(
            buttons[buttonId]
          );

        }
      );

    }
  );

}


// ============================================
// LOGOUT
// ============================================

function logoutAdmin() {

  try {

    localStorage.removeItem(
      "dearNadiyaAdminLogin"
    );


    localStorage.removeItem(
      "adminLoggedIn"
    );

  } catch (error) {

    console.error(
      error
    );

  }


  window.location.reload();

}


// ============================================
// INISIALISASI
// ============================================

document.addEventListener(
  "DOMContentLoaded",
  function () {

    setupNavigation();

    changePage("dash");

  }
);

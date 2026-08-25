// ============================================
// DEAR NADIYA ADMIN
// ============================================


// ============================================
// FUNGSI PINDAH HALAMAN
// ============================================

function page(name) {

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
          <h2>0</h2>
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
      <div class="panel">

        <div class="toolbar">

          <h2>Daftar Produk & Group Order</h2>

          <button class="btn">
            + Tambah Produk
          </button>

        </div>

        <p>
          Belum ada produk atau Group Order.
        </p>

      </div>
    `;

  }


  // PESANAN
  if (name === "orders") {

    title.textContent = "Pesanan";

    content.innerHTML = `
      <div class="panel">

        <h2>Daftar Pesanan</h2>

        <p>
          Belum ada pesanan.
        </p>

      </div>
    `;

  }


  // PEMBAYARAN
  if (name === "payments") {

    title.textContent = "Pembayaran";

    content.innerHTML = `
      <div class="panel">

        <h2>Data Pembayaran</h2>

        <p>
          Belum ada pembayaran.
        </p>

      </div>
    `;

  }


  // REKAP GO
  if (name === "recap") {

    title.textContent = "Rekap GO";

    content.innerHTML = `
      <div class="panel">

        <h2>Rekap Group Order</h2>

        <p>
          Belum ada Group Order untuk direkap.
        </p>

      </div>
    `;

  }


  // MENU AKTIF
  const menuButtons = document.querySelectorAll("aside button");

  menuButtons.forEach(function (button) {

    button.classList.remove("active");

  });

}


// ============================================
// FUNGSI MENU TAMBAHAN
// ============================================

function showDashboard() {
  page("dash");
}


function showProducts() {
  page("products");
}


function showPayments() {
  page("payments");
}


function showRecap() {
  page("recap");
}


// ============================================
// KELUAR
// ============================================

function logout() {

  const loginPage = document.getElementById("login");
  const appPage = document.getElementById("app");

  if (appPage) {
    appPage.classList.add("hidden");
  }

  if (loginPage) {
    loginPage.classList.remove("hidden");
  }

}

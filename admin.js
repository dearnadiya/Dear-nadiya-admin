// DEAR NADIYA ADMIN

const SUPABASE_URL = "https://cwwzsbqfznzwfclajwnw.supabase.co";
const SUPABASE_KEY = "sb_publishable_ADa_gyMfyBZ1ZcdUO8FRfw_iELzOmbQ";

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
      <div class="panel">
        <h2>Daftar Produk & GO</h2>
        <p>Halaman Produk & Group Order berhasil dibuka.</p>
      </div>
    `;
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

document.addEventListener("DOMContentLoaded", function () {

  const btnDashboard = document.getElementById("btn-dashboard");
  const btnProducts = document.getElementById("btn-products");
  const btnOrders = document.getElementById("btn-orders");
  const btnPayments = document.getElementById("btn-payments");
  const btnRecap = document.getElementById("btn-recap");

  if (btnDashboard) {
    btnDashboard.addEventListener("click", function () {
      changePage("dash");
    });
  }

  if (btnProducts) {
    btnProducts.addEventListener("click", function () {
      changePage("products");
    });
  }

  if (btnOrders) {
    btnOrders.addEventListener("click", function () {
      changePage("orders");
    });
  }

  if (btnPayments) {
    btnPayments.addEventListener("click", function () {
      changePage("payments");
    });
  }

  if (btnRecap) {
    btnRecap.addEventListener("click", function () {
      changePage("recap");
    });
  }

});

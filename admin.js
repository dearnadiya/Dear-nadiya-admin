// ============================================
// DEAR NADIYA ADMIN
// ============================================


// ============================================
// FUNGSI PINDAH HALAMAN
// ============================================

function page(name) {

  // Sembunyikan semua halaman
  const pages = document.querySelectorAll("[id^='page-']");

  pages.forEach(function (p) {
    p.classList.add("hidden");
  });


  // Tampilkan halaman yang dipilih
  const target = document.getElementById("page-" + name);

  if (target) {
    target.classList.remove("hidden");
  }


  // Hapus status aktif dari semua tombol menu
  const buttons = document.querySelectorAll("aside button");

  buttons.forEach(function (button) {
    button.classList.remove("active");
  });


  // Cari tombol menu yang sesuai
  const activeButton = document.querySelector(
    `aside button[onclick="page('${name}')"]`
  );

  if (activeButton) {
    activeButton.classList.add("active");
  }


  // Ganti judul halaman
  const title = document.getElementById("title");

  const titles = {
    dash: "Dashboard",
    products: "Produk & GO",
    orders: "Pesanan",
    payments: "Pembayaran",
    recap: "Rekap GO"
  };

  if (title && titles[name]) {
    title.textContent = titles[name];
  }

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

  // Sembunyikan dashboard
  if (appPage) {
    appPage.classList.add("hidden");
  }

  // Tampilkan login kembali
  if (loginPage) {
    loginPage.classList.remove("hidden");
  }

}

// ============================================
// DEAR NADIYA ADMIN
// KHUSUS FUNGSI DASHBOARD
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


  // Status menu aktif
  const menuButtons = document.querySelectorAll("[data-page]");

  menuButtons.forEach(function (button) {

    button.classList.remove("active");

    if (button.dataset.page === name) {
      button.classList.add("active");
    }

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

  // Sembunyikan dashboard
  if (appPage) {
    appPage.classList.add("hidden");
  }

  // Tampilkan login kembali
  if (loginPage) {
    loginPage.classList.remove("hidden");
  }

}

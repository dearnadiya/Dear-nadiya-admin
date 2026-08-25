// ============================================
// DEAR NADIYA ADMIN
// admin.js - TANPA HALAMAN LOGIN
// ============================================

document.addEventListener("DOMContentLoaded", function () {

  // 1. LANGSUNG TAMPILKAN DASHBOARD
  const loginPage = document.getElementById("login");
  const appPage = document.getElementById("app");

  if (loginPage) {
    loginPage.classList.add("hidden");
    loginPage.style.display = "none";
  }

  if (appPage) {
    appPage.classList.remove("hidden");
    appPage.style.display = "";
  }


  // 2. FUNGSI PINDAH HALAMAN
  window.page = function (name) {

    // Sembunyikan semua halaman
    const pages = document.querySelectorAll("[id^='page-']");

    pages.forEach(function (p) {
      p.classList.add("hidden");
      p.style.display = "none";
    });

    // Tampilkan halaman yang dipilih
    const target = document.getElementById("page-" + name);

    if (target) {
      target.classList.remove("hidden");
      target.style.display = "";
    }


    // Ubah judul halaman
    const title = document.getElementById("pageTitle");
    const subtitle = document.getElementById("pageSubtitle");

    const titles = {
      dash: "Dashboard",
      products: "Produk & GO",
      payments: "Pembayaran",
      recap: "Rekap GO"
    };

    if (title && titles[name]) {
      title.textContent = titles[name];
    }

    if (subtitle && titles[name]) {
      subtitle.textContent = "Dear Nadiya Admin";
    }


    // Memberikan status aktif pada menu
    const menuButtons = document.querySelectorAll("[data-page]");

    menuButtons.forEach(function (button) {
      button.classList.remove("active");

      if (button.dataset.page === name) {
        button.classList.add("active");
      }
    });


    // Kembali ke bagian atas halaman
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };


  // 3. HUBUNGKAN TOMBOL MENU
  const menuButtons = document.querySelectorAll("[data-page]");

  menuButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const pageName = button.dataset.page;

      if (pageName) {
        window.page(pageName);
      }

    });

  });


  // 4. HALAMAN PERTAMA ADALAH DASHBOARD
  window.page("dash");

});


// ============================================
// TOMBOL KELUAR
// ============================================

function logout() {

  const confirmLogout = confirm(
    "Keluar dari Admin Dashboard?"
  );

  if (confirmLogout) {
    window.location.href = "index.html";
  }

}


// ============================================
// FUNGSI MENU TAMBAHAN
// ============================================

function showDashboard() {
  window.page("dash");
}


function showProducts() {
  window.page("products");
}


function showPayments() {
  window.page("payments");
}


function showRecap() {
  window.page("recap");
}

document.addEventListener("DOMContentLoaded", function () {

  const loginPage = document.getElementById("login");
  const appPage = document.getElementById("app");
  const loginButton = document.getElementById("loginButton");

  // Saat pertama membuka website:
  // tampilkan login, sembunyikan dashboard
  if (loginPage) {
    loginPage.classList.remove("hidden");
  }

  if (appPage) {
    appPage.classList.add("hidden");
  }

  // Saat tombol Masuk Admin diklik
  if (loginButton) {

    loginButton.addEventListener("click", function () {

      const username = document.getElementById("u").value;
      const password = document.getElementById("p").value;

      // Username dan password
      if (username === "admin" && password === "180322") {

        // Sembunyikan login
        loginPage.classList.add("hidden");

        // Tampilkan dashboard
        appPage.classList.remove("hidden");

        // Tampilkan halaman dashboard
        if (typeof page === "function") {
          page("dash");
        }

      } else {

        alert("Username atau password salah!");

      }

    });

  }

});

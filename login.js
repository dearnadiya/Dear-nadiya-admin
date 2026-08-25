function login() {

  const username = document.getElementById("u").value;
  const password = document.getElementById("p").value;

  const loginPage = document.getElementById("login");
  const appPage = document.getElementById("app");

  // Cek username dan password
  if (username === "admin" && password === "180322") {

    // Sembunyikan halaman login
    loginPage.classList.add("hidden");
    loginPage.style.display = "none";

    // Tampilkan dashboard
    appPage.classList.remove("hidden");
    appPage.style.display = "block";

    // Tampilkan halaman dashboard
    page("dash");

  } else {

    alert("Username atau Password salah!");

  }

}

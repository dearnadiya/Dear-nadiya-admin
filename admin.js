// ========================================
// MULAI DARI HALAMAN LOGIN
// ========================================

window.addEventListener(
  "DOMContentLoaded",
  function () {

    const loginPage =
      document.getElementById("login");

    const appPage =
      document.getElementById("app");

    const loginButton =
      document.getElementById(
        "loginButton"
      );

    // Tampilkan halaman login
    if (loginPage) {
      loginPage.classList.remove(
        "hidden"
      );
    }

    // Sembunyikan dashboard
    if (appPage) {
      appPage.classList.add(
        "hidden"
      );
    }

    // Hubungkan tombol login
    if (loginButton) {

      loginButton.addEventListener(
        "click",
        function () {

          login();

        }
      );

    } else {

      console.error(
        "Tombol loginButton tidak ditemukan"
      );

    }

  }
);

// ========================================
// SUPABASE CONFIG
// ========================================

const SUPABASE_URL =
  "https://cwwzsbqfznzwfclajwnw.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_ADa_gyMfyBZ1ZcdUO8FRfw_iELzOmbQ";

const SUPABASE_REST =
  `${SUPABASE_URL}/rest/v1`;


// ========================================
// FORMAT RUPIAH
// ========================================

const $ = (q) =>
  document.querySelector(q);

const fmt = (n) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(Number(n) || 0);


// ========================================
// HELPER SUPABASE
// ========================================

async function dbRequest(
  table,
  method = "GET",
  query = "",
  body = null
) {

  const url =
    `${SUPABASE_REST}/${table}${query}`;

  const headers = {
    apikey: SUPABASE_KEY,
    Authorization:
      `Bearer ${SUPABASE_KEY}`
  };

  if (body !== null) {

    headers["Content-Type"] =
      "application/json";

    headers["Prefer"] =
      "return=representation";

  }

  const response =
    await fetch(url, {
      method,
      headers,
      body:
        body !== null
          ? JSON.stringify(body)
          : undefined
    });

  const text =
    await response.text();

  let result = null;

  if (text) {

    try {

      result =
        JSON.parse(text);

    } catch {

      result = text;

    }

  }

  if (!response.ok) {

    console.error(
      "Supabase error:",
      result
    );

    throw new Error(
      result?.message ||
      result?.hint ||
      result?.details ||
      "Terjadi kesalahan Supabase"
    );

  }

  return result;

}


// ========================================
// LOGIN
// ========================================

async function login() {

  alert("Tombol Masuk Admin berfungsi");

  try {

    const usernameInput =
      document.getElementById("u");

    const passwordInput =
      document.getElementById("p");

    if (!usernameInput) {

      alert(
        "Input username tidak ditemukan"
      );

      return;

    }

    if (!passwordInput) {

      alert(
        "Input password tidak ditemukan"
      );

      return;

    }

    const username =
      usernameInput.value.trim();

    const password =
      passwordInput.value;

    alert(
      "Username: " + username
    );

    // Lanjutkan kode Supabase di bawah sini

  } catch (error) {

    alert(
      "ERROR: " + error.message
    );

    console.error(error);

  }

}

// ========================================
// LOGOUT
// ========================================

function logout() {

  localStorage.removeItem(
    "adminLoggedIn"
  );

  document
    .getElementById("app")
    .classList
    .add("hidden");

  document
    .getElementById("login")
    .classList
    .remove("hidden");

  document
    .getElementById("u")
    .value = "";

  document
    .getElementById("p")
    .value = "";

  alert("Berhasil keluar");

}


// ========================================
// NAVIGASI
// ========================================

async function page(p) {

  const pages = {
    dash,
    products,
    orders,
    payments,
    recap
  };

  if (pages[p]) {

    return await pages[p]();

  }

}


// ========================================
// DASHBOARD
// ========================================

async function dash() {

  $("#title").textContent =
    "Dashboard";

  $("#content").innerHTML =
    "<p>Memuat dashboard...</p>";

  try {

    const productList =
      await dbRequest(
        "products",
        "GET",
        "?select=*"
      );

    const orderList =
      await dbRequest(
        "orders",
        "GET",
        "?select=*"
      );

    $("#content").innerHTML = `

      <section class="panel">

        <h2>
          📊 Dashboard
        </h2>

        <p>
          Total Produk:
          <b>${productList.length}</b>
        </p>

        <p>
          Total Pesanan:
          <b>${orderList.length}</b>
        </p>

      </section>

    `;

  } catch (error) {

    $("#content").innerHTML = `

      <p>
        Gagal memuat dashboard:
        ${error.message}
      </p>

    `;

  }

}


// ========================================
// CEK LOGIN
// ========================================

window.addEventListener(
  "DOMContentLoaded",
  function () {

    const loginButton =
      document.getElementById(
        "loginButton"
      );

    if (loginButton) {

      loginButton.onclick =
        login;

    }
);

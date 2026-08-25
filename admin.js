localStorage.removeItem("adminLoggedIn");

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

  try {

    const username =
      document
        .getElementById("u")
        .value
        .trim();

    const password =
      document
        .getElementById("p")
        .value;

    if (!username || !password) {

      alert(
        "Username dan password wajib diisi"
      );

      return;

    }


    const result =
      await dbRequest(
        "admin_users",
        "GET",
        `?username=eq.${encodeURIComponent(username)}&password=eq.${encodeURIComponent(password)}&select=*`
      );


    if (
      Array.isArray(result) &&
      result.length > 0
    ) {

      localStorage.setItem(
        "adminLoggedIn",
        "true"
      );

      document
        .getElementById("login")
        .classList
        .add("hidden");

      document
        .getElementById("app")
        .classList
        .remove("hidden");


      page("dash");

    } else {

      alert(
        "Username atau password salah"
      );

    }

  } catch (error) {

    console.error(error);

    alert(
      "Login gagal: " +
      error.message
    );

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


    const isLoggedIn =
      localStorage.getItem(
        "adminLoggedIn"
      );

    if (isLoggedIn === "true") {

      document
        .getElementById("login")
        .classList
        .add("hidden");

      document
        .getElementById("app")
        .classList
        .remove("hidden");

      page("dash");

    }

  }
);

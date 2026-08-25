const SUPABASE_URL =
  "https://cwwzsbqfznzwfclajwnw.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_ADa_gyMfyBZ1ZcdUO8FRfw_iELzOmbQ";


async function simpleLogin() {

  alert("Tombol berhasil diklik");

  const username =
    document.getElementById("u").value.trim();

  const password =
    document.getElementById("p").value;

  if (!username || !password) {

    alert(
      "Username dan password harus diisi"
    );

    return;

  }


  try {

    const url =
      `${SUPABASE_URL}/rest/v1/admin_users` +
      `?username=eq.${encodeURIComponent(username)}` +
      `&password=eq.${encodeURIComponent(password)}` +
      `&select=*`;


    const response =
      await fetch(url, {

        headers: {

          apikey:
            SUPABASE_KEY,

          Authorization:
            `Bearer ${SUPABASE_KEY}`

        }

      });


    const result =
      await response.json();


    console.log(
      "Hasil login:",
      result
    );


    if (
      Array.isArray(result) &&
      result.length > 0
    ) {

      document
        .getElementById("login")
        .classList
        .add("hidden");


      document
        .getElementById("app")
        .classList
        .remove("hidden");


      alert(
        "Login berhasil"
      );


      if (
        typeof page === "function"
      ) {

        page("dash");

      }


    } else {

      alert(
        "Username atau password salah"
      );

    }


  } catch (error) {

    console.error(error);

    alert(
      "Gagal login: " +
      error.message
    );

  }

}

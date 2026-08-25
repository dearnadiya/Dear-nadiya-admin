alert("ADMIN.JS BERHASIL DIMUAT");

document.addEventListener("DOMContentLoaded", function () {

  const loginButton =
    document.getElementById("loginButton");

  if (loginButton) {

    loginButton.addEventListener(
      "click",
      function () {

        alert("TOMBOL BERHASIL DIKLIK");

      }
    );

  }

});

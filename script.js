/* =====================================================
   HAMBURGER MENU (NAVBAR MOBILE)
   Mengatur tombol hamburger agar menu navigasi
   dapat dibuka dan ditutup pada tampilan mobile
===================================================== */
const toggler = document.querySelector(".navbar-toggler"); // Tombol hamburger
const menu = document.querySelector("#menuCV");             // Menu navigasi

// Pastikan elemen tersedia sebelum diberi event
if (toggler && menu) {
  toggler.addEventListener("click", () => {
    // Menambah atau menghapus class 'show'
    // Class ini digunakan untuk menampilkan menu
    menu.classList.toggle("show");
  });
}

/* =====================================================
   EVENT DOM CONTENT LOADED
   Seluruh script di dalam blok ini akan dijalankan
   setelah struktur HTML selesai dimuat
===================================================== */
document.addEventListener("DOMContentLoaded", () => {

  /* =================================================
     NAVBAR OFFSET SCROLL
     Membuat scroll halus (smooth scroll) ke section
     dengan memperhitungkan tinggi navbar
  ================================================= */
  const navbar = document.querySelector(".navigasi-cv"); // Elemen navbar
  const navbarHeight = navbar ? navbar.offsetHeight : 0; // Tinggi navbar

  // Event klik pada setiap link navbar
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", e => {
      const targetId = link.getAttribute("href"); // ID tujuan

      // Pastikan link menuju section (diawali '#')
      if (targetId && targetId.startsWith("#")) {
        const target = document.querySelector(targetId);
        if (!target) return;

        // Mencegah scroll default browser
        e.preventDefault();

        // Scroll ke posisi section dengan efek halus
        window.scrollTo({
          top: target.offsetTop - navbarHeight, // Offset agar tidak tertutup navbar
          behavior: "smooth"
        });
      }
    });
  });

  /* =================================================
     ACTIVE NAVBAR ON SCROLL
     Menandai menu navbar yang sedang aktif
     berdasarkan posisi scroll halaman
  ================================================= */
  const sections = document.querySelectorAll("header[id], section[id]"); // Semua section ber-ID
  const navLinks = document.querySelectorAll(".nav-link");               // Semua link navbar

  window.addEventListener("scroll", () => {
    let currentId = ""; // Menyimpan ID section yang sedang aktif

    sections.forEach(section => {
      const top = section.offsetTop - navbarHeight - 20; // Posisi awal section
      const height = section.offsetHeight;               // Tinggi section

      // Mengecek apakah scroll berada dalam area section
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentId = section.id;
      }
    });

    // Menambahkan class 'active' pada navbar yang sesuai
    navLinks.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${currentId}`
      );
    });
  });

  /* =================================================
     TAB PROFIL
     Mengatur perpindahan konten profil menggunakan
     sistem tab tanpa reload halaman
  ================================================= */
  const tabs = document.querySelectorAll(".tab-link");     // Tombol tab
  const contents = document.querySelectorAll(".tab-content"); // Isi tab

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {

      // Menghapus status aktif dari semua tab dan konten
      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));

      // Mengaktifkan tab yang diklik
      tab.classList.add("active");

      // Menampilkan konten sesuai data-tab
      document
        .getElementById(tab.dataset.tab)
        ?.classList.add("active");
    });
  });

});
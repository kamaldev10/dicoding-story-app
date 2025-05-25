import Swal from "sweetalert2";

const NavigationView = {
  init(container, drawer) {
    this.container = container;
    this.drawer = drawer;
  },

  render({ userName, onNavigate, onLogout }) {
    this.container.innerHTML = `
        <a href="#mainContent" id="skip-to-content-btn" class="skip-to-content">Skip to main content</a>
      <nav class="md:px-8 flex justify-between items-center">
        <span class="text-xl font-semibold">
          <i class="fas fa-book-open mr-2 text-blue-600"></i>
          Dicoding Story App
        </span>
        <div class="hidden md:flex gap-10 items-center">
          <a id="home-btn" class="hover:text-blue-600 flex items-center">
            <i class="fas fa-home mr-1"></i>
            Home
          </a>
          <a id="about-btn" class="hover:text-blue-600 flex items-center">
            <i class="fas fa-info-circle mr-1"></i>
            About
          </a>
          <div class="flex items-center gap-3">
          <button id="logout-btn" aria-labelledby="logout-btn" class="text-red-500 hover:text-red-800 flex items-center bg-transparent px-3 py-1 rounded-lg  transition">
            <i class="fas fa-sign-out-alt mr-1"></i>
            Logout
          </button>
            <span class="text-gray-600 flex items-center">
              <i class="fas fa-user-circle mr-2 text-blue-500"></i>
              <span class="font-medium text-blue-600 ml-1">${userName}</span>
            </span>
          </div>
        </div>
        <button aria-labelledby="mobile-menu-button" id="mobile-menu-btn" class="md:hidden p-2 rounded-lg hover:bg-cyan-700">
          <i class="fas fa-bars text-xl"></i>
        </button>
      </nav>
    `;

    if (this.drawer) {
      this.drawer.innerHTML = `
        <nav class="p-4 space-y-4">
          <div class="border-b pb-4 mb-4">
            <div class="flex items-center">
              <i class="fas fa-user-circle text-2xl text-blue-500 mr-2"></i>
              <span class="font-medium">${userName}</span>
            </div>
          </div>
          <a id="drawer-home-btn" class="text-gray-800 hover:text-blue-500 flex items-center py-2">
            <i class="fas fa-home mr-3 w-4"></i>
            Home
          </a>
          <a id="drawer-about-btn" class="text-gray-800 hover:text-blue-500 flex items-center py-2">
            <i class="fas fa-info-circle mr-3 w-4"></i>
            About
          </a>
          <button aria-labelledby="logout-btn" id="drawer-logout-btn" class="text-red-500 hover:text-red-600 flex items-center py-2">
            <i class="fas fa-sign-out-alt mr-3 w-4"></i>
            Logout
          </button>
        </nav>
      `;
    }

    this._bindEvents(onNavigate, onLogout);
  },

  _bindEvents(onNavigate, onLogout) {
    // Navigasi utama
    document.getElementById("home-btn")?.addEventListener("click", () => {
      window.location.hash = "#/";
    });

    document.getElementById("about-btn")?.addEventListener("click", () => {
      window.location.hash = "#/about";
    });

    // Navigasi di drawer
    document
      .getElementById("drawer-home-btn")
      ?.addEventListener("click", () => {
        window.location.hash = "#/";
      });

    document
      .getElementById("drawer-about-btn")
      ?.addEventListener("click", () => {
        window.location.hash = "#/about";
      });

    // Logout
    document.getElementById("logout-btn")?.addEventListener("click", onLogout);
    document
      .getElementById("drawer-logout-btn")
      ?.addEventListener("click", onLogout);

    // Mobile menu toggle
    document
      .getElementById("mobile-menu-btn")
      ?.addEventListener("click", () => {
        this.drawer?.classList.toggle("-translate-x-full");
      });
  },

  confirmLogout() {
    return Swal.fire({
      title: "Are you sure to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Logout",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => result.isConfirmed);
  },

  redirectToLogin() {
    return (window.location.hash = "#/login");
  },
};

export default NavigationView;

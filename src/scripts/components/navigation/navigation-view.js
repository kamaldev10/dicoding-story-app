const NavigationView = {
  init(container, presenter) {
    this.presenter = presenter;
    this.render(container);
  },

  render(container) {
    const token = localStorage.getItem("authToken");
    const userName = localStorage.getItem("userName") || "User";

    if (token) {
      container.innerHTML = `
      <div class="absolute top-16 left-1/2 transform">
        <a href="#main-content" class="skip-to-content">Skip to main content</a>    
      </div>
      <nav class="md:px-8 flex justify-between items-center">
          <span class="text-xl font-semibold">
            <i class="fas fa-book-open mr-2 text-blue-600" ></i>
            Dicoding Story App
          </span>
          <div class="hidden md:flex gap-10 items-center">
            <a href="#/" class="hover:text-blue-600 flex items-center">
              <i class="fas fa-home mr-1"></i>
              Home
            </a>
            <a href="#/about" class="hover:text-blue-600 flex items-center">
              <i class="fas fa-info-circle mr-1"></i>
              About
            </a>
            <div class="flex items-center gap-3">
              <span class="text-gray-600 flex items-center">
                <i class="fas fa-user-circle mr-2 text-blue-500"></i>
                <span class="font-medium text-blue-600 ml-1">${userName}</span>
              </span>
              <a href="#/logout" class="text-red-500 hover:text-red-600 flex items-center bg-transparent px-3 py-1 rounded-lg hover:bg-red-100 transition">
                <i class="fas fa-sign-out-alt mr-1"></i>
                Logout
              </a>
            </div>
          </div>
          <!-- Mobile menu button -->
          <button id="mobile-menu-btn" class="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <i class="fas fa-bars text-xl"></i>
          </button>
        </nav>
      `;

      const drawer = document.getElementById("navigation-drawer");
      if (drawer) {
        drawer.innerHTML = `
       <a href="#main-content" class="skip-to-content">Skip to main content</a>   
        <nav class="p-4 space-y-4">
            <div class="border-b pb-4 mb-4">
              <div class="flex items-center">
                <i class="fas fa-user-circle text-2xl text-blue-500 mr-2"></i>
                <span class="font-medium">${userName}</span>
              </div>
            </div>
            <a href="#/" class=" text-gray-800 hover:text-blue-500 flex items-center py-2">
              <i class="fas fa-home mr-3 w-4"></i>
              Home
            </a>
            <a href="#/about" class=" text-gray-800 hover:text-blue-500 flex items-center py-2">
              <i class="fas fa-info-circle mr-3 w-4"></i>
              About
            </a>
            <a href="#/logout" class=" text-red-500 hover:text-red-600 flex items-center py-2">
              <i class="fas fa-sign-out-alt mr-3 w-4"></i>
              Logout
            </a>
          </nav>
        `;
      }
    } else {
      container.innerHTML = `
      <a href="#main-content" class="skip-to-content">Skip to main content</a>   
      <nav class="md:px-8 flex justify-between items-center">
          <span class="text-xl font-semibold">
            <i class="fas fa-book-open mr-2 text-blue-600" aria-label="icon app"></i>
            Dicoding Story App
          </span>
          <div class="hidden md:flex gap-7 items-center">
            <a href="#/about" class="hover:text-blue-600 flex items-center">
              <i class="fas fa-info-circle mr-1"></i>
              About
            </a>
            <a href="#/login" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center">
              <i class="fas fa-sign-in-alt mr-1"></i>
              Login
            </a>
            <a href="#/register" class="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition flex items-center">
              <i class="fas fa-user-plus mr-1"></i>
              Register
            </a>
          </div>
          <!-- Mobile menu button -->
          <button id="mobile-menu-btn" class=" p-2 rounded-lg hover:bg-gray-100">
            <i class="fas fa-bars text-xl"></i>
          </button>
        </nav>
      `;

      const drawer = document.getElementById("navigation-drawer");
      if (drawer) {
        drawer.innerHTML = `
        <a href="#main-content" class="skip-to-content">Skip to main content</a> 
        <nav class="p-4 space-y-4">
            <a href="#/about" class=" text-gray-800 hover:text-blue-500 flex items-center py-2">
              <i class="fas fa-info-circle mr-3 w-4"></i>
              About
            </a>
            <a href="#/login" class=" bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center">
              <i class="fas fa-sign-in-alt mr-2"></i>
              Login
            </a>
            <a href="#/register" class=" border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition flex items-center justify-center">
              <i class="fas fa-user-plus mr-2"></i>
              Register
            </a>
          </nav>
        `;
      }
    }

    this._addEventListeners();
  },

  _addEventListeners() {
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const drawer = document.getElementById("navigation-drawer");

    if (mobileMenuBtn && drawer) {
      mobileMenuBtn.addEventListener("click", () => {
        drawer.classList.toggle("-translate-x-full");
      });
    }

    const logoutLink = document.querySelector('a[href="#/logout"]');
    if (logoutLink) {
      logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        this._handleLogout();
      });
    }
  },

  _handleLogout() {
    if (confirm("Apakah Anda yakin ingin logout?")) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("userId"); // Jika ada

      this._showMessage("Logout berhasil!", "success");

      this.refresh();

      window.location.hash = "#/login";
    }
  },

  _showMessage(message, type) {
    const notification = document.createElement("div");
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
      type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
    }`;

    notification.innerHTML = `
      <div class="flex items-center">
        <i class="fas ${type === "success" ? "fa-check-circle" : "fa-exclamation-circle"} mr-2"></i>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  },

  refresh() {
    const container = document.querySelector("nav").parentElement;
    this.render(container);
  },

  updateUserName(newUserName) {
    localStorage.setItem("userName", newUserName);
    this.refresh();
  },
};

export default NavigationView;

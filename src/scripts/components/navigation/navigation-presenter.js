class NavigationPresenter {
  constructor() {
    this.view = null;
  }

  setView(view) {
    this.view = view;
  }

  onLoginSuccess(userData) {
    localStorage.setItem("authToken", userData.token);
    localStorage.setItem(
      "userName",
      userData.name || userData.username || "User"
    );
    localStorage.setItem("userId", userData.id || userData.userId || "");

    if (this.view) {
      this.view.refresh();
    }

    window.location.hash = "#/";
  }

  onLogout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");

    if (this.view) {
      this.view.refresh();
    }

    window.location.hash = "#/login";
  }

  isLoggedIn() {
    const token = localStorage.getItem("authToken");
    return token !== null && token !== undefined && token !== "";
  }

  getCurrentUser() {
    if (!this.isLoggedIn()) {
      return null;
    }

    return {
      token: localStorage.getItem("authToken"),
      userName: localStorage.getItem("userName") || "User",
      userId: localStorage.getItem("userId") || "",
    };
  }

  updateUserProfile(userData) {
    if (userData.name || userData.username) {
      localStorage.setItem("userName", userData.name || userData.username);
    }

    if (userData.token) {
      localStorage.setItem("authToken", userData.token);
    }

    if (this.view) {
      this.view.refresh();
    }
  }

  async validateToken() {
    const token = localStorage.getItem("authToken");

    if (!token) {
      return false;
    }

    try {
      const response = await fetch("/api/validate-token", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        this.onLogout();
        return false;
      }

      const result = await response.json();

      if (result.user) {
        this.updateUserProfile(result.user);
      }

      return true;
    } catch (error) {
      console.error("Token validation failed:", error);
      this.onLogout();
      return false;
    }
  }

  setupStorageListener() {
    window.addEventListener("storage", (e) => {
      if (e.key === "authToken" || e.key === "userName") {
        if (this.view) {
          this.view.refresh();
        }
      }
    });
  }

  init() {
    this.setupStorageListener();
  }
}

export default NavigationPresenter;

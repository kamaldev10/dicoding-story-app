export class NavigationModel {
  constructor() {
    this.#setupStorageListener();
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

  setAuthData(userData) {
    localStorage.setItem("authToken", userData.token);
    localStorage.setItem(
      "userName",
      userData.name || userData.username || "User"
    );
    localStorage.setItem("userId", userData.id || userData.userId || "");
  }

  clearAuthData() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
  }

  updateUserProfile(userData) {
    if (userData.name || userData.username) {
      localStorage.setItem("userName", userData.name || userData.username);
    }
    if (userData.token) {
      localStorage.setItem("authToken", userData.token);
    }
  }

  async validateToken() {
    const token = localStorage.getItem("authToken");
    if (!token) return false;

    try {
      const response = await fetch(token, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        this.clearAuthData();
        return false;
      }

      const result = await response.json();
      if (result.user) {
        this.updateUserProfile(result.user);
      }

      return true;
    } catch (error) {
      console.error("Token validation failed:", error);
      this.clearAuthData();
      return false;
    }
  }

  #setupStorageListener() {
    window.addEventListener("storage", (e) => {
      if (["authToken", "userName", "userId"].includes(e.key)) {
        window.dispatchEvent(new CustomEvent("auth-changed"));
      }
    });
  }
}

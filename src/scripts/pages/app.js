import { footerPresenter } from "../components/footer/footer-presenter";
import NavigationPresenter from "../components/navigation/navigation-presenter";
import NavigationView from "../components/navigation/navigation-view";
import routes from "../routes/routes";

import { getActiveRoute, parseActivePathname } from "../routes/url-parser";

class App {
  #content = null;
  #navigationDrawer = null;
  #navigationContainer = null;
  #navigationPresenter = null;

  constructor({ navigationDrawer, content, navigationContainer }) {
    this.#content = content;
    this.#navigationDrawer = navigationDrawer;
    this.#navigationContainer = navigationContainer;
    this.#navigationPresenter = new NavigationPresenter();

    this.#setupDrawerEvents();
  }

  async renderPage() {
    const url = getActiveRoute();
    const page = routes[url] || routes["/"];
    const urlSegments = parseActivePathname();

    if (url === "/") {
      window.history.replaceState(null, "", "/home");
    }

    const isAuthPage = url === "/login" || url === "/register";

    if (!isAuthPage) {
      // Render navigation and footer when not on auth pages
      NavigationView.init(this.#navigationContainer, this.#navigationPresenter);
      this.#navigationPresenter.setView(NavigationView);
      this.#navigationContainer.style.display = "block";
      this.#navigationDrawer.style.display = "block";

      // Initialize and render the footer
      await footerPresenter.init(); // Ensure footer is initialized
    } else {
      // Hide navigation and footer on auth pages
      this.#navigationContainer.innerHTML = "";
      this.#navigationContainer.style.display = "none";
      this.#navigationDrawer.style.display = "none";

      // Optionally clear the footer if needed
      footerPresenter.clear(); // Clear the footer if on auth pages
    }

    try {
      // Using View Transition API if supported
      if (document.startViewTransition) {
        document.startViewTransition(async () => {
          this.#content.innerHTML = await page.render(urlSegments);
          if (typeof page.afterRender === "function") {
            await page.afterRender(urlSegments);
          }
        });
      } else {
        // Fallback if View Transition API is not supported
        this.#content.innerHTML = await page.render(urlSegments);
        if (typeof page.afterRender === "function") {
          await page.afterRender(urlSegments);
        }
      }
    } catch (error) {
      console.error("Render page error:", error);
      this.#content.innerHTML = `<div class="text-center text-red-600 py-8">Oops! Failed to load the page.</div>`;
    }
  }

  #setupDrawerEvents() {
    this.#navigationDrawer.addEventListener("click", (e) => {
      if (e.target.tagName.toLowerCase() === "a") {
        this.#navigationDrawer.classList.remove("open");
      }
    });
  }
}

export default App;

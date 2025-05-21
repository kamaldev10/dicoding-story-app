import "../styles/styles.css";
import App from "./pages/app";

document.addEventListener("DOMContentLoaded", async () => {
  const mainContent = document.querySelector("#mainContent");
  const drawerButton = document.querySelector("#drawer-button");
  const navigationDrawer = document.querySelector("#navigation-drawer");
  const navigationContainer = document.querySelector("#navigation-container");

  const app = new App({
    content: mainContent,
    drawerButton: drawerButton,
    navigationDrawer: navigationDrawer,
    navigationContainer: navigationContainer,
  });
  await app.renderPage();

  window.addEventListener("hashchange", async () => {
    await app.renderPage();
  });

  window.addEventListener("load", async () => {
    await app.renderPage();
  });
});

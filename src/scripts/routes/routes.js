import LoginPage from "../pages/auth/login/login-page";
import RegisterPage from "../pages/auth/register/register-page";
import HomePage from "../pages/home/home-page";
import DetailPage from "../pages/detail-story/detail-page";
import AboutPage from "../pages/about/about-page";
import AddStoryPage from "../pages/add-story/add-story-page";

const routes = {
  "/": HomePage,
  "/login": LoginPage,
  "/register": RegisterPage,
  "/about": AboutPage,
  "/stories/:id": DetailPage,
  "/stories/add-story": AddStoryPage,
};

export default routes;

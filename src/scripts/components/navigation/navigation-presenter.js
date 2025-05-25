import NavigationModel from "./navigation-model";
import toastr from "toastr";

export class NavigationPresenter {
  #view;
  #model;

  constructor(model = new NavigationModel()) {
    this.#model = model;
  }

  init(view, { container, drawer }) {
    this.#view = view;
    this.#view.init(container, drawer);

    const userName = this.#model.getUserName();

    this.#view.render({
      userName,
      onLogout: this.#handleLogout.bind(this),
    });
  }

  async #handleLogout() {
    const confirmed = await this.#view.confirmLogout();
    if (confirmed) {
      this.#model.clearUserData();
      this.#view.redirectToLogin();
      toastr.success("Logout sukses");
    }
  }
}

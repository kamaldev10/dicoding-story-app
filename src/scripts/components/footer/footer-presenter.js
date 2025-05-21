import { FooterModel } from "./footer-model.js";
import { footerView } from "./footer-view.js";

export const footerPresenter = {
  async init() {
    const model = new FooterModel(); // Create an instance of FooterModel
    const footerElement = document.getElementById("footer");
    if (footerElement) {
      footerElement.innerHTML = await footerView.render(model); // Pass the model to render
      await footerView.afterRender();
    }
  },

  clear() {
    const footerElement = document.getElementById("footer");
    if (footerElement) {
      footerElement.innerHTML = ""; // Clear the footer content
    }
  },
};

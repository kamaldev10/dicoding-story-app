import AboutView from "./about-view";
import AboutPresenter from "./about-presenter";

const AboutPage = {
  async render() {
    this.view = new AboutView();
    this.presenter = new AboutPresenter(this.view);

    await this.presenter.loadStory(); // Memuat data dan merender tampilan
    return this.view.getContainer().innerHTML; // Mengembalikan HTML yang dihasilkan
  },
  async afterRender() {
    // Jika ada logika tambahan setelah render, tambahkan di sini
  },
};

export default AboutPage;

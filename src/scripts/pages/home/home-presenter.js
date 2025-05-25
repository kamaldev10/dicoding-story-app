export class HomePresenter {
  constructor(view, token, model) {
    this.view = view;
    this.token = token;
    this.model = model;
    this.currentPage = 1;
    this.filterLocation = false;
  }

  async loadStories() {
    try {
      this.view.showLoading();
      const response = await this.model.getAllStories({
        token: this.token,
        page: this.currentPage,
        location: this.filterLocation ? 1 : 0,
        size: 10,
      });

      this.view.showStories(response.listStory);
      this.view.updatePagination(response.isLastPage, this.currentPage);
    } catch (err) {
      this.view.showError(
        err.message || "Terjadi kesalahan saat mengambil data."
      );
    } finally {
      this.view.hideLoading();
    }
  }

  nextPage() {
    this.currentPage++;
    this.loadStories();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadStories();
    }
  }

  setLocationFilter(checked) {
    this.filterLocation = checked;
    this.currentPage = 1;
    this.loadStories();
  }
}

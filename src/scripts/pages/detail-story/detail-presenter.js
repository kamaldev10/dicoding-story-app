import { StoryApi } from "../../data/story-api";

export class DetailPresenter {
  constructor(view) {
    this.view = view;
    this.api = new StoryApi();
  }

  async loadStory(id) {
    const token = localStorage.getItem("authToken");
    if (!token) {
      this.view.showError("Token tidak ditemukan. Silakan login.");
      return;
    }

    try {
      this.view.renderLoading();

      const result = await this.api.getStoryById({ id, token });

      if (result.error) {
        throw new Error(result.message);
      }

      this.view.renderStory(result.story);

      if (result.story.lat && result.story.lon) {
        this.view.renderMap(
          result.story.lat,
          result.story.lon,
          result.story.description
        );
      } else {
        this.view.renderNoLocation();
      }
    } catch (err) {
      this.view.showError(err.message);
    }
  }
}

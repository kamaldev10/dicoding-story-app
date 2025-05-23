import { CameraUtils } from "../../utils/camera-utils.js";
import { MapUtils } from "../../utils/map-utils.js";

export class AddStoryPresenter {
  constructor(view, model, token) {
    this.view = view;
    this.token = token;
    this.model = model;
  }

  async submitNewStory({ description, photo, lat, lon }) {
    try {
      this.view.showLoading();
      await this.model.addStory({
        token: this.token,
        description,
        photo,
        lat,
        lon,
      });
      this.view.resetForm();
      alert("Cerita berhasil dikirim!");
    } catch (err) {
      this.view.showError(err.message);
    } finally {
      this.view.hideLoading();
    }
  }

  async initCamera(videoElement) {
    try {
      await CameraUtils.startCamera(videoElement); // gunakan CameraUtils
    } catch (err) {
      console.error("Kamera tidak tersedia:", err);
      this.view.showError(
        "Kamera tidak tersedia. Silakan pilih file secara manual."
      );
    }
  }

  stopCamera() {
    CameraUtils.stopCamera(); // gunakan CameraUtils
  }

  initMap({ latInput, lonInput }) {
    MapUtils.initMap({ mapContainerId: "map", latInput, lonInput });
  }

  navigateBack() {
    window.location.hash = "/";
  }
}

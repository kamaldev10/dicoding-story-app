// File: add-story-presenter.js

import { StoryApi } from "../../data/story-api.js";

export class AddStoryPresenter {
  constructor(view, token) {
    this.view = view;
    this.token = token;
    this.stream = null;
    this.map = null;
    this.marker = null;
  }

  async submitNewStory({ description, photo, lat, lon }) {
    try {
      this.view.showLoading();
      await new StoryApi().addStory({
        token: this.token,
        description,
        photo,
        lat,
        lon,
      });

      // Redirect back to home page after successful submission
      window.location.hash = "/";
    } catch (err) {
      this.view.showError(err.message);
    } finally {
      this.view.hideLoading();
    }
  }

  async initCamera(videoElement) {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoElement.srcObject = this.stream;
      await videoElement.play();
    } catch (err) {
      console.error("Kamera tidak tersedia:", err);
      this.view.showError(
        "Kamera tidak tersedia. Silakan pilih file secara manual."
      );
    }
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
  }

  initMap({ latInput, lonInput }) {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }

    setTimeout(() => {
      const mapEl = document.getElementById("map");
      if (!mapEl) {
        console.error("Elemen #map tidak ditemukan di DOM");
        return;
      }

      this.map = L.map(mapEl).setView([-6.2, 106.8], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        this.map
      );

      this.map.on("click", (e) => {
        const { lat, lng } = e.latlng;
        if (this.marker) {
          this.marker.setLatLng(e.latlng);
        } else {
          this.marker = L.marker(e.latlng).addTo(this.map);
        }
        latInput.value = lat;
        lonInput.value = lng;
      });
    }, 100);
  }

  navigateBack() {
    window.location.hash = "/";
  }
}

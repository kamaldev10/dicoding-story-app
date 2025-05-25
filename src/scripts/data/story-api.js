import CONFIG from "../config";

export class StoryApi {
  constructor(baseUrl = CONFIG.BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async getAllStories({ page = 1, size = 10, token, location = 1 }) {
    const url = `${this.baseUrl}/stories?page=${page}&size=${size}&location=${location}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }

    return result;
  }

  async getStoryById({ id, token }) {
    const url = `${this.baseUrl}/stories/${id}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }

    return result;
  }

  async addStory({ token, description, photo, lat = null, lon = null }) {
    const formData = new FormData();
    formData.append("description", description);
    formData.append("photo", photo);

    if (lat !== null && lon !== null) {
      formData.append("lat", lat);
      formData.append("lon", lon);
    }

    const response = await fetch(`${this.baseUrl}/stories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }

    return result;
  }

  getToken() {
    return localStorage.getItem("authToken");
  }
}

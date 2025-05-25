// File: home-view.js

export class HomeView {
  constructor() {
    this.storyList = document.getElementById("story-list");
    this.loading = document.getElementById("loading");
    this.errorMessage = document.getElementById("error-message");
    this.prevPageBtn = document.getElementById("prev-page");
    this.nextPageBtn = document.getElementById("next-page");
    this.addStoryBtn = document.getElementById("add-story");
  }

  showLoading() {
    this.loading.classList.remove("hidden");
  }

  hideLoading() {
    this.loading.classList.add("hidden");
  }

  showError(msg) {
    this.errorMessage.textContent = msg;
  }

  showStories(stories) {
    this.storyList.innerHTML = "";

    if (!stories.length) {
      this.storyList.innerHTML = `<p class="text-gray-600">Tidak ada cerita.</p>`;
      return;
    }

    stories.forEach((story) => {
      const card = document.createElement("div");
      card.className = "border rounded md:flex cursor-pointer my-3";
      card.innerHTML = `
          <div class="md:shrink-0">
            <img src="${story.photoUrl}" alt="${story.name}" class="h-48 max-w-md object-cover md:h-full md:w-48 sm:w-full sm:h-full">
          </div>
          <div class="p-8">
            <h1 class="capitalize tracking-wide text-sm text-black font-semibold">${story.name}</h1>
            <p class="mt-2 text-black">${story.description}</p>
            ${
              story.lat && story.lon
                ? `<p class="text-sm text-black">\ud83d\udccd ${story.lat.toFixed(
                    2
                  )}, ${story.lon.toFixed(2)}</p>`
                : ""
            }
          </div>
        `;
      card.addEventListener("click", () => {
        window.location.hash = `/stories/${story.id}`;
      });
      this.storyList.appendChild(card);
    });
  }

  updatePagination(isLastPage, currentPage) {
    this.prevPageBtn.disabled = currentPage === 1;
    this.nextPageBtn.disabled = isLastPage;
  }

  showModalError(msg) {
    this.showError(msg);
  }
}

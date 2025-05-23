export const MapUtils = {
  initMap({ mapContainerId, onLocationSelect }) {
    const mapEl = document.getElementById(mapContainerId);
    if (!mapEl) {
      console.error("Elemen map tidak ditemukan:", mapContainerId);
      return null;
    }

    const map = L.map(mapEl).setView([-6.2, 106.8], 13);
    let marker = null;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map
    );

    map.on("click", (e) => {
      const { lat, lng } = e.latlng;

      if (marker) {
        marker.setLatLng(e.latlng);
      } else {
        marker = L.marker(e.latlng).addTo(map);
      }

      if (typeof onLocationSelect === "function") {
        onLocationSelect(lat, lng);
      }
    });

    return { map, marker };
  },

  destroyMap(mapInstance) {
    if (mapInstance) {
      mapInstance.remove();
    }
  },
};

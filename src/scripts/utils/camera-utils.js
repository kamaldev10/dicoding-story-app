export const CameraUtils = {
  async initCamera(videoEl) {
    try {
      console.log("Meminta akses kamera...");
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log("Akses kamera diterima");
      videoEl.srcObject = stream;
      await videoEl.play();
      console.log("Video diputar");
    } catch (err) {
      console.error("Gagal mengakses kamera:", err);
    }
  },

  capturePhoto({
    videoEl,
    canvasEl,
    previewImgEl,
    photoInputEl,
    captureBtn,
    recaptureBtn,
  }) {
    const context = canvasEl.getContext("2d");
    canvasEl.width = videoEl.videoWidth;
    canvasEl.height = videoEl.videoHeight;
    context.drawImage(videoEl, 0, 0);

    canvasEl.toBlob(
      (blob) => {
        const file = new File([blob], "captured.jpg", { type: "image/jpeg" });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        photoInputEl.files = dataTransfer.files;

        const imgUrl = URL.createObjectURL(file);
        previewImgEl.src = imgUrl;
        previewImgEl.classList.remove("hidden");
        videoEl.classList.add("hidden");
        recaptureBtn.classList.remove("hidden");
        captureBtn.classList.add("hidden");
      },
      "image/jpeg",
      0.9
    );
  },

  resetCapture({
    videoEl,
    previewImgEl,
    photoInputEl,
    captureBtn,
    recaptureBtn,
  }) {
    previewImgEl.src = "";
    previewImgEl.classList.add("hidden");
    videoEl.classList.remove("hidden");
    recaptureBtn.classList.add("hidden");
    captureBtn.classList.remove("hidden");
    photoInputEl.value = "";
  },
};

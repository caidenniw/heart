const bodyEl = document.querySelector("body");

// Fungsi untuk membuat heart animation
function createHeart(xPos, yPos) {
  const spanEl = document.createElement("span");

  spanEl.style.left = xPos + "px";
  spanEl.style.top = yPos + "px";

  const size = Math.random() * 100;
  spanEl.style.width = size + "px";
  spanEl.style.height = size + "px";

  bodyEl.appendChild(spanEl);

  setTimeout(() => {
    spanEl.remove();
  }, 3000);
}

// Deteksi apakah device adalah mobile
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

if (isMobile) {
  // Untuk mobile: gunakan touch move (saat swipe/geser layar)
  let lastTouchTime = 0;
  const touchThrottle = 50; // milliseconds untuk performa lebih baik

  bodyEl.addEventListener(
    "touchmove",
    (event) => {
      const currentTime = Date.now();

      // Throttle untuk performa lebih baik
      if (currentTime - lastTouchTime < touchThrottle) {
        return;
      }

      lastTouchTime = currentTime;

      // Ambil posisi touch saat swipe/geser
      const touch = event.touches[0];
      const xPos = touch.clientX;
      const yPos = touch.clientY;

      createHeart(xPos, yPos);
    },
    { passive: true }
  );
} else {
  // Untuk desktop: gunakan mousemove seperti biasa
  bodyEl.addEventListener("mousemove", (event) => {
    const xPos = event.offsetX;
    const yPos = event.offsetY;

    createHeart(xPos, yPos);
  });
}

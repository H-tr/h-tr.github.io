// Load and play videos marked data-lazy only while they are on screen,
// so below-the-fold clips don't compete with the first one for bandwidth.
(function () {
  const videos = document.querySelectorAll("video[data-lazy]");

  if (!("IntersectionObserver" in window)) {
    videos.forEach((video) => video.play().catch(() => {}));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else if (!video.paused) {
          video.pause();
        }
      });
    },
    { rootMargin: "200px 0px" }
  );

  videos.forEach((video) => observer.observe(video));
})();

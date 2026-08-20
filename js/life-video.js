function formatDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "Duration unavailable";
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `Duration: ${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  return `Duration: ${minutes}:${String(secs).padStart(2, "0")}`;
}

export function initLifeVideo() {
  const video = document.getElementById("personal-video");
  const placeholder = document.getElementById("video-placeholder");
  const durationDisplay = document.getElementById("video-duration-display");

  if (!video) return;

  const showVideo = () => {
    video.style.display = "block";

    if (placeholder) {
      placeholder.hidden = true;
      placeholder.style.display = "none";
    }
  };

  const showError = () => {
    video.style.display = "none";

    if (placeholder) {
      placeholder.hidden = false;
      placeholder.style.display = "flex";
    }

    if (durationDisplay) {
      durationDisplay.textContent = "Video unavailable";
    }
  };

  // Video metadata successfully loaded
  video.addEventListener("loadedmetadata", () => {
    showVideo();

    if (durationDisplay) {
      durationDisplay.textContent = formatDuration(video.duration);
    }
  });

  // Browser has enough data to start playback
  video.addEventListener("canplay", showVideo);

  // Video data actually loaded
  video.addEventListener("loadeddata", showVideo);

  // Only show fallback when the browser reports a REAL media error
  video.addEventListener("error", () => {
    console.error("Life video error:", video.error);
    showError();
  });

  // Explicitly tell browser to load the source
  video.load();
}
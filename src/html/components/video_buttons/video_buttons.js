const buttons = [
  "new-members-bttn",
  "staff-bttn",
  "articles-bttn",
  "contact-bttn",
  "hearthside-bttn"
];
const videoSrc = [
  "components/video_buttons/videos/xinzhao-video.mp4",
  "components/video_buttons/videos/bilgewater-video.webm",
  "components/video_buttons/videos/velkoz-video.mp4",
  "components/video_buttons/videos/diana-video.mp4",
  "components/video_buttons/videos/sona-video.webm"
];

for (let j = 0; j < 2; j++) {
  buttons.map((el, i) => {
    const video = document.createElement("video");
    video.src = videoSrc[i];
    video.muted = true;
    video.loop = true;
    video.setAttribute("width", "100%");
    video.setAttribute("height", "100%");
    video.style.objectFit = "cover";
    document
      .getElementById(`${el}-wrapper`)
      .addEventListener("mouseenter", e => {
        video.play();
      });
    document
      .getElementById(`${el}-wrapper`)
      .addEventListener("mouseleave", e => {
        video.pause();
      });
    if (j > 0) el += "-mobile";
    document.getElementById(el).appendChild(video);
  });
}

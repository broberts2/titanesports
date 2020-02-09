const videoLoop = document.getElementById("video-loop");

if (videoLoop) {
  const path = "components/video_loop/videos";
  const videos = [
    { src: "leona.mp4", type: "video/mp4" },
    { src: "pyke.mp4", type: "video/mp4" },
    { src: "nunu.mp4", type: "video/mp4" },
    { src: "bard.mp4", type: "video/mp4" },
    { src: "neeko.mp4", type: "video/mp4" },
    { src: "caitlyn.mp4", type: "video/mp4" },
    { src: "illaoi.mp4", type: "video/mp4" },
    { src: "aurelion-sol.mp4", type: "video/mp4" },
    { src: "kindred.mp4", type: "video/mp4" },
    { src: "zoe.mp4", type: "video/mp4" },
    { src: "orianna.mp4", type: "video/mp4" },
    { src: "irelia.mp4", type: "video/mp4" },
    { src: "ryze.mp4", type: "video/mp4" },
    { src: "kalista.mp4", type: "video/mp4" },
    { src: "udyr.mp4", type: "video/mp4" },
    { src: "taliyah.mp4", type: "video/mp4" },
    { src: "vs.mp4", type: "video/mp4" },
    { src: "azir.mp4", type: "video/mp4" }
  ];

  const cycleTime = 36000;

  let index = Math.floor(Math.random() * videos.length);

  const setVideo = id => {
    index = index < videos.length - 1 ? index + 1 : 0;
    document.getElementById(id).innerHTML = `
      <video muted preload="auto" loop autoPlay>
        <source src="${path}/${videos[index].src}" type="${videos[index].type}" />
      </video>
    `;
  };

  videoLoop.innerHTML = `
    <div class="video_loop">
      <div id="video1" class="video1"></div>
      <div id="video2" class="video2"></div>
    </div>
  `;

  const video2 = document.getElementById("video2");

  setVideo("video1");
  setVideo("video2");

  const cycle = async () => {
    await new Promise((resolve, reject) =>
      setTimeout(() => resolve(), cycleTime / 4)
    );
    video2.classList.remove("anim-video-fade-out");
    video2.classList.add("anim-video-fade-in");
    await new Promise((resolve, reject) =>
      setTimeout(() => resolve(), cycleTime / 4)
    );
    setVideo("video1");
    await new Promise((resolve, reject) =>
      setTimeout(() => resolve(), cycleTime / 4)
    );
    video2.classList.remove("anim-video-fade-in");
    video2.classList.add("anim-video-fade-out");
    await new Promise((resolve, reject) =>
      setTimeout(() => resolve(), cycleTime / 4)
    );
    setVideo("video2");
  };

  cycle();
  setInterval(() => cycle(), cycleTime);
}

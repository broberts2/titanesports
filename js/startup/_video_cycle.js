const _video_cycle = () => {
  const cycle_time = 20000;
  const fade_time = 3000;
  const video_paths = [
    "/static/webm/c-o-animated-azir.mp4",
    "/static/webm/c-o-animated-nunu.mp4",
    "/static/webm/c-o-animated-aurelionsol.mp4",
    "/static/webm/c-o-animated-kindred.mp4",
    "/static/webm/c-o-animated-nami.mp4",
    "/static/webm/c-o-animated-yasuo-dead.mp4"
  ];

  let video_index = Math.floor(Math.random() * (video_paths.length - 1));
  const _set_next = () => {
    video_index = video_index < video_paths.length - 1 ? video_index + 1 : 0;
    return new Number(video_index);
  };
  const _set_video = src =>
    `<video muted="true" preload="auto" loop autoPlay><source src="${src}" type="video/webm"></source></video>`;
  const element = document.getElementById("video-background");
  element.innerHTML = `<div style="width: inherit;" id="video_1"></div><div style="width: inherit;" id="video_2"></div>`;
  const video_1 = document.getElementById("video_1");
  const video_2 = document.getElementById("video_2");
  video_2.innerHTML = _set_video(video_paths[_set_next()]);
  video_1.innerHTML = _set_video(video_paths[_set_next()]);
  setTimeout(
    () =>
      $(video_2).fadeOut(fade_time, () => {
        video_2.innerHTML = _set_video(video_paths[_set_next()]);
      }),
    cycle_time / 2
  );
  window.setInterval(() => {
    $(video_2).fadeIn(fade_time, () => {
      video_1.innerHTML = _set_video(video_paths[_set_next()]);
    });
    setTimeout(
      () =>
        $(video_2).fadeOut(fade_time, () => {
          video_2.innerHTML = _set_video(video_paths[_set_next()]);
        }),
      cycle_time / 2
    );
  }, cycle_time);
};
_video_cycle();

const _request = async (id, pre, cb) => {
  let time_out_limit = 7000;
  let lc = document.getElementById(id).innerHTML;
  if (id) {
    let spinner = document.createElement("div");
    spinner.innerHTML = `
      <div class="d-flex justify-content-center" id="util-spinner">
        <div class="spinner-border text-danger" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    `;
    document.getElementById(id).innerHTML = spinner.innerHTML;
  }
  const res = await new Promise(async (resolve, reject) => {
    setTimeout(
      () => resolve({ code: 408, msg: "request timed out" }),
      time_out_limit
    );
    const request = await cb(pre);
    resolve(request);
  });
  if (id) {
    let codeDiv = _accessNestedById(id, "code");
    if (codeDiv && res.code > 299) {
      codeDiv.innerHTML = res.msg;
    } else if (codeDiv) {
      codeDiv.innerHTML = "";
    }
    document.getElementById(id).innerHTML = lc;
  }
  return res;
};

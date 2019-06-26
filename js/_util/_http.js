const _http_get = async obj => {
  const titan_key = _read_cookie().titan_key;
  try {
    let request = await $.ajax(
      Object.assign(obj, {
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        headers: {
          titan_key
        }
      })
    );
    return { msg: request, code: 200 };
  } catch (e) {
    console.log(e);
    return { msg: e.responseJSON.error, code: 404 };
  }
};

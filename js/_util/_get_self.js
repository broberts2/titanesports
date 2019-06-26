const _get_self = () => {
  return _request(null, {}, obj => _http_get(obj));
};

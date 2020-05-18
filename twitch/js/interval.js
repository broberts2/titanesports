const _cycle = async () => {
  const _events = await Api.eventdata();
  const _gameData = await Api.gamestats();
  if(!EVENTS) EVENTS = _events;
  if (_events.length > EVENTS.length) ACTION(_events.pop(), _gameData);
};

setInterval(() => _cycle(), 100);

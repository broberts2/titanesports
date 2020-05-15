const _cycle = async () => {
  const _events = await Api.eventdata();
  const _gameData = await Api.eventdata();
  console.log(_events);
  console.log(_gameData);
  if (_events.length > EVENTS.length) ACTION(_events.pop(), _gameData);
};

setInterval(() => _cycle(), 5000);

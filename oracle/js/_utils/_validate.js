const _pos = require("./_pos");

module.exports = async (role, command, Sheet) => {
  const range = "A1:AN26";
  await Sheet.setup();
  const sheet = await Sheet.getTeamBySheet(role.name);
  const sheet2 = await Sheet.getTeamBySheet("Standings and Rosters");
  const pos = _pos(command.args[1].toLowerCase());
  let cell2 = null;
  if (sheet && sheet2 && pos) {
    await sheet.loadCells(range);
    await sheet2.loadCells(range);
    const cell = sheet.getCell(1, pos);
    for (let i = 1; i < 26; i += 2) {
      if (sheet2.getCell(i, 1).value === role.name) {
        cell2 = role.name;
        break;
      }
    }
  }
  return sheet && pos && cell2;
};

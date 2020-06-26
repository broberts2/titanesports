const _embed = require("../_embed");
const { Gladiator, Olympian } = require("../../js/spreadsheet");

const _rowReader = (rowNum, sheet) => {
  let __array__ = [],
    __array2__ = [],
    __statline__ = [];
  __array__.push(sheet.getCell(rowNum, 1).value);
  for (let i = 8, j = 0; j < 8; i += 4, j++) {
    __array__.push(sheet.getCell(rowNum, i).value);
  }
  for (let i = 2; i < 7; i += 2) {
    __array2__.push(sheet.getCell(rowNum + 1, i).value);
  }
  for (let i = 8; i < 40; i++) {
    __statline__.push(sheet.getCell(rowNum + 1, i).value);
  }
  const teamName = __array__.shift();
  return {
    rowNum,
    teamName,
    __array__,
    __array2__,
    __statline__,
  };
};

const _writeRow = (obj, sheet) => {
  sheet.getCell(obj.rowNum, 1).value = obj.teamName;
  for (let i = 8, j = 0; j < 8; i += 4, j++) {
    sheet.getCell(obj.rowNum, i).value = obj.__array__[j];
  }
  // for (let i = 2, j = 0; i < 7; i += 2, j++) {
  //   sheet.getCell(obj.rowNum + 1, i).value = obj.__array2__[j];
  // }
  // for (let i = 8; i < 40; i++) {
  //   sheet.getCell(obj.rowNum + 1, i).value = obj.__statline__[i - 8];
  // }
};

const _validate = (args) => {
  if (!(args.length === 3)) {
    return new Error(
      "You have provided an improper number of argments.\n```?swapstandings```"
    );
  } else if (!(args[0] === "gladiator" || args[0] === "olympian")) {
    return new Error(
      "Your first argument did not match 'gladiator' or 'olympian'.\n```?swapstandings```"
    );
  } else if (!(parseInt(args[1]) % 2 === 0 || parseInt(args[2]) % 2 === 0)) {
    return new Error("Your row selections must be an even number.");
  }
};

module.exports = (client) => ({
  exec: async (command, League, specialRoles) => {
    const __validate__ = _validate(command.args);
    if (!__validate__) {
      const range = "A1:AN50";
      const League =
        command.args[0].toLowerCase() === "gladiator" ? Gladiator : Olympian;
      await League.setup();
      const sheet = await League.getTeamBySheet("Standings and Rosters");
      await sheet.loadCells(range);
      let row1 = _rowReader(parseInt(command.args[1] - 1), sheet);
      let row2 = _rowReader(parseInt(command.args[2] - 1), sheet);
      const _row1Num = row1.rowNum;
      row1.rowNum = row2.rowNum;
      row2.rowNum = _row1Num;
      _writeRow(row1, sheet);
      _writeRow(row2, sheet);
      await sheet.saveUpdatedCells();
      return "Operation Successful!";
    } else {
      return __validate__;
    }
  },
  help:
    "!swapstandings - Swaps two rows on Standings and Rosters sheet.\n\n```!swapstandings <league> <row1> <row2>```\nValid inputs:\nleague: gladiator, olympian\nrow1: <n>\nrow2: <n>",
  roles: {
    standard: [
      "566421797831049216",
      "407684891069906974",
      "432526140310290458",
      "664717783971397642",
    ],
    special: [],
  },
  status: 0,
});

const { GoogleSpreadsheet } = require("google-spreadsheet");
const credentials = require("../client_secret.json");

const Gladiator = new GoogleSpreadsheet(
  "1ZWZSp9MfFEU01DXx_dAz6BsSdIs4-og8YGJQBkYi8bI"
);

const Olympian = new GoogleSpreadsheet(
  "1VZEzFnfZXIFsNVInjLzq335FKK3eWO0faR_xZGqnfk0"
);

const _precursor = async obj => {
  await obj.useServiceAccountAuth({
    client_email: credentials.client_email,
    private_key: credentials.private_key
  });
  await obj.loadInfo();
};

const _template = obj => ({
  setup: async () => {
    await _precursor(obj);
  },
  setProperties: async properties => await obj.updateProperties(properties),
  getSheet: async num => await obj.sheetsByIndex[num],
  getTeamBySheet: async name => {
    let i = 0,
      sheet;
    do {
      sheet = await obj.sheetsByIndex[i++];
      if (sheet && sheet.title === name) {
        return sheet;
      }
    } while (sheet);
  },
  getRows: async sheet => await sheet.getRows(),
  getTitle: async () => await obj.title,
  addRows: async (sheet, rowsArray) => await sheet.addRows(rowsArray),
  removeRow: async row => await row.delete(),
  addSheet: async sheet => await obj.addSheet(sheet),
  renameSheet: async (sheet, properties) =>
    await sheet.updateProperties(properties),
  removeSheet: async sheet => await sheet.delete()
});

module.exports = {
  Gladiator: _template(Gladiator),
  Olympian: _template(Olympian)
};

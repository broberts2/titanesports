module.exports = (client, roles) => ({
  exec: (command, League, specialRoles) =>
    `--- Gladiator League ---\n\nRoster/Schedule Sheet\nhttps://docs.google.com/spreadsheets/d/1ZWZSp9MfFEU01DXx_dAz6BsSdIs4-og8YGJQBkYi8bI/edit?usp=sharing\nRules/Guidelines\nhttps://docs.google.com/document/d/1MwmIhvVpy7a4xbxHvacuGWTclPCXb_kcMxNbxAG9vdA/edit?usp=sharing\nStatistics\nhttps://docs.google.com/spreadsheets/d/139sGGWZUdBhQVMip287Ba1aBV42PqC6xV9X6ta0nzI8/edit#gid=806464631\n\n\n--- Olympian League ---\n\nRoster/Schedule Sheet\nhttps://docs.google.com/spreadsheets/d/1VZEzFnfZXIFsNVInjLzq335FKK3eWO0faR_xZGqnfk0/edit?usp=sharing\nRules/Guidelines\nhttps://docs.google.com/document/d/1_NS5hMxNEipDHDkA1V8rN9zVB2_Q4C3Iz9vtDhTgEcw/edit?usp=sharing\nStatistics\nhttps://docs.google.com/spreadsheets/d/1iCfJZ4HWCLuDKb2NyWSo-jogqqPUHztB3BqqXTk6Jco/edit#gid=806464631`,
  help: "!showdocuments\nDisplays common documents.",
  status: 0,
  roles: {
    standard: [],
    special: [],
  },
});

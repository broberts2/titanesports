from _google_.GoogleSheetsAPI import DOCUMENT

DOCUMENT = DOCUMENT('1ZWZSp9MfFEU01DXx_dAz6BsSdIs4-og8YGJQBkYi8bI')
DOCUMENT.writeRange("Test", "B2:E2", [["testValue","testValue","testValue","testValue"]])

import googleapiclient
from GoogleSheetsAPI import DOCUMENT
import csv
import os

league = (os.environ["league"])

if league == "Gladiator":
    code = '139sGGWZUdBhQVMip287Ba1aBV42PqC6xV9X6ta0nzI8'
    path = f'{league}/{league}_merged.csv'
elif league == "Olympian":
    code = '1iCfJZ4HWCLuDKb2NyWSo-jogqqPUHztB3BqqXTk6Jco'
    path = f'{league}/{league}_merged.csv'
else:
    print(f"{League} is not a correct input. Try 'Gladiator' or 'Olympian'")

DOCUMENT = DOCUMENT(code)
DOCUMENT.writeRange("source", "A:BK", list(csv.reader(open(path))))
print(f"Document successfully sent to {league}'s Google Sheet.")

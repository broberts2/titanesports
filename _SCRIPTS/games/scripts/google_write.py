import googleapiclient
from GoogleSheetsAPI import DOCUMENT
import csv
import os



gladtime = (os.environ["gladtime"])
olymtime = (os.environ["olymtime"])

#if league == "Gladiator":
#    code = '1-xGEAjViv41MjZ-rbmkQ75uqgoi4-RW8O3PxFxCyQFo'
#    path = f'{league}/{league}_merged.csv'
#elif league == "Olympian":
#    code = '1iCfJZ4HWCLuDKb2NyWSo-jogqqPUHztB3BqqXTk6Jco'
#    path = f'{league}/{league}_merged.csv'
#else:
#    print(f"{League} is not a correct input. Try 'Gladiator' or 'Olympian'")

DOCUMENT = DOCUMENT('1sAsG9UHEcZQkd9O4pgFVA38QubYkQMKF2zeFxI0-hqM')
DOCUMENT.writeRange("current_gladiator", "A:I", list(csv.reader(open(f'gladiator/{gladtime}.csv'))))
print(f"{gladtime} successfully sent to Google Sheet.")

DOCUMENT.writeRange("current_olympian", "A:I", list(csv.reader(open(f'olympian/{olymtime}.csv'))))
print(f"{olymtime} successfully sent to Google Sheet.")

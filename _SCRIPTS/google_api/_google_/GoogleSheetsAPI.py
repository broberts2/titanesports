from __future__ import print_function
import pickle
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

class DOCUMENT:
    def __init__(self, docId):
        creds = None
        if os.path.exists('token.pickle'):
            with open('token.pickle', 'rb') as token:
                creds = pickle.load(token)
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    'credentials.json', ['https://www.googleapis.com/auth/spreadsheets'])
                creds = flow.run_local_server(port=0)
            with open('token.pickle', 'wb') as token:
                pickle.dump(creds, token)
        service = build('sheets', 'v4', credentials=creds)
        self.docId = docId
        self.DOC = service.spreadsheets().values()
    def readRange(self, sheet, range):
        return self.DOC.get(spreadsheetId=self.docId, range=sheet+"!"+range).execute().get('values', [])
    def writeRange(self, sheet, range, body):
        obj = { "majorDimension": "ROWS" }
        obj.update({"values": body})
        return self.DOC.update(spreadsheetId=self.docId, range=sheet+"!"+range, valueInputOption='RAW', body=obj).execute().get('values', [])

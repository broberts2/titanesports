# Import python3 modules
from riotwatcher import LolWatcher, ApiError
import json
import csv
import os.path
from os import path

# Set region, filename, and API key variables
REGION = 'na1'
FILE_NAME = 'player_games.json'
API_KEY = 'RGAPI-924eeb0c-9af6-4a0d-a34f-467b8a2490a7'
OUTPUT_CSV = open('scripts/output.csv', 'w')

# Set player name variables
TEAM = ['Luhmo','Àmànstèr','ItsGinga','Mörtý','Buckbee','Damien','Im James','Moriii','Katasoul','Shebloong','Neversaw','Rurfu','I MUTE YOU','EIspeth','Mkrty','Yauma','Noobily','Kataris','Laolis66','Taco Planet','Twelve and Six','Joey Desu','Skìzz','epicfailguy456','Zylandis','I live with 1 HP','The Chosen Gamer','Venòmz','Elsa from Frozen','Villaenders','Oshí','Dogster','Thrasian19','Filbert The Wise','Flân','Spie','Látona','YoungButterToast','Z3r0bii','rgrou2','ninjamønkey','Earleking','SushiMunster','Vexrax','Yoshıko','ToniTop','ºGøNº','Míschief','Kéria','Seagull of irony','PupSnap','Dank Rain','rdubstres','Forrest07Gump','Smªlls','Vaulting Cricket','soulbert','Mr Otter','dayless','Avoid Skillshots','KitKatz x Jazz','adc not that bad','LucifersEyes']
# Get master RiotWatcher object, using Riot developer key.
lol_watcher = LolWatcher(API_KEY)

for _player_ in TEAM:
    player_data = {}
    _player_ = lol_watcher.summoner.by_name(REGION, _player_)
    player_ranked_stats = lol_watcher.league.by_summoner(REGION, _player_['id'])
    player_ranked_stats = player_ranked_stats[0] if player_ranked_stats[0]['queueType'] == 'RANKED_SOLO_5x5' else player_ranked_stats[1]
    create_csv = csv.writer(OUTPUT_CSV)
    que_type = player_ranked_stats['queueType']
    player_name = player_ranked_stats['summonerName']
    player_ID = player_ranked_stats['summonerId']
    player_tier = player_ranked_stats['tier']
    player_rank = player_ranked_stats['rank']
    player_LP = player_ranked_stats['leaguePoints']
    player_wins = player_ranked_stats['wins']
    player_losses = player_ranked_stats['losses']

    player_data['que_type'] = que_type
    player_data['player_name'] = player_name
    player_data['player_ID'] = player_ID
    player_data['player_tier'] = player_tier
    player_data['player_rank'] = player_rank
    player_data['player_LP'] = player_LP
    player_data['player_wins'] = player_wins
    player_data['player_losses'] = player_losses

# Write to CSV file
    create_csv.writerow([player_data['que_type'],
        player_data['player_name'],
        player_data['player_ID'],
        player_data['player_tier'],
        player_data['player_rank'],
        player_data['player_LP'],
        player_data['player_wins'],
        player_data['player_losses']])

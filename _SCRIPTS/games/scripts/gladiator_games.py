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
OUTPUT_CSV = open('C:/Users/ustro/Documents/Files/Projects/Titan Esports/_SCRIPTS/games/scripts/output.csv', 'w')

# Set player name variables
TEAM = ['Dempsy','phortwenty','BasicallyCancer','TES Major','Aoife of Shadows','Blkdynamite','Khyroe','The Great 2 Simp','THC Rich','THC Venom','GE Guilty','Łisk','Yodigi7','Endowed','Buzz  Łightyear','Wöödÿ','CharlesUU','feathersandfur','DokiFTW','DolphinJudas','Duero','wynter07','casino','katismybb','GavDougiefresh','Diamandis','AlexDrey','kittylexa','Bªtman','Youchoicetodie','SecretlyGayPengu','Garźa','Alumyn is my GF','alumyn','starxcoconut','Nfg Downfall','LoLGermRat','derpigreg','Xanielson','Nøtëz','MG Dilly','Kalliroe','Hawk21js','zoe exotic','Atílla','KillaTron100','Fresh53','TheFreezeTheory','Noxian Exile','whathead','Candle King','False narrative','Poptartism','Solanine','Reverend Tuggles','Opty','Monz81','Verbal Toxicity','N1zero','xDanceGavinDance','Muddey','Mxn Potato','Cattack54','SammiNeko','pepercorn123','Mełiødas','xAndromedax','Lord Sema','Uncle Piccofro','edchac99','SHOTDUCK','AnubisTheKing666','BaeOwnsNothing','GE Skwiwi','GE Penas','chefboi69','krakenjokes','glub glub','ruined cheescake','voltsy','violetrain','theepicfail','barbarjonks','ZekeTheReformed','dfg sneaky','WilliamL','Cherished']
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

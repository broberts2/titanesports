# Import necessary python3 modules
import json
import csv
import sys
import os.path
from os import path
os.environ['python_wk']

paths = []

#for num in range(6):
#    for num2 in range(5):
#        paths.append(os.environ['python_wk'] + str((num + 1)) + "-g" + str((num2 + 1)) + ".json")

#print(sys.argv[1])
json_data = json.loads(sys.argv[1])
for _path in json_data:
#    if path.exists(_path):
        # Open necessary files for reading and writing
        #OUTPUT_CSV = open(_path.replace(".json", ".csv"), 'w')

        # Create connection to CSV file and write header
        OUTPUT_CSV = open("output.csv", 'w')
        create_csv = csv.writer(OUTPUT_CSV)

        # Create new PYTHON dictionary to store player data
        player_data = {}

        for participant in json_data['participants']:

            # Set player data variables from PYTHON String
            player_name = participant['playerName']
            player_team = participant['teamId'] == "100" if json_data["metaData"]["team1"] else json_data["metaData"]["team2"]
            player_position = participant['timeline']['lane']
            game_status = participant['stats']['win']
            game_duration = json_data['gameDuration']
            if 'champion' in participant:
                player_champion = participant['champion']
                player_data['playerChampion'] = player_champion
            else:
                player_champion = participant['championId']
                player_data['playerChampion'] = player_champion
            player_kills = participant['stats']['kills']
            player_deaths = participant['stats']['deaths']
            player_assists = participant['stats']['assists']
            player_cs = participant['stats']['totalMinionsKilled']
            player_jngcs = participant['stats']['neutralMinionsKilled']
            player_gold = participant['stats']['goldEarned']
            player_damage = participant['stats']['totalDamageDealtToChampions']
            player_magic_damage = participant['stats']['magicDamageDealtToChampions']
            player_physical_damage = participant['stats']['physicalDamageDealtToChampions']
            player_true_damage = participant['stats']['trueDamageDealtToChampions']
            player_dmg_taken = participant['stats']['totalDamageTaken']
            player_healing = participant['stats']['totalHeal']
            player_dmg_mitigated = participant['stats']['damageSelfMitigated']
            player_team_jng = participant['stats']['neutralMinionsKilledTeamJungle']
            player_enemy_jng = participant['stats']['neutralMinionsKilledEnemyJungle']
            player_turrets = participant['stats']['turretKills']
            player_turret_dmg = participant['stats']['damageDealtToTurrets']
            player_inhibitors = participant['stats']['inhibitorKills']
            player_obj_dmg = participant['stats']['damageDealtToObjectives']
            player_cc_score = participant['stats']['timeCCingOthers']
            player_total_cc = participant['stats']['totalTimeCrowdControlDealt']
            player_vision_score = participant['stats']['visionScore']
            player_wards = participant['stats']['wardsPlaced']
            player_wards_killed = participant['stats']['wardsKilled']
            player_vision_wards = participant['stats']['visionWardsBoughtInGame']
            player_first_blood = participant['stats']['firstBloodKill']
            player_first_blood_assist = participant['stats']['firstBloodAssist']
            player_first_tower = participant['stats']['firstTowerKill']
            player_first_tower_assist = participant['stats']['firstTowerAssist']
            player_double_kills = participant['stats']['doubleKills']
            player_triple_kills = participant['stats']['tripleKills']
            player_quadra_kills = participant['stats']['quadraKills']
            player_penta_kills = participant['stats']['pentaKills']

            # Gather player deltas if they exists
            if '0-10' in participant['timeline']['creepsPerMinDeltas']:
                cs_10m = participant['timeline']['creepsPerMinDeltas']['0-10']
                player_data['cs_10min'] = cs_10m
            else:
                player_data['cs_10min'] = ''
            if '10-20' in participant['timeline']['creepsPerMinDeltas']:
                cs_20m = participant['timeline']['creepsPerMinDeltas']['10-20']
                player_data['cs_20min'] = cs_20m
            else:
                player_data['cs_20min'] = ''
            if '20-30' in participant['timeline']['creepsPerMinDeltas']:
                cs_30m = participant['timeline']['creepsPerMinDeltas']['20-30']
                player_data['cs_30min'] = cs_30m
            else:
                player_data['cs_30min'] = ''
            if '30-40' in participant['timeline']['creepsPerMinDeltas']:
                cs_40m = participant['timeline']['creepsPerMinDeltas']['30-40']
                player_data['cs_40min'] = cs_40m
            else:
                player_data['cs_40min'] = ''
            if '50-50' in participant['timeline']['creepsPerMinDeltas']:
                cs_50m = participant['timeline']['creepsPerMinDeltas']['40-50']
                player_data['cs_50min'] = cs_50m
            else:
                player_data['cs_50min'] = ''

            if '0-10' in participant['timeline']['xpPerMinDeltas']:
                xp_10m = participant['timeline']['xpPerMinDeltas']['0-10']
                player_data['xp_10min'] = xp_10m
            else:
                player_data['xp_10min'] = ''
            if '10-20' in participant['timeline']['xpPerMinDeltas']:
                xp_20m = participant['timeline']['xpPerMinDeltas']['10-20']
                player_data['xp_20min'] = xp_20m
            else:
                player_data['xp_20min'] = ''
            if '20-30' in participant['timeline']['xpPerMinDeltas']:
                xp_30m = participant['timeline']['xpPerMinDeltas']['20-30']
                player_data['xp_30min'] = xp_30m
            else:
                player_data['xp_30min'] = ''
            if '30-40' in participant['timeline']['xpPerMinDeltas']:
                xp_40m = participant['timeline']['xpPerMinDeltas']['30-40']
                player_data['xp_40min'] = xp_40m
            else:
                player_data['xp_40min'] = ''
            if '50-50' in participant['timeline']['xpPerMinDeltas']:
                xp_50m = participant['timeline']['xpPerMinDeltas']['40-50']
                player_data['xp_50min'] = xp_50m
            else:
                player_data['xp_50min'] = ''

            if '0-10' in participant['timeline']['goldPerMinDeltas']:
                gold_10m = participant['timeline']['goldPerMinDeltas']['0-10']
                player_data['gold_10min'] = gold_10m
            else:
                player_data['gold_10min'] = ''
            if '10-20' in participant['timeline']['goldPerMinDeltas']:
                gold_20m = participant['timeline']['goldPerMinDeltas']['10-20']
                player_data['gold_20min'] = gold_20m
            else:
                player_data['gold_20min'] = ''
            if '20-30' in participant['timeline']['goldPerMinDeltas']:
                gold_30m = participant['timeline']['goldPerMinDeltas']['20-30']
                player_data['gold_30min'] = gold_30m
            else:
                player_data['gold_30min'] = ''
            if '30-40' in participant['timeline']['goldPerMinDeltas']:
                gold_40m = participant['timeline']['goldPerMinDeltas']['30-40']
                player_data['gold_40min'] = gold_40m
            else:
                player_data['gold_40min'] = ''
            if '50-50' in participant['timeline']['goldPerMinDeltas']:
                gold_50m = participant['timeline']['goldPerMinDeltas']['40-50']
                player_data['gold_50min'] = gold_50m
            else:
                player_data['gold_50min'] = ''

            # Build player data variables from PYTHON String into new dictionary
            player_data['playerName'] = player_name
            player_data['teamId'] = player_team
            player_data['lane'] = player_position
            player_data['win'] = game_status
            player_data['gameDuration'] = game_duration
            player_data['kills'] = player_kills
            player_data['deaths'] = player_deaths
            player_data['assists'] = player_assists
            player_data['totalMinionsKilled'] = player_cs
            player_data['neutralMinionsKilled'] = player_jngcs
            player_data['goldEarned'] = player_gold
            player_data['totalDamageDealtToChampions'] = player_damage
            player_data['magicDamageDealtToChampions'] = player_magic_damage
            player_data['physicalDamageDealtToChampions'] = player_physical_damage
            player_data['trueDamageDealtToChampions'] = player_true_damage
            player_data['totalDamageTaken'] = player_dmg_taken
            player_data['totalHeal'] = player_healing
            player_data['damageSelfMitigated'] = player_dmg_mitigated
            player_data['neutralMinionsKilledTeamJungle'] = player_team_jng
            player_data['neutralMinionsKilledEnemyJungle'] = player_enemy_jng
            player_data['turretKills'] = player_turrets
            player_data['damageDealtToTurrets'] = player_turret_dmg
            player_data['inhibitorKills'] = player_inhibitors
            player_data['damageDealtToObjectives'] = player_obj_dmg
            player_data['timeCCingOthers'] = player_cc_score
            player_data['totalTimeCrowdControlDealt'] = player_total_cc
            player_data['visionScore'] = player_vision_score
            player_data['wardsPlaced'] = player_wards
            player_data['wardsKilled'] = player_wards_killed
            player_data['visionWardsBoughtInGame'] = player_vision_wards
            player_data['firstBloodKill'] = player_first_blood
            player_data['firstBloodAssist'] = player_first_blood_assist
            player_data['firstTowerKill'] = player_first_tower
            player_data['firstTowerAssist'] = player_first_tower_assist
            player_data['doubleKills'] = player_double_kills
            player_data['tripleKills'] = player_triple_kills
            player_data['quadraKills'] = player_quadra_kills
            player_data['pentaKills'] = player_penta_kills

            # Write to CSV file
            create_csv.writerow([player_data['playerName'],
                player_data['teamId'],
                player_data['lane'],
                player_data['win'],
                player_data['gameDuration'],
                player_data['playerChampion'],
                player_data['kills'],
                player_data['deaths'],
                player_data['assists'],
                player_data['totalMinionsKilled'],
                player_data['neutralMinionsKilled'],
                player_data['goldEarned'],
                player_data['totalDamageDealtToChampions'],
                player_data['magicDamageDealtToChampions'],
                player_data['physicalDamageDealtToChampions'],
                player_data['trueDamageDealtToChampions'],
                player_data['totalDamageTaken'],
                player_data['totalHeal'],
                player_data['damageSelfMitigated'],
                player_data['neutralMinionsKilledTeamJungle'],
                player_data['neutralMinionsKilledEnemyJungle'],
                player_data['turretKills'],
                player_data['damageDealtToTurrets'],
                player_data['inhibitorKills'],
                player_data['damageDealtToObjectives'],
                player_data['timeCCingOthers'],
                player_data['totalTimeCrowdControlDealt'],
                player_data['visionScore'],
                player_data['wardsPlaced'],
                player_data['wardsKilled'],
                player_data['visionWardsBoughtInGame'],
                player_data['firstBloodKill'],
                player_data['firstBloodAssist'],
                player_data['firstTowerKill'],
                player_data['firstTowerAssist'],
                player_data['doubleKills'],
                player_data['tripleKills'],
                player_data['quadraKills'],
                player_data['pentaKills'],
                player_data['cs_10min'],
                player_data['cs_20min'],
                player_data['cs_30min'],
                player_data['cs_40min'],
                player_data['cs_50min'],
                player_data['xp_10min'],
                player_data['xp_20min'],
                player_data['xp_30min'],
                player_data['xp_40min'],
                player_data['xp_50min'],
                player_data['gold_10min'],
                player_data['gold_20min'],
                player_data['gold_30min'],
                player_data['gold_40min'],
                player_data['gold_50min']])

#    else:
 #       print(_path + " file does not exist")

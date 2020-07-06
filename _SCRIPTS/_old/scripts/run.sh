# Change variables for 'wk' and 'league'
game_data=$(node fetchGameData.js)

wk="wk1"
league="Olympian"

# Pass variable to python script
python_wk="../_$league/$wk/m"
export python_wk

# Path variables
script_directory="C:/Users/ustro/Documents/Files/Projects/Titan Esports/_SCRIPTS/stats/scripts"
week_directory="C:/Users/ustro/Documents/Files/Projects/Titan Esports/_SCRIPTS/stats/_$league/$wk"

# Run python script to grab JSON data and convert to CSV
cd "$script_directory"
python3 get_data.py $game_data

# Move to weekly directory, crate some folders, and move files
cd "$week_directory"
mkdir -p json
mkdir -p csv/temp/
#mv *.json json/
mv *.csv csv/

# Merge all game files together
cd "csv/"
cat *csv > temp/merged.csv
cd "temp/"

# Do some math to columns for stats
awk 'BEGIN{FS = ","} { 
if ($8 == 0)
	print $1","$3","$6","$2","$4","$5","$7","$8","$9","$7+$9","$10","$11","$10+$11","($10+$11)/($5/60)","$12","$12/($5/60)","$13","$13/($5/60)","$14","$15","$16","$17","$18","$19","$20","$21","$22","$23","$24","$25","$26","$27","$28","$29","$29/($5/60)","$30","$30/($5/60)","$31","$32","$33","$34","$35","$36","$37","$38","$39","$40","$41","$42","$43","$44","$45","$46","$47","$48","$49","$50","$51","$52","$53","$54;
else
	print $1","$3","$6","$2","$4","$5","$7","$8","$9","($7+$9)/$8","$10","$11","$10+$11","($10+$11)/($5/60)","$12","$12/($5/60)","$13","$13/($5/60)","$14","$15","$16","$17","$18","$19","$20","$21","$22","$23","$24","$25","$26","$27","$28","$29","$29/($5/60)","$30","$30/($5/60)","$31","$32","$33","$34","$35","$36","$37","$38","$39","$40","$41","$42","$43","$44","$45","$46","$47","$48","$49","$50","$51","$52","$53","$54;
}' merged.csv > merged2.csv

awk 'BEGIN{OFS=FS=","}
{
 $10=sprintf("%.2f",$10)
 $14=sprintf("%.2f",$14)
 $16=sprintf("%.2f",$16)
 $35=sprintf("%.2f",$35)
 $37=sprintf("%.2f",$37)
}1' merged2.csv > merged3.csv

# Add some extra data for TES
awk -v week="$wk" -v league="$league" '{print week","league","$0;}' merged3.csv > merged4.csv

# Add header row
#sed -i '1iweek,league,player_name,player_position,player_champion,player_team,game_status,game_duration,player_kills,player_deaths,player_assists,KDA,player_cs,player_jngcs,total_cs,CSPM,player_gold,GPM,player_damage,DMGPM,player_magic_damage,player_physical_damage,player_true_damage,player_dmg_taken,player_healing,player_dmg_mitigated,player_team_jng,player_enemy_jng,player_turrets,player_turret_dmg,player_inhibitors,player_obj_dmg,player_cc_score,player_total_cc,player_vision_score,player_wards,wardsPerMin,player_wards_killed,WardsKilledPerMin,player_vision_wards,player_first_blood,player_first_blood_assist,player_first_tower,player_first_tower_assist,player_double_kills,player_triple_kills,player_quadra_kills,player_penta_kills,cs_10m,cs_20m,cs_30m,cs_40m,cs_50m,xp_10m,xp_20m,xp_30m,xp_40m,xp_50m,gold_10m,gold_20m,gold_30m,gold_40m,gold_50m' merged4.csv

mv merged4.csv ../../../final/"$wk"-merged.csv




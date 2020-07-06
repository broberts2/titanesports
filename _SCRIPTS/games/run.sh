gladtime=$(date +%d-%b-%H_%M-gladiator)
olymtime=$(date +%d-%b-%H_%M-olympian)


export gladtime
export olymtime

cd "C:/Users/ustro/Documents/Files/Projects/Titan Esports/_SCRIPTS/games/"

python3 'C:/Users/ustro/Documents/Files/Projects/Titan Esports/_SCRIPTS/games/scripts/gladiator_games.py'
dos2unix 'C:/Users/ustro/Documents/Files/Projects/Titan Esports/_SCRIPTS/games/scripts/output.csv'

awk 'BEGIN{OFS=FS=","} {
	print $1","$2","$3","$4","$5","$6","$7","$8","$7+$8;
}' scripts/output.csv > scripts/merged.csv

mv scripts/merged.csv gladiator/$gladtime.csv

sed -i 's/\s*,\s*/,/g' gladiator/$gladtime.csv
rm scripts/output.csv

python3 scripts/olympian_games.py
dos2unix scripts/output.csv

awk 'BEGIN{OFS=FS=","} {
	print $1","$2","$3","$4","$5","$6","$7","$8","$7+$8;
}' scripts/output.csv > scripts/merged.csv

mv scripts/merged.csv olympian/$olymtime.csv

sed -i 's/\s*,\s*/,/g' olympian/$olymtime.csv
rm scripts/output.csv

python3 scripts/google_write.py

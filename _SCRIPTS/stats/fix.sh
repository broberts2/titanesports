# Change variables for 'wk' and 'league'
league=$1

export league

cat $league/week/*csv > $league/$league'_merged'.csv

python3 scripts/google_write.py

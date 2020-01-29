echo "Game Version:";
read varname
rm game_version.js
touch game_version.js
echo "module.exports = \"$varname\"" >> game_version.js
rm -rf *dragontail*
if [[ "$OSTYPE" == "linux-gnu" ]]; then
  wget -c https://ddragon.leagueoflegends.com/cdn/dragontail-$varname.tgz
elif [[ "$OSTYPE" == "darwin"* ]]; then
  curl -O https://ddragon.leagueoflegends.com/cdn/dragontail-$varname.tgz
fi
mkdir dragontail-$varname
tar -zxvf dragontail-$varname.tgz -C dragontail-$varname
rm -rf dragontail-$varname.tgz

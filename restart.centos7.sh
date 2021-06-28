sudo systemctl restart httpd
#screen -d -m mongod --setParameter failIndexKeyTooLong=false --dbpath ~/data/db
cd /titanesports/server/comps && npm run build
cd /titanesports/titan_draft && npm run build
cd /titanesports/server && screen -S Webserver -d -m nodemon index.js
cd /titanesports/titan_draft && screen -S Titan_Draft -d -m nodemon index.js
cd /titanesports/oracle && screen -S Oracle -d -m nodemon index.js

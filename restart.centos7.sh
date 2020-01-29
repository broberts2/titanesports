sudo systemctl restart httpd
#screen -d -m mongod --setParameter failIndexKeyTooLong=false
cd /titanesports/server/comps && npm run build
cd /titanesports/titan_draft && npm run build
cd /titanesports/server && screen -d -m nodemon index.js
cd /titanesports/titan_draft && screen -d -m nodemon index.js

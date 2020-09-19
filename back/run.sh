#!/usr/bin/env bash
if [ ! -z "$DEPLOYMENT_GROUP_NAME" ]; then
 export NODE_ENV=development
fi

cd ~/node
pm2 delete www
pm2 start bin/www -n www -i 0#!/usr/bin/env bash

./node_modules/.bin/sequelize db:migrate --config=config/config.json
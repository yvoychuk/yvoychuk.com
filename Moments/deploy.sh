#!/bin/bash
HOST=yaroslav@104.248.43.189
DIRPATH=~/Moments/
if ssh $HOST stat $DIRPATH \> /dev/null 2\>\&1
  then
    echo "exists"
  else
    ssh $HOST mkdir $DIRPATH
fi
scp -rp package.json server.js ./app $HOST:$DIRPATH
ssh $HOST "cd $DIRPATH; npm install; pm2 restart server"
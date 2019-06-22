#!/bin/bash
HOST=yaroslav@104.248.43.189
DIRPATH=~/Moments/
FILEPATH=./server.js
if ssh $HOST stat $DIRPATH \> /dev/null 2\>\&1
  then
    echo "exists"
  else
    ssh $HOST mkdir $DIRPATH
fi
scp $FILEPATH $HOST:$DIRPATH
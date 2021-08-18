#!/bin/bash

gnome-terminal

#install the server
#npm install http-server -g

#add a alias
#alias alias_cmd='~/workspace/smartTwitchTV/release/scripts/http-server.sh & exit'

mainfolder="$(dirname ""$(dirname "$0")"")";
mainfolder="$(dirname "$mainfolder")";

cd "$mainfolder" || exit

echo "$mainfolder"

cd src/

# -c-1 disable cache
http-server -a 127.0.0.1 -p 5001 -c-1

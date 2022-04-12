#!/bin/bash

# Backup script for install admin on Dokuwiki instans!
# Allow register themself with GNU opensource license

# Donain
DOMAIN=$1

# Must be urlencoded
PASSWORD=$2
NAME=$3
EMAIL=$4 # eg jm223gf%40student.lnu.se insteade of jm223gf@student.lnu.se 
APP_NAME=$5

curl "http://$DOMAIN/install.php" \
  -H "Connection: keep-alive" \
  -H "Pragma: no-cache" \
  -H "Cache-Control: no-cache" \
  -H "Upgrade-Insecure-Requests: 1" \
  -H "Origin: http://$DOMAIN" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36" \
  -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9" \
  -H "Referer: http://$DOMAIN/install.php" \
  -H "Accept-Language: en-US,en;q=0.9,sv;q=0.8" \
  -H "Cookie: DokuWiki=8a810ae428410da182b1643a7983bf7d" \
  --data-raw "l=en&d%5Btitle%5D=${APP_NAME}&d%5Bacl%5D=on&d%5Bsuperuser%5D=Admin&d%5Bfullname%5D=$NAME&d%5Bemail%5D=$EMAIL&d%5Bpassword%5D=$PASSWORD&d%5Bconfirm%5D=$PASSWORD&d%5Bpolicy%5D=0&d%5Ballowreg%5D=on&d%5Blicense%5D=gnufdl&d%5Bpop%5D=on&submit=" \
  --compressed \
  --insecure
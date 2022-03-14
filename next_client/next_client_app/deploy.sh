#!bin/sh

rm -rf node_modules/.cache
npm run build
npm run deploy
pm2 restart all

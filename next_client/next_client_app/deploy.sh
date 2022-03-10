#!bin/sh

rm -rf node_modules/.cache
npm run build
pm2 restart all

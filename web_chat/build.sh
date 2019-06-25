#! /bin/sh
rm -Rf coffeeshop
cp -R ../coffeeshop .
cp ../runner.py .
cp ../dialogflow_serviceaccount.json .
npm ci
npm run build
#!/bin/bash -e
echo "Install node modules"
   cd "$(dirname "$0")"; npm install;

echo "Sequelize: create database"
   ./node_modules/.bin/sequelize db:create;

echo "Sequelize: migrate database"
   ./node_modules/.bin/sequelize db:migrate;

echo "Complete"
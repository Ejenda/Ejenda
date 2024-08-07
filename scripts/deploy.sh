#!/bin/bash
set -e

git pull
docker compose down app 
docker compose up app -d --build
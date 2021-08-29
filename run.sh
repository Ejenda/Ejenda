#!/usr/bin/bash
git pull
npm ci
npm run build
pm2 restart NuxtAppName
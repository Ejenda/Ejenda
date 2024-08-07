#!/bin/bash
set -e

npm run db:migrate & PID=$!
wait $PID

node .output/server/index.mjs
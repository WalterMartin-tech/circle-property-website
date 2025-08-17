#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
printf "NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8010\n" > .env.local
nvm use || true
npm run dev -- -p 3001

#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
DEV_ALLOW_PUBLIC_COMPUTE=1 \
FRONTEND_ORIGINS="http://localhost:3001,http://127.0.0.1:3001" \
PYTHONPATH=. ../backend/.venv/bin/python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8010

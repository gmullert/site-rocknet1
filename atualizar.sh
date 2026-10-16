#!/bin/bash
set -e

echo "========================================="
echo "  🚀 Atualizando Portal Rocknet Telecom  "
echo "========================================="

echo "[1/3] Puxando atualizações do GitHub..."
git pull origin main

echo "[2/3] Reconstruindo container Docker..."
docker compose up -d --build

echo "[3/3] Limpando imagens antigas sem uso..."
docker image prune -f

echo "========================================="
echo "  ✅ Site atualizado e rodando com sucesso! "
echo "========================================="

#!/bin/bash

echo "🔧 Corrigindo conflitos de dependências..."

# Remove node_modules e package-lock.json
echo "📦 Removendo node_modules e package-lock.json..."
rm -rf node_modules
rm -f package-lock.json

# Limpa cache do npm
echo "🧹 Limpando cache do npm..."
npm cache clean --force

# Instala dependências com versões compatíveis
echo "⬇️ Instalando dependências compatíveis..."
npm install

# Verifica se há vulnerabilidades
echo "🔍 Verificando vulnerabilidades..."
npm audit

echo "✅ Processo concluído!"
echo "🚀 Execute 'npm run build' para testar o build de produção"

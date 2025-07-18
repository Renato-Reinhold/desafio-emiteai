#!/usr/bin/env bash

host="$1"
port="$2"

echo "Aguardando $host:$port ficar disponível..."

until nc -z "$host" "$port"; do
  echo "Ainda aguardando $host:$port..."
  sleep 2
done

echo "$host:$port está disponível!"
exec "${@:3}"

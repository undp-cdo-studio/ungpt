#!/bin/bash

# Load the connection string from .env file
if [ -f .env ]; then
  echo "Loading connection string from .env file..."
  # Extract the DATABASE_URL from .env file
  DB_URL=$(grep "^DATABASE_URL=" .env | cut -d '=' -f2- | tr -d '"')
  
  if [ -n "$DB_URL" ]; then
    echo "Found DATABASE_URL in .env file"
    export DATABASE_URL="$DB_URL"
  else
    echo "DATABASE_URL not found in .env file"
    exit 1
  fi
else
  echo ".env file not found"
  exit 1
fi

export DATABASE_INITIALIZED=true

# Print environment variables for debugging
echo "Environment variables for remote database:"
echo "DATABASE_URL: $(echo $DATABASE_URL | sed 's/:[^:@]*@/:*****@/')"
echo "DATABASE_INITIALIZED: $DATABASE_INITIALIZED"

# Run the seed script with Bun
echo "Running seed script for remote database..."
bun run tsx scripts/seed-database.ts 
#!/bin/bash

# Set the DATABASE_URL environment variable
export DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:54322/postgres"
export DATABASE_INITIALIZED=true

# Print environment variables for debugging
echo "Environment variables:"
echo "DATABASE_URL: $DATABASE_URL"
echo "DATABASE_INITIALIZED: $DATABASE_INITIALIZED"

# Run the seed script with Bun
echo "Running seed script..."
bun run tsx scripts/seed-database.ts 
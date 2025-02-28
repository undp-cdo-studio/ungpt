# UNDP AI Co-pilot

## Overview

UNDP AI Co-pilot is an AI-powered application designed to assist UNDP officers and stakeholders in project planning and documentation. The tool leverages OpenAI's GPT-4 to generate project descriptions, summaries, and other key project planning components based on user inputs.

## Purpose

This application aims to enhance productivity, provide deeper understanding of projects, and ultimately aid in creating impactful and sustainable solutions for the global community.

## Features

- AI-assisted generation of project documentation
- Support for multiple templates including:
  - Project Initiation Plan (PIP)
  - Debris Management
  - Community Infrastructure Rehabilitation
  - Early Recovery
  - Work Plan
- Markdown rendering with support for footnotes, tables, and other formatting
- Chat interface for interacting with the AI assistant
- Copy functionality for generated content

## Technology Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **UI Components**: React Markdown, Heroicons
- **State Management**: React Hooks
- **Internationalization**: next-intl
- **Database**: Drizzle ORM with Supabase
- **Testing**: Vitest, Playwright
- **Linting/Formatting**: Biome, ESLint

## Getting Started

### Prerequisites

- Node.js (version specified in package.json)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ungpt
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the necessary environment variables.

4. Set up the database:
   ```bash
   npm run db:setup
   ```

### Development

Run the development server:
```bash
npm run dev
```

### Building for Production

Build the application:
```bash
npm run build
```

Start the production server:
```bash
npm run start
```

## Database Management

The project includes several scripts for database management:

- `npm run db:generate` - Generate database migrations
- `npm run db:push` - Push schema changes to the database
- `npm run db:seed` - Seed the database with initial data
- `npm run db:reset` - Reset and regenerate the database
- `npm run db:studio` - Open Drizzle Studio for database management

## Testing

Run tests:
```bash
npm run test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Linting and Formatting

- `npm run lint` - Run linting checks
- `npm run format` - Format code
- `npm run check` - Check and fix code style issues

## Project Status

This application is currently in beta version and under pilot testing.

## License

[License information]

## Acknowledgements

- OpenAI for GPT-4 technology
- UNDP for project requirements and domain expertise
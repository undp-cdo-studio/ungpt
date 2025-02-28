# UN-GPT: AI Co-pilot for United Nations

## Overview

UN-GPT is a general-purpose AI-powered application designed to assist United Nations members, officers, and stakeholders in their daily tasks, project planning, and documentation. The tool leverages advanced AI models to generate content, provide insights, and streamline workflows across various UN activities.

## Purpose

This application aims to enhance productivity, provide deeper understanding of complex issues, and ultimately aid UN personnel in creating impactful and sustainable solutions for the global community. By automating routine tasks and providing AI-assisted analysis, UN-GPT helps UN members focus on their core mission of addressing global challenges.

## Features

- AI-assisted generation of various UN documents and reports
- Support for multiple templates and document types including:
  - Project Initiation Plans
  - Work Plans
  - Situation Analysis
  - Policy Briefs
  - Meeting Summaries
  - Field Reports
- Markdown rendering with support for footnotes, tables, and other formatting
- Interactive chat interface for natural language interaction
- Copy functionality for generated content
- Customizable to specific UN agency needs

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

This application is currently in beta version and under pilot testing across various UN agencies.

## License

This project is licensed under the MIT License with the following additional terms:

1. Any use of this software must include visible attribution to the original creators.
2. The United Nations name and logo are protected and their use is subject to the terms specified by the United Nations.

## Acknowledgements

- United Nations for domain expertise and requirements
- Contributors to the open-source libraries used in this project

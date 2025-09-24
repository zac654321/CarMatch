# Car Guess Card Game

## Overview

This is a memory card matching game featuring luxury cars. Players flip cards to find matching pairs of car images, with game statistics tracking moves, matches, and time. The application is built as a full-stack web application with a React frontend and Express backend, featuring a modern UI with Tailwind CSS and comprehensive UI components from Radix UI.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Comprehensive Radix UI component library with custom styling
- **State Management**: Zustand for client-side state management with multiple stores:
  - `useCardGame`: Manages card game logic, moves, matches, and game state
  - `useAudio`: Handles audio controls and sound effects
  - `useGame`: Manages overall game phases (ready, playing, ended)
- **Client-side Routing**: None apparent - single page application
- **Asset Management**: Support for 3D models (.gltf, .glb) and audio files (.mp3, .ogg, .wav)

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Development Setup**: Vite integration for hot reload in development
- **Deployment**: esbuild for production bundling

### Data Storage Solutions
- **Primary Database**: PostgreSQL via Neon Database serverless platform
- **Schema Management**: Drizzle Kit for migrations and schema management
- **In-Memory Storage**: Fallback MemStorage class for development/testing
- **Session Storage**: PostgreSQL-backed sessions for user state persistence

### Authentication and Authorization
- **Current Implementation**: Basic user schema with username/password fields
- **Session Management**: Express sessions with PostgreSQL storage
- **Validation**: Zod schemas for data validation

### Game Features
- **Card Matching Logic**: Memory game with luxury car images
- **Audio System**: Sound effects for card flips and successful matches with mute controls
- **Game Statistics**: Move counting, match tracking, and timer functionality
- **Responsive Design**: Mobile-optimized layout with touch interactions
- **Visual Effects**: CSS animations for card flips and transitions

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, Vite for development and building
- **Backend**: Express.js for server framework
- **Database**: 
  - Neon Database (@neondatabase/serverless) for serverless PostgreSQL
  - Drizzle ORM for database operations and schema management
  - connect-pg-simple for session storage

### UI and Styling
- **Styling Framework**: Tailwind CSS with PostCSS and Autoprefixer
- **UI Components**: Comprehensive Radix UI component library including:
  - Dialog, Dropdown, Navigation, Form controls, Charts, and more
- **Icons**: Lucide React for consistent iconography
- **Fonts**: Inter font family via @fontsource

### State Management and Data Fetching
- **State Management**: Zustand with selector subscriptions
- **HTTP Client**: TanStack React Query for server state management
- **Validation**: Zod for runtime type checking and schema validation

### Development and Build Tools
- **Build Tool**: Vite with React plugin and custom GLSL shader support
- **TypeScript**: Full TypeScript setup with strict configuration
- **Development**: tsx for TypeScript execution, esbuild for production builds
- **Error Handling**: @replit/vite-plugin-runtime-error-modal for development

### Audio and Media
- **Audio Management**: Built-in HTML5 Audio API
- **3D Support**: @react-three/fiber, @react-three/drei for potential 3D features
- **Asset Support**: GLSL shaders, 3D models, and audio files

### Utility Libraries
- **Styling Utilities**: clsx and class-variance-authority for conditional styling
- **Date Handling**: date-fns for time formatting
- **Command Interface**: cmdk for command palette functionality
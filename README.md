# Quick-Note React Frontend

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

## Project Overview

The Quick-Note React Frontend is a sophisticated, decoupled user interface designed to serve as the unified presentation layer for the Quick-Note Polyglot ecosystem. This repository facilitates a high degree of architectural flexibility, allowing a single frontend codebase to interface with various backend implementations, including Spring Boot, Go, MySQL, RavenDB, and Firebase. This decoupling ensures that the presentation logic remains independent of the storage and processing implementations, adhering to the principle of separation of concerns in modern distributed systems.

## System Architecture and Routing Strategy

The core architectural strength of this application lies in its backend-agnostic design. Unlike traditional monolithic applications where the frontend and backend are tightly coupled, this system utilizes a strict API contract adherence.

### Multi-Deployment via Environment Variables

To achieve complete portability across different backend stacks, the application implements a strategic "Multi-Deployment" approach. This is managed through the injection of environment variables at the build and runtime stages. Specifically, the application relies on the `VITE_API_BASE_URL` variable, accessed via `import.meta.env`, to determine the target API endpoint.

This strategy offers several enterprise-grade advantages:
1. **Architectural Agnosticism**: The codebase remains unaware of whether it is communicating with a Spring Boot Java server, a Go-based microservice, or a serverless Firebase instance.
2. **Environment Parity**: By modifying a single configuration value, the same build artifact can be deployed to staging, UAT, or production environments without recompilation.
3. **Seamless Migration**: Organizations can migrate their backend infrastructure or database providers (e.g., transitioning from MySQL to RavenDB) with zero modifications to the UI codebase, provided the API interface remains compliant.

## Technology Stack

The application leverages a modern, performance-oriented stack:

*   **React 18**: Utilized for its concurrent rendering capabilities and robust component-based architecture.
*   **TypeScript**: Implemented throughout the project to provide static type-checking and enhance developer productivity through clear data contracts.
*   **Vite**: Selected as the next-generation build tool to ensure rapid Hot Module Replacement (HMR) and optimized production bundling.
*   **Tailwind CSS v3**: Employed for utility-first styling, enabling a highly responsive and custom aesthetic without the overhead of traditional CSS frameworks.

## Prerequisites and Installation

To initialize the development environment, ensure that Node.js (version 18 or higher) and npm are installed on the local machine.

1. Clone the repository to the local environment:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd quick-note-react-ui
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

## Environment Configuration

The application requires an environment file to resolve the backend service address. The build system will fail to interact with the API if this variable is missing.

1. Create a `.env` file in the root directory:
   ```bash
   touch .env
   ```

2. Define the base URL for the target backend service:
   ```text
   VITE_API_BASE_URL=https://api.your-backend-provider.com
   ```

Note: Do not commit the `.env` file to version control. It is excluded by default in the `.gitignore` configuration.

## Development Scripts

The following commands are available via the Vite CLI:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server with Hot Module Replacement. |
| `npm run build` | Compiles the TypeScript source and builds the optimized production artifact. |
| `npm run preview` | Serves the production build locally for final verification. |
| `npm run lint` | Executes the ESLint suite to ensure code quality and style adherence. |

## Directory Structure

The source code follows a modular design pattern to separate reusable UI components from domain-specific business logic.

```text
src/
├── components/
│   ├── ui/          # Generic, reusable interface elements (Buttons, Inputs, Modals)
│   └── features/    # Domain-specific modules (Auth flows, Dashboard logic, Note management)
├── services/        # API service layer and external integrations
├── types/           # Global TypeScript interface and type definitions
├── utils/           # Shared utility functions and formatters
├── App.tsx          # Root application orchestrator
└── main.tsx         # Application entry point and DOM mounting
```

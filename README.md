# Next.js Todo App

This is a simple Todo application built with Next.js, following the principles of Clean Architecture. The application allows users to add, view, and manage their todo items.

## Project Structure

```
nextjs-todo-app
├── app
│   ├── application
│   │   ├── use-cases
│   │   │   └── addTodo.ts
│   │   └── interfaces
│   │       └── ITodoRepository.ts
│   ├── components
│   │   └── ui
│   │       ├── button.tsx
│   │       └── input.tsx
│   ├── domain
│   │   ├── entities
│   │   │   └── Todo.ts
│   │   └── value-objects
│   │       └── TodoId.ts
│   ├── infrastructure
│   │   ├── repositories
│   │   │   └── TodoRepository.ts
│   ├── presentation
│   │   ├── components
│   │   │   ├── TodoItem.tsx
│   │   │   └── TodoList.tsx
│   ├── layout.tsx
│   ├── page.tsx
├── public
├── styles
│   └── globals.css
├── .gitignore
├── package.json
├── postcss.config.mjs
├── tailwind.config.js
├── tsconfig.json
```

## Features

- Add new todo items
- View existing todo items
- Delete todo items

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/nextjs-todo-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd nextjs-todo-app
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to view the application.

## Technologies Used

## Technologies Used

- **Next.js**: Framework for server-rendered React applications.
- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Strongly typed programming language for JavaScript.
- **React Query (@tanstack/react-query)**: Data fetching and state management library.
- **ShadCN UI**: Component library for building accessible and customizable UI.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Sonner**: Library for toast notifications.
- **PostCSS**: Tool for transforming CSS with JavaScript plugins.
- **ESLint**: Linter for identifying and fixing JavaScript code issues.
- **Husky**: Git hooks for enforcing pre-commit checks.
- **Lucide React**: Icon library for React.
- **React Hook Form**: Library for managing form state and validation.
- **Class Variance Authority (CVA)**: Utility for managing class names in Tailwind CSS.
- **Tailwind Merge**: Utility for merging Tailwind CSS class names.
- **Autoprefixer**: PostCSS plugin to parse CSS and add vendor prefixes.
- **Zod**: TypeScript-first schema validation library.
- **Cross-Env**: Utility for setting environment variables across platforms.

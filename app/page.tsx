"use client";

import ErrorBoundary from "@/presentation/components/ErrorBoundary";

export default function Home() {
  return (
    <ErrorBoundary>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mt-6">Welcome to the Next Todo App</h1>
      </div>
    </ErrorBoundary>
  );
}
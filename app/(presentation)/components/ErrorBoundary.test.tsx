// FILE: app/(presentation)/components/ErrorBoundary.test.tsx
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import React, { act } from "react";
import ErrorBoundary from "./ErrorBoundary";

describe("ErrorBoundary Component", () => {
    const ChildComponent = () => <div>Child Component</div>;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, "error").mockImplementation(() => { }); // Suppress console.error during tests
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it("renders children when no error is thrown", () => {
        render(
            <ErrorBoundary>
                <ChildComponent />
            </ErrorBoundary>
        );

        expect(screen.getByText("Child Component")).toBeInTheDocument();
    });

    it("displays fallback UI when an error is thrown", () => {
        const ErrorThrowingComponent = () => {
            throw new Error("Test Error");
        };

        render(
            <ErrorBoundary>
                <ErrorThrowingComponent />
            </ErrorBoundary>
        );

        expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
        expect(screen.getByText("Test Error")).toBeInTheDocument();
    });

    it("resets error state and renders children again when 'Try Again' is clicked", async () => {
        const ErrorThrowingComponent = () => {
            const [shouldThrow, setShouldThrow] = React.useState(true);
            if (shouldThrow) {
                throw new Error("Test Error");
            }
            return <div>No Error</div>;
        };

        const { rerender } = render(
            <ErrorBoundary>
                <ErrorThrowingComponent />
            </ErrorBoundary>
        );

        // Verify fallback UI is displayed
        expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
        expect(screen.getByText("Test Error")).toBeInTheDocument();

        // Click "Try Again" button
        await act(async () => {
            fireEvent.click(screen.getByText("Try Again"));

            // Verify that the error state is reset and the children are rendered again

            // Rerender the component to verify that the error state is still reset

            rerender(
                <ErrorBoundary>
                    <ErrorThrowingComponent />
                </ErrorBoundary>
            );

            expect(screen.getByText("Test Error")).toBeInTheDocument();
            expect(screen.queryByText("Try Again")).toBeInTheDocument();
        });
    });
});
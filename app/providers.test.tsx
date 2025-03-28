import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { QueryClient } from "@tanstack/react-query";
import { Providers } from "./providers";

jest.mock("@tanstack/react-query", () => ({
    QueryClient: jest.fn(),
    QueryClientProvider: jest.fn(({ children }: { children: React.ReactNode }) => <div data-testid="query-client-provider">{children}</div>),
}));

jest.mock("@tanstack/react-query-devtools", () => ({
    ReactQueryDevtools: jest.fn(() => <div data-testid="react-query-devtools" />),
}));

describe("Providers", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders children correctly", () => {
        render(
            <Providers>
                <div data-testid="child">Child Component</div>
            </Providers>
        );

        expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("initializes QueryClientProvider with a QueryClient instance", () => {
        render(
            <Providers>
                <div>Child Component</div>
            </Providers>
        );

        expect(QueryClient).toHaveBeenCalledTimes(1);
        expect(screen.getByTestId("query-client-provider")).toBeInTheDocument();
    });

    it("renders ReactQueryDevtools with the correct initialIsOpen prop", () => {
        render(
            <Providers>
                <div>Child Component</div>
            </Providers>
        );

        expect(screen.getByTestId("react-query-devtools")).toBeInTheDocument();
    });
});
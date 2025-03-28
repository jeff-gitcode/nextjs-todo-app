import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import NavMenu from "./NavMenu";

// Mock the `useRouter` hook from Next.js
jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

describe("NavMenu Component", () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        // Mock the `router.push` function
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders navigation menu items", () => {
        render(<NavMenu />);

        const authLink = screen.getByText("Auth");
        const todoLink = screen.getByText("Todo");

        expect(authLink).toBeInTheDocument();
        expect(todoLink).toBeInTheDocument();
    });

    it("navigates to the Auth page when the Auth link is clicked", () => {
        render(<NavMenu />);

        const authLink = screen.getByText("Auth");
        fireEvent.click(authLink);

        expect(mockPush).toHaveBeenCalledWith("/auth");
    });

    it("navigates to the Todo page when the Todo link is clicked", () => {
        render(<NavMenu />);

        const todoLink = screen.getByText("Todo");
        fireEvent.click(todoLink);

        expect(mockPush).toHaveBeenCalledWith("/pages/todo");
    });
});
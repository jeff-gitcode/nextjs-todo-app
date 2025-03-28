import { Meta, StoryObj } from "@storybook/react";
import { fn, within, fireEvent, waitFor, expect } from "@storybook/test";
import NavMenu from "@/(presentation)/components/NavMenu";
import { createMock, getMock } from "storybook-addon-module-mock";
import * as actual from "next/navigation";

const meta = {
    title: "Components/NavMenu",
    tags: ["autodocs"],
    component: NavMenu,
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
} satisfies Meta<typeof NavMenu>;

export default meta;
type Story = StoryObj<typeof NavMenu>;

export const Default: Story = {
    parameters: {
        moduleMock: {
            mock: () => {
                const useRouter = actual.useRouter;

                const mockUseRouter = createMock(actual, "useRouter");
                mockUseRouter.mockImplementation(() => ({
                    ...useRouter(),
                    push: fn(),
                }));

                return [mockUseRouter];
            },
        },
    },
    play: async ({ canvasElement, parameters }) => {
        const mockUseRouter = getMock(parameters, actual, "useRouter");
        const pushMock = mockUseRouter().push;

        const canvas = within(canvasElement);

        // Simulate clicking the "Auth" link
        const authLink = canvas.getByText("Auth");
        fireEvent.click(authLink);
        await waitFor(() => {
            expect(pushMock).toHaveBeenCalledWith("/auth");
        });

        // Simulate clicking the "Todo" link
        const todoLink = canvas.getByText("Todo");
        fireEvent.click(todoLink);
        await waitFor(() => {
            expect(pushMock).toHaveBeenCalledWith("/pages/todo");
        });
    },
};
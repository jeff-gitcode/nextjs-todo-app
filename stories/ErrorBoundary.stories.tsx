
import { Meta, StoryObj } from "@storybook/react";
import { fn, within, fireEvent, waitFor, expect } from "@storybook/test";
import ErrorBoundary from "@/(presentation)/components/ErrorBoundary";

const meta = {
    title: "Components/ErrorBoundary",
    tags: ["autodocs"],
    component: ErrorBoundary,
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
} satisfies Meta<typeof ErrorBoundary>;

export default meta;
type Story = StoryObj<typeof ErrorBoundary>;

export const Default: Story = {
    args: {
        children: <div>Child Component</div>,
    },
};

export const WithError: Story = {
    args: {
        children: (
            <div>
                {(() => {
                    throw new Error("Test Error");
                })()}
            </div>
        ),
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // Verify that the fallback UI is displayed
        // await waitFor(() => {
        //     expect(canvas.getByText("Something went wrong.")).toBeInTheDocument();
        //     expect(canvas.getByText("Test Error")).toBeInTheDocument();
        // });

        // // Simulate clicking the "Try Again" button
        // const tryAgainButton = canvas.getByText("Try Again");
        // fireEvent.click(tryAgainButton);

        // // Verify that the error state is reset
        // await waitFor(() => {
        //     expect(canvas.queryByText("Something went wrong.")).not.toBeInTheDocument();
        // });
    },
};
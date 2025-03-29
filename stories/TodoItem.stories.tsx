import { Meta, StoryObj } from "@storybook/react";
import { fn, waitFor, within, expect, fireEvent } from "@storybook/test";
import TodoItem from "@/(presentation)/components/TodoItem";
import * as actual from "@/(presentation)/hooks/useTodoItem";
import { createMock, getMock, render } from "storybook-addon-module-mock";

// Mock the `useTodoItem` hook for Storybook
// jest.mock("@/hooks/useTodoItem", () => ({
//     useTodoItem: jest.fn(),
// }));
// mock useTodoItem by fn, don't use jest.mock
// const mockUseTodoItem = fn(() => ({
//     todo: { id: 1, title: "Sample Todo" },
//     loading: false,
//     error: null,
// }));

// const mockUseTodoItem = fn(actual.useTodoItem).mockName('useTodoItem');
function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const meta = {
    title: "Components/TodoItem",
    tags: ["autodocs"],
    component: TodoItem,
    argTypes: {
        todo: { control: "object" },
        onUpdate: { action: "onUpdate" },
    },
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    }
} satisfies Meta<typeof TodoItem>;

export default meta;
type Story = StoryObj<typeof TodoItem>;

export const Update: Story = {
    // beforeEach: async () => {
    //     mockUseTodoItem.mockClear();
    // },
    parameters: {
        moduleMock: {
            mock: () => {
                const useTodoItem = actual.useTodoItem;

                const mockUseTodoItem = createMock(actual, 'useTodoItem');
                mockUseTodoItem.mockImplementation(useTodoItem);

                return [mockUseTodoItem];
            }
        }
    },
    args: {
        todo: { id: 1, title: "Sample Todo" },
        onUpdate: fn(),
    },
    play: async ({ canvasElement, parameters }) => {
        const mockUseTodoItem = getMock(parameters, actual, 'useTodoItem');
        mockUseTodoItem.mockImplementation(() => ({
            todo: { id: 1, title: "Sample Todo" },
            loading: false,
            error: "",
            handleUpdate: fn(),
        }));

        // render(parameters);

        const canvas = within(canvasElement);

        await sleep(2000);
        const titleInput = canvas.getByPlaceholderText("Enter title");
        fireEvent.change(titleInput, {
            target: {
                value: "Updated Todo"
            },
        });
        const updateButton = canvas.getByText("Update");
        fireEvent.click(updateButton);
        await waitFor(() => {
            expect(mockUseTodoItem).toHaveBeenCalled();
        });
    },
};

export const Add: Story = {
    parameters: {
        moduleMock: {
            mock: () => {
                const useTodoItem = actual.useTodoItem;

                const mockUseTodoItem = createMock(actual, "useTodoItem");
                mockUseTodoItem.mockImplementation(() => ({
                    todo: { id: 0, title: "" }, // Empty fields for adding a new todo
                    loading: false,
                    error: null,
                    handleUpdate: fn(),
                }));

                return [mockUseTodoItem];
            },
        },
    },
    args: {
        todo: { id: 0, title: "" }, // Empty fields for adding a new todo
        onUpdate: fn(),
    },
    play: async ({ canvasElement, parameters }) => {
        const mockUseTodoItem = getMock(parameters, actual, "useTodoItem");

        const canvas = within(canvasElement);

        await sleep(2000);
        // Simulate entering a new title
        const titleInput = canvas.getByPlaceholderText("Enter title");
        fireEvent.change(titleInput, {
            target: {
                value: "New Todo",
            },
        });

        // Simulate clicking the "Create" button
        const createButton = canvas.getByText("Create");
        fireEvent.click(createButton);

        await waitFor(() => {
            expect(mockUseTodoItem).toHaveBeenCalled();
        });
    },
};

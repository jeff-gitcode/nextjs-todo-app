import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import TodoList from "@/(presentation)/components/TodoList";
import { Todo } from "@/domain/entities/Todo";

export default {
    title: "Components/TodoList",
    component: TodoList,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        controls: { expanded: true },
        nextjs: {
            appDirectory: true,
        }
    },
    argTypes: {
        onUpdate: { action: "onUpdate" },
        onDelete: { action: "onDelete" },
    },
} as Meta<typeof TodoList>;

const Template: StoryFn<typeof TodoList> = (args) => <TodoList {...args} />;

export const Default = Template.bind({});
Default.args = {
    todos: [
        { id: "1", title: "First Todo" },
        { id: "2", title: "Second Todo" },
    ] as Todo[],
};

export const Empty = Template.bind({});
Empty.args = {
    todos: [],
};
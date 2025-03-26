"use client";

import React, { FC } from 'react';

interface TodoItemProps {
    id: string;
    title: string;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

const TodoItem: FC<TodoItemProps> = ({ id, title, onToggle, onDelete }) => {
    return (
        <div className="todo-item">
            <span>{title}</span>
            <button onClick={() => onDelete(id)} aria-label={`Delete ${title}`}>
                Delete
            </button>
        </div>
    );
};

export default TodoItem;
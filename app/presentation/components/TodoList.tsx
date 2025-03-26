"use client";

import React from "react";
import TodoItem from "./TodoItem";
import { Todo } from "../../domain/entities/Todo";

interface TodoListProps {
  todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          onToggle={() => { }}
          onDelete={() => { }}
        />
      ))}
    </ul>
  );
};

export default TodoList;
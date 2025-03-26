// import { useEffect, useState } from 'react';
// import TodoList from '../components/TodoList';
// import { Todo } from '../../domain/entities/Todo';
// import { TodoRepository } from '../../infrastructure/repositories/TodoRepository';

// const todoRepository = new TodoRepository();

// const Home = () => {
//   const [todos, setTodos] = useState<Todo[]>([]);

//   useEffect(() => {
//     const fetchTodos = async () => {
//       const fetchedTodos = await todoRepository.getTodos();
//       setTodos(fetchedTodos);
//     };

//     fetchTodos();
//   }, []);

//   return (
//     <div>
//       <h1>Todo List</h1>
//       <TodoList todos={todos} />
//     </div>
//   );
// };

// export default Home;
import { API_URL } from '@env';
import { Todo } from '../screens/TodoListScreen';

const getTodos = async () => {
  const response = await fetch(`${API_URL}/todos`);
  if (!response.ok) throw new Error('Failed to fetch todos');
  const data = await response.json();
  return data;
};

const createTodo = async (text: string) => {
  const todo = {
    id: Date.now().toString(),
    completed: false,
    todo: text,
  };
  const response = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  console.log('response', response);

  if (!response.ok) throw new Error('Failed to create todos');

  const data = await response.json();
  return data;
};

const deleteTodo = async (todoId: string) => {
  const response = await fetch(`${API_URL}/todos/${todoId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete todos');
  const data = await response.json();
  return data;
};

const updateTodo = async (todo: Todo) => {
  const response = await fetch(`${API_URL}/todos/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) throw new Error('Failed to update todos');
  const data = await response.json();
  return data;
};

const getTodoByID = async (todoId: string) => {
  const response = await fetch(`${API_URL}/todos/${todoId}`, {
    method: 'GET',
  });
  if (!response.ok) throw new Error('Failed to Get todo');
  const data = await response.json();
  return data;
};

export { createTodo, deleteTodo, getTodos, updateTodo, getTodoByID };

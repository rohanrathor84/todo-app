import * as ToDoConstant from './todoConstant';

export const createTodo = (title, note) => ({
  type: ToDoConstant.CREATE_TODO,
  title: title,
  note: note,
});

export const readTodo = (title, note) => ({
  type: ToDoConstant.READ_TODO,
  title: title,
  note: note,
});

export const updateTodo = (title, note) => ({
  type: ToDoConstant.UPDATE_TODO,
  title: title,
  note: note,
});

export const deleteTodo = (title, note) => ({
  type: ToDoConstant.DELETE_TODO,
  title: title,
  note: note,
});

import * as ToDoAction from './todoAction';

const initialState = {
  id: '',
  title: '',
  note: '',
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ToDoAction.createTodo: {
      const todoId = action.id;
      const todoTitle = action.title;
      const todoNote = action.note;

      return {...state, id: todoId, title: todoTitle, note: todoNote};
    }

    case ToDoAction.readTodo: {
      const todoId = action.id;
      const todoTitle = action.title;
      const todoNote = action.note;

      return {...state, id: todoId, title: todoTitle, note: todoNote};
    }

    case ToDoAction.updateTodo: {
      const todoId = action.id;
      const todoTitle = action.title;
      const todoNote = action.note;

      return {...state, id: todoId, title: todoTitle, note: todoNote};
    }

    case ToDoAction.deleteTodo: {
      const todoId = action.id;
      const todoTitle = action.title;
      const todoNote = action.note;

      return {...state, id: todoId, title: todoTitle, note: todoNote};
    }
  }
};

export default todoReducer;

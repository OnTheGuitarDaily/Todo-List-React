import { createContext, useReducer, useState, useEffect } from "react";
import reducer, { ACTIONS } from "../reducer-context/reducer";
import {v4 as uuid} from 'uuid'


export const TodoContext = createContext(reducer)

const initialState = {
    todos: [] 
}

 export default function TodoProvider({children}){
    const [state, dispatch] = useReducer(reducer, initialState);
    const [filter, setFilter] = useState('all');


    const applyFilter = () => {
      switch (filter) {
        case 'active':
          return state.todos.filter((todo) => !todo.status);
        case 'completed':
          return state.todos.filter((todo) => todo.status);
        default:
          return state.todos;
      }
    };


  const addTodo = (todoText) => {
    dispatch({
        type: ACTIONS.ADD_TODO,
        payload: {
          id: uuid(),
          name: todoText,
          status: false,
        },
      });
  };

  const deleteTodo = (todoId) => {
    dispatch({
      type: ACTIONS.DELETE_TODO,
      payload: {
        id: todoId
      }
    })
  }

  const toggleTodo = (todoId) => {
    dispatch({
      type: ACTIONS.TOGGLE_TODO_STATUS,
      payload:{
        id: todoId
      }
    })
  }

  const clearTodo = () => {
    dispatch({
      type: ACTIONS.CLEAR_COMPLETED
    })
  }
    

  return(
        <TodoContext.Provider value={{ state, addTodo, deleteTodo, toggleTodo, setFilter, clearTodo, filteredTodos: applyFilter() }}>
            {children}
        </TodoContext.Provider>
  )

}
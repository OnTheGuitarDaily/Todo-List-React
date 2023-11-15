export const ACTIONS = {
    ADD_TODO: 'add',
    DELETE_TODO: 'delete',
    EDIT_TODO: 'edit',
    TOGGLE_TODO_STATUS: 'toggle',
    CLEAR_COMPLETED: 'clear'
  
}

export default function reducer(state, action){
    switch(action.type){
        case ACTIONS.ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload],
            };

        case ACTIONS.DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.payload.id),
            };
        case ACTIONS.EDIT_TODO:
            return{
                ...state,
                todos: state.todos.map((todo) =>
                todo.id === action.payload.id ? { ...todo, name: action.payload.name } : todo
            )
            }
        case ACTIONS.TOGGLE_TODO_STATUS:
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === action.payload.id
                        ? { ...todo, status: !todo.status }
                        : todo
                ),
            };
        case ACTIONS.CLEAR_COMPLETED:
            return{
                ...state,
                todos: state.todos.filter((todo) => !todo.status),
            }
        case ACTIONS.SET_TODOS:
            return {
                ...state,
                todos: action.payload,
            };
        default:
            return state
    }
}
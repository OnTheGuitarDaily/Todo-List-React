export const ACTIONS = {
    ADD_TODO: 'add',
    DELETE_TODO: 'delete',
    DELETE_ALL_TODO: 'deleteAll',
    EDIT_TODO: 'edit',
    TOGGLE_TODO_STATUS: 'toggle',
    TOGGLE_ALL_STATUS: 'al',
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
        case ACTIONS.DELETE_ALL_TODO:
            return {
                ...state,
                todos: []
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
        case ACTIONS.TOGGLE_ALL_STATUS:
            return {
                ...state,
                todos: state.todos.map((todo) => todo = {...todo , status: !todo.status}) 
            };
        case ACTIONS.CLEAR_COMPLETED:
            return{
                ...state,
                todos: state.todos.filter((todo) => !todo.status),
            }
        default:
            return state
    }
}
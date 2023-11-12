export const ACTIONS = {
    ADD_TODO: 'add',
    DELETE_TODO: 'delete',
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
        default:
            return state
    }
}
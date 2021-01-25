import { v4 as uuidv4 } from 'uuid';
export const todosReducer = (state,action)=>{
    switch(action.type){
        case "ADD_TODO":
            const newTodo = {
                userId: 9,
                id: uuidv4(),
                title: action.payload,
                body: "dddd"
            };
            const addedTodos = [...state.todos,newTodo];
            return {
                ...state,
                todos: addedTodos
            };
        case "TOGGLE_TODOS":
            const toggleTodos = state.todos.map(todo=>todo.id === action.payload.id ? {...action.payload,completed: !action.payload.completed} : todo)
            return {
                ...state,
                todos: toggleTodos
            };
        case "SET_CURRENT_TODO":
            
            return {
                ...state,
                currentTodo: action.payload
            };
        case "REMOVE":
            const filterTodos = state.todos.filter(todo=>todo.id !== action.payload.id);
            return {
                ...state,
                todos: filterTodos
            };
        case "UPDATE_TODO":
            
            const updatedTodo = {
                ...state.currentTodo,
                title: action.payload
            };
            const updatedTodoIndex = state.todos.findIndex(t=>t.id === state.currentTodo.id);
            const updatedTodos = [
                ...state.todos.slice(0,updatedTodoIndex),
                updatedTodo,
                ...state.todos.slice(updatedTodoIndex + 1)
            ];
            console.log(updatedTodos);
            return {
                ...state,
                todos: updatedTodos
            };
            
        default:
            return state;
    }
}
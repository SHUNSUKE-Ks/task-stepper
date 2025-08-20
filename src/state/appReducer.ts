export type Todo = {
  id: string;
  label: string;
  checked: boolean;
};

export type AppState = {
  memo: string;
  todos: Todo[];
};

export type AppAction =
  | { type: 'SET_MEMO'; payload: string }
  | { type: 'ADD_TODO'; payload: { label: string } }
  | { type: 'TOGGLE_TODO'; payload: string } // id
  | { type: 'DELETE_TODO'; payload: string } // id
  | { type: 'UPDATE_TODO_LABEL'; payload: { id: string; label: string } }
  | { type: 'LOAD_STATE'; payload: AppState };

export const initialState: AppState = {
  memo: '',
  todos: [
    { id: 'T01', label: 'Component Structure', checked: true },
    { id: 'T02', label: 'Props Definition', checked: true },
    { id: 'T03', label: 'State Management', checked: false },
    { id: 'T04', label: 'Styling', checked: false },
  ],
};

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_MEMO':
      return { ...state, memo: action.payload };
    case 'ADD_TODO':
      const newTodo: Todo = {
        id: `T${Date.now()}`,
        label: action.payload.label,
        checked: false,
      };
      return { ...state, todos: [...state.todos, newTodo] };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, checked: !todo.checked } : todo
        ),
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case 'UPDATE_TODO_LABEL':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? { ...todo, label: action.payload.label } : todo
        ),
      };
    case 'LOAD_STATE':
      return { ...action.payload };
    default:
      return state;
  }
};

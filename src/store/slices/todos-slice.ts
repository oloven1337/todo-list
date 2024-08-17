import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}

interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
};

// Мок данные
let mockTodos: Todo[] = [
  { id: 1, title: "Выучить React", isCompleted: false },
  { id: 2, title: "Посмотреть документацию redux", isCompleted: false },
  { id: 3, title: "Сходить за хлебом", isCompleted: true },
];

// Симуляция задержки ответа сервера
const mockDelay = <T>(data: T, delay = 300): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), delay));

// GET
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  return await mockDelay([...mockTodos]);
});

// POST (add)
export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (title: string) => {
    const newTodo: Todo = {
      id: Math.max(...mockTodos.map((todo) => todo.id)) + 1,
      title,
      isCompleted: false,
    };
    mockTodos = [...mockTodos, newTodo];
    return await mockDelay(newTodo);
  }
);

// PUT (update)
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (todo: Todo) => {
    mockTodos = mockTodos.map((t) => (t.id === todo.id ? { ...todo } : t));
    return await mockDelay(todo);
  }
);

// DELETE
export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: number) => {
    mockTodos = mockTodos.filter((t) => t.id !== id);
    return await mockDelay(id);
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch todos";
      })
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add todo";
      })
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update todo";
      })
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete todo";
      });
  },
});

export default todosSlice.reducer;

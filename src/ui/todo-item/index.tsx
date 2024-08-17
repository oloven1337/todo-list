import { FC } from "react";
import { Todo } from "../../store/slices/todos-slice";
import styles from "./styles.module.css";

export interface TodoItemProps {
  id: number;
  title: string;
  isCompleted: boolean;
  todo: Todo;
  editingTodoId: number | null;
  editingTitle: string;
  loading: boolean;
  setEditingTitle: React.Dispatch<React.SetStateAction<string>>;
  handleToggleTodo: (todo: Todo) => void;
  handleEditTodo: (todo: Todo) => void;
  handleDeleteTodo: (id: number) => void;
  handleSaveEdit: (todo: Todo) => void;
  handleCancelEdit: () => void;
}

export const TodoItem: FC<TodoItemProps> = ({
  todo,
  editingTodoId,
  editingTitle,
  setEditingTitle,
  handleToggleTodo,
  handleEditTodo,
  handleDeleteTodo,
  loading,
  handleCancelEdit,
  handleSaveEdit,
}) => {
  return (
    <li key={todo.id} className={styles.todoItem}>
      {editingTodoId === todo.id ? (
        <>
          <input
            type="text"
            value={editingTitle}
            onChange={(e) => setEditingTitle(e.target.value)}
            className={styles.input}
            disabled={loading}
          />
          <button
            onClick={() => handleSaveEdit(todo)}
            className={styles.button}
            disabled={loading}
          >
            Save
          </button>
          <button
            onClick={handleCancelEdit}
            className={styles.button}
            disabled={loading}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <div>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => handleToggleTodo(todo)}
                disabled={loading}
              />
            </label>
            {todo.title}
          </div>
          <div>
            <button
              onClick={() => handleEditTodo(todo)}
              className={styles.button}
              disabled={loading}
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className={styles.button}
              disabled={loading}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
};

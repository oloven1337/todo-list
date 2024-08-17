import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  Todo,
} from "../../store/slices/todos-slice";
import { TodoItem } from "../../ui/todo-item";
import { RootState, AppDispatch } from "../../store";
import styles from "./styles.module.css";
import { Button } from "../../ui/button";

export const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading, error } = useSelector(
    (state: RootState) => state.todos
  );
  const [newTodo, setNewTodo] = useState("");
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() && !loading) {
      dispatch(addTodo(newTodo));
      setNewTodo("");
    }
  };

  const handleToggleTodo = (todo: Todo) => {
    if (!loading) {
      dispatch(
        updateTodo({
          ...todo,
          isCompleted: !todo.isCompleted,
        })
      );
    }
  };

  const handleDeleteTodo = (id: number) => {
    if (!loading) {
      dispatch(deleteTodo(id));
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodoId(todo.id);
    setEditingTitle(todo.title);
  };

  const handleSaveEdit = (todo: Todo) => {
    if (!loading && editingTitle.trim()) {
      dispatch(
        updateTodo({
          ...todo,
          title: editingTitle,
        })
      );
      setEditingTodoId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setEditingTitle("");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todo List</h1>
      {error && <p className={styles.error}>Error: {error}</p>}
      <form onSubmit={handleAddTodo} className={styles.inputContainer}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo"
          className={styles.input}
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>
          Add Todo
        </Button>
      </form>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            {...todo}
            editingTodoId={editingTodoId}
            editingTitle={editingTitle}
            setEditingTitle={setEditingTitle}
            handleToggleTodo={handleToggleTodo}
            handleEditTodo={handleEditTodo}
            handleDeleteTodo={handleDeleteTodo}
            loading={loading}
            handleCancelEdit={handleCancelEdit}
            handleSaveEdit={handleSaveEdit}
          />
        ))}
      </ul>
      {loading && <p>Loading...</p>}
    </div>
  );
};

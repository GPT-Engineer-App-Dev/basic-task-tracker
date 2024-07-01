import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const TodoItem = ({ todo, onEdit, onDelete, onSave, onCancel }) => {
  const [editText, setEditText] = useState(todo.text);

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>
          {todo.isEditing ? (
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full"
            />
          ) : (
            todo.text
          )}
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-end space-x-2">
        {todo.isEditing ? (
          <>
            <Button onClick={() => onSave(todo.id, editText)}>Save</Button>
            <Button variant="outline" onClick={() => onCancel(todo.id)}>Cancel</Button>
          </>
        ) : (
          <>
            <Button onClick={() => onEdit(todo.id)}>Edit</Button>
            <Button variant="destructive" onClick={() => onDelete(todo.id)}>Delete</Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text: newTodo, isEditing: false }]);
    setNewTodo('');
  };

  const editTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: true } : todo));
  };

  const saveTodo = (id, newText) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, text: newText, isEditing: false } : todo));
  };

  const cancelEdit = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: false } : todo));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="flex mb-4">
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="flex-grow mr-2"
        />
        <Button onClick={addTodo}>Add</Button>
      </div>
      <div>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={editTodo}
            onDelete={deleteTodo}
            onSave={saveTodo}
            onCancel={cancelEdit}
          />
        ))}
      </div>
    </div>
  );
};

function Index() {
  return (
    <div>
      <h1 className="text-3xl text-center">Todo App</h1>
      <TodoList />
    </div>
  );
}

export default Index;
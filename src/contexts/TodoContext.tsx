import React, { createContext, useEffect, useState } from 'react';
import { Todo } from '../models/Todo';
import { TodoContextType } from './TodoContextType';
import { get, save } from '../services/TodoService';

export const TodoContext = createContext<TodoContextType>({
    todos:[],
    addTodo: () => {},
    removeTodo: () => {},
    toggle: () => {},
});

const TodoProvider = (props: any) => {
    const [todos, setTodos] = useState<Todo[]>(get);
    useEffect(() => {
        save(todos);
    }, [todos]);
   
    const addTodo = (title: string) => {
        const todo: Todo = {id: todos.length + 1, title: title, done: false}
        setTodos([...todos, todo]); //abre a lista e adiciona os novos valores retorna a lista com o item novo adicionado
        save(todos);
    }
    const removeTodo = (todo: Todo) =>{
        const index = todos.indexOf(todo);
        setTodos(todos.filter((_,i) => i !== index)); //seta e retorna a lista sem o item cujo index foi informado
        save(todos);
    }
    const toggle = (todo: Todo) => {
        const index = todos.indexOf(todo);
        todos[index].done = !todo.done;
        setTodos([...todos]);
        save(todos);
    }
    return (
        <TodoContext.Provider value={{
            todos,addTodo,removeTodo,toggle
        }}>
            {props.children}
        </TodoContext.Provider>
    );
}
export default TodoProvider;



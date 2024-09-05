"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import TodoList from "./todo-list";

interface IUser {
  id: string;
  name: string;
  completed: boolean;
}

export default function AddTodo() {
  const [todoObj, setTodoObj] = useState<IUser>({ id: "", name: "", completed: false });
  const [todoAry, setTodoAry] = useState<IUser[]>([]);
  const [newAry, setNewAry] = useState<IUser[]>([]);

  const pathName = usePathname();

  const path = useCallback(() => {
    const ary = [...todoAry];
    let arr: IUser[] = [];
    if (pathName === "/active") {
      arr = ary?.filter((item) => !item.completed);
    } else if (pathName === "/completed") {
      arr = ary?.filter((item) => item.completed);
    } else if (pathName === "/") {
      arr = ary;
    }

    setNewAry(arr);
  }, [pathName, todoAry]);

  useEffect(() => {
    path();
  }, [path]);

  useEffect(() => {
    const storedData: string = localStorage.getItem("data") || "";
    if (storedData) {
      const parsedData: IUser[] = JSON.parse(storedData);
      setTodoAry(parsedData);
      setNewAry(parsedData);
    }
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (todoObj?.name) {
        const newTodo = { ...todoObj, id: Math.random().toString(36).substr(2, 9) };
        setTodoAry([...todoAry, newTodo]);
        setNewAry([...newAry, newTodo]);
        setTodoObj({ id: "", name: "", completed: false });
        localStorage.setItem("data", JSON.stringify([...todoAry, newTodo]));
      }
    },
    [newAry, todoAry, todoObj]
  );

  const handleDelete = useCallback(
    (todo: IUser) => {
      let newAry = [...todoAry];
      newAry = newAry?.filter((item) => item.id !== todo.id);
      setTodoAry(newAry);
      setNewAry(newAry);
      localStorage.setItem("data", JSON.stringify(newAry));
    },
    [todoAry]
  );

  const handleCheckChange = useCallback(
    (todo: IUser, e: React.ChangeEvent<HTMLInputElement>) => {
      let newAry = [...todoAry];
      const i: number = newAry?.findIndex((item) => item?.id === todo?.id);
      newAry[i] = { ...newAry[i], completed: !todo?.completed };
      setTodoAry(newAry);
      setNewAry(newAry);
      localStorage.setItem("data", JSON.stringify(newAry));
    },
    [todoAry]
  );

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-gradient-to-r from-blue-100 to-blue-200 shadow-xl rounded-lg">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mb-6">
        <input
          name="name"
          type="text"
          value={todoObj?.name || ""}
          placeholder="Type Your Todo"
          onChange={(e) => {
            setTodoObj((prev) => ({ ...prev, [e.target.name]: e.target.value }));
          }}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="submit"
          value="Add"
          className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        />
      </form>
      <TodoList todos={newAry} onDelete={handleDelete} onCheckChange={handleCheckChange} />
    </div>
  );
}

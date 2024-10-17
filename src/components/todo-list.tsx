import Link from "next/link";

interface IUser {
  id: string;
  name: string;
  completed: boolean;
}

interface TodoListProps {
  todos: IUser[];
  onDelete: (todo: IUser) => void;
  onCheckChange: (todo: IUser, e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TodoList(props: TodoListProps) {
  const { todos, onDelete, onCheckChange } = props;

  return (
    <ul className="space-y-4">
      {todos?.map((item: IUser) => (
        <li
          key={item.id}
          className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
        >
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="completed"
              checked={item.completed}
              onChange={(e) => onCheckChange(item, e)}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className={`text-lg font-medium ${item.completed ? "line-through text-gray-400" : "text-gray-700"}`}>
              {item.name}
            </span>
          </div>
          {item.completed && (
            <button
              onClick={() => onDelete(item)}
              className="px-3 py-1 bg-red-100 text-red-600 font-semibold rounded hover:bg-red-200 transition duration-150"
            >
              Delete
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
//c

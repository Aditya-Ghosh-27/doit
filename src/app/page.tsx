import { prisma } from "@/db";
import Link from "next/link";
import TodoItem from "@/components/TodoItem";

function getTodos(){
  return prisma.todo.findMany();
}

export default async function Home(){
  const todos = await getTodos();
  // await prisma.todo.create({ data: {title: "test", completed: false}})

  return (
    <>
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-2xl">Todos</h1>
      <Link className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none " href="/new">New</Link>
    </header>
    <ul className="pl-4">
      {todos.map(todo => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
    </>
  )
}
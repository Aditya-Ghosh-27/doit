import { prisma } from "@/db";
import Link from "next/link";
import { redirect } from "next/navigation";

// Server action
async function createTodo(data: FormData){
    // to run on the server
    "use server"
    const title = data.get("title")?.valueOf;
    if(typeof title !== "string" || title.length === 0){
        throw new Error("Invalid Title");
    }

    await prisma.todo.create({data: {title, completed: false}});
    redirect("/");
}

export default function Page(){
    return (
        <>
            <header className="flex justify-between items-center mb-4">
                <h1 className="text-2xl">New</h1>
            </header>
            <form action={createTodo} className="flex gap-2 flex-col">
                <input type="text" placeholder="create a new todo" name="title" className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100" />
                <div className="flex justify-end gap-1">
                    <Link href=".." className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within: border-slate-100">Cancel</Link>
                    <button className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within: border-slate-100">Create</button>
                </div>
            </form>
        </>
    )
}
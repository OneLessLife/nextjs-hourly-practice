import Counter from "./components/Counter";
import Header from "./components/header";
import ThemeToggle from './components/ThemeToggle'
import TodoList from './components/TodoList'


export default function Home() {
  return (
    <main className="p-10">
      <Header />

      <h1 className="text-3xl font-bold">
        Next.js Hourly Practice with TypeScript
      </h1>
      <p className="mt-4">
        Demonstrating client components and state management in Next.js.
      </p>
      <Counter />
      <ThemeToggle />
      <TodoList />

    </main>
  );
}

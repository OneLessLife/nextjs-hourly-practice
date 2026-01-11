import Header from "./components/header";
import Counter from "./components/Counter";
import ThemeToggle from './components/ThemeToggle'
import TodoList from './components/TodoList'
import MoviesRow from './components/MoviesRow'
import Tabs from './components/Tabs'

export default function Home() {
  const tabs = [
    { name: 'Counter', content: <Counter /> },
    { name: 'ThemeToggle', content: <ThemeToggle /> },
    { name: 'TodoList', content: <TodoList /> },
    { name: 'MoviesRow', content: <MoviesRow /> },
  ]

  return (
    <main className="p-10 bg-black min-h-screen text-white">
      <Header />

      <h1 className="text-3xl font-bold mt-5">
        Next.js Hourly Practice with TypeScript
      </h1>
      <p className="mt-2 text-gray-300 mb-5">
        Demonstrating client components and state management in Next.js.
      </p>

      <Tabs tabs={tabs} />
    </main>
  )
}

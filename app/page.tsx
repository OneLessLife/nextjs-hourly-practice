import Counter from './components/Counter'

export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">
        Next.js Hourly Practice 🚀
      </h1>

      <p className="mt-4">
        Demonstrating client components and state management in Next.js.
      </p>

      <Counter />
    </main>
  )
}

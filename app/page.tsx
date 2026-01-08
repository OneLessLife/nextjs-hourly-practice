import Counter from "./components/Counter";
import Header from "./components/header";

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
    </main>
  );
}

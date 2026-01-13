import Header from "./components/Header";
import Counter from "./components/Counter";
import ThemeToggle from "./components/ThemeToggle";
import TodoList from "./components/TodoList";
import MoviesRow from "./components/MoviesRow";
import Tabs from "./components/Tabs";
import UserIPList from "./components/UserIPList";
import FormValidation from "./components/FormValidation";
import ExtremeAdvancedForm from "./components/ExtremeAdvancedForm";
import NotificationCenter from "./components/NotificationCenter";

export default function Home() {
  const tabs = [
    { name: "Counter", content: <Counter /> },
    { name: "Theme Toggle", content: <ThemeToggle /> },
    { name: "To-Do List", content: <TodoList /> },
    { name: "Movies Row", content: <MoviesRow /> },
    { name: "User IPs", content: <UserIPList /> },
    { name: "Form Validation", content: <FormValidation /> },
    { name: "Extreme Form", content: <ExtremeAdvancedForm /> },
  ];

  // Fake user list
  const users = Array.from({ length: 20 }).map((_, i) => ({
    ip: `192.168.0.${i + 1}`,
    online: Math.random() > 0.5,
  }));

  return (
    <main className="p-10 bg-black min-h-screen text-white max-w-7xl mx-auto">
      
      {/* Header with Notifications */}
      <div className="flex justify-between items-center">
        <Header />
        <NotificationCenter />
      </div>

      <h1 className="text-3xl font-bold mt-6">
        Next.js Hourly Practice Dashboard
      </h1>

      <p className="mt-2 text-gray-300 mb-6">
        Interactive client components in a professional layout.
      </p>

      {/* Main Tabs */}
      <Tabs tabs={tabs} />

      {/* Example Large List */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">User IP List</h2>

        <div className="max-h-[400px] overflow-y-auto space-y-3">
          {users.map((user, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center p-4 bg-gray-800 rounded-xl shadow hover:shadow-lg transition-shadow"
            >
              <span>IP: {user.ip}</span>

              <span
                className={`px-2 py-1 rounded-full text-sm font-semibold ${
                  user.online
                    ? "bg-green-500 text-black"
                    : "bg-red-500 text-white"
                }`}
              >
                {user.online ? "Online" : "Offline"}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

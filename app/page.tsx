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
import ConfettiButton from "./components/ConfettiButton";
import ExtremeKanban from "./components/ExtremeKanban";
import ExtremeLiveChat from "./components/ExtremeLiveChat";
import ExtremeQAChat from "./components/ExtremeQAChat";
import ExtremeAIChat from "./components/ExtremeAIChat";
import AIJobInterview from "./components/AIJobInterview";
import MotivationCard from "./components/MotivationCard";
import SmartSearch from "./components/SmartSearch";
import ActivityTimeline from "./components/ActivityTimeline";
import EnterpriseDataTable from "./components/EnterpriseDataTable";
import ProductivityDashboard from "./components/ProductivityDashboard";
import SmartFinanceSimulator from "./components/SmartFinanceSimulator";
import HabitEvolutionSimulator from "./components/HabitEvolutionSimulator";
import ApiRequestBuilder from "@/components/ApiRequestBuilder"


export default function Home() {
  const tabs = [
    { name: "Counter", content: <Counter /> },
    { name: "Theme Toggle", content: <ThemeToggle /> },
    { name: "To-Do List", content: <TodoList /> },
    { name: "Movies Row", content: <MoviesRow /> },
    { name: "User IPs", content: <UserIPList /> },
    { name: "Form Validation", content: <FormValidation /> },
    { name: "Extreme Form", content: <ExtremeAdvancedForm /> },
    { name: "Celebrate", content: <ConfettiButton /> },
    { name: "Extreme Kanban", content: <ExtremeKanban /> },
    { name: "Live Chat", content: <ExtremeLiveChat /> },
    { name: "Q&A Chat", content: <ExtremeQAChat /> },
    { name: "AI Q&A Chat", content: <ExtremeAIChat /> },
    { name: "AI Job Interview", content: <AIJobInterview /> },
    {name: "Motivation",content: <MotivationCard title="Stay Strong 💪"message="Every workout makes you better than yesterday." />},
    { name: "Smart Search", content: <SmartSearch /> },
    { name: "Activity Log", content: <ActivityTimeline /> },
    { name: "Data Table", content: <EnterpriseDataTable /> },
    { name: "Productivity Dashboard", content: <ProductivityDashboard /> },
    { name: "Finance", content: <SmartFinanceSimulator /> },
    { name: "Habit Evolution", content: <HabitEvolutionSimulator /> },
    { name: "Api Builder", content: <ApiRequestBuilder /> },

  ];

  const users = Array.from({ length: 20 }).map((_, i) => ({
    ip: `192.168.0.${i + 1}`,
    online: Math.random() > 0.5,
  }));

  return (
    <main className="p-10 bg-black min-h-screen text-white max-w-7xl mx-auto">
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

      <Tabs tabs={tabs} />

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

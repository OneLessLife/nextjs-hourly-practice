"use client";

import { useEffect, useState } from "react";

type Transaction = {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: string;
};

const categories = ["Food", "Transport", "Bills", "Fun", "Other"];

export default function SmartFinanceSimulator() {
  const [txs, setTxs] = useState<Transaction[]>([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [budget, setBudget] = useState("");
  const [search, setSearch] = useState("");

  // Load
  useEffect(() => {
    const saved = localStorage.getItem("finance_txs");
    const savedBudget = localStorage.getItem("finance_budget");
    if (saved) setTxs(JSON.parse(saved));
    if (savedBudget) setBudget(savedBudget);
  }, []);

  // Save
  useEffect(() => {
    localStorage.setItem("finance_txs", JSON.stringify(txs));
    localStorage.setItem("finance_budget", budget);
  }, [txs, budget]);

  function addTx() {
    if (!title || !amount) return;

    const tx: Transaction = {
      id: Date.now(),
      title,
      amount: Number(amount),
      category,
      date: new Date().toLocaleDateString(),
    };

    setTxs((prev) => [tx, ...prev]);
    setTitle("");
    setAmount("");
  }

  function deleteTx(id: number) {
    setTxs((prev) => prev.filter((t) => t.id !== id));
  }

  // Analytics
  const totalSpent = txs.reduce((sum, t) => sum + t.amount, 0);
  const budgetNum = Number(budget) || 0;
  const balance = budgetNum - totalSpent;

  const categoryTotals = categories.map((cat) => ({
    category: cat,
    total: txs
      .filter((t) => t.category === cat)
      .reduce((sum, t) => sum + t.amount, 0),
  }));

  const filteredTxs = txs.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-slate-950 text-white rounded-xl border border-slate-800 shadow-xl">
      <h2 className="text-3xl font-bold mb-2">💰 Smart Finance Simulator</h2>
      <p className="text-slate-400 mb-6">
        Budget planning • Expense tracking • Forecasting
      </p>

      {/* Budget */}
      <div className="mb-6">
        <label className="text-sm text-slate-400">Monthly Budget (€)</label>
        <input
          className="w-full p-2 rounded bg-slate-900 border border-slate-700 mt-1"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Enter monthly budget..."
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6 text-center">
        <Stat title="Total Spent" value={`${totalSpent}€`} />
        <Stat title="Balance" value={`${balance}€`} />
        <Stat
          title="Forecast Next Month"
          value={`${balance - totalSpent * 0.2}€`}
        />
      </div>

      {/* Category Bars */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Spending by Category</h3>
        <div className="space-y-2">
          {categoryTotals.map((c) => (
            <div key={c.category}>
              <p className="text-sm">{c.category}</p>
              <div className="w-full bg-slate-800 rounded h-3">
                <div
                  className="bg-green-500 h-3 rounded"
                  style={{
                    width: `${Math.min(
                      100,
                      (c.total / (budgetNum || 1)) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Transaction */}
      <div className="flex gap-3 mb-4">
        <input
          className="flex-1 p-2 rounded bg-slate-900 border border-slate-700"
          placeholder="Transaction title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="w-28 p-2 rounded bg-slate-900 border border-slate-700"
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          className="p-2 rounded bg-slate-900 border border-slate-700"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <button
          onClick={addTx}
          className="px-4 bg-green-600 rounded font-semibold"
        >
          Add
        </button>
      </div>

      {/* Search */}
      <input
        className="w-full p-2 mb-4 rounded bg-slate-900 border border-slate-700"
        placeholder="Search transaction..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Transactions */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {filteredTxs.map((t) => (
          <div
            key={t.id}
            className="flex justify-between items-center bg-slate-900 p-3 rounded border border-slate-800"
          >
            <div>
              <p className="font-semibold">{t.title}</p>
              <p className="text-xs text-slate-500">
                {t.category} • {t.date}
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <span className="font-bold text-green-400">{t.amount}€</span>
              <button
                onClick={() => deleteTx(t.id)}
                className="px-3 py-1 text-sm bg-red-600 rounded"
              >
                X
              </button>
            </div>
          </div>
        ))}

        {txs.length === 0 && (
          <p className="text-slate-500 text-center mt-6">
            No transactions yet 💸
          </p>
        )}
      </div>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: any }) {
  return (
    <div className="bg-slate-900 p-3 rounded border border-slate-800">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

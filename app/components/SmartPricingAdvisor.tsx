"use client";

import { useState } from "react";

type Plan = {
  name: string;
  basePrice: number;
  storage: number; // GB
  teamLimit: number;
};

const plans: Plan[] = [
  { name: "Starter", basePrice: 9, storage: 10, teamLimit: 3 },
  { name: "Pro", basePrice: 19, storage: 50, teamLimit: 10 },
  { name: "Enterprise", basePrice: 49, storage: 200, teamLimit: 50 },
];

export default function SmartPricingAdvisor() {
  const [teamSize, setTeamSize] = useState(1);
  const [storageNeed, setStorageNeed] = useState(5);
  const [prioritySupport, setPrioritySupport] = useState(false);

  function calculateRecommendation() {
    return plans.find(
      (plan) =>
        plan.teamLimit >= teamSize && plan.storage >= storageNeed
    ) || plans[plans.length - 1];
  }

  const recommended = calculateRecommendation();

  function finalPrice(plan: Plan) {
    let price = plan.basePrice;
    if (prioritySupport) price += 5;
    return price;
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-3xl">
      <h2 className="text-xl font-bold text-pink-400 mb-4">
        Smart Pricing Advisor
      </h2>

      {/* Controls */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-sm text-gray-400">Team Members</label>
          <input
            type="number"
            value={teamSize}
            min={1}
            onChange={(e) => setTeamSize(Number(e.target.value))}
            className="w-full bg-gray-800 p-2 rounded"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400">Storage Needed (GB)</label>
          <input
            type="number"
            value={storageNeed}
            min={1}
            onChange={(e) => setStorageNeed(Number(e.target.value))}
            className="w-full bg-gray-800 p-2 rounded"
          />
        </div>

        <div className="flex items-center gap-2 mt-6">
          <input
            type="checkbox"
            checked={prioritySupport}
            onChange={(e) => setPrioritySupport(e.target.checked)}
          />
          <label className="text-sm">Priority Support (+5€)</label>
        </div>
      </div>

      {/* Pricing Table */}
      <div className="grid md:grid-cols-3 gap-4">
        {plans.map((plan) => {
          const isRecommended = plan.name === recommended.name;

          return (
            <div
              key={plan.name}
              className={`p-4 rounded border ${
                isRecommended
                  ? "border-pink-400 bg-gray-800 scale-105"
                  : "border-gray-700 bg-gray-900"
              } transition`}
            >
              <h3 className="font-bold text-lg mb-2">{plan.name}</h3>
              <p className="text-2xl font-bold mb-2">
                €{finalPrice(plan)}/mo
              </p>
              <p className="text-sm text-gray-400">
                Up to {plan.teamLimit} users
              </p>
              <p className="text-sm text-gray-400">
                {plan.storage}GB Storage
              </p>

              {isRecommended && (
                <p className="mt-3 text-xs font-bold text-pink-400">
                  Recommended Plan
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff6666", "#00C49F", "#FFBB28"];

export default function HistoryPage() {
  const [data, setData] = useState<any[]>([]);
  const [grouped, setGrouped] = useState<any[]>([]);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) return;

    fetch("/api/get-history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then(res => res.json())
      .then(res => {
        setData(res.entries);

        const moodCounts: any = {};
        res.entries.forEach((entry: any) => {
          const mood = entry.mood.toLowerCase();
          moodCounts[mood] = (moodCounts[mood] || 0) + 1;
        });

        const formatted = Object.keys(moodCounts).map((mood) => ({
          name: mood,
          value: moodCounts[mood],
        }));

        setGrouped(formatted);
      });
  }, []);

  return (
    <main className="min-h-screen p-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">📊 Mood History</h1>

      {data.length === 0 ? (
        <p className="text-center text-gray-300">No mood history available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/10 p-6 rounded-xl shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">Mood Distribution (Pie)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={grouped} dataKey="value" nameKey="name" outerRadius={100} label>
                  {grouped.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white/10 p-6 rounded-xl shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">Mood Frequency (Bar)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={grouped}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="col-span-1 md:col-span-2 bg-white/10 p-6 rounded-xl shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">Mood Log</h2>
            <div className="overflow-auto max-h-96">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="py-2">Mood</th>
                    <th className="py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((entry, index) => (
                    <tr key={index} className="border-b border-white/10">
                      <td className="py-2 capitalize">{entry.mood}</td>
                      <td className="py-2">{new Date(entry.date).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

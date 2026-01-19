"use client";

import { useState, useMemo } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "User";
  status: "Active" | "Suspended";
};

const data: User[] = [
  { id: 1, name: "Jason Bell", email: "jason@mail.com", role: "Admin", status: "Active" },
  { id: 2, name: "Maria Stone", email: "maria@mail.com", role: "Editor", status: "Active" },
  { id: 3, name: "John Smith", email: "john@mail.com", role: "User", status: "Suspended" },
  { id: 4, name: "Eleni Papas", email: "eleni@mail.com", role: "User", status: "Active" },
  { id: 5, name: "Nick Adams", email: "nick@mail.com", role: "Editor", status: "Active" },
  { id: 6, name: "Anna White", email: "anna@mail.com", role: "User", status: "Active" },
  { id: 7, name: "Chris Green", email: "chris@mail.com", role: "User", status: "Suspended" },
  { id: 8, name: "Sophia Blue", email: "sophia@mail.com", role: "Admin", status: "Active" },
];

export default function EnterpriseDataTable() {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof User>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  const pageSize = 5;

  const filteredData = useMemo(() => {
    let users = data.filter((u) =>
      Object.values(u).some((val) =>
        val.toString().toLowerCase().includes(search.toLowerCase())
      )
    );

    users.sort((a, b) => {
      const valA = a[sortField].toString().toLowerCase();
      const valB = b[sortField].toString().toLowerCase();
      if (valA < valB) return sortDir === "asc" ? -1 : 1;
      if (valA > valB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return users;
  }, [search, sortField, sortDir]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const pageData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  const changeSort = (field: keyof User) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  return (
    <div className="bg-gray-900 p-5 rounded-xl text-white max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Enterprise Users Table</h2>

      {/* Search */}
      <input
        value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        placeholder="Search users..."
        className="mb-4 w-full p-2 rounded bg-gray-800"
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              {["name", "email", "role", "status"].map((field) => (
                <th
                  key={field}
                  onClick={() => changeSort(field as keyof User)}
                  className="p-3 cursor-pointer hover:text-blue-400"
                >
                  {field.toUpperCase()}
                  {sortField === field && (sortDir === "asc" ? " ▲" : " ▼")}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {pageData.map((u) => (
              <tr key={u.id} className="border-b border-gray-800 hover:bg-gray-800">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.role}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-sm ${
                    u.status === "Active" ? "bg-green-500 text-black" : "bg-red-500"
                  }`}>
                    {u.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
        >
          Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Search, Trash2, CalendarDays } from "lucide-react";

function EmployeeTable({ employees, onDelete, onViewAttendance }) {
  const [search, setSearch] = useState("");

  const filtered = employees.filter(
    (emp) =>
      emp.full_name.toLowerCase().includes(search.toLowerCase()) ||
      emp.employee_id.toLowerCase().includes(search.toLowerCase()),
  );

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
      {/* Header Section */}
      <div className="p-6 border-b bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            placeholder="Search by name or ID..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table Section */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center text-gray-400">
          <p className="text-lg font-medium">No employees found</p>
          <p className="text-sm mt-1">Try adjusting your search keyword.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left">Employee</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Department</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((emp, index) => (
                <tr
                  key={emp.employee_id}
                  className="border-t hover:bg-indigo-50 transition duration-200"
                >
                  {/* Employee Column */}
                  <td className="px-6 py-4 flex items-center gap-4">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-semibold">
                      {getInitials(emp.full_name)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {emp.full_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        ID: {emp.employee_id}
                      </p>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4 text-gray-600">{emp.email}</td>

                  {/* Department */}
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-600">
                      {emp.department}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => onViewAttendance(emp.employee_id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs hover:bg-indigo-700 transition"
                      >
                        <CalendarDays size={14} />
                        Attendance
                      </button>

                      <button
                        onClick={() => onDelete(emp.employee_id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-100 text-red-600 text-xs hover:bg-red-200 transition"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default EmployeeTable;

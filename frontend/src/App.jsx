import { useEffect, useState } from "react";
import api from "./services/api";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import AttendanceModal from "./components/AttendanceModal";

function App() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/employees/");
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const createEmployee = async (data) => {
    await api.post("/api/employees/", data);
    fetchEmployees();
  };

  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;
    await api.delete(`/api/employees/${id}/`);
    fetchEmployees();
  };

  // Stats
  const totalEmployees = employees.length;
  const departments = new Set(employees.map((e) => e.department)).size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center text-white">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              HRMS Dashboard
            </h1>
            <p className="text-white/80">
              Manage employees & attendance effortlessly
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-md px-5 py-2 rounded-xl shadow-lg">
            <p className="text-sm">Total Employees</p>
            <p className="text-2xl font-bold">{totalEmployees}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/20 backdrop-blur-md text-white p-6 rounded-2xl shadow-xl">
            <p className="text-sm opacity-80">Employees</p>
            <h2 className="text-3xl font-bold mt-1">{totalEmployees}</h2>
          </div>

          <div className="bg-white/20 backdrop-blur-md text-white p-6 rounded-2xl shadow-xl">
            <p className="text-sm opacity-80">Departments</p>
            <h2 className="text-3xl font-bold mt-1">{departments}</h2>
          </div>

          <div className="bg-white/20 backdrop-blur-md text-white p-6 rounded-2xl shadow-xl">
            <p className="text-sm opacity-80">System Status</p>
            <h2 className="text-3xl font-bold mt-1 text-green-300">Active</h2>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-8">
          {/* Employee Form */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>
            <EmployeeForm onCreate={createEmployee} />
          </div>

          {/* Employee Table */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Employee Directory</h2>

            {loading ? (
              <p className="text-center text-gray-500 py-10">
                Loading employees...
              </p>
            ) : (
              <EmployeeTable
                employees={employees}
                onDelete={deleteEmployee}
                onViewAttendance={setSelectedEmp}
              />
            )}
          </div>
        </div>
      </div>

      {selectedEmp && (
        <AttendanceModal
          employeeId={selectedEmp}
          onClose={() => setSelectedEmp(null)}
        />
      )}
    </div>
  );
}

export default App;

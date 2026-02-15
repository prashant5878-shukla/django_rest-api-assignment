import { useEffect, useState } from "react";
import api from "./services/api";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import AttendanceModal from "./components/AttendanceModal";

function App() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState(null);

  const fetchEmployees = async () => {
    const res = await api.get("/api/employees/");
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const createEmployee = async (data) => {
    await api.post("/api/employees/", data);
    fetchEmployees();
  };

  const deleteEmployee = async (id) => {
    await api.delete(`/api/employees/${id}/`);
    fetchEmployees();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">
          HRMS Dashboard
        </h1>

        <EmployeeForm onCreate={createEmployee} />

        <EmployeeTable
          employees={employees}
          onDelete={deleteEmployee}
          onViewAttendance={setSelectedEmp}
        />
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

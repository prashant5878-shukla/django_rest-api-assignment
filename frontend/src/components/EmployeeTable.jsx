function EmployeeTable({ employees, onDelete, onViewAttendance }) {
    if (!employees.length) {
        return <p className="p-4">No employees found</p>;
    }

    return (
        <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="th">ID</th>
                        <th className="th">Name</th>
                        <th className="th">Email</th>
                        <th className="th">Dept</th>
                        <th className="th text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.employee_id} className="border-t">
                            <td className="td">{emp.employee_id}</td>
                            <td className="td">{emp.full_name}</td>
                            <td className="td">{emp.email}</td>
                            <td className="td">{emp.department}</td>
                            <td className="td text-center space-x-3">
                                <button
                                    onClick={() =>
                                        onViewAttendance(emp.employee_id)
                                    }
                                    className="text-blue-600 hover:underline"
                                >
                                    Attendance
                                </button>
                                <button
                                    onClick={() => onDelete(emp.employee_id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeTable;

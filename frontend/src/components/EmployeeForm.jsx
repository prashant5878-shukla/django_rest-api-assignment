import { useState } from "react";

function EmployeeForm({ onCreate }) {
    const [form, setForm] = useState({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(form);
        setForm({
            employee_id: "",
            full_name: "",
            email: "",
            department: "",
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-5 rounded-xl shadow grid grid-cols-2 gap-3"
        >
            <input
                className="input"
                placeholder="Employee ID"
                value={form.employee_id}
                onChange={(e) =>
                    setForm({ ...form, employee_id: e.target.value })
                }
                required
            />
            <input
                className="input"
                placeholder="Full Name"
                value={form.full_name}
                onChange={(e) =>
                    setForm({ ...form, full_name: e.target.value })
                }
                required
            />
            <input
                className="input"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                }
                required
            />
            <input
                className="input"
                placeholder="Department"
                value={form.department}
                onChange={(e) =>
                    setForm({ ...form, department: e.target.value })
                }
                required
            />

            <button className="col-span-2 bg-black text-white py-2 rounded-lg hover:opacity-90">
                Add Employee
            </button>
        </form>
    );
}

export default EmployeeForm;

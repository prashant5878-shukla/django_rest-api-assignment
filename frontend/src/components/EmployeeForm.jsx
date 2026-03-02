import { useState } from "react";
import { User, Mail, Hash, Building2 } from "lucide-react";

function EmployeeForm({ onCreate }) {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!form.employee_id) newErrors.employee_id = "Employee ID required";
    if (!form.full_name) newErrors.full_name = "Full name required";
    if (!form.email.includes("@")) newErrors.email = "Invalid email";
    if (!form.department) newErrors.department = "Select department";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    await onCreate(form);

    setForm({
      employee_id: "",
      full_name: "",
      email: "",
      department: "",
    });

    setSubmitting(false);
  };

  const inputStyle =
    "w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Employee ID */}
      <div>
        <div className="relative">
          <Hash
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            className={inputStyle}
            placeholder="Employee ID"
            value={form.employee_id}
            onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
          />
        </div>
        {errors.employee_id && (
          <p className="text-red-500 text-xs mt-1">{errors.employee_id}</p>
        )}
      </div>

      {/* Full Name */}
      <div>
        <div className="relative">
          <User
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            className={inputStyle}
            placeholder="Full Name"
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          />
        </div>
        {errors.full_name && (
          <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="email"
            className={inputStyle}
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      {/* Department */}
      <div>
        <div className="relative">
          <Building2
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <select
            className={inputStyle}
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          >
            <option value="">Select Department</option>
            <option>Engineering</option>
            <option>HR</option>
            <option>Finance</option>
            <option>Marketing</option>
            <option>Operations</option>
          </select>
        </div>
        {errors.department && (
          <p className="text-red-500 text-xs mt-1">{errors.department}</p>
        )}
      </div>

      {/* Button */}
      <div className="md:col-span-2">
        <button
          disabled={submitting}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium transition disabled:opacity-50"
        >
          {submitting ? "Adding..." : "Add Employee"}
        </button>
      </div>
    </form>
  );
}

export default EmployeeForm;

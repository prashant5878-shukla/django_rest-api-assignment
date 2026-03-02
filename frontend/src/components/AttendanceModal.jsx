import { useEffect, useState } from "react";
import { X, CalendarDays, CheckCircle2, XCircle } from "lucide-react";
import api from "../services/api";

function AttendanceModal({ employeeId, onClose }) {
  const [records, setRecords] = useState([]);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/employees/attendance/${employeeId}/`);
      setRecords(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const markAttendance = async () => {
    if (!date) return;

    try {
      setSubmitting(true);
      await api.post(`/api/employees/attendance/${employeeId}/`, {
        date,
        status,
      });
      await fetchAttendance();
      setDate("");
    } finally {
      setSubmitting(false);
    }
  };

  const presentCount = records.filter((r) => r.status === "Present").length;
  const absentCount = records.filter((r) => r.status === "Absent").length;

  const shimmer =
    "relative overflow-hidden bg-gray-200 rounded before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-[600px] max-w-[95%] rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">Attendance</h2>
            <p className="text-sm opacity-80">Employee ID: {employeeId}</p>
          </div>
          <button
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Summary Cards */}
          {loading ? (
            <div className="grid grid-cols-2 gap-4">
              <div className={`h-20 ${shimmer}`} />
              <div className={`h-20 ${shimmer}`} />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-xl flex items-center gap-3">
                <CheckCircle2 className="text-green-600" />
                <div>
                  <p className="text-xs text-green-700">Present</p>
                  <p className="text-xl font-bold text-green-700">
                    {presentCount}
                  </p>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-xl flex items-center gap-3">
                <XCircle className="text-red-600" />
                <div>
                  <p className="text-xs text-red-700">Absent</p>
                  <p className="text-xl font-bold text-red-700">
                    {absentCount}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mark Attendance */}
          <div className="bg-gray-50 p-4 rounded-xl space-y-4">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <CalendarDays size={16} />
              <span>Mark Attendance</span>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="date"
                disabled={loading}
                className="flex-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none disabled:opacity-50"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <div className="flex bg-white border rounded-xl overflow-hidden">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setStatus("Present")}
                  className={`px-4 py-2 text-sm ${
                    status === "Present"
                      ? "bg-green-600 text-white"
                      : "text-gray-600"
                  } disabled:opacity-50`}
                >
                  Present
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setStatus("Absent")}
                  className={`px-4 py-2 text-sm ${
                    status === "Absent"
                      ? "bg-red-600 text-white"
                      : "text-gray-600"
                  } disabled:opacity-50`}
                >
                  Absent
                </button>
              </div>

              <button
                onClick={markAttendance}
                disabled={submitting || loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl transition disabled:opacity-50"
              >
                {submitting ? "Saving..." : "Save"}
              </button>
            </div>
          </div>

          {/* Records List */}
          <div className="border rounded-xl max-h-64 overflow-auto divide-y">
            {loading ? (
              <div className="p-4 space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className={`h-4 w-28 ${shimmer}`} />
                    <div className={`h-4 w-20 ${shimmer}`} />
                  </div>
                ))}
              </div>
            ) : records.length === 0 ? (
              <p className="p-6 text-center text-gray-400">
                No attendance records yet
              </p>
            ) : (
              records.map((r, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center px-4 py-3 hover:bg-gray-50 transition"
                >
                  <span className="text-sm text-gray-600">
                    {r.date?.slice(0, 10)}
                  </span>

                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${
                      r.status === "Present"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {r.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Shimmer Animation */}
      <style>
        {`
          @keyframes shimmer {
            100% {
              transform: translateX(100%);
            }
          }
        `}
      </style>
    </div>
  );
}

export default AttendanceModal;

import { useEffect, useState } from "react";
import api from "../services/api";

function AttendanceModal({ employeeId, onClose }) {
    const [records, setRecords] = useState([]);
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("Present");

    const fetchAttendance = async () => {
        const res = await api.get(
            `/api/employees/attendance/${employeeId}/`
        );
        setRecords(res.data);
    };

    useEffect(() => {
        fetchAttendance();
    }, []);

    const markAttendance = async () => {
        await api.post(
            `/api/employees/attendance/${employeeId}/`,
            { date, status }
        );
        fetchAttendance();
        setDate("");
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white w-[500px] p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">
                    Attendance — {employeeId}
                </h2>

                <div className="flex gap-2 mb-4">
                    <input
                        type="date"
                        className="input flex-1"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <select
                        className="input"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option>Present</option>
                        <option>Absent</option>
                    </select>
                    <button
                        onClick={markAttendance}
                        className="bg-black text-white px-4 rounded-lg"
                    >
                        Mark
                    </button>
                </div>

                <div className="max-h-60 overflow-auto">
                    {records.map((r, i) => (
                        <div key={i} className="border-b py-2 text-sm">
                            {r.date?.slice(0, 10)} — {r.status}
                        </div>
                    ))}
                </div>

                <button
                    onClick={onClose}
                    className="mt-4 text-gray-600 hover:underline"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default AttendanceModal;

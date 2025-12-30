import { useEffect, useState } from "react";
import supabase from "../dbConfig/db";
import { Modal, message } from "antd"; // Ant Design simple popups

export default function Attendance() {
  const [rollNumber, setRollNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const isStudentExists = async () => {
    const { data, error } = await supabase
      .from("Students")
      .select("rollNumber")
      .eq("rollNumber", rollNumber)
      .single();

    if (error || !data) {
      Modal.warning({
        title: "Student Not Found",
        content: "No student found with this roll number.",
      });
      return false;
    }
    return true;
  };

  const isPresentMarked = async () => {
    const { data } = await supabase
      .from("Attendance")
      .select("*")
      .eq("rollNumber", rollNumber)
      .eq("date", today)
      .maybeSingle();

    if (data) {
      message.info("Attendance already marked as Present today.");
      return true;
    }
    return false;
  };

  const markPresent = async () => {
    if (!rollNumber.trim()) {
      Modal.warning({
        title: "Input Required",
        content: "Please enter a roll number.",
      });
      return;
    }

    const studentExists = await isStudentExists();
    if (!studentExists) return;

    const isAttendanceMarked = await isPresentMarked();
    if (isAttendanceMarked) return;

    setLoading(true);

    const { error } = await supabase.from("Attendance").insert({
      rollNumber: Number(rollNumber),
      date: today,
      status: "present",
    });

    if (error) {
      Modal.error({
        title: "Error",
        content: error.message || "Failed to mark attendance.",
      });
    } else {
      message.success(`Roll No ${rollNumber} marked Present for today!`);
      setRollNumber(""); // Clear input
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Mark Attendance
        </h2>

        <div className="flex flex-col gap-6">
          <input
            type="number"
            placeholder="Enter Roll Number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-3 text-lg focus:outline-none focus:border-blue-500 transition"
            disabled={loading}
          />

          <button
            onClick={markPresent}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-3 rounded transition text-lg"
          >
            {loading ? "Marking..." : "Mark Present"}
          </button>
        </div>

        <p className="text-center text-gray-600 mt-6">
          Date: <strong>{today}</strong>
        </p>
      </div>
    </div>
  );
}
import { useState } from "react";
import supabase from "../dbConfig/db";
import { Modal, message } from "antd"; // Ant Design imports

const initialState = {
  name: "",
  rollNumber: "",
};

export default function StudentForm() {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const postStudentData = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.rollNumber.trim()) {
      Modal.warning({
        title: "Missing Information",
        content: "Please fill in both name and roll number.",
      });
      return;
    }

    const { error } = await supabase.from("Students").insert([formData]);

    if (error) {
      Modal.error({
        title: "Error",
        content: error.message || "Failed to save student",
      });
    } else {
      message.success("Student added successfully!");
      setFormData(initialState); // Reset form
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Add New Student</h2>

        <form onSubmit={postStudentData} className="flex flex-col gap-6">
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-blue-500 transition"
          />

          <input
            type="number"
            name="rollNumber"
            placeholder="Roll Number"
            value={formData.rollNumber}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-green-400 transition"
          />

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded transition mt-4"
          >
            Save Student
          </button>
        </form>
      </div>
    </div>
  );
}
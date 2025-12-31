import { useEffect, useState } from "react";
import supabase from "../dbConfig/db";
import { Modal, message } from "antd"; // Import from antd
// import { getUser } from "../dbfunction/dbfunctions";
import { useNavigate } from "react-router";

export default function DisplayStudents() {
  const [students, setStudents] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const getStudents = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("Students").select("*");
    if (error) {
      Modal.error({
        title: "Error",
        content: "Failed to fetch students",
      });
    } else {
      setStudents(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this student?",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        const { error } = await supabase.from("Students").delete().eq("id", id);
        if (error) {
          message.error("Delete failed");
        } else {
          setStudents((prev) => prev.filter((s) => s.id !== id));
          message.success("Student deleted successfully");
        }
      },
    });
  };

  useEffect(() => {
   const checkAuth = async() =>{

     supabase.auth.getUser().then(({ data }) => {
       if(!data.user){
          navigate('/login')
          return;
       }else{
         getStudents();
        //  navigate('/signup')

      }
    })
  }
  checkAuth()

  }, []);

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      String(s.rollNumber).includes(search)
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Student List</h1>
        
        <p className="text-center text-gray-600 mb-6">
          Total Students: <b>{students.length}</b>
        </p>

        <input
          type="text"
          placeholder="Search by name or roll number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 mb-6 focus:outline-none focus:border-blue-500"
        />

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : filteredStudents.length === 0 ? (
          <p className="text-center text-gray-600">No students found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-4 py-3 text-left">Name</th>
                  <th className="border px-4 py-3 text-left">Roll No</th>
                  <th className="border px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-3">{student.name}</td>
                    <td className="border px-4 py-3">{student.rollNumber}</td>
                    <td className="border px-4 py-3 text-center">
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
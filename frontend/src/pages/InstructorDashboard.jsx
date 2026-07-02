import { getAllProgress } from "../services/progressService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { deleteModule } from "../services/moduleService";

import {
  createAssignment,
  deleteAssignment,
  getAssignmentsByModule,
} from "../services/assignmentService";

function InstructorDashboard() {
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [assignments, setAssignments] = useState({});
  const [progress, setProgress] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const [assignmentForm, setAssignmentForm] = useState({
    title: "",
    description: "",
    moduleId: "",
});

  const fetchModules = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/modules", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setModules(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchAssignments = async () => {
  try {
    const data = {};

    for (const module of modules) {
      const res = await getAssignmentsByModule(module.id);
      data[module.id] = res.data;
    }

    setAssignments(data);
  } catch (err) {
    console.log(err);
  }
};
  const fetchProgress = async () => {
  try {
    const res = await getAllProgress();
    setProgress(res.data);
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  fetchModules();
  fetchProgress();
}, []);

useEffect(() => {
  if (modules.length > 0) {
    fetchAssignments();
  }
}, [modules]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleAssignmentChange = (e) => {
    setAssignmentForm({
        ...assignmentForm,
        [e.target.name]: e.target.value,
  });
};

const handleDeleteAssignment = async (assignmentId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this assignment?"
  );

  if (!confirmDelete) return;

  try {
    await deleteAssignment(assignmentId);

    alert("Assignment deleted successfully!");

await fetchModules();
await fetchAssignments();
await fetchProgress();

  } catch (err) {
    console.log(err);
    alert("Failed to delete assignment.");
  }
};

const handleDeleteModule = async (moduleId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this module?"
  );

  if (!confirmDelete) return;

  try {
    await deleteModule(moduleId);

    alert("Module deleted successfully!");

    await fetchModules();
    await fetchAssignments();
    await fetchProgress();

  } catch (err) {
    console.log(err);
    alert("Failed to delete module.");
  }
};

const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/");
};
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    await api.post(
      "/modules",
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Module Created Successfully!");

    setForm({
      title: "",
      description: "",
    });

await fetchModules();

  } catch (err) {
    console.log(err);
    alert("Failed to create module.");
  }
};

const handleAssignmentSubmit = async (e) => {
  e.preventDefault();

  try {
    await createAssignment({
      title: assignmentForm.title,
      description: assignmentForm.description,
      module: {
        id: Number(assignmentForm.moduleId),
      },
    });

    alert("Assignment Created Successfully!");

setAssignmentForm({
  title: "",
  description: "",
  moduleId: "",
});

fetchModules();

  } catch (err) {
    console.log(err);
    alert("Failed to create assignment.");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-8">
  <h1 className="text-4xl font-bold">
    Instructor Dashboard
  </h1>

  <button
    onClick={handleLogout}
    className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
  >
    Logout
  </button>
</div>

      <div className="bg-white shadow rounded-lg p-6 mb-8">

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            placeholder="Module Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
            required
          />

          <textarea
            name="description"
            placeholder="Module Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
            rows="4"
            required
          />

          <button
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            type="submit"
          >
            Create Module
          </button>

        </form>

      </div>
      <div className="bg-white shadow rounded-lg p-6 mb-8">

  <h2 className="text-2xl font-bold mb-4">
    Create Assignment
  </h2>

  <form onSubmit={handleAssignmentSubmit}>

    <select
      name="moduleId"
      value={assignmentForm.moduleId}
      onChange={handleAssignmentChange}
      className="w-full border p-3 rounded mb-4"
      required
    >
      <option value="">Select Module</option>

      {modules.map((module) => (
        <option key={module.id} value={module.id}>
          {module.title}
        </option>
      ))}

    </select>

    <input
      type="text"
      name="title"
      placeholder="Assignment Title"
      value={assignmentForm.title}
      onChange={handleAssignmentChange}
      className="w-full border p-3 rounded mb-4"
      required
    />

    <textarea
      name="description"
      placeholder="Assignment Description"
      value={assignmentForm.description}
      onChange={handleAssignmentChange}
      className="w-full border p-3 rounded mb-4"
      rows="4"
      required
    />

    <button
      type="submit"
      className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
    >
      Create Assignment
    </button>

  </form>

</div>

      <h2 className="text-2xl font-bold mb-4">
        All Modules
      </h2>

{modules.map((module) => (

  <div
    key={module.id}
    className="bg-white shadow rounded-lg p-5 mb-4"
  >
<div className="flex justify-between items-center">
  <h3 className="text-xl font-bold">
    {module.title}
  </h3>

  <button
    onClick={() => handleDeleteModule(module.id)}
    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
  >
    Delete Module
  </button>
</div>

<p className="mt-2">
  {module.description}
</p>

    <hr className="my-4" />

    <h4 className="text-lg font-semibold mb-3">
      Assignments
    </h4>

    {assignments[module.id] && assignments[module.id].length > 0 ? (

      assignments[module.id].map((assignment) => (

        <div
          key={assignment.id}
          className="border rounded-lg p-3 mb-3 bg-gray-50"
        >
          <h5 className="font-bold">
            {assignment.title}
          </h5>

          <p className="mb-3">
            {assignment.description}
          </p>

          <button
            onClick={() => handleDeleteAssignment(assignment.id)}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete Assignment
          </button>

        </div>

      ))

    ) : (

      <p className="text-gray-500">
        No Assignments Available
      </p>

    )}

  </div>

))}

      <div className="bg-white shadow rounded-lg p-6 mt-8">
  <h2 className="text-2xl font-bold mb-4">
    Student Progress
  </h2>

  {progress.length === 0 ? (
    <p>No Progress Available</p>
  ) : (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Student</th>
          <th className="border p-2">Assignment</th>
          <th className="border p-2">Status</th>
        </tr>
      </thead>

      <tbody>
        {progress.map((item) => (
          <tr key={item.id}>
            <td className="border p-2">
              {item.studentEmail}
            </td>

            <td className="border p-2">
  {item.assignment?.title || "Assignment Deleted"}
</td>


            <td className="border p-2">
              {item.completed ? "✅ Completed" : "❌ Pending"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>
</div>
  );
}

export default InstructorDashboard;
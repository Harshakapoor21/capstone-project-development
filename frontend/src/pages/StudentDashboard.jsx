import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { getAssignmentsByModule } from "../services/assignmentService";
import {
  saveProgress,
  getStudentProgress,
} from "../services/progressService";
function StudentDashboard() {

  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [assignments, setAssignments] = useState({});
  const [progress, setProgress] = useState([]);

  useEffect(() => {

    const fetchModules = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await api.get("/modules", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response:", res.data);
        setModules(res.data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchModules();

  }, []);

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
    const token = localStorage.getItem("token");

    const payload = JSON.parse(
      atob(
        token.split(".")[1]
          .replace(/-/g, "+")
          .replace(/_/g, "/")
      )
    );

    const res = await getStudentProgress(payload.sub);

    setProgress(res.data);

  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  if (modules.length > 0) {
    fetchAssignments();
    fetchProgress();
  }
}, [modules]);
const handleComplete = async (assignmentId) => {
  try {
    const token = localStorage.getItem("token");

    const payload = JSON.parse(
      atob(
        token.split(".")[1]
          .replace(/-/g, "+")
          .replace(/_/g, "/")
      )
    );

    await saveProgress({
      studentEmail: payload.sub,
      assignment: {
        id: assignmentId,
      },
      completed: true,
    });

    alert("Assignment marked as completed!");

  } catch (err) {
    console.log(err);
    alert("Failed to update progress.");
  }
};

const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/");
};

const completedAssignments = progress.filter(
  (p) => p.completed
).length;

const totalAssignments = Object.values(assignments).reduce(
  (total, assignmentList) => total + assignmentList.length,
  0
);

const progressPercentage =
  totalAssignments === 0
    ? 0
    : Math.round((completedAssignments / totalAssignments) * 100);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-8">
  <h1 className="text-4xl font-bold">
    Student Dashboard
  </h1>

  <button
    onClick={handleLogout}
    className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
  >
    Logout
  </button>
</div>

      <div className="bg-white p-5 rounded-lg shadow mb-8">
  <h2 className="text-2xl font-bold mb-2">
    Progress Summary
  </h2>

  <p>
  Completed Assignments: {completedAssignments}
</p>

<p>
  Total Assignments: {totalAssignments}
</p>

<p className="mt-2 font-bold text-blue-600">
  Progress: {progressPercentage}%
</p>

<div className="w-full bg-gray-300 rounded-full h-4 mt-3">
  <div
    className="bg-green-600 h-4 rounded-full"
    style={{ width: `${progressPercentage}%` }}
  ></div>
</div>
</div>

      {modules.length === 0 ? (

        <h2>No Modules Available</h2>

      ) : (

        modules.map((module) => (

          <div
            key={module.id}
            className="bg-white p-5 rounded-lg shadow mb-4"
          >
            <h2 className="text-2xl font-bold">
              {module.title}
            </h2>

            <p>{module.description}</p>
            <hr className="my-4" />

<h3 className="text-xl font-semibold mb-2">
  Assignments
</h3>

{assignments[module.id] && assignments[module.id].length > 0 ? (

  assignments[module.id].map((assignment) => (

    <div
      key={assignment.id}
      className="border rounded p-3 mb-2 bg-gray-50"
    >
<h4 className="font-bold">
  {assignment.title}
</h4>

<p>{assignment.description}</p>

{progress.some(
  (p) =>
    p.assignment.id === assignment.id &&
    p.completed
) ? (
  <p className="mt-3 text-green-600 font-bold">
    ✅ Completed
  </p>
) : (
  <button
    onClick={() => handleComplete(assignment.id)}
    className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
  >
    Mark as Completed
  </button>
)}
    </div>

  ))

) : (

  <p className="text-gray-500">
    No Assignments Available
  </p>

)}

          </div>

        ))

      )}

    </div>
  );
}

export default StudentDashboard;
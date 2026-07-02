import api from "./api";

export const getAssignments = () => {
  return api.get("/assignments", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const createAssignment = (assignment) => {
  return api.post("/assignments", assignment, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getAssignmentsByModule = (moduleId) => {
  return api.get(`/assignments/module/${moduleId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const deleteAssignment = (id) => {
  return api.delete(`/assignments/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
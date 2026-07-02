import api from "./api";

export const saveProgress = (progress) => {
  return api.post("/progress", progress, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getStudentProgress = (email) => {
  return api.get(`/progress/student/${email}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getAssignmentProgress = (assignmentId) => {
  return api.get(`/progress/assignment/${assignmentId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getAllProgress = () => {
  return api.get("/progress", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
import api from "./api";

export const getAllModules = () => {
  return api.get("/modules", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const createModule = (module) => {
  return api.post("/modules", module, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const deleteModule = (id) => {
  return api.delete(`/modules/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
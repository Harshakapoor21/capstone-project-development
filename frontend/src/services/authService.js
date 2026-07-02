import api from "./api";

export const login = (data) => {
  return api.post("/auth/login", data);
  System.out.println("===== LOGIN CALLED =====");
System.out.println("Email = " + req.getEmail());
};

export const register = (data) => {
  return api.post("/auth/register", data);
};
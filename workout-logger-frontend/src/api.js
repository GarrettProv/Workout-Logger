import axios from "axios";

const API_BASE = "http://localhost:3001/api";

export const api = axios.create({
  baseURL: API_BASE,
});

// set or clear the Authorization header for ALL future requests
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

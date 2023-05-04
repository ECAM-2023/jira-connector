import axios from "axios";

export default axios.create({
  // baseURL: "https://6e0e-81-164-82-169.ngrok-free.app:8080/api/v1",
  baseURL: "http://10.1.100.244:8085/api/v1",
  // baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-type": "application/json",
  },
});

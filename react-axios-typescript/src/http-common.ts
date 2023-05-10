import axios from "axios";

export default axios.create({
  // baseURL: "https://777b-81-164-82-169.ngrok-free.app",
  baseURL: "https://777b-81-164-82-169.ngrok-free.app/api/v1/",
  // baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-type": "application/json",
  },
});

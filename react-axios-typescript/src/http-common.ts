import axios from "axios";

export default axios.create({
  baseURL: "http://10.1.100.244:8080/api/v1",
  headers: {
    "Content-type": "application/json",
  },
});

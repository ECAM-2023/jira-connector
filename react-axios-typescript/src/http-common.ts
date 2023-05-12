import axios from "axios";

export default axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:8085/api/v1",
=======
  // baseURL: "https://777b-81-164-82-169.ngrok-free.app",
  baseURL: "https://777b-81-164-82-169.ngrok-free.app/api/v1/",
  // baseURL: "http://localhost:8080/api/v1",
>>>>>>> 82fd5ed094f91a9c8aa5057d6ab92442a2b7471c
  headers: {
    "Content-type": "application/json",
  },
});

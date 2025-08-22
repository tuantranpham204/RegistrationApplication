import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export const login = async ({ email, password }) =>
  await axios.post(
    API_BASE_URL + "/auth/login",
    { email: email, password: password },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  ).then((response) => {
                    console.log("Login response:", response.data);
                    webix.message({ type: "success", text: "Login successful" });
                  })
    .catch((error) => {
                    console.error("Login error:", error);
                    webix.message({ type: "error", text: "Login failed" });
    })

export const register = async ({ email, username, password }) =>
  await axios.post(API_BASE_URL + "/auth/register", {
    username: username,
    email: email,
    password: password,
  });

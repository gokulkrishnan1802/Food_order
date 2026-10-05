import axios from "axios";

const AUTH_URL =
  "https://dummyjson.com/auth/login";

export const loginUser = async (
  username,
  password
) => {
  const response =
    await axios.post(
      AUTH_URL,
      {
        username,
        password
      },
      {
        headers: {
          "Content-Type":
            "application/json"
        }
      }
    );

  return response.data;
};
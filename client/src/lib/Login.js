import axiosClient from "../utils/Axios";

async function Login(email, password) {
  try {
    const response = await axiosClient.post(
      `/login`,
      {
        email: email,
        password: password,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export { Login };

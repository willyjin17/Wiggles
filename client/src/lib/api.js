import axios from "axios";

export const getData = async (path) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/${path}`,
      {
        withCredentials: true,
      }
    );

    return { data: response.data, status: response.status };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postData = async (path, body) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/${path}`,
      body,
      {
        withCredentials: true,
      }
    );

    return { data: response.data, status: response.status };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

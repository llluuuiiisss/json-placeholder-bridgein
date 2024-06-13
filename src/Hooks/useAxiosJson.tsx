import axios from "axios";

const useAxiosJson = () => {
  const axiosJson = axios.create({
    baseURL: process.env.REACT_APP_JSON_PLACEHOLDER,
    headers: { "Content-Type": "application/json" },
  });
  return axiosJson;
};

export default useAxiosJson;

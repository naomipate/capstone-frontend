import axios from "axios";
const AxiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_API_URL
      : process.env.REACT_APP_DEPLOY_API_URL,
  timeout: 50000,
});

export default AxiosInstance;

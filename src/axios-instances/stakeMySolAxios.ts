import Axios from "axios";

const stakeMySolAxios = Axios.create({
  baseURL: " https://stake-my-sol-api.azurewebsites.net",
  headers: {
    "Content-Type": "application/json",
    // "Accept-Encoding": "gzip, deflate, br",
    // Connection: "keep-alive",
    Accept: "*/*",
  },
});

export default stakeMySolAxios;

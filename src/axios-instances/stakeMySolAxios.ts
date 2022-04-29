import Axios from "axios";

const stakeMySolAxios = Axios.create({
  // https://stake-my-sol-api.azurewebsites.net
  baseURL: "https://api.stakemysol.app",
  headers: {
    "Content-Type": "application/json",
    // "Accept-Encoding": "gzip, deflate, br",
    // Connection: "keep-alive",
    // Accept: "*/*",
  },
});

export default stakeMySolAxios;

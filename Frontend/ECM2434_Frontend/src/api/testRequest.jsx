import axios from "axios";


const baseURL = "http://localhost:8000/api/";
// Currently set to HTTP. Could use a config file to modify this easily.

export default class ApiClient {
  constructor() {
    this.axios = axios.create({
      baseURL,
      withCredentials: true,
    });
  }

  async testRequest() {
    axios.get("/test_api/")
      .then((response) => {
        console.log(response);
        return response.data.message;
      })
      .catch((error) => {
        console.log(error);
        return error.message;
      });
  }

  async get(url, config) {
    const response = await this.axios.get(url, config);
    return response.data;
  }

  async post(url, data, config) {
    const response = await this.axios.post(url, data, config).then((response) => {
      return response.data;
    }).catch((error) => {
      console.log(error);
      return error;
    });
  }

  async login(email, password) {
    const response = await this.post("/v1/users/login/", { email, password });
    return response;
  }
}



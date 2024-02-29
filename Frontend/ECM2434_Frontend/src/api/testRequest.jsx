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
    axios
      .get("/test_api/")
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
    // const response = await this.axios.get(url, config);
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + config,
      },
    };
    const response = await fetch(baseURL + url, requestOptions);
    const response_data = await response.json();
    return response_data;
  }

  async post(url, data, token) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? "Token " + token : "",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(baseURL + url, requestOptions);
    const response_data = await response.json();
    return response_data;
  }

  async login(username, password) {
    const response = await this.post("account/token/login", {
      username,
      password,
    });
    return response;
  }
  async fetchUserData(token) {
    const response = await this.get("user/", token);
    return response;
  }

  async register(email, username, password, first_name, last_name) {
    console.log("Reached");
    let obj = {
      email: email,
      username: username,
      password: password,
      first_name: first_name,
      last_name: last_name,
    };
    console.log(obj);
    const response1 = await this.post("account/users/", obj);
    return response1;
  }

  async createQuest(token, data) {
    const response = await this.post("quest/add/", data, token);
    return response;
  }
  async fetchLocations(token) {
    const response = await this.get("quest/location/", token);
    return response;
  }
  async addLocation(token, data) {
    const response = await this.post("quest/location/add", data, token);
    return response;
  }
  async fetchTypes(token) {
    const response = await this.get("quest/type/", token);
    return response;
  }
  async fetchQuests(token) {
    const response = await this.get("quest/", token);
    return response;
  }
  async fetchImage(imgPath, token) {
    const response = await this.get("media/iamges/" + imgPath, token);
    return response;
  }
  async fetchAllImages(token) {
    const response = await this.get("media/images/", token);
    return response;
  }

  async getTopTen(token) {
    const response = await this.get("leaderboard_10/", token);
    return response;
  }

  async logout(token) {
    const response = await this.post("account/token/logout", null, token);
    return response;
  }

  async fetchUsernameData(data, token) {
    console.log("data: ", data);
    console.log("token: ", token);
    const response = await this.post("users/getByUsername/", data, token);
    return response;
  }
}
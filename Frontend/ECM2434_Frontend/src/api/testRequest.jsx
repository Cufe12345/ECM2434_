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
    // const response = await this.axios.get(url, config);
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Token ' + config },
    };
    const response = await fetch(baseURL + url, requestOptions);
    const response_data = await response.json();
    return (response_data);
  }

  async post(url, data, token) {
    // const response = await this.axios.post(url, data).then((response) => {
    //   response.headers["Access-Control-Allow-Origin"] = "*";
    //   return response.data;
    // }).catch((error) => {
    //   console.log(error);
    //   return error;
    // });

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' , 'Authorization': token ? ('Token '+token): ''},
      body: JSON.stringify(data)
    };
    const response = await fetch(baseURL + url, requestOptions);
    const response_data = await response.json();
    return (response_data);
  }

  async login(username, password) {
    const response = await this.post("account/token/login", { username, password });
    return response;
  }
  async fetchUserData(token) {
    const response = await this.get("user/", token);
    return response;
  }

  async register(email, username, password,first_name,last_name,) {
    console.log("Reached");
    let obj = {
      email: email,
      username: username,
      password: password,
      first_name: first_name,
      last_name: last_name,
    }
    console.log(obj);
    const response1 = await this.post("account/users/", obj);
    return response1;
  }
  async createQuest(token, data) {
    const response = await this.post("quest/add/", data, token);
    return response;
  }
}



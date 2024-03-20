import axios from "axios";
import { json } from "react-router-dom";



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


  async post(url, data, token, image) {

    // const response = await this.axios.post(url, data).then((response) => {
    //   response.headers["Access-Control-Allow-Origin"] = "*";
    //   return response.data;
    // }).catch((error) => {
    //   console.log(error);
    //   return error;
    // });


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
  async postImage(url, data, token, image) {

    let formData = new FormData();
    formData.append('image', image);
    formData.append('name', data.name);
    formData.append('description', data.description);
    const requestOptions = {
      method: "POST",
      headers: {
        // "Content-Type":"multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
        Authorization: token ? "Token " + token : "",
        // "X-CSRFToken": "Zq"
      },

      body: formData,
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

  async modifyUser(token, data) {
    console.log(data);
    const response = await this.post("user/modify", data, token);
    return response;
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

  async uploadImage(token, data, image) {
    const response = await this.postImage("media/images/upload", data, token, image);
    return response;
  }

  async questSubmission(token, data) {
    console.log("DATA:", data);
    const response = await this.post("quest/submissions/add/", data, token);
    return response;
  }

  async fetchSubmissions(token) {
    const response = await this.get("quest/submissions/", token);
    return response;
  }
  async verifySubmission(token, data) {
    const response = await this.post("quest/submissions/validate/", data, token);
    return response;
  }
  async sendEmail(data) {
    const response = await this.post(`activate/`,data);
    return response;
  }x
  async verifyEmail(token, data) {
    const response = await this.get(`activate/${data.username}/${data.token}/`);
    return response;
  }
  async fetchFeed(token,data) {
    const response = await this.post("quest/submissions/valid/ByQuestID", data, token);
    return response;
  }
  async fetchAllUsers(token) {
    const response = await this.get("users/", token);
    return response;
  }
  async addFriend(token, data) {
    const response = await this.post("friends/add/", data, token);
    return response;
  }
  async fetchFriends(token, data) {
    const response = await this.post("friends/all/", data, token);
    return response;
  }
  async rejectSubmission(token, data) {
    const response = await this.post("quest/submissions/reject/", data, token);
    return response;
  }
  async deleteSubmission(token, data) {
    const response = await this.post("quest/submissions/delete/", data, token);
    return response;
  }
}


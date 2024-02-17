import axios from "axios";

export default function testRequest(setResponse) {
  axios
    .get("http://localhost:8000/api/test_api/")
    .then((response) => {
      console.log(response);
      setResponse(response.data.message);
    })
    .catch((error) => {
      console.log(error);
      setResponse(error.message);
    });
}

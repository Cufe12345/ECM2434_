import { useState, useEffect, React } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import testRequest from './api/testRequest'
import axios from 'axios';


function App() {
  const [count, setCount] = useState(0);
  //Function to test api request to backend(django server)
  const [response, setResponse] = useState(null);

  // Example function to send a GET request to Django backend
  const testApiRequest = async () => {
    setResponse("Sending...");
    try {
      const res = await axios.get('http://localhost:8000/api/test_api/');
      setResponse(res.data); // Assuming your API returns a simple string or JSON object
    } catch (error) {
      console.error("There was an error!", error);
      setResponse("Error in fetching data");
    }
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button onClick={testApiRequest}>Test API Request</button>
      {/* Display the response from the API request */}
      {response === null ? null : <p>{response}</p>}
    </>
  )
}

export default App;

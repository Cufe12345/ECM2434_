import React, {useState,useEffect} from "react";
import axios from "axios";

export default function testRequest(setResponse){
    axios.get("http://localhost:5000/test")
    .then((response) => {
        console.log(response);
        setResponse(response.data);
    }).catch((error) => {
        console.log(error);
        setResponse(error.message);
    });
}


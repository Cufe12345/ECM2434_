import React from "react";
import { useUser } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import { ViewSubmission } from "../components/viewSubmission";
import classes from "./Submissions.module.css";
export default function Submissions() {
  return (
    <div className={classes.container}>
      {/* <h1>Submissions</h1> */}
        <ViewSubmission />
    </div>
  );
}
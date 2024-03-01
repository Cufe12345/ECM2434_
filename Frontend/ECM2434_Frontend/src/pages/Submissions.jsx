import React from "react";
import { useUser } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import { ViewSubmission } from "../components/viewSubmission";

export default function Submissions() {
  return (
    <div>
      {/* <h1>Submissions</h1> */}
        <ViewSubmission />
    </div>
  );
}
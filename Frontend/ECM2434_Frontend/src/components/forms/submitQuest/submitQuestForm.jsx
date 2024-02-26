import React from "react";
import classes from "./submitQuestForm.module.css";
import { useUser } from "../../../contexts/userContext";
export function SubmitQuestForm() {
  const { user, userData } = useUser();

  return (
    <div className={classes.card}>
      <h1>Submit Quest</h1>
      <p>Attach an image of completed quest below</p>
      <input type="file" />
      <button className={classes.submitButton}>Submit</button>
    </div>
  );
}

import React from "react";
import classes from "./submitQuestForm.module.css";
import { useUser } from "../../../contexts/userContext";
import { ImageSubmit } from "../../imageSubmit";
export function SubmitQuestForm({onBackClick,setOpen}) {
  const { user, userData } = useUser();

  //Stores the file
  const [file, setFile] = React.useState(null);

  /**
   * This function submits the quest
   */
  function submitQuest() {
    console.log("Submitting quest");
    //submit on backend and if successful
    setOpen(true);
    //Redirect to Feed
  }



  return (
    <div className={classes.card}>
      <div className={classes.backContainer}>
        <button onClick={onBackClick} className={classes.backButton}><p>Back</p></button>
      </div>
      <h1>Submit Quest</h1>
      <p>Attach an image of completed quest below</p>
      <ImageSubmit setImage={setFile} img={file}/>
      <button onClick={submitQuest} className={classes.submitButton}>Submit</button>
    </div>
  );
}

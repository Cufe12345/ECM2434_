import React from "react";
import classes from "./submitQuestForm.module.css";
import { useUser } from "../../../contexts/userContext";
import { ImageSubmit } from "../../imageSubmit";

//Created by Cufe12345(Callum Young)
export function SubmitQuestForm({ onBackClick, setOpen }) {
  const { user, userData } = useUser();

  //Stores the file
  const [file, setFile] = React.useState(null);

  /**
   * This function submits the quest
   */
  async function submitQuest() {
    console.log("Submitting quest");
    let dataImg = {
      name: file.name,
      description: "n/a for now",
    };
    let imgURL = null;
    await ApiClient.api
      .uploadImage(user, dataImg, file)
      .then((res) => {
        imgURL = res?.image;
        console.log(res);
      })
      .catch((error) => {
        console.warn(error);
      });
    //submit on backend and pass imgURL and if successful
    setOpen(true);
    //Redirect to Feed
  }

  return (
    <div className={classes.card}>
      <div className={classes.backContainer}>
        <button onClick={onBackClick} className={classes.backButton}>
          <p>Back</p>
        </button>
      </div>
      <h1>Submit Quest</h1>
      <p>Attach an image of completed quest below</p>
      <ImageSubmit setImage={setFile} img={file} />
      <button onClick={submitQuest} className={classes.submitButton}>
        Submit
      </button>
    </div>
  );
}

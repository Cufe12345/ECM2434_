import React from "react";
import classes from "./submitQuestForm.module.css";
import { useUser } from "../../../contexts/userContext";
import { useDropzone } from 'react-dropzone'
import { ImageSubmit } from "../../imageSubmit";
import ApiClient from "../../../api/index";
//Created by Cufe12345(Callum Young)
export function SubmitQuestForm({ onBackClick, setOpen,setPopupText,quest }) {
  const { user, userData } = useUser();

  //Stores the file
  const [file, setFile] = React.useState(null);

  const [text, setText] = React.useState("");

  //Handles the file drop
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      console.log(acceptedFiles);
      setFile(acceptedFiles[0]);
    }
  });
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
    let errorOccured = false;
    await ApiClient.api
      .uploadImage(user, dataImg, file)
      .then((res) => {
        imgURL = res?.image;
        console.log(res);
      })
      .catch((error) => {
        console.warn(error);
      });
      if(imgURL === null){
        console.log("Failed to submit quest, no image");
        setPopupText("Failed to submit quest");
        setOpen(true);
        errorOccured = true;
      }
    //submit on backend and pass imgURL and if successful
    let data = {
      questID: quest.questID,
      user:userData.id,
      imgURL: imgURL,
      info: text,
      verified: false,
    };
    await ApiClient.api
      .questSubmission(user, data)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.warn(error);
        console.log("Failed to submit quest");
        setPopupText("Failed to submit quest, please try again");
        setOpen(true);
        errorOccured = true;
      });
    if(!errorOccured){
      console.log("Quest Submitted");
      setPopupText("Quest Submitted, when verified you will receive points");
      setOpen(true);
    }
    //Redirect to Feed
  }

  function onTextChange(e) {
    setText(e.target.value);
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
      <div className={classes.textContainer}>
        <input className={classes.inputText} type="text" onChange={onTextChange} value={text}placeholder="Enter a message to be displayed on the feed with your image" />
      </div>
      <button onClick={submitQuest} className={classes.submitButton}>
        Submit
      </button>
    </div>
  );
}

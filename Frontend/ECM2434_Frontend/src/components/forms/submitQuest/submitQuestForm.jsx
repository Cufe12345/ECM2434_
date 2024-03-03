import React from "react";
import classes from "./submitQuestForm.module.css";
import { useUser } from "../../../contexts/userContext";
import { useDropzone } from 'react-dropzone'
import { ImageSubmit } from "../../imageSubmit";

export function SubmitQuestForm({ onBackClick, setOpen }) {
  const { user, userData } = useUser();

  //Stores the file
  const [file, setFile] = React.useState(null);

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
      {file ? (
        <div className={classes.imgContainer}>

          <img src={URL.createObjectURL(file)} alt="Quest" className={classes.imgPreview} />
        </div>
      ) : (
        <div {...getRootProps()} className={classes.dropzone}>
          <input {...getInputProps()} />
          <p className={classes.dropzoneText1}>Drag & drop images here or Browse</p>
          <p className={classes.dropzoneText2}>Accepted file types: .png, .jpg, .jpeg</p>
        </div>
      )}
      <ImageSubmit setImage={setFile} img={file} />
      <button onClick={submitQuest} className={classes.submitButton}>
        Submit
      </button>
    </div>
  );
}

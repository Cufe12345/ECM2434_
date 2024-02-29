import React from "react";
import classes from "./imageSubmit.module.css";
import { useDropzone } from "react-dropzone";

//Created by Cufe12345(Callum Young)
export function ImageSubmit({setImage,img}) {

    //Handles the file drop
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        onDrop: acceptedFiles => {
          console.log(acceptedFiles[0]);

          setImage(acceptedFiles[0]);
        }
      });

  return (
    <>
      {img ? (
        <div className={classes.imgContainer}>

          <img src={URL.createObjectURL(img)} alt="Quest" className={classes.imgPreview}/>
        </div> 
      ):( 
        <div {...getRootProps()} className={classes.dropzone}>
          <input {...getInputProps()} />
          <p className={classes.dropzoneText1}>Drag & drop images here or Browse</p>
          <p className={classes.dropzoneText2}>Accepted file types: .png, .jpg, .jpeg</p>
        </div>
      )}
    </>
  );
}
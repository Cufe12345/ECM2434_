import { useState } from "react";
import { useUser } from '../contexts/userContext';
import { ImageSubmit } from "../components/imageSubmit";
import classes from './UploadProfilePic.module.css'
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone'
import ApiClient from "../api/index";

const UploadProfilePic = () => {
  const navigate = useNavigate();
  const { userData , user,fetchUserData} = useUser();

  const [file,setFile] = useState(null)
  


  //Handles the file drop
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      console.log(acceptedFiles);
      setFile(acceptedFiles[0]);
    }
  });

  async function UpdateProfile(){
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
        localStorage.setItem('uploadedProfilePicPath', res.image);
        fetchUserData();
        navigate('/profile/edit');
      })
      .catch((error) => {
        console.warn(error);
      });
      if(imgURL === null){
        console.log("Failed to upload image");
        setPopupText("Failed to upload image");
        setOpen(true);
        errorOccured = true;
      }
  }



    return (
      <div className={classes.container}>
        <div className={classes.card}>
          <button type="button" className={classes.BackButton} onClick={() => navigate(-1)}>Back</button>
          <h1>Upload Profile image</h1>
          <p>Please attach a image bellow</p>
          <ImageSubmit setImage={setFile} img={file} />
          <button type='button' className={classes.UploadImg} onClick={UpdateProfile}>Update</button>
        </div>
      </div>
      );
    };
    
    export default UploadProfilePic;
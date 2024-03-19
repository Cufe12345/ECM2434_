import { ImageSubmit } from "../components/imageSubmit";
import classes from './UploadProfilePic.module.css'

const UploadProfilePic = () => {

    return (
        <div className={classes.card}>
          <ImageSubmit></ImageSubmit>
        </div>
      );
    };
    
    export default UploadProfilePic;
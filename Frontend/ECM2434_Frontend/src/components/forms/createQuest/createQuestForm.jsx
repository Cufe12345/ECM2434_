import React, { useRef } from 'react';
import { useState } from 'react';
import classes from './createQuestForm.module.css';
import { useUser } from '../../../contexts/userContext';
import ApiClient from '../../../api/index';
export function CreateQuestForm() {
    const { user, userDataLoading} = useUser();
    const[step, setStep] = useState(1);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [latitude,setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [image, setImage] = useState("");
    let maxSteps = 4;

    function createQuest(){
        console.log("Creating Quest");
        let data = {
            name: name,
            task: description,
            state:"active",
            // latitude: latitude,
            // longitude: longitude,
        }
        ApiClient.api.createQuest(user,data).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error);
        });
        console.log(name);
        console.log(description);
        console.log(latitude);
        console.log(longitude);
        console.log(image);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if(step === maxSteps){
            createQuest();
        }
        else{
            setStep(step + 1);
        }
    }
    return(
        <form className={classes.form} onSubmit={onSubmit}>
            {/* <div>Step {step}</div> */}
            {step == 1 && (
                <div className={classes.inputContainer}>
                    <h3>Enter the quest name</h3>
                    <input className={classes.inputField} type="text" placeholder="Quest Name" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
            )}
            {step === 2 && (
                <div className={classes.inputContainer}>
                    <h3>Enter the quest description</h3>
                    <input className={classes.inputField} type="text" placeholder="Quest Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                </div>
            )}
            {step === 3 && (
                <div className={classes.inputContainer}>

                    <h3>Enter the quest location</h3>
                    <div className={classes.locationContainer}>
                    
                        <input className={classes.inputField} type="number" placeholder="Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)}/>
                        <input className={classes.inputField} type="number" placeholder="Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)}/>
                    </div>
                </div>
            )}
            {step === 4 && (
                <div className={classes.inputContainer}>

                <h3>Upload an example image of the completed quest</h3>   
                <input className={classes.inputField} type="file" accept="image/*" placeholder="Add Image" value={image} onChange={(e) => setImage(e.target.value)}/>
                    
            </div>
            )}
            {step === maxSteps ? (
            <button>Create</button>
            ) : (<button>Next</button>)}
        </form>
    );
}
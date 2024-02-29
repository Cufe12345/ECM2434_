import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import classes from './createQuestForm.module.css';
import { useUser } from '../../../contexts/userContext';
import ApiClient from '../../../api/index';
import { ImageSubmit } from '../../imageSubmit';

//Created by Cufe12345(Callum Young)
export function CreateQuestForm() {
    //Fetch the user context from the user context provider
    const { user, userDataLoading,userData} = useUser();

    //Stores the current step of the form
    const[step, setStep] = useState(1);

    //Stores the quest name
    const [name, setName] = useState("");

    //Stores the quest description
    const [description, setDescription] = useState("");

    //Stores the latitude of the custom location
    const [latitude,setLatitude] = useState("");

    //Stores the longitude of the custom location
    const [longitude, setLongitude] = useState("");

    //Stores the location name of the custom location
    const [locationName, setLocationName] = useState("");

    //Stores the location select value ie the location that the user selects from the list of locations
    const [locationSelectValue, setLocationSelectValue] = useState("");

    //Stores the quest type ie the type that the user selects from the list of quest types
    const [questType, setQuestType] = useState("");

    //Stores the reward for completing the quest
    const [reward, setReward] = useState("");

    //Stores the image that the user uploads, this is not currently used or storing the image correctly i dont think
    const [image, setImage] = useState();

    //Stores whether the user wants to show the custom location fields
    const [showCustomLocation, setShowCustomLocation] = useState(false);

    //Stores the list of locations that the user has access to
    const [listOfLocations, setListOfLocations] = useState([]);

    //Stores whether the locations are currently being fetched
    const [fetchingLocations, setFetchingLocations] = useState(false);

    //Stores whether the quest types are currently being fetched
    const [fetchingTypes, setFetchingTypes] = useState(false);

    //Stores the list of quest types that the user has access to
    const [types, setTypes] = useState([]);

    //Stores the maximum number of steps in the form
    let maxSteps = 6;

    //Fetch the locations and quest types when the component mounts
    useEffect(() => {
        fetchLocations();
        fetchTypes();
    },[]);

    /**
     * Fetches the quest types from the database
     */
    async function fetchTypes(){
        setFetchingTypes(true);
        ApiClient.api.fetchTypes(user).then((res) => {
            //at later date add error handling for invalid token and check properly ie if 401 etc
            if(res.detail === "Invalid token."){
                console.error("Invalid token");
                return;
            }
            console.log(res);
            setTypes(res);
                 //If there are quest types, set the type select value to the first type so that if the user does not change the value in the select field, the first type will be selected by default
            if(res.length > 0){
                setQuestType(res[0].name);
            }
            setFetchingTypes(false);
        }).catch((error) => {
            console.log(error);
            setFetchingTypes(false);
        });
    }

    /**
     * Fetches the locations from the database
     * @param {boolean} override - If false, the location select value will be set to the first location in the list
     * If true, the location select value will not be changed
     */
    async function fetchLocations(override = false){
        setFetchingLocations(true);
        ApiClient.api.fetchLocations(user).then((res) => {

            //at later date add error handling for invalid token and check properly ie if 401 etc
            if(res.detail === "Invalid token."){
                console.error("Invalid token");
                return;
            }
            console.log(res);
            setListOfLocations(res);
            //If there are locations, set the location select value to the first location so that if the user does not change the value in the select field, the first location will be selected by default
            if(res.length > 0 && !override){
                setLocationSelectValue(res[0].name);
            }
            setFetchingLocations(false);
        }).catch((error) => {
            console.log(error);
            setFetchingLocations(false);
        });
    }

    /**
     * Adds a location to the database
     */
    function addLocation(){
        let locationData = {
            name: locationName,
            latitude: latitude,
            longitude: longitude,
        }
        ApiClient.api.addLocation(user,locationData).then(async(res) => {
            console.log(res);

            //Fetch the locations again to update the list of locations
            await fetchLocations(true);
            
            //Set the location select value to the location that was just added
            setLocationSelectValue(locationName);

            //Hide the custom location fields
            setShowCustomLocation(false);
        }).catch((error) => {
            console.log(error);
        });
    }

    /**
     * Adds the quest to the database
     */
    async function createQuest(){

        console.log("Creating Quest");
        console.log(image)
        let dataImg = {
            "name": image.name,
            "description": "n/a for now",
        }
        let imgURL = null;
        await ApiClient.api.uploadImage(user,dataImg,image).then((res) => {
            
            imgURL = res?.image;
            console.log(res);
        }).catch((error) => {
            console.warn(error);
        });
        if(imgURL === null || imgURL === undefined){
            console.error("Image failed to upload");
            return;
        }
        //Get the locationID from the location name that was selected
        let locationID = -1;
        for(let i = 0; i < listOfLocations.length; i++){
            console.log("1: "+listOfLocations[i].name+ " 2: "+locationSelectValue);

            if(listOfLocations[i].name === locationSelectValue){
                locationID = listOfLocations[i].locationID;
                break;
            }
        }

        //Get the questTypeID from the quest type that was selected
        let questTypeID = -1;
        for(let i = 0; i < types.length; i++){
            if(types[i].name === questType){
                questTypeID = types[i].questTypeID;
                break;
            }
        }

        let data = {
            name: name,
            task: description,
            state:"True",
            locationID: locationID,
            questTypeID: questTypeID,
            reward: Number(reward),
            user: userData.id,
            imgURL: imgURL,
        }
        console.log(data);
        ApiClient.api.createQuest(user,data).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error);
        });
    }

    /**
     * Handles the form submission, if the step is the last step, the quest will be created otherwise the step will be incremented*/
    const onSubmit = (e) => {
        e.preventDefault();
        if(step === maxSteps){
            createQuest();
        }
        else{
            setStep(step + 1);
        }
    }


    const onSelectChange = (e) => {
        setLocationSelectValue(e.target.value);
    }
    const onTypeSelectChange = (e) => {
        setQuestType(e.target.value);
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
                    <h3>Enter the reward for completing the quest</h3>
                    <input className={classes.inputField} type="number" placeholder="Quest Reward" value={reward} onChange={(e) => setReward(e.target.value)}/>
                </div>
            )}
            {step === 4 && (
                <div className={classes.inputContainer}>
                    <h3>Select the quest type</h3>
                    <div className={classes.locationContainer}>
                        <select value={questType} className={classes.selectField} name="type" id="type" onChange={onTypeSelectChange}>
                            
                            {types.length === 0 && !fetchingTypes && (<option value="null">No Types</option>)}
                            {fetchingTypes && (<option value="null">Fetching Types</option>)}
                            {types?.map((type,index) => {
                                return <option value={type.name}>{type.name}</option>
                            })}
                            
                        </select>
                    </div>
                </div>
            )}
            {step === 5 && (
                <div className={classes.inputContainer}>

                    <h3>Select the quest location</h3>
                    <div className={classes.locationContainer}>
                        <select value={locationSelectValue} className={classes.selectField} name="location" id="location" onChange={onSelectChange}>
                            {listOfLocations.length === 0 && !fetchingLocations && (<option value="null">No Locations</option>)}
                            {fetchingLocations && (<option value="null">Fetching Locations</option>)}
                            {listOfLocations?.map((location,index) => {
                                return <option value={location.name}>{location.name}</option>
                            })}
                            
                        </select>
                    </div>
                    <div className={classes.locationContainer}>
                    <button type="button" className={classes.showButton}onClick={(e) => {
                        setShowCustomLocation(!showCustomLocation);
                    }}> {!showCustomLocation ? <p>Add Custom Location</p>: <p>Hide Custom Location</p>}</button>
                    </div>
                    {showCustomLocation && (
                    <div className={classes.locationContainer}>
                        
                        <input className={classes.inputField} type="text" placeholder="Location Name" value={locationName} onChange={(e) => setLocationName(e.target.value)}/>
                        <input className={classes.inputField} type="number" placeholder="Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)}/>
                        <input className={classes.inputField} type="number" placeholder="Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)}/>
                        <button type="button" onClick={addLocation}className={classes.locationButton}>Add Location</button>
                    </div>
                    )}

                </div>
            )}
            {step === 6 && (
                <div className={classes.inputContainer}>

                <h3>Upload an example image of the completed quest</h3>   
                {/* <input className={classes.inputField} type="file" accept="image/*" placeholder="Add Image" value={image} onChange={(e) => setImage(e.target.value)}/> */}
                <ImageSubmit setImage={setImage} img={image}/>
                    
            </div>
            )}
            {step === maxSteps ? (
                <div className={classes.buttonContainer}>
                    <button type="button" onClick={()=>setStep(step-1)} className={classes.locationButton}>Back</button>
                    <button className={classes.locationButton}>Create</button>
                </div>
            ) : (
                <div className={classes.buttonContainer}>
                    {step > 1 && (
                        <button type="button" onClick={()=>setStep(step-1)} className={classes.locationButton}>Back</button>
                    )}
                    <button className={classes.locationButton}>Next</button>
                </div>
            )}
        </form>
    );
}
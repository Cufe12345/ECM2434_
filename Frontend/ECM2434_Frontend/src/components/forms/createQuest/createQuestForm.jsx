import React, { useEffect, useRef } from 'react';
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
    const [locationName, setLocationName] = useState("");
    const [locationSelectValue, setLocationSelectValue] = useState(0);
    const [image, setImage] = useState("");
    const [showCustomLocation, setShowCustomLocation] = useState(false);
    const [listOfLocations, setListOfLocations] = useState([]);
    const [fetchingLocations, setFetchingLocations] = useState(false);
    let maxSteps = 4;


    useEffect(() => {
        fetchLocations();
    },[]);

    async function fetchLocations(){
        setFetchingLocations(true);
        ApiClient.api.fetchLocations(user).then((res) => {
            console.log(res);
            setListOfLocations(res);
            setFetchingLocations(false);
        }).catch((error) => {
            console.log(error);
            setFetchingLocations(false);
        });
    }

    function addLocation(){
        let locationData = {
            name: locationName,
            latitude: latitude,
            longitude: longitude,
        }
        ApiClient.api.addLocation(user,locationData).then(async(res) => {
            console.log(res);
            await fetchLocations();
            setLocationSelectValue(locationName);
            setShowCustomLocation(false);
        }).catch((error) => {
            console.log(error);
        });
    }

    /**
     * Adds the quest to the database
     */
    function createQuest(){
        console.log("Creating Quest");
        let locationId = -1;
        for(let i = 0; i < listOfLocations.length; i++){
            if(listOfLocations[i].name === locationSelectValue){
                locationId = listOfLocations[i].id;
                break;
            }
        }
        let data = {
            name: name,
            task: description,
            state:"active",
            locationID: locationId,
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

    const onSelectChange = (e) => {
        setLocationSelectValue(e.target.value);
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

                    <h3>Select the quest location</h3>
                    <div className={classes.locationContainer}>
                        <select value={locationSelectValue} className={classes.selectField} name="location" id="location" onChange={onSelectChange}>
                            {listOfLocations.length === 0 && !fetchingLocations && (<option value="null">No Locations</option>)}
                            {fetchingLocations && (<option value="null">Fetching Locations</option>)}
                            {listOfLocations.map((location,index) => {
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
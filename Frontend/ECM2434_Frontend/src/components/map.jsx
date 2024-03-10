import React, { useEffect, useState } from "react";
import {MapContainer, Marker, Popup,TileLayer} from 'react-leaflet'
import L from 'leaflet'
import MarkerClusterGroup from "react-leaflet-cluster";
import classes from "./map.module.css";
// import {MapLibreTileLayer} from "./MapLibreTileLayer.tsx";
import 'leaflet/dist/leaflet.css';

//Created by Cufe12345(Callum Young)

export function Map({center,zoom,scrollWheelZoom,height}) {

  //Dont ask me why we plus 60px to the height it just works as it likes to be 60px off idk why as console logging the height shows it as the correct value
  useEffect(() => {
    console.log("Height: ",height)

  },[height])
  return (
    <MapContainer className={classes.map} style={{minHeight:`${height+60}px`, maxHeight:`${height+60}px`}}center={center} zoom={zoom} scrollWheelZoom={scrollWheelZoom}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={center}>
    <Popup>
      location of the quest
    </Popup>
  </Marker>
</MapContainer>
  );
}
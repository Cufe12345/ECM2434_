import React from "react";
import {MapContainer, Marker, Popup,TileLayer} from 'react-leaflet'
import L from 'leaflet'
import MarkerClusterGroup from "react-leaflet-cluster";
import classes from "./map.module.css";
// import {MapLibreTileLayer} from "./MapLibreTileLayer.tsx";
import 'leaflet/dist/leaflet.css';

//Created by Cufe12345(Callum Young)

export function Map({center,zoom,scrollWheelZoom}) {
  return (
    <MapContainer className={classes.map} center={center} zoom={zoom} scrollWheelZoom={scrollWheelZoom}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={center}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
  );
}
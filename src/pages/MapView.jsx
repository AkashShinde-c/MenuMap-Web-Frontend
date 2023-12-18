import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import img from '../assets/react.svg'
import '../css/MapView.css'
import axios from 'axios';

const MapView = () => {
  const apiKey = 'AIzaSyDPEAGbAfP-gnmnziEPebB340EQ6J9at9M';
  const [position, setPosition] = useState({ lat: 18.645685, lng: 73.766580 });
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [markers, setMarkers] = useState([{}]);

  const onMarkerClick = () => {
    setInfoWindowOpen(!infoWindowOpen);
  };

  const onMarkerDragEnd = (e) => {
    setPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };
  useEffect(()=>{
    (async()=>{
        try {
            const response = await axios.get('http://localhost:3000/get-menu-data');
            console.log(response.data.menu_data);
            setMarkers(response.data.menu_data)
        } catch (error) {
            alert("Somthing went wrong")
        }
    })();
  },[])

  const loadImage = async()=>{
    try {
        
    } catch (error) {
      
    }
  }
  return (
    <LoadScript googleMapsApiKey={apiKey}>
         
      <GoogleMap mapContainerStyle={{ width: '100%', height: '100%' }} center={position} zoom={14}>
        <Marker position={position} draggable={false} onDragEnd={onMarkerDragEnd} onClick={onMarkerClick} />
        {markers && markers.map((marker)=>(<Marker key={marker._id} position={{lat:parseFloat(marker.location?.lat),lng:parseFloat(marker.location?.lng)}} draggable={false}/>))}
        {infoWindowOpen && (
          <InfoWindow
            position={position}
            onCloseClick={() => setInfoWindowOpen(false)}
          >
            <div>
              <h3>Your Custom Overlay</h3>
               <img src={img} alt="" />
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapView;

import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import img from "../assets/react.svg";
import "../css/MapView.css";
import axios from "axios";
import api from "../api/api";

const MapView = () => {
  const apiKey =  process.env.REACT_APP_MAPS_API_KEY;
  const [position, setPosition] = useState({ lat: 18.645685, lng: 73.76658 });
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [markers, setMarkers] = useState([{}]);
  const [menu, setMenu] = useState("");
  const [pinSize, setPinSize] = useState();

  const onMarkerClick = () => {
    setInfoWindowOpen(!infoWindowOpen);
  };

  const onMarkerDragEnd = (e) => {
    setPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };
  useEffect(() => {
    (async () => {
      try {
        const response = await api.get("/get-menu-data");
        console.log(response.data.menu_data);
        setMarkers(response.data.menu_data);
         setTimeout(async() =>{
          const ps = await new window.google.maps.Size(35, 35);
          setPinSize(ps)
         },50)
         
        
      } catch (error) {
        alert(error.message);
      }
    })();
  }, [window.google]);

  const mapOptions = {
    disableDefaultUI: true,  
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],  
      },
    ],
  };

  const loadImage = async (marker) => {
    try {
      console.log(marker)
      if (!marker.menu_image_url) {
        alert("Menu not updated");
        return;
      }

      const response = await api.get(`/get-image-url?img_name=${marker.menu_image_url}`);
      const awsresponse = await axios.get(response.data.url);
      const base64String = awsresponse.data;
      setMenu(`data:image/jpeg;base64,${base64String}`);
      setPosition({
        lat: parseFloat(marker.location?.lat),
        lng: parseFloat(marker.location?.lng),
      })
      setInfoWindowOpen(!infoWindowOpen);
    } catch (error) {
      alert("Somthing went wrong");
    }
  };
  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={position}
        zoom={14}
        options={mapOptions}
      >
        {markers &&
          markers.map((marker) => (
            <Marker
              key={marker._id}
              onClick={() => loadImage(marker)}
              position={{
                lat: parseFloat(marker.location?.lat),
                lng: parseFloat(marker.location?.lng),
              }}
              // label={"Athavan"}
              icon={{
                url:  'https://maps.google.com/mapfiles/kml/paddle/red-blank.png', 
                scaledSize: pinSize,  
              }}
              label={{
                text: marker.mess_name,
                color: 'black',
                fontSize: '10px',  
                fontWeight: 'bold',  
                
              }}
              draggable={false}
            />
          ))}
        {infoWindowOpen && (
          <InfoWindow
            position={position}
            onCloseClick={() => setInfoWindowOpen(false)}
            
          >
            <div className="infoWindow">
              <h3>Todays Menu</h3>
              <img src={menu} alt="" />
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapView;

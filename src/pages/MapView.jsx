import React, { Fragment, useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  useJsApiLoader,
  OverlayView,
} from "@react-google-maps/api";
import img from "../assets/react.svg";
import "../css/MapView.css";
import axios from "axios";
import api from "../api/api";
import mark from "../assets/marker.svg";
import current from "../assets/current.svg";
import Loader from "../components/Loader";
import MarkerLabel from "../components/MarkerLabel";

const MapView = () => {
  const apiKey = "";
  const [position, setPosition] = useState({
    lat: 18.645732400587775,
    lng: 73.76579150007586,
  });
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [markers, setMarkers] = useState([{}]);
  const [menu, setMenu] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [center, setCenter] = useState(null);
  const [openMarker, setOpenMarker] = useState();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDPEAGbAfP-gnmnziEPebB340EQ6J9at9M",
  });

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
        const updatedMenus = response.data.menu_data.filter((menu) =>
          isUpdated(menu.date)
        );
        console.log(updatedMenus);
        setMarkers(updatedMenus);
      } catch (error) {
        alert(error.message);
      }
    })();
    //see if location permission is granted
    navigator.permissions
      .query({ name: "geolocation" })
      .then((result) => {
        if (result.state === "granted") {
            //Set current location as center
            navigator.geolocation.getCurrentPosition((position) => {
              setCenter({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            });
          // Use Geolocation API to get the user's current position
          const watchId = navigator.geolocation.watchPosition(
            (position) => {
              setCurrentLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            (error) => {
              window.alert("Error getting location");
            }
          );
        }
        else{
           //Set current location as center
           navigator.geolocation.getCurrentPosition((position) => {
            setCenter({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          });
        }
      })
      .catch((error) => {
        window.alert("Location not available: " );
      });

 
  }, [window.google]);

  const mapOptions = {
    gestureHandling: "greedy",
    disableDefaultUI: true,
    // mapId: "43e761c16c55b930",
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit",
        stylers: [{ visibility: "off" }],
      },
    ],
  };

  const loadImage = async (marker) => {
    try {
      setIsLoading(true);
      if (!marker.menu_image_url) {
        alert("Menu not updated");
        return;
      }

      const response = await api.get(
        `/get-image-url?img_name=${marker.menu_image_url}`
      );
      const awsresponse = await axios.get(response.data.url);
      const base64String = awsresponse.data;
      setMenu(`data:image/jpeg;base64,${base64String}`);
      setPosition({
        lat: parseFloat(marker.location?.lat),
        lng: parseFloat(marker.location?.lng),
      });
      setOpenMarker(marker);
      setInfoWindowOpen(!infoWindowOpen);
    } catch (error) {
      alert("Somthing went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const isUpdated = (time) => {
    console.log(time);
    const receivedTime = new Date(time);
    const currentTime = new Date();

    const timeDifferenceInMilliseconds = currentTime - receivedTime;
    const timeDifferenceInHours =
      timeDifferenceInMilliseconds / (1000 * 60 * 60);
      console.log(timeDifferenceInHours)
    return timeDifferenceInHours < 3.5;
  };
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={center||position}
      
      zoom={17.6}
      options={mapOptions}
    >
      {isLoading && <Loader></Loader>}

      {markers &&
        markers.map((marker) => (
          <Fragment key={marker._id}>
            <Marker
              key={marker._id}
              onClick={() => loadImage(marker)}
              position={{
                lat: parseFloat(marker.location?.lat),
                lng: parseFloat(marker.location?.lng),
              }}
              // label={"Athavan"}
              icon={{
                url: mark,
                scaledSize: {
                  width: 30,
                  height: 30,
                },
              }}
              // label={{
              //   text: marker.mess_name,
              //   color: "black",
              //   fontSize: "10px",
              //   fontWeight: "bold",
              //   backgroundColor: "black",
              //   padding:'10px'
              // }}
              draggable={false}
              animation={google.maps.Animation.DROP}
            />
            <OverlayView
              position={{
                lat: parseFloat(marker.location?.lat),
                lng: parseFloat(marker.location?.lng),
              }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <MarkerLabel text={marker.mess_name} />
            </OverlayView>
          </Fragment>
        ))}
      {currentLocation && (
        <Marker
          position={currentLocation}
          title="Live Location"
          icon={{
            url: current,
            scaledSize: {
              width: 30,
              height: 30,
            },

            anchor: {
              x: 30,
              y: 30,
            },
          }}
        />
      )}
      {infoWindowOpen && (
        <InfoWindow
          position={position}
          onCloseClick={() => setInfoWindowOpen(false)}
          options={{
            backgroundColor: "red",
            border: "2px solid black",
            padding: "100px",
          }}
        >
          <div className="infoWindow flex flex-col gap-3 ounded-lg  ">
            <div className=" flex items-center justify-between">
              <h2 className=" text-[1.2rem] font-bold">
                {openMarker.mess_name}
              </h2>
              <div className=" font-bold text-green-600">
                {openMarker.last_updated}
              </div>
            </div>
            <img src={menu} alt="Menu" className=" rounded-lg" />
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <Loader></Loader>
  );
};

export default MapView;

import React from 'react'
import mark from '../assets/mark.svg'
import map from '../assets/map.png'
import '../css/Tutorial.css'
import { useNavigate } from 'react-router-dom'

export default function Tutorial() {
    const navigate = useNavigate()
    const markTutorial = ()=>{
        localStorage.setItem('isTutorialComplete',true);
        navigate('/') 
    }
  return (
    <div className="tutorial-cantainer">
    <h2>Welcome to MenuMap!</h2>
    <p className="kys-d">
      This is a quick tutorial to help you get started.
    </p>
    <div className="map-info">
        <h3>1 Map</h3>
        <img src={map} alt="" />
        <p>Above is the map of our area to navigate through...</p>
    </div>
    <div className="marker-info">
        <h3>2 Marker(mess location)</h3>
        <img src={mark} alt="" />
        <p>This marker shows the location of the mess around your area...</p>
    </div>
    <div className="menu-info">
        <h3>3 Click on Marker</h3>
        <p>Click on the Marker to see the menu of the perticular mess...</p>
    </div>
    <button onClick={markTutorial}>Done!</button>
  </div>
  )
}

import React, { useContext, useState } from "react";
import '../css/About.css'
import close from '../assets/close.svg'
import MyContext from "../context/MyContext";

export default function About( ) {
     const {showAbout, updateValue} = useContext(MyContext);
  return (
    <div className={`about`}>
       
      <div className="text-area">
      <div className="close">
            <img src={close} alt="close" onClick={()=>updateValue(!showAbout)} />
        </div>
        Welcome to MenuMap.pro, where culinary exploration meets convenience!
        🍽️✨ At MenuMap.pro, we're passionate about simplifying the dining
        experience for everyone. Whether you're a food enthusiast looking to
        discover new flavours or someone tired of the endless search for the
        perfect meal, we've got you covered. Our mission is to provide a
        seamless platform that empowers users to explore nearby messes, check
        out daily menus, and plan meals effortlessly. No more guesswork, no more
        hopping – just a delightful journey into the world of hassle-free
        dining. We believe in the joy of discovering delicious food without the
        hassle, and MenuMap.pro is the result of that belief. Join us on this
        culinary adventure, and let's redefine the way you experience food
        together! Feel free to connect with us if you have any questions or
        feedback. Happy dining! Cheers, The MenuMap.pro Team 🌮🌐
      </div>
    </div>
  );
}

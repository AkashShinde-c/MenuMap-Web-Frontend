import React from "react";
import { ThreeDots } from "react-loader-spinner";
import "../css/Loader.css";

export default function Loader() {
  return (
    <div className="loader">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#4AB3FF"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Link className="link-back-error" to="/">
        Go Back
      </Link>
      <div className="bidlist-screen">
        <h1 className="color-red">NOT FOUND </h1>
      </div>
    </>
  );
};

export default NotFound;

import React from "react";
import "../App.css";

function WelcomeMsg({onGetPostsLists}) {
  return (
    <div className="center">
      <h1 className="welcome-message">There Are No Posts</h1>     
    </div>
  );
}

export default WelcomeMsg;

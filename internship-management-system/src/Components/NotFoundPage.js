import React from "react";
import pic from "./Images/quokkapic.png";
import "./Styles/404style.css";

const NotFoundPage = () => {
    return (
        <div className="notfound">
            <br></br>
            <h1>404 - Page Not Found</h1>
            <h1>The page you are looking for does not exist.</h1>
            <h1>Quokka is confused.</h1>
            <img className='pic' src={pic}/>

        </div>
    );
};

export default NotFoundPage;

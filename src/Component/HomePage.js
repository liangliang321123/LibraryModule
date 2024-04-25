import React, { useState, useEffect } from 'react';
import HomePageContent from './HomePageContent';
import { useLocation, useNavigate } from 'react-router-dom';


const HomePage = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const loginUsername = location.state ? location.state.loginUsername : "Default User";
    const [content, setContent] = useState(1);


    return (
        <div>
            <header className="homePage_header">
                <h1 className="homePage_h1">PAYROLL HOMEPAGE</h1>
                <div>
                    <p className="homePage_userID">User ID: {loginUsername}</p>
                    <br></br>
                    <button onClick={() => navigate(-1)}>Logout</button>
                </div>
            </header>
            <div className="navBar_header">
                <ul>
                    <li onClick={() => setContent(1)}><a href="#">Home</a></li>
                    <li>
                        <a href="#">Leave ▼</a>
                        <ul className="dropdown">
                            <li onClick={() => setContent(2)}><a href="#">Update</a></li>
                            <li><a href="#">Update</a></li>
                            <li><a href="#">Update</a></li>
                            <li><a href="#">Update</a></li>
                        </ul>
                    </li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">contact us</a></li>
                </ul>
            </div>
            <HomePageContent currentComp={content} />
        </div>
    )
}
export default HomePage;

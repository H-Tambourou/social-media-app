import React, { useContext } from "react";
import "./topbar.css";
import {Search, Person, Chat, Notifications} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return(
        <div className="container">
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration:"inherit", color:"inherit"}} > 
                <span className="logo">Mars Feed</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchPart">
                    <Search className="searchIcon"/>
                    <input 
                        placeholder="Search the new eco"
                        className="searchInput"
                    />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Feed</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat/>
                        <span className="topbarIconBadge">3</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    </div>
                <Link to={`/profile/${user.username}`}>
                    <img src={ user.profilePicture ? PF + user.profilePicture : PF+"person/defaultProfilePic.png"} alt="" className="profilePicture" />
                </Link>
            </div>
        </div>
    )
}
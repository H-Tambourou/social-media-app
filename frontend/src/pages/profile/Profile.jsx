import React, { useEffect, useState } from 'react';
import "./profile.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import axios from 'axios';
import { useParams } from 'react-router';


export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const username = useParams().username;


    useEffect(()=>{
        const fetchUser = async () => {
            const res = await axios.get(`/users?username=${username}`);
            console.log(res);
            setUser(res.data);
        };
        
        fetchUser();
    }, [username]);



    return (
        <div>
            <Topbar/>
            <div className="profile">
            <Sidebar/>
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                        <img className="profileCoverImg" src={user.coverPicture ? PF+user.coverPicture : PF+"person/defaultCover.jpg"} alt=""/>
                        <img className="profileUserImg" src={user.profilePicture ? PF+user.profilePicture : PF+"person/defaultProfilePic.png"} alt=""/>
                    </div>
                    <div className="profileInfo">
                            <h3 className="profileInfoName">{user.username}</h3>
                            <p className="profileInfoDesc">{user.desc}</p>
                    </div>
                </div>
                <div className="profileRightBottom">
                    <Feed username={username}/>
                    <Rightbar user={user}/>
                </div>
            </div>
            </div>
        </div>
    )
}

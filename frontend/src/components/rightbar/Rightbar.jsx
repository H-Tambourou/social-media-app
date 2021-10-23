import React, { useContext, useEffect, useState } from 'react';
import "./rightbar.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import {Add, Remove} from "@material-ui/icons";

export default function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const {user:currentUser, dispatch} = useContext(AuthContext);
    const [followed, setFollow] = useState(currentUser.followings.includes(user?.id));


    //can't use async inside useEffect
    useEffect(() => {
       setFollow(currentUser.followings.includes(user?.id))
    }, [currentUser, user?.id])

    useEffect(() =>{
        const getFriends = async () =>{
            try {
                const friendList = await axios.get("/users/friends/"+user._id);
                setFriends(friendList.data);

            } catch (e) {
                console.log(e);
            }
        }
        getFriends();
    }, [user]);

    const handleClick = async () =>{
        try {
            if(followed){
                await axios.put("/users/"+user._id+"/unfollow", {userId: currentUser._id});
                dispatch({type:"UNFOLLOW", payload:user._id})
            }else{
                await axios.put("/users/"+user._id+"/follow",  {userId: currentUser._id});
                dispatch({type:"FOLLOW", payload:user._id})
            }
        } catch (e) {
            console.log(e)
        }
        setFollow(!followed)
    };

    const HomeSection = () => {
        return (
            <>
                <h4 className="rightBarTitle">Rover Photos of the Day</h4>
                <ul className="roverPhotos">
                    <li className="roverPhoto">
                        <img className="roverImg" src= {PF+"/rover/1.jpg"} alt=""/>
                    </li>
                    <li className="roverPhoto">
                        <img className="roverImg" src={PF+"/rover/2.png"} alt=""/>
                    </li>
                    <li className="roverPhoto">
                        <img className="roverImg" src={PF+"/rover/3.png"} alt=""/>
                    </li>
                    <li className="roverPhoto">
                        <img className="roverImg" src={PF+"/rover/4.png"} alt=""/>
                    </li>
                </ul>
            </>
        )
    }
    const ProfileSection = () =>{
        return(
            <>
            {user.username !== currentUser.username && (
                <button className="rightbarFollowButton" onClick={handleClick}>
                    {followed ? "Unfollow" : "Follow"}
                    {followed ? <Remove/> : <Add/>}
                </button>
            )  }
            <h4 className="rightbarTitle">User information</h4>
            <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">City:</span>
                    <span className="rightbarInfoValue">{user.city}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">From:</span>
                    <span className="rightbarInfoValue">{user.from}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Relationship:</span>
                    <span className="rightbarInfoValue">
                        {user.relationship === 1
                            ? "Single"
                            : user.relationship === 1
                            ? "Married"
                            : "-"}
                    </span>
                </div>
            </div>
            <h4 className="rightbarTitle">User friends</h4>
            <div className="rightbarFollowings">
                {friends.map((friend) => (
                    <Link
                    to={"/profile/" + friend.username}
                    style={{ textDecoration: "none", color:"inherit" }}
                    >
                    <div className="rightbarFollowing">
                        <img
                        src={
                            friend.profilePicture
                            ? PF + friend.profilePicture
                            : PF + "person/defaultProfilePic.png"
                        }
                        alt=""
                        className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingName">{friend.username}</span>
                    </div>
                    </Link>
                 ))}
            </div>
            </>
        )
    }
    return (
        <div className="rightBar">
            <div className="rightBarWrapper">
                {user ? <ProfileSection/> : <HomeSection/>}
            </div>
        </div>
    )
}

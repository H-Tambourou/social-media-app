import React, {useContext, useEffect, useState} from 'react';
import "./post.css";
import { MoreVert, FavoriteBorder } from '@material-ui/icons';
import axios from 'axios';
import {format} from "timeago.js";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


export default function Post({post}) {
    const [like, setLike] = useState(post.likes.length);
    const [isLike, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user:currentUser} =useContext(AuthContext);

    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes]);

    useEffect(()=>{
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            console.log(res);
            setUser(res.data);
        };
        
        fetchUser();
    }, [post.userId]);


    const likeHandler = () =>{
        try {
            axios.put("/posts/"+post._id+"/like", {userId: currentUser._id});
        } catch (error) {
            
        }
        setLike(isLike ? like-1: like+1);
        setIsLiked(!isLike);
    }

    return (
        <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`profile/${user.username}`}>
                    <img 
                    className="postProfileImg" 
                    src={user.profilePicture ? PF + user.profilePicture : PF+"person/defaultProfilePic.png"}
                    alt=".."
                    />
                    </Link>
                    <span className="postUserName">
                        {user.username}
                    </span>
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                    <MoreVert/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText"> {post?.desc}</span>
                <img className="postImg" src={PF+post.img} alt="" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <FavoriteBorder className={`likeIcon ${isLike ? "likeActive": ""}`} onClick={likeHandler}/>
                    <span className="postLikeCounter">{like} people like</span>
                </div>
            </div>
        </div>
        </div>
    )
}

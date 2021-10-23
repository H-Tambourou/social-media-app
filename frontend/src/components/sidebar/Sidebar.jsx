import React, { useContext } from 'react';
import "./sidebar.css";
import {RssFeed, Settings, Sms, PermIdentity, AllOut} from "@material-ui/icons";
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Sidebar() {
    const { user } = useContext(AuthContext);

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <RssFeed className="sidebarIcon"/>
                            <NavLink to="/" style={{textDecoration:"inherit", color:"inherit"}} className="sidebarListItemText">Feed</NavLink>
                        </li>
                        <li className="sidebarListItem">
                            <Sms className="sidebarIcon"/>
                            <span className="sidebarListItemText">Messages</span>
                        </li>
                        <li className="sidebarListItem">
                            <PermIdentity className="sidebarIcon"/>
                            <NavLink to={`/profile/${user.username}`} style={{textDecoration:"none", color:"inherit"}} className="sidebarListItemText">Profile</NavLink>
                        </li>
                        <li className="sidebarListItem">
                            <AllOut className="sidebarIcon"/>
                            <span className="sidebarListItemText">Pods</span>
                        </li>
                        <li className="sidebarListItem">
                            <Settings className="sidebarIcon"/>
                            <span className="sidebarListItemText">Settings</span>
                        </li>
                </ul>
            </div>
        </div>
    )
}

import React from "react";
import './sidebar.css';

import { useNavigate } from "react-router-dom";

const Sidebar = ()=> {
    const navigate = useNavigate();

    return (
        <>
            <div className='side-bar'>
                <div className='icon-block' >
                    <div id='home' className='option' />
                </div>
                <div className='icon-block' onClick={() => navigate("/createorder")}>
                    <div id='more' className='option' />
                </div>
                <div className='icon-block' onClick={() => navigate("/orders")}>
                    <div id='list' className='option' />
                </div>
            </div>
        </>
    )
}

export default Sidebar;
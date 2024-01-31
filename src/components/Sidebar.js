import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { asyncLogout } from '../state/auth/middleware'
import { useContext } from 'react';

import logo from '../assets/logo.png'
import SidebarContext from '../utils/SidebarContext';

import { IconContext } from 'react-icons';
import { FiHome } from "react-icons/fi";
import { MdEventNote } from "react-icons/md";
import { TbCirclesRelation } from "react-icons/tb";
import { BiBookContent } from "react-icons/bi";
import { RiLogoutCircleRLine, RiNodeTree } from "react-icons/ri";
import { IoArrowBackOutline } from "react-icons/io5";
import { PiMicrophoneStageBold } from "react-icons/pi";

import style from '../styles/components/Sidebar.module.css'

export default function Sidebar() {
    const { auth = {} } = useSelector(states => states)
    const { pathname } = useLocation()
    const { show, setShow } = useContext(SidebarContext)
    const dispatch = useDispatch()

    function handleLogout() {
        dispatch(asyncLogout())
    }

    return (
        <aside className={`${style.sidebar} ${show ? style.show : null}`}>
            <ul className={style.navigation}>
                <div className={style.brand}>
                    <img src={logo} alt="brand logo" width="90%" />
                </div>
                <div className={style.back_button_layout}>
                    <IconContext.Provider value={{ className: "icon" }}>
                        <div className={style.back_button} onClick={() => setShow(!show)}>
                            <IoArrowBackOutline />
                        </div>
                    </IconContext.Provider>
                </div>
                <li className={pathname === '/' ? style.active : null} onClick={() => setShow(!show)}>
                    <Link to="/">
                        <IconContext.Provider value={{ className: "icon" }}>
                            <FiHome />
                        </IconContext.Provider>
                        Home
                    </Link>
                </li>
                {auth.role === 'Sysadmin' && (
                    <>
                        <li className={pathname.includes('/event') ? style.active : null} onClick={() => setShow(!show)}>
                            <Link to="/event">
                                <IconContext.Provider value={{ className: "icon" }}>
                                    <MdEventNote />
                                </IconContext.Provider>
                                Event
                            </Link>
                        </li>
                        <li className={pathname === '/partner' ? style.active : null} onClick={() => setShow(!show)}>
                            <Link to="/partner">
                                <IconContext.Provider value={{ className: "icon" }}>
                                    <TbCirclesRelation />
                                </IconContext.Provider>
                                Partner
                            </Link>
                        </li>
                        <li className={pathname === '/speaker' ? style.active : null} onClick={() => setShow(!show)}>
                            <Link to="/speaker">
                                <IconContext.Provider value={{ className: "icon" }}>
                                    <PiMicrophoneStageBold />
                                </IconContext.Provider>
                                Speaker
                            </Link>
                        </li>
                        <li className={pathname === '/content' ? style.active : null} onClick={() => setShow(!show)}>
                            <Link to="/content">
                                <IconContext.Provider value={{ className: "icon" }}>
                                    <BiBookContent />
                                </IconContext.Provider>
                                Content
                            </Link>
                        </li>
                        <li className={pathname === '/access' ? style.active : null} onClick={() => setShow(!show)}>
                            <Link to="/access">
                                <IconContext.Provider value={{ className: "icon" }}>
                                    <RiNodeTree />
                                </IconContext.Provider>
                                Access
                            </Link>
                        </li>
                    </>
                )}
                {auth.role === 'Communication' && (
                    <li className={pathname === '/content' ? style.active : null} onClick={() => setShow(!show)}>
                        <Link to="/content">
                            <IconContext.Provider value={{ className: "icon" }}>
                                <BiBookContent />
                            </IconContext.Provider>
                            Content
                        </Link>
                    </li>
                )}
                {auth.role === 'Event' && (
                    <>
                        <li className={pathname === '/speaker' ? style.active : null} onClick={() => setShow(!show)}>
                            <Link to="/speaker">
                                <IconContext.Provider value={{ className: "icon" }}>
                                    <PiMicrophoneStageBold />
                                </IconContext.Provider>
                                Speaker
                            </Link>
                        </li>
                        <li className={pathname.includes('/event') ? style.active : null} onClick={() => setShow(!show)}>
                            <Link to="/event">
                                <IconContext.Provider value={{ className: "icon" }}>
                                    <MdEventNote />
                                </IconContext.Provider>
                                Event
                            </Link>
                        </li>
                    </>
                )}
                {auth.role === 'Partnership' && (
                    <li className={pathname === '/partner' ? style.active : null} onClick={() => setShow(!show)}>
                        <Link to="/partner">
                            <IconContext.Provider value={{ className: "icon" }}>
                                <TbCirclesRelation />
                            </IconContext.Provider>
                            Partner
                        </Link>
                    </li>
                )}
            </ul>
            <div className={style.profile}>
                <div className={style.profile_detail}>
                    <p>{auth?.display_name}</p>
                    <p>{auth?.role}</p>
                </div>
                <span onClick={() => handleLogout()}>
                    <IconContext.Provider value={{ className: "icon" }}>
                        <RiLogoutCircleRLine />
                    </IconContext.Provider>
                </span>
            </div>
        </aside>
    )
}
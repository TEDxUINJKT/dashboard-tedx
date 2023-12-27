import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { asyncLogout } from '../state/auth/middleware'

import logo from '../assets/logo.png'

import { IconContext } from 'react-icons';
import { FiHome } from "react-icons/fi";
import { MdEventNote } from "react-icons/md";
import { TbCirclesRelation } from "react-icons/tb";
import { BiBookContent } from "react-icons/bi";
import { RiLogoutCircleRLine, RiNodeTree } from "react-icons/ri";

import style from '../styles/components/Sidebar.module.css'

export default function Sidebar() {
    const { auth = {} } = useSelector(states => states)
    const { pathname } = useLocation()
    const dispatch = useDispatch()

    function handleLogout() {
        dispatch(asyncLogout())
    }

    return (
        <aside className={style.sidebar}>
            <ul className={style.navigation}>
                <div className={style.brand}>
                    <img src={logo} alt="brand logo" width="70%" />
                </div>
                <li className={pathname === '/' ? style.active : null}>
                    <Link to="/">
                        <IconContext.Provider value={{ className: "icon" }}>
                            <FiHome />
                        </IconContext.Provider>
                        Home
                    </Link>
                </li>
                <li className={pathname === '/event' ? style.active : null}>
                    <Link to="/event">
                        <IconContext.Provider value={{ className: "icon" }}>
                            <MdEventNote />
                        </IconContext.Provider>
                        Event
                    </Link>
                </li>
                <li className={pathname === '/partner' ? style.active : null}>
                    <Link to="/partner">
                        <IconContext.Provider value={{ className: "icon" }}>
                            <TbCirclesRelation />
                        </IconContext.Provider>
                        Partner
                    </Link>
                </li>
                <li className={pathname === '/content' ? style.active : null}>
                    <Link to="/content">
                        <IconContext.Provider value={{ className: "icon" }}>
                            <BiBookContent />
                        </IconContext.Provider>
                        Content
                    </Link>
                </li>
                <li className={pathname === '/access' ? style.active : null}>
                    <Link to="/access">
                        <IconContext.Provider value={{ className: "icon" }}>
                            <RiNodeTree />
                        </IconContext.Provider>
                        Access
                    </Link>
                </li>
            </ul>
            <div className={style.profile}>
                <div className={style.profile_detail}>
                    <p>{auth?.display_name}</p>
                    <p>Authenticated</p>
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
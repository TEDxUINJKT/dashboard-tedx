import { useContext } from 'react';

import { IconContext } from 'react-icons'
import { IoMenu } from "react-icons/io5";
import SidebarContext from '../utils/SidebarContext';

import style from '../styles/components/Burgerbutton.module.css'

export default function Burgerbutton() {
    const { show, setShow } = useContext(SidebarContext)

    return (
        <section className={style.layout}>
            <IconContext.Provider value={{ className: "icon" }}>
                <div className={style.burger_button} onClick={() => setShow(!show)}>
                    <IoMenu />
                </div>
            </IconContext.Provider>
        </section>
    )
}
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Burgerbutton from "./components/Burgerbutton"

import style from './styles/layout.module.css'

export default function Layout({ children }) {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className={style.layout}>
            <Sidebar />
            <main className={style.main}>
                <Burgerbutton />
                {children}
            </main >
        </div>
    )
}
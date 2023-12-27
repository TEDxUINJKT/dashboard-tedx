import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";

export default function Layout({ children }) {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const layout = {
        display: 'flex',
        justifyContent: 'space-between',
    }

    const main = {
        display: 'flex',
        flexDirection: 'column',
        width: '80vw',

    }

    return (
        <div style={layout}>
            <Sidebar />
            <main style={main}>
                {children}
            </main >
        </div>
    )
}
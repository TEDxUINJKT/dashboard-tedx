import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { asyncRefreshToken, asyncCheckLogin, asyncLogout } from './state/auth/middleware'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import SidebarContext from "./utils/SidebarContext";
import Layout from './layout';
import Loading from './components/Loading'

import Login from './pages/Login'
import Home from './pages/Home'
import Event from './pages/Event'
import EventDetail from "./pages/EventDetail";
import Partner from './pages/Partner'
import Speaker from './pages/Speaker'
import Content from './pages/Content'
import Access from './pages/Access'
import Page404 from './pages/Page404'

export default function AppRouter() {
    const { auth = {} } = useSelector(states => states)
    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    const value = { show, setShow };

    // Refresh Token Cycle
    useEffect(() => {
        // do refresh token where token is'nt undefined
        if (auth.token !== undefined) {
            try {
                // Do in 8 minutes
                const interval = setInterval(() => {
                    dispatch(asyncRefreshToken())
                }, 480000);

                return () => clearInterval(interval);
            } catch (err) {
                dispatch(asyncLogout())
            }
        } else {
            // Try Tto get token from Session Storage
            try {
                dispatch(asyncCheckLogin())
            } catch (err) {
                dispatch(asyncLogout())
            }
        }
    }, [auth, dispatch])

    return (
        <Router>
            <Loading />
            {auth?.token === undefined ? (
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route path="*" element={<Page404 />} />
                </Routes>
            ) : (
                    <SidebarContext.Provider value={value}>
                        <Layout>
                    {auth.role? === 'Sysadmin' ?? (
                            <Routes>
                                <Route exact path="/" element={<Home />} />
                                <Route path="/event" element={<Event />} />
                                <Route path="/event/manage/:id" element={<EventDetail />} />
                                <Route path="/partner" element={<Partner />} />
                                <Route path="/content" element={<Content />} />
                                <Route path="/access" element={<Access />} />
                                <Route path="/speaker" element={<Speaker />} />
                                <Route path="*" element={<Page404 />} />
                            </Routes>
                    )}
                    {auth.role? === 'Communication' ?? (
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route path="/content" element={<Content />} />
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    )}
                    {auth.role? === 'Event' ?? (
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route path="/event" element={<Event />} />
                            <Route path="/event/manage/:id" element={<EventDetail />} />
                            <Route path="/speaker" element={<Speaker />} />
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    )}
                    {auth.role? === 'Partnership' ?? (
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route path="/content" element={<Content />} />
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    )}
                    </Layout>
                </SidebarContext.Provider>
            )}
        </Router>
    )
}

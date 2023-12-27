import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { asyncRefreshToken, asyncCheckLogin, asyncLogout } from './state/auth/middleware'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import Layout from './layout';

import Login from './pages/Login'
import Home from './pages/Home'
import Event from './pages/Event'
import Partner from './pages/Partner'
import Content from './pages/Content'
import Access from './pages/Access'
import Page404 from './pages/Page404'

export default function AppRouter() {
    const { auth = {} } = useSelector(states => states)
    const dispatch = useDispatch()

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
            {auth?.token === undefined ? (
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route path="*" element={<Page404 />} />
                </Routes>
            ) : (
                <Layout>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/event" element={<Event />} />
                        <Route path="/partner" element={<Partner />} />
                        <Route path="/content" element={<Content />} />
                        <Route path="/access" element={<Access />} />
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </Layout>
            )}
        </Router>
    )
}
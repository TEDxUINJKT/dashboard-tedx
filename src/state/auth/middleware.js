import { LoginAction, RefreshTokenAction, LogoutAction } from './action'
import { StartLoadingActions, FetchLoadingActions, FinishLoadingActions } from '../loading/action'
import { ShowError } from '../error/middleware'

import api from '../../utils/api'
import cookies from '../../utils/cookies'
import axios from 'axios'

function asyncLogin(username, password) {
    return async dispatch => {
        dispatch(StartLoadingActions())
        try {
            dispatch(FetchLoadingActions())
            // Fetch Login
            const response = await api.Login(username, password)
            //Setup Cookies 
            cookies.remove('access_token')
            cookies.add('access_token', response.data.access_token, 7)

            const data = {
                id: response.data.id,
                display_name: response.data.display_name,
                role: response.data.role,
                token: response.data.access_token,
            }

            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`
            sessionStorage.setItem('dashboard_himsi_login', JSON.stringify(data))

            // Pass to Action
            dispatch(LoginAction(data))
        } catch (err) {
            ShowError('Email and Password Not Valid')
            dispatch(FinishLoadingActions())
        }
        dispatch(FinishLoadingActions())
    }
}

function asyncCheckLogin() {
    return async dispatch => {
        try {
            // Get From Session Storage
            let auth_data = JSON.parse(sessionStorage.getItem('dashboard_himsi_login'));

            //Setup Cookies 
            cookies.remove('refreshToken')
            cookies.add('refreshToken', auth_data.token, 7)

            axios.defaults.headers.common['Authorization'] = `Bearer ${auth_data.token}`
            sessionStorage.setItem('dashboard_himsi_login', JSON.stringify(auth_data))

            // Pass to Action
            dispatch(LoginAction(auth_data))
        } catch (err) {
            // Do Nothing
        }
    }
}

function asyncRefreshToken() {
    return async dispatch => {
        try {
            const response = await api.Refresh()

            cookies.remove('access_token')
            cookies.add('access_token', response.data.access_token, 7)

            let auth_data = JSON.parse(sessionStorage.getItem('dashboard_himsi_login'));
            auth_data.token = response.data.access_token

            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`
            sessionStorage.setItem('dashboard_himsi_login', JSON.stringify(auth_data))

            dispatch(RefreshTokenAction(response.data.access_token))
        } catch (err) {
            dispatch(LogoutAction())
            cookies.remove('access_token')
            sessionStorage.clear()

            // Set Route to default
            window.location.assign("/")
        }
    }
}

function asyncLogout() {
    return async dispatch => {
        dispatch(StartLoadingActions())
        try {
            cookies.remove('access_token')
            sessionStorage.clear()
            delete axios.defaults.headers.common['Authorization']
            dispatch(FetchLoadingActions())
            dispatch(LogoutAction())
            // Set Route to default
            window.location.assign("/")
        } catch (err) {
            // Do Nothing
        }
        dispatch(FinishLoadingActions())
    }
}

export { asyncLogin, asyncCheckLogin, asyncRefreshToken, asyncLogout }
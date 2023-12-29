import axios from 'axios'

export default (() => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT

    axios.defaults.withCredentials = true

    // Auth
    async function Login(username, password) {
        const url = baseUrl + '/auth/login'

        const data = {
            username, password
        }

        const response = await axios.post(url, data)
        return response
    }

    async function Refresh() {
        const url = baseUrl + '/auth/refresh'

        try {
            const response = await axios.get(url, {
                credentials: "include"
            })

            return response
        } catch (err) {
            console.log(err)
        }
    }

    async function Get_User_List() {
        const url = baseUrl + '/auth/users'
        const response = await axios.get(url)
        return response
    }

    async function Register_User(data) {
        const url = baseUrl + '/auth/register'

        const payload = {
            username: data.username,
            display_name: data.display_name,
            password: data.password,
            role: data.role
        }

        const response = await axios.post(url, payload)
        return response
    }

    async function Update_User(data) {
        const url = baseUrl + `/auth/update/${data._id}`

        const payload = {
            username: data.username,
            display_name: data.display_name,
            password: data.password,
            role: data.role
        }

        const response = await axios.patch(url, payload)
        return response
    }

    async function Delete_User(id) {
        const url = baseUrl + `/auth/delete/${id}`

        const response = await axios.delete(url)
        return response
    }

    return {
        Login,
        Refresh,
        Get_User_List,
        Register_User,
        Update_User,
        Delete_User
    }
})()
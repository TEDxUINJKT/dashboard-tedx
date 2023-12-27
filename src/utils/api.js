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

    return {
        Login,
        Refresh
    }
})()
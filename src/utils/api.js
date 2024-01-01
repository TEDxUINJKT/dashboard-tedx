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

    async function Get_Sponsor_List(version) {
        const url = baseUrl + `/partner/${version}/sponsor`
        const response = await axios.get(url)
        return response
    }

    async function Get_Medpart_List(version) {
        const url = baseUrl + `/partner/${version}/medpart`
        const response = await axios.get(url)
        return response
    }

    async function Add_Partner(data) {
        const url = baseUrl + '/partner'

        const form = new FormData()

        form.append('organization', data.organization)
        form.append('version', data.version)
        form.append('type', data.type)
        form.append('file', data.logo.file ?? null)

        const response = await axios.post(url, form)
        return response
    }

    async function Update_Partner(data) {
        const url = baseUrl + `/partner/${data._id}`

        const form = new FormData()

        form.append('organization', data.organization)
        form.append('version', data.version)
        form.append('type', data.type)
        form.append('file', data.logo.file ?? null)

        const response = await axios.patch(url, form)
        return response
    }

    async function Delete_Partner(id) {
        const url = baseUrl + `/partner/${id}`

        const response = await axios.delete(url)
        return response
    }

    async function Get_Main_Speaker_List(version) {
        const url = baseUrl + `/speaker/${version}/main`
        const response = await axios.get(url)
        return response
    }

    async function Get_Student_Speaker_List(version) {
        const url = baseUrl + `/speaker/${version}/student`
        const response = await axios.get(url)
        return response
    }

    async function Add_Speaker(data) {
        const url = baseUrl + '/speaker'

        const form = new FormData()

        form.append('full_name', data.full_name)
        form.append('organization', data.organization)
        form.append('version', data.version)
        form.append('type', data.type)
        form.append('file', data.picture.file ?? null)

        const response = await axios.post(url, form)
        return response
    }

    async function Update_Speaker(data) {
        const url = baseUrl + `/speaker/${data._id}`

        const form = new FormData()

        form.append('full_name', data.full_name)
        form.append('organization', data.organization)
        form.append('version', data.version)
        form.append('type', data.type)
        form.append('file', data.picture.file ?? null)

        const response = await axios.patch(url, form)
        return response
    }

    async function Delete_Speaker(id) {
        const url = baseUrl + `/speaker/${id}`

        const response = await axios.delete(url)
        return response
    }

    async function Get_Event_List(version) {
        const url = baseUrl + `/event/${version}`
        const response = await axios.get(url)
        return response
    }

    async function Get_Event_Detail(id) {
        const url = baseUrl + `/event/detail/${id}`
        const response = await axios.get(url)
        return response
    }

    async function Add_Event(data) {
        const url = baseUrl + '/event'

        const form = new FormData()

        form.append('event', data.event)
        form.append('description', data.description)
        form.append('date', data.date)
        form.append('time', data.time)
        form.append('version', data.version)
        form.append('place', data.place)
        form.append('type', data.type)
        form.append('file', data.thumbnail.file ?? null)

        const response = await axios.post(url, form)
        return response
    }

    async function Update_Event(data) {
        const url = baseUrl + `/event/${data._id}`

        const form = new FormData()

        form.append('event', data.event)
        form.append('description', data.description)
        form.append('date', data.date)
        form.append('time', data.time)
        form.append('version', data.version)
        form.append('place', data.place)
        form.append('type', data.type)
        form.append('file', data.thumbnail.file ?? null)

        const response = await axios.patch(url, form)
        return response
    }

    async function Delete_Event(id) {
        const url = baseUrl + `/event/${id}`

        const response = await axios.delete(url)
        return response
    }

    async function Get_Ticket_List(event_id) {
        const url = baseUrl + `/event/ticket/${event_id}`
        const response = await axios.get(url)
        return response
    }

    async function Add_Ticket(data, event_id) {
        const url = baseUrl + `/event/ticket/${event_id}`

        const payload = {
            type_ticket: data.type_ticket,
            description: data.description,
            price: data.price,
            order_link: data.order_link,
            status: data.status
        }

        const response = await axios.post(url, payload)
        return response
    }

    async function Update_Ticket(data) {
        const url = baseUrl + `/event/ticket/${data._id}`

        const payload = {
            type_ticket: data.type_ticket,
            description: data.description,
            price: data.price,
            order_link: data.order_link,
            status: data.status
        }

        const response = await axios.patch(url, payload)
        return response
    }

    async function Delete_Ticket(ticket_id) {
        const url = baseUrl + `/event/ticket/${ticket_id}`

        const response = await axios.delete(url)
        return response
    }

    async function Get_Content_Version(version) {
        const url = baseUrl + `/content/${version}`

        const response = await axios.get(url)
        return response
    }

    async function Add_Content(data) {
        const url = baseUrl + '/content'

        const form = new FormData()

        const parsed_data = {
            link: data.data?.link,
            title: data.data?.title,
            description: data.data?.description
        }

        form.append('type', data.type)
        form.append('version', data.version)
        form.append('data', JSON.stringify(parsed_data))
        form.append('file', data.data.image?.file ?? null)

        const response = await axios.post(url, form)
        return response
    }

    async function Update_Content(data) {
        const url = baseUrl + `/content/${data._id}`

        const form = new FormData()

        const parsed_data = {
            link: data.data?.link,
            title: data.data?.title,
            description: data.data?.description
        }


        form.append('data', JSON.stringify(parsed_data))
        form.append('file', data.data.image?.file ?? null)

        const response = await axios.patch(url, form)
        return response
    }

    async function Delete_Content(content_id) {
        const url = baseUrl + `/content/${content_id}`

        const response = await axios.delete(url)
        return response
    }

    return {
        Login,
        Refresh,
        Get_User_List,
        Register_User,
        Update_User,
        Delete_User,
        Get_Sponsor_List,
        Get_Medpart_List,
        Add_Partner,
        Update_Partner,
        Delete_Partner,
        Get_Main_Speaker_List,
        Get_Student_Speaker_List,
        Add_Speaker,
        Update_Speaker,
        Delete_Speaker,
        Get_Event_List,
        Get_Event_Detail,
        Add_Event,
        Update_Event,
        Delete_Event,
        Get_Ticket_List,
        Add_Ticket,
        Update_Ticket,
        Delete_Ticket,
        Get_Content_Version,
        Add_Content,
        Update_Content,
        Delete_Content
    }
})()
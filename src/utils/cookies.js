const cookies = (() => {

    function get(name) {
        const cname = name + "=";
        const cookies = document.cookie.split(';');
        for (let index = 0; index < cookies.length; index++) {
            let cookie = cookies[index];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(cname) === 0) {
                return cookie.substring(cname.length, cookie.length);
            }
        }
        return null;
    }

    function add(name, data, xday) {
        const d = new Date();
        d.setTime(d.getTime() + (xday * 24 * 60 * 60 * 1000));

        const expires = "expires=" + d.toUTCString();

        document.cookie = name + "=" + data + ";" + expires + ";path=/";
    }

    function remove(name) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    return {
        get,
        add,
        remove,
    }
})()

export default cookies
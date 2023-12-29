import { createContext } from "react";

// set the defaults
const SidebarContext = createContext({
    show: false,
    setShow: () => { }
});

export default SidebarContext;

import { IconContext } from "react-icons";
import { IoCloseSharp } from "react-icons/io5";

import style from '../styles/components/Modal.module.css'

export default function Modal({ children, isShow, setShow }) {

    function handleCloseOverlay(event) {
        // Deny Event from Child
        if (event.target.id === 'overlay') {
            setShow({ value: false, type: null })
        }
    }
    return (
        <div id="overlay" className={`${style.modal_overlay} ${!isShow.value ? style.hide : null}`} onClick={(e) => handleCloseOverlay(e)}>
            <div className={style.modal}>
                {isShow.value ? (
                    <div className={style.modal_header}>
                        <h1>{isShow.title}</h1>
                        <span className={style.close_button} onClick={() => setShow({ value: false, type: null })}>
                            <IconContext.Provider value={{ className: "icon", style: { fontSize: '1.6em' } }}>
                                <IoCloseSharp />
                            </IconContext.Provider>
                        </span>
                    </div>
                ) : null}
                {isShow.value ? (
                    <div className={style.modal_body}>
                        {children}
                    </div>
                ) : null}
            </div>
        </div>
    )
}
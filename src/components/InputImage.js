import { Form } from 'react-bootstrap'
import { useState, useRef, useEffect } from 'react'

import { IconContext } from "react-icons";
import { IoMdClose } from "react-icons/io";
import { FaRegFileImage } from "react-icons/fa";

import style from '../styles/components/InputImage.module.css'

export default function InputImage({ getData, currentData }) {
    const [showImage, setShowImage] = useState(currentData?.detail || currentData?.url || null)

    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const addImageButton = () => {
        fileInputRef.current.click();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file !== undefined) {
            handleFile(file)
        }
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file !== undefined) {
            handleFile(file)
        }
    };

    function handleFile(file) {
        const reader = new FileReader();
        reader.onload = function () {
            const { result } = reader;
            const detail = {
                src: result,
                name: file.name,
            };
            setShowImage(detail);
            getData({
                file,
                detail,
            })
        };
        reader.readAsDataURL(file);
    }

    function deleteImage() {
        setShowImage(null);
    }

    useEffect(() => {
        setShowImage(currentData?.detail || currentData || null)
    }, [currentData])

    return (
        <Form.Group>
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={style.form_image}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                />
                {showImage !== null ? (
                    <div className={style.image_display_card}>
                        <IconContext.Provider value={{ className: "icon", style: { fontSize: '1.5em', color: 'var(--red)' } }}>
                            <FaRegFileImage />
                        </IconContext.Provider>
                        <span>
                            {showImage?.name || showImage.url}
                        </span>
                        <button onClick={() => deleteImage()}>
                            <IconContext.Provider value={{ className: "icon" }}>
                                <IoMdClose />
                            </IconContext.Provider>
                        </button>
                    </div>
                ) : (
                    <div className={style.non_image_display_card} onClick={addImageButton}>
                        <span>Drag n Drop here</span>
                        <span>Or</span>
                        <span className={style.text_browse}>Browse</span>
                    </div>
                )}
                <button type="button" className={style.form_image_btn} onClick={addImageButton}>Select File</button>
            </div>
        </Form.Group >
    )
}
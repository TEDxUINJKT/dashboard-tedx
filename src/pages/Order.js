import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Form, Row, Col } from 'react-bootstrap'

import { GetEvents } from '../state/events/middleware'
import EventCard from "../components/EventCard";

import { IconContext } from "react-icons";
import { MdOutlineQrCodeScanner } from "react-icons/md";

import style from '../styles/pages/Event.module.css'

export default function Order() {
    const { events = [] } = useSelector(state => state)
    const [version, setVersion] = useState(2)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetEvents(version))
    }, [dispatch, version])
    return (
        <section >
            <div className={style.header_layout}>
                <div className="centered gap-3">
                    <h1>Order</h1>
                    <div style={{ minWidth: '60px' }}>
                        <Form.Select placeholder="Type" value={version} onChange={(e) => setVersion(e.target.value)} type="text" required>
                            <option value="1">1.0</option>
                            <option value="2">2.0</option>
                            <option value="3">3.0</option>
                            <option value="4">4.0</option>
                        </Form.Select>
                    </div>
                </div>
                <button >
                    <IconContext.Provider value={{ className: "icon" }}>
                        <MdOutlineQrCodeScanner />
                    </IconContext.Provider>
                </button>
            </div>
            {events.length > 0 ? (
                <section className={style.card_container}>
                    {events.map((event, index) => (
                        <EventCard data={event} key={`card ${index}`} type='order' />
                    ))}
                </section>
            ) : (
                <section className='centered'>
                    <h5>No Item Found</h5>
                </section>
            )}
        </section>
    );
}
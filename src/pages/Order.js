import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Form } from 'react-bootstrap'

import { GetEvents } from '../state/events/middleware'
import { CheckOrder } from "../state/orders/middleware";
import EventCard from "../components/EventCard";

import { IconContext } from "react-icons";
import { MdOutlineQrCodeScanner } from "react-icons/md";

import Modal from '../components/Modal'
import QrReader from 'react-qr-scanner';

import style from '../styles/pages/Event.module.css'

export default function Order() {
    const { events = [] } = useSelector(state => state)
    const [version, setVersion] = useState(2)
    const dispatch = useDispatch()

    const [isShow, setShow] = useState({ value: false, type: null, title: null })

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
                <button onClick={() => setShow({ value: true, type: 'qr', title: 'Check Your Ticket' })}>
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
            <Modal isShow={isShow} setShow={setShow}>
                {isShow.type === 'qr' && <TicketCheck />}
            </Modal>
        </section>
    );
}

function TicketCheck() {
    const [ticketData, setTicketData] = useState(null)
    const [scanningEnabled, setScanningEnabled] = useState(true);
    const dispatch = useDispatch()
    const handleScanQr = (data) => {
        if (data && scanningEnabled) {
            setTicketData({});
            setScanningEnabled(false);
            dispatch(CheckOrder(data.text))
                .then(() => {
                    setScanningEnabled(true);
                    /* setTicketData(data) Dummy */
                    setTicketData({
                        ticket_id: '123',
                        full_name: 'Wildan Nur Rahman',
                        type_ticket: 'Couple Sale',
                        event_name: 'Tedx Indonesia 2022',
                        attend_status: true,
                        quantity: 1
                    })
                })
                .catch(() => {
                    setScanningEnabled(true);
                });
        }
    };
    return(
    <div style={{ display: 'flex', gap: '7px', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <span>-Please Scan Your Ticket Using QR Code-</span>
        <QrReader
                className={style.qr}
                delay={2000}
                onScan={handleScanQr}
                onError={(error) => {
                    console.error(error);
                    setScanningEnabled(true);
                }}   
            />
        <div className="w-100">
            <table className="mt-5">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Full Name</th>
                        <th>Type Ticket</th>
                        <th>Event Name</th>
                        <th>Qty</th>
                        <th>Attend Status</th>
                    </tr>
                </thead>
                <tbody>
                    {ticketData?.ticket_id && (
                        <tr>
                            <td>{ticketData.ticket_id}</td>
                            <td>{ticketData.full_name}</td>
                            <td>{ticketData.type_ticket}</td>
                            <td>{ticketData.event_name}</td>
                            <td>{ticketData.quantity}</td>
                            <td>{ticketData.attend_status ? 'Attended' : 'Not Attended'}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        {!ticketData?.ticket_id && <span className="mt-5">No Data Shown. Kindly Scan Your Ticket.</span>}
    </div>
    )
}
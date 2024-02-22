import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Form } from 'react-bootstrap'

import { GetEvents } from '../state/events/middleware'
import { CheckOrder } from "../state/orders/middleware";
import EventCard from "../components/EventCard";

import { IconContext } from "react-icons";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { BsCamera } from "react-icons/bs";

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
    const [cameraView, setCameraView] = useState('front');
    const dispatch = useDispatch()
    const handleScanQr = (data) => {
        if (data && scanningEnabled) {
            setTicketData({});
            setScanningEnabled(false);
            const result = dispatch(CheckOrder(data.text))
                .then(() => {
                    const { ticket_id, full_name, type_ticket, event_name, attend_status, quantity } = result
                    setTicketData({
                        ticket_id: ticket_id,
                        full_name: full_name,
                        type_ticket: type_ticket,
                        event_name: event_name,
                        attend_status: attend_status,
                        quantity: quantity,
                    })
                    setScanningEnabled(true);
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
                constraints={{
                    video: { facingMode: cameraView }
                  }}
            />
            <button className={style.set_camera_button} onClick={() => setCameraView(cameraView === 'front' ? 'environment' : 'front')}>
                View {cameraView === 'front' ? 'Back' : 'Front'}
                <IconContext.Provider value={{ className: "icon" }}>
                    <BsCamera />
                </IconContext.Provider>
            </button>
        <div className="w-100">
            <table className="mt-3">
                <thead>
                    <tr>
                        <th className="hide_mobile">Order ID</th>
                        <th>Full Name</th>
                        <th className="hide_mobile">Type Ticket</th>
                        <th className="hide_mobile">Event Name</th>
                        <th className="hide_mobile">Qty</th>
                        <th>Attend Status</th>
                    </tr>
                </thead>
                <tbody>
                    {ticketData?.ticket_id && (
                        <tr>
                            <td className="hide_mobile">{ticketData.ticket_id}</td>
                            <td>{ticketData.full_name}</td>
                            <td className="hide_mobile">{ticketData.type_ticket}</td>
                            <td className="hide_mobile">{ticketData.event_name}</td>
                            <td className="hide_mobile">{ticketData.quantity}</td>
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
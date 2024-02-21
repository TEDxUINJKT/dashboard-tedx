import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col } from 'react-bootstrap'

import { GetOrders, AddOrder, EditOrder, DeleteOrder, FilterOrder } from '../state/orders/middleware'
import { GetTickets } from "../state/tickets/middleware";

import Modal from '../components/Modal'

import { isoConverter } from "../utils/dateConverter";


import { IconContext } from "react-icons";
import { MdAdd, MdSearch } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

import style from '../styles/pages/OrderList.module.css'

export default function OrderList() {
    const { orders = [], tickets = [], auth = {} } = useSelector(state => state)
    const dispatch = useDispatch()
    const { id } = useParams()

    const [isShow, setShow] = useState({ value: false, type: null, title: null })
    const [formData, setFormData] = useState({})
    const [detail, setDetail] = useState({})

    const [filterBy, setFilterBy] = useState('');
    const [filterValue, setFilterValue] = useState('');

    function handleAdd(event, data) {
        event.preventDefault()

        const order_data = {...data, event_id: id, event_name: orders[0].event_name, user_id: auth.id};
        dispatch(AddOrder(order_data));
        setShow({ value: false, type: null, title: null })
    }

    function handleEdit(event, data) {
        event.preventDefault()

        dispatch(EditOrder(data))
        setShow({ value: false, type: null, title: null })
    }

    function handleDelete(id = null) {
        if (id !== null) {
            dispatch(DeleteOrder(id))
        }

        setShow({ value: false, type: null, title: null })
    }

    useEffect(() => {
        dispatch(GetOrders(id))
        dispatch(GetTickets(id))
    }, [dispatch, id])

    return (
        <section>
            <div className={style.header_layout}>
                <h1>Order List</h1>
                <button onClick={() => { setShow({ value: true, type: 'add', title: 'Add Order' }); setFormData({}) }}>
                    <IconContext.Provider value={{ className: "icon" }}>
                        <MdAdd />
                    </IconContext.Provider>
                </button>
            </div>
            <Search id={id} orders={orders} filterBy={filterBy} setFilterBy={setFilterBy} value={filterValue} setValue={setFilterValue} />
            {orders.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th className="hide_mobile">Order ID</th>
                            <th>Guest Name</th>
                            <th>Refferal</th>
                            <th className="hide_mobile">Type</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order, index) => (
                            <tr key={`data ${index}`}>
                                <td>{order._id}</td>
                                <td>{order.full_name}</td>
                                <td>{order?.refferal || 'None'}</td>
                                <td className="hide_mobile">{order.ticket_type}</td>
                                <td>{order.status}</td>
                                <td className="action_table">
                                    <div className={style.details_button}  onClick={() => { setShow({ value: true, type: 'detail', title: 'Order Details' }); setDetail(order); }}>
                                        See Details
                                    </div>
                                    <div className={style.edit_button} onClick={() => { setShow({ value: true, type: 'edit', title: 'Edit Order' }); setFormData(order); }}>
                                        <IconContext.Provider value={{ className: "icon" }}>
                                            <FiEdit />
                                        </IconContext.Provider>
                                    </div>
                                    <div className={style.delete_button} onClick={() => { setShow({ value: true, type: 'remove', title: null }); setFormData(order); }}>
                                        <IconContext.Provider value={{ className: "icon" }}>
                                            <RiDeleteBin6Line />
                                        </IconContext.Provider>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <section className="centered">
                    <h5>No Item Found</h5>
                </section>
            )}
            <Modal setShow={setShow} isShow={isShow} >
                {isShow.type === 'add' && <FormCreate data={formData} setData={setFormData} handler={handleAdd} tickets={tickets}/>}
                {isShow.type === 'edit' && <FormEdit data={formData} setData={setFormData} handler={handleEdit} />}
                {isShow.type === 'remove' && <ConfirmationRemove data={formData} handler={handleDelete} />}
                {isShow.type === 'detail' && <OrderDetail data={detail} />}
            </Modal>
        </section>
    )
}

function Search({ filterBy, setFilterBy, value, setValue, orders, id }) {
    const dispatch = useDispatch();
    const generateFilterFunction = (property) => (item, filterValue) => {
        if (typeof item[property] === 'boolean') {
            return item[property] === (filterValue === 'attended' ? true : false);
        } else if (typeof item[property] === 'string') {
            return item[property].toLowerCase().includes(filterValue.toLowerCase());
        } else {
            return false;
        }
    };

    const filterFunctions = {
        'Guest Name': generateFilterFunction('full_name'),
        'Order ID': generateFilterFunction('_id'),
        'University': generateFilterFunction('university'),
        'Status': generateFilterFunction('status'),
        'Attended': generateFilterFunction('attend_status'),
    }

    useEffect(() => {
        dispatch(GetOrders(id))
    }, [dispatch, id, filterBy])

    return(
        <div className={style.filtering_layout}>
        <Form>
            <Row>
                <Col className="col-sm-2">
                <Form.Group>
                    <Form.Select placeholder="Filter By" value={filterBy} onChange={(e) => { setFilterBy(e.target.value); setValue('') }} type="text" required>
                        <option>Select Filter By</option>
                        <option value="Order ID">Order ID</option>
                        <option value="Guest Name">Guest Name</option>
                        <option value="University">University</option>
                        <option value="Status">Payment Status</option>
                        <option value="Attended">Attend Status</option>
                    </Form.Select>
                </Form.Group>
                </Col>
                {(filterBy === 'Status' || filterBy === 'Ticket Type' || filterBy === 'Attended') && (
                <Col className="col-12 col-sm-2 mt-3 mt-sm-0">
                   <Form.Group className="d-flex gap-3 align-items-center">
                        <Form.Select placeholder="Filter By" value={value} onChange={(e) => setValue(e.target.value)} type="text" required>
                            <option>Select Value</option>
                            {filterBy === 'Status' && (
                                <>
                                    <option value="Paid">Paid</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Unpaid">Unpaid</option>
                                    <option value="Failed">Failed</option>
                                </>
                            )}
                            {filterBy === 'Ticket Type' && (
                                <>
                                    <option value="Early Bird">Early Bird</option>
                                    <option value="Couple">Couple</option>
                                </>
                            )}
                            {filterBy === 'Attended' && (
                                <>
                                    <option value={'attended'}>Attended</option>
                                    <option value={'not attended'}>Not Attended</option>
                                </>
                            )}
                        </Form.Select>
                        <button onClick={(e) => { e.preventDefault(); dispatch(FilterOrder(orders, value, id, filterFunctions[filterBy])) }}>
                            <IconContext.Provider value={{ className: "icon" }}>
                                <MdSearch />
                            </IconContext.Provider>
                        </button>
                   </Form.Group>
                </Col>
                )}
                {(filterBy === 'Guest Name' || filterBy === 'University' || filterBy === 'Order ID') && (                
                    <Col className="col-12 col-sm-4 mt-3 mt-sm-0">
                    <Form.Group className="d-flex gap-3 align-items-center">
                        <Form.Control placeholder="Enter Search" value={value} onChange={(e) => setValue(e.target.value)} type="text" required />
                        <button onClick={(e) => { e.preventDefault(); dispatch(FilterOrder(orders, value, id, filterFunctions[filterBy])) }}>
                            <IconContext.Provider value={{ className: "icon" }}>
                                <MdSearch />
                            </IconContext.Provider>
                        </button>
                    </Form.Group>
                    </Col>
                )}
            </Row>
        </Form>
    </div>
    )
}

function OrderDetail({ data }) {
    return(
        <table>
        <thead>
            <tr>
                <th>Event Name</th>
                <th>Full Name</th>
                <th>University</th>
                <th>Phone Number</th>
                <th>Attend Status</th>
                <th>Qty</th>
                <th>Ordered At</th>
                <th>Status</th> 
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{data.event_name}</td>
                <td>{data.full_name}</td>
                <td>{data.university}</td>
                <td>{data.phone_number}</td>
                <td>{data.attend_status ? 'Attended' : 'Not Attended'}</td>
                <td>{data.quantity}</td>
                <td>{isoConverter(data.created_at)}</td>
                <td>{data.status}</td>
            </tr>
        </tbody>
    </table>
    )
}

function FormCreate({ data, setData, handler, tickets }) {
    return (
        <Form className={style.form_access} onSubmit={(event) => handler(event, data)}>
            <Row>
                <Col className="col-sm-6 col-12 my-3">
                    <Form.Group>
                        <Form.Control placeholder="First Name" value={data.first_name} onChange={(e) => setData({ ...data, first_name: e.target.value })} type="text" required />
                    </Form.Group>
                </Col>
                <Col className="col-sm-6 col-12 my-3">
                    <Form.Group>
                        <Form.Control placeholder="Last Name" value={data.last_name} onChange={(e) => setData({ ...data, last_name: e.target.value })} type="text" required />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col className="col-sm-6 col-12 my-3">
                    <Form.Group>
                        <Form.Control placeholder="Email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} type="email" required />
                    </Form.Group>
                </Col>
                <Col className="col-sm-6 col-12 my-3">
                    <Form.Group>
                        <Form.Control placeholder="Phone Number" value={data.phone_number} onChange={(e) => setData({ ...data, phone_number: e.target.value })} type="text" required />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col className="col-sm-6 col-12 my-3">
                        <Form.Group>
                            <Form.Control placeholder="University" value={data.university} onChange={(e) => setData({ ...data, university: e.target.value })} type="text" required />
                        </Form.Group>
                </Col>
                <Col className="col-sm-6 col-12 my-3">
                <Form.Group>
                    <Form.Select 
                        placeholder="Type Ticket" 
                        value={data.ticket_id} 
                        onChange={(e) => {
                            const selectedTicket = tickets.find(ticket => ticket._id === e.target.value);
                            setData({ ...data, ticket_id: selectedTicket ? selectedTicket._id : '', ticket_type: selectedTicket ? selectedTicket.type_ticket : '' });
                        }} 
                        type="text" 
                        required
                    >
                        <option value="">Select Ticket</option>
                        {tickets.map((ticket, index) => (
                            <option key={index} value={ticket._id}>{ticket.type_ticket}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col className="righted mt-4">
                    <button type="submit">Add</button>
                </Col>
            </Row>
        </Form>
    )
}

function FormEdit({ data, setData, handler }) {
    return (
        <Form className={style.form_access} onSubmit={(event) => handler(event, data)}>
            <Row>
                <Col className="col-sm-6 col-12 my-3">
                    <Form.Group>
                        <Form.Control placeholder="First Name" value={data.full_name} onChange={(e) => setData({ ...data, full_name: e.target.value })} type="text" required />
                    </Form.Group>
                </Col>
                <Col className="col-sm-6 col-12 my-3">
                    <Form.Group>
                        <Form.Control placeholder="Email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} type="email" required />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col className="col-sm-6 col-12 my-3">
                    <Form.Group>
                        <Form.Control placeholder="University" value={data.university} onChange={(e) => setData({ ...data, university: e.target.value })} type="text" required />
                    </Form.Group>
                </Col>
                <Col className="col-sm-6 col-12 my-3">
                    <Form.Group>
                        <Form.Control placeholder="Phone Number" value={data.phone_number} onChange={(e) => setData({ ...data, phone_number: e.target.value })} type="text"  required />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col className="col-sm-6 col-12 my-3">
                    <Form.Group>
                        <Form.Select placeholder="Status" value={data.status} onChange={(e) => setData({ ...data, status: e.target.value })} type="text" required>
                            <option value="Paid">Paid</option>
                            <option value="Pending">Pending</option>
                            <option value="Unpaid">Unpaid</option>
                            <option value="Failed">Failed</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row >
                <Col className="righted mt-4">
                    <button type="submit">Edit</button>
                </Col>
            </Row>
        </Form>
    )
}

function ConfirmationRemove({ data, handler }) {
    return (
        <div className="centered flex-horizontal" style={{ flexDirection: 'colomn' }}>
            <span style={{ fontWeight: '600', fontSize: '1.3em', textAlign: 'center' }}>Are you sure want to delete "{data.full_name}" ticket?</span>
            <div className="mt-4">
                <button className="button_secondary mx-3" onClick={() => handler(data._id)}>Yes</button>
                <button className="mx-3" onClick={() => handler(null)}>No</button>
            </div>
        </div>
    )
}
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col } from 'react-bootstrap'

import { GetOrders, AddOrder, EditOrder, DeleteOrder } from '../state/orders/middleware'
import Modal from '../components/Modal'


import { IconContext } from "react-icons";
import { MdAdd } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

import style from '../styles/pages/OrderList.module.css'

export default function OrderList() {
    const { orders = [] } = useSelector(state => state)
    const dispatch = useDispatch()
    const { id } = useParams()

    const plain = { ticket_id: id, user_id: '', event_name: '', email: '', first_name: '', last_name: '', university: '', phone_number: '' }
    const [isShow, setShow] = useState({ value: false, type: null, title: null })
    const [formData, setFormData] = useState({})

    function handleAdd(event, data) {
        event.preventDefault()
        dispatch(AddOrder(data))
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
    }, [dispatch, id])

    return (
        <section>
            <div className={style.header_layout}>
                <h1>Order List</h1>
                <button onClick={() => { setShow({ value: true, type: 'add', title: 'Add Access' }); setFormData({}) }}>
                    <IconContext.Provider value={{ className: "icon" }}>
                        <MdAdd />
                    </IconContext.Provider>
                </button>
            </div>
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
                                <td>{order?.refferal}</td>
                                <td className="hide_mobile">{order.type}</td>
                                <td>{order.status}</td>
                                <td className="action_table">
                                    <div className={style.edit_button} onClick={() => { setShow({ value: true, type: 'edit', title: 'Edit Access' }); setFormData(order); }}>
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
                {isShow.type === 'add' && <FormCreate data={formData} setData={setFormData} handler={handleAdd} />}
                {isShow.type === 'edit' && <FormEdit data={formData} setData={setFormData} handler={handleEdit} />}
                {isShow.type === 'remove' && <ConfirmationRemove data={formData} handler={handleDelete} />}
            </Modal>
        </section>
    )
}

function FormCreate({ data, setData, handler }) {
    return (
        <Form className={style.form_access} onSubmit={(event) => handler(event, data)}>
            <Row>
                <Col className="col-sm-6 col-12 my-3">
                    <Form.Group>
                        <Form.Control placeholder="Username" value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} type="text" required />
                    </Form.Group>
                </Col>
                <Col className="col-sm-6 col-12 my-3">
                    <Form.Group>
                        <Form.Control placeholder="Display Name" value={data.display_name} onChange={(e) => setData({ ...data, display_name: e.target.value })} type="text" required />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col className="col-sm-6 col-12 my-3">
                    <Form.Group>
                        <Form.Control placeholder="Password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} type="text" required />
                    </Form.Group>
                </Col>
                <Col className="col-sm-6 col-12 my-3">
                    <Form.Group>
                        <Form.Select selected="Guest" placeholder="Role" value={data.role} onChange={(e) => setData({ ...data, role: e.target.value })} type="text" required>
                            <option value="Guest">Guest</option>
                            <option value="Sysadmin">Sysadmin</option>
                            <option value="Event">Event</option>
                            <option value="Communication">Communication</option>
                            <option value="Partnership">Partnership</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row >
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
                        <Form.Control placeholder="Username" value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} type="text" required />
                    </Form.Group>
                </Col>
                <Col className="col-sm-6 col-12 my-3">
                    <Form.Group>
                        <Form.Control placeholder="Display Name" value={data.display_name} onChange={(e) => setData({ ...data, display_name: e.target.value })} type="text" required />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col className="col-sm-6 col-12 my-3">
                    <Form.Group>
                        <Form.Control placeholder="Password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} type="text" />
                    </Form.Group>
                </Col>
                <Col className="col-sm-6 col-12 my-3">
                    <Form.Group>
                        <Form.Select placeholder="Role" value={data.role} onChange={(e) => setData({ ...data, role: e.target.value })} type="text" required>
                            <option value="Guest">Guest</option>
                            <option value="Sysadmin">Sysadmin</option>
                            <option value="Event">Event</option>
                            <option value="Communication">Communication</option>
                            <option value="Partnership">Partnership</option>
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
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Form, Row, Col } from 'react-bootstrap'

import { GetSpeakers, AddSpeaker, EditSpeaker, DeleteSpeaker } from '../state/speakers/middleware'
import InputImage from "../components/InputImage";
import Modal from '../components/Modal'

import { IconContext } from "react-icons";
import { MdAdd } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

import style from '../styles/pages/Partner.module.css'

export default function Speaker() {
    const plain = { full_name: null, organization: null, version: null, type: null, picture: null }
    const { speakers = { main: [], student: [] } } = useSelector(state => state)
    const [isShow, setShow] = useState({ value: false, type: null, group: null, title: null })
    const [formData, setFormData] = useState(plain)
    const [version, setVersion] = useState(2)
    const dispatch = useDispatch()

    function handleAdd(event, data) {
        event.preventDefault()
        dispatch(AddSpeaker(data))
        setShow({ value: false, type: null, group: null, title: null })
    }

    function handleEdit(event, data) {
        event.preventDefault()
        dispatch(EditSpeaker(data))
        setShow({ value: false, type: null, group: null, title: null })
    }

    function handleDelete(id = null, version) {
        if (id !== null) {
            dispatch(DeleteSpeaker(id, version))
        }

        setShow({ value: false, type: null, group: null, title: null })
    }

    useEffect(() => {
        dispatch(GetSpeakers(version))
    }, [dispatch, version])

    return (
        <section>
            <div className={style.header_layout}>
                <h1>Speaker</h1>
                <div style={{ minWidth: '60px' }}>
                    <Form.Select placeholder="Type" value={version} onChange={(e) => setVersion(e.target.value)} type="text" required>
                        <option value="1">1.0</option>
                        <option value="2">2.0</option>
                        <option value="3">3.0</option>
                        <option value="4">4.0</option>
                    </Form.Select>
                </div>
            </div>

            <section className="mb-5">
                <div className={style.subheader_layout}>
                    <h3>Main Speaker</h3>
                    <button onClick={() => { setShow({ value: true, type: 'add', group: 'main', title: 'Add Main Speaker' }); setFormData(plain) }}>
                        <IconContext.Provider value={{ className: "icon" }}>
                            <MdAdd />
                        </IconContext.Provider>
                    </button>
                </div>
                {speakers.main.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Full Name</th>
                                <th>Organization</th>
                                <th className="hide_mobile">Version</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {speakers.main?.map((main, index) => (
                                <tr key={`data ${index}`}>
                                    <td>{index + 1}.</td>
                                    <td>{main.full_name}</td>
                                    <td>{main.organization}</td>
                                    <td className="hide_mobile">{main.version}</td>
                                    <td className="action_table">
                                        <div className={style.edit_button} onClick={() => { setShow({ value: true, type: 'edit', group: 'main', title: 'Edit Access' }); setFormData(main); }}>
                                            <IconContext.Provider value={{ className: "icon" }}>
                                                <FiEdit />
                                            </IconContext.Provider>
                                        </div>
                                        <div className={style.delete_button} onClick={() => { setShow({ value: true, type: 'remove', group: 'main', title: null }); setFormData(main); }}>
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
            </section>

            <section>
                <div className={style.subheader_layout}>
                    <h3>Student Speaker</h3>
                    <button onClick={() => { setShow({ value: true, type: 'add', group: 'student', title: 'Add Student Speaker' }); setFormData(plain) }}>
                        <IconContext.Provider value={{ className: "icon" }}>
                            <MdAdd />
                        </IconContext.Provider>
                    </button>
                </div>
                {speakers.student.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Full Name</th>
                                <th>Organization</th>
                                <th className="hide_mobile">Version</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {speakers.student?.map((student, index) => (
                                <tr key={`data ${index}`}>
                                    <td>{index + 1}.</td>
                                    <td>{student.full_name}</td>
                                    <td>{student.organization}</td>
                                    <td className="hide_mobile">{student.version}</td>
                                    <td className="action_table">
                                        <div className={style.edit_button} onClick={() => { setShow({ value: true, type: 'edit', group: 'student', title: 'Edit Access' }); setFormData(student); }}>
                                            <IconContext.Provider value={{ className: "icon" }}>
                                                <FiEdit />
                                            </IconContext.Provider>
                                        </div>
                                        <div className={style.delete_button} onClick={() => { setShow({ value: true, type: 'remove', group: 'student', title: null }); setFormData(student); }}>
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
            </section>
            <Modal setShow={setShow} isShow={isShow} >
                {isShow.type === 'add' && <FormCreate data={formData} setData={setFormData} handler={handleAdd} group={isShow.group} version={version} />}
                {isShow.type === 'edit' && <FormEdit data={formData} setData={setFormData} handler={handleEdit} group={isShow.group} version={version} />}
                {isShow.type === 'remove' && <ConfirmationRemove data={formData} handler={handleDelete} version={version} />}
            </Modal>
        </section>
    );
}

function FormCreate({ data, setData, handler, group, version }) {
    function getImage(image) {
        setData({ ...data, picture: image, version, type: group })
    }

    return (
        <Form className={style.form_access} onSubmit={(event) => handler(event, data)}>
            <Row>
                <Col className="col-sm-6 col-12 my-3">
                    <Form.Group>
                        <Form.Control placeholder="Full Name" value={data.full_name} onChange={(e) => setData({ ...data, full_name: e.target.value })} type="text" required />
                    </Form.Group>
                </Col>
                <Col className="col-sm-6 col-12 my-3">
                    <Form.Group>
                        <Form.Control placeholder="Organization Name" value={data.organization} onChange={(e) => setData({ ...data, organization: e.target.value })} type="text" required />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col className="col-sm-6 col-12 my-3">
                    <Form.Group>
                        <Form.Select placeholder="Version" value={version} onChange={(e) => setData({ ...data, version: e.target.value })} type="text" disabled>
                            <option value="1">1.0</option>
                            <option value="2">2.0</option>
                            <option value="3">3.0</option>
                            <option value="4">4.0</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col className="col-sm-6 col-12 my-3">
                    <Form.Group>
                        <Form.Select placeholder="Type" value={group} onChange={(e) => setData({ ...data, type: e.target.value })} type="text" disabled>
                            <option value="main">Main Speaker</option>
                            <option value="student">Student Speaker</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col className="mt-4">
                    <InputImage getData={getImage} currentData={data.picture} />
                </Col>
            </Row>
            <Row >
                <Col className="righted mt-2">
                    <button type="submit">Add</button>
                </Col>
            </Row>
        </Form>
    )
}

function FormEdit({ data, setData, handler, group, version }) {
    function getImage(image) {
        setData({ ...data, picture: image, version, type: group })
    }

    return (
        <Form className={style.form_access} onSubmit={(event) => handler(event, data)}>
            <Row>
                <Col className="col-sm-6 col-12 my-3">
                    <Form.Group>
                        <Form.Control placeholder="Full Name" value={data.full_name} onChange={(e) => setData({ ...data, full_name: e.target.value })} type="text" required />
                    </Form.Group>
                </Col>
                <Col className="col-sm-6 col-12 my-3">
                    <Form.Group>
                        <Form.Control placeholder="Organization Name" value={data.organization} onChange={(e) => setData({ ...data, organization: e.target.value })} type="text" required />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col className="col-sm-6 col-12 my-3">
                    <Form.Group>
                        <Form.Select placeholder="Version" value={version} onChange={(e) => setData({ ...data, version: e.target.value })} type="text" disabled>
                            <option value="1">1.0</option>
                            <option value="2">2.0</option>
                            <option value="3">3.0</option>
                            <option value="4">4.0</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col className="col-sm-6 col-12 my-3">
                    <Form.Group>
                        <Form.Select placeholder="Type" value={group} onChange={(e) => setData({ ...data, type: e.target.value })} type="text" disabled>
                            <option value="main">Main Speaker</option>
                            <option value="student">Student Speaker</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col className="mt-4">
                    <InputImage getData={getImage} currentData={data.picture} />
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

function ConfirmationRemove({ data, handler, version }) {
    return (
        <div className="centered flex-horizontal" style={{ flexDirection: 'colomn' }}>
            <span style={{ fontWeight: '600', fontSize: '1.3em', textAlign: 'center' }}>Are you sure want to delete "{data.organization}" from {data.type}?</span>
            <div className="mt-4">
                <button className="button_secondary mx-3" onClick={() => handler(data._id, version)}>Yes</button>
                <button className="mx-3" onClick={() => handler(null)}>No</button>
            </div>
        </div>
    )
}
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom';

import { GetEvents, EditEvent, DeleteEvent } from '../state/events/middleware'
import { GetTickets, AddTicket, EditTicket, DeleteTicket } from '../state/tickets/middleware'

import Modal from '../components/Modal'
import InputImage from "../components/InputImage";

import { IconContext } from 'react-icons';
import { MdAdd, MdLocationOn, MdAccessTimeFilled } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsCalendarDateFill } from "react-icons/bs";

import { datePrettier } from '../utils/dateConverter'
import api from '../utils/api';

import dummy from '../assets/bg.jpg'
import style from '../styles/pages/EventDetail.module.css'

export default function EventDetail() {
  const plain = { event: 'No Title', description: 'Bunga Kosmos yang indah pun Pastinya sudah tahu aku Selalu melihat dari jauh Aku bagaikan sinar mentari Kenangan cinta pertamaku Yang sedih karena tak kau sadari Tapi keberadaanmu tak akan terlupa Lampu jalan pun menjadi merah Dan ku berhasil mengejar truknya Kau yang duduk di kursi penumpang Lambaikan tangan sambil menangis Bunga Kosmos yang indah pun Terlihat begitu kesepian Bergoyang-goyang di dalam hening Hanya menghantar musim berganti Kenangan warna merah muda Di pojokan hatiku ini Adalah senyum di wajahmu yang telah pergi Tapi keberadaanmu tak akan terlupa.', date: '1-1-1', time: '00:00', place: 'Surga', version: null, type: null, thumbnail: { url: dummy } }
  const plainTicket = { type_ticket: null, description: null, price: null, order_link: null, status: 'Available' }

  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { tickets = [] } = useSelector(state => state)
  const [selected, setSelected] = useState(plain)
  const [isShow, setShow] = useState({ value: false, type: null, title: null })
  const [formData, setFormData] = useState(plain)

  async function getData(params) {
    const response = await api.Get_Event_Detail(params)
    setSelected(response.data.detail)
  }

  async function handleEdit(event, data) {
    event.preventDefault()
    try {
      dispatch(GetEvents(data.version))
      dispatch(EditEvent(data))
      getData(id)
    } catch (err) {
      console.log(err)
    }
    setShow({ value: false, type: null, group: null, title: null })
  }

  async function handleDelete(id = null, version) {
    if (id !== null) {
      try {
        dispatch(GetEvents(version))
        dispatch(DeleteEvent(id))
        navigate("/event");
      } catch (err) {
        console.log(err)
      }
    }

    setShow({ value: false, type: null, group: null, title: null })
  }

  function handleAddTicket(event, data) {
    event.preventDefault()
    dispatch(AddTicket(data, id))
    setShow({ value: false, type: null, title: null })
  }

  function handleEditTicket(event, data) {
    event.preventDefault()
    dispatch(EditTicket(data, id))
    setShow({ value: false, type: null, title: null })
  }

  function handleDeleteTicket(id_ticket = null) {
    if (id_ticket !== null) {
      dispatch(DeleteTicket(id_ticket, id))
    }

    setShow({ value: false, type: null, title: null })
  }

  useEffect(() => {
    getData(id)
    dispatch(GetTickets(id))
  }, [dispatch, id])

  return (
    <section>
      <div className={style.header_layout}>
        <div className="centered gap-3">
          <h1>Manage Event</h1>
        </div>
      </div>
      <section className={style.detail_layout}>
        <Row>
          <Col className="col-12 col-sm-4">
            <img src={selected?.thumbnail?.url} alt="event thumbnail" width="100%" />
          </Col>
          <Col className={`col-12 col-sm-8 ${style.detail_content} my-4`}>
            <div>
              <h3>{selected?.event}</h3>
              <span className={style.tag_type}>{selected.type}</span>
              <div className={style.detail_info}>
                <span>
                  <IconContext.Provider value={{ className: "icon", style: { color: 'var(--red)' } }}>
                    <BsCalendarDateFill />
                  </IconContext.Provider>
                  {datePrettier(selected?.date)}
                </span>
                <span>
                  <IconContext.Provider value={{ className: "icon", style: { color: 'var(--red)' } }}>
                    <MdAccessTimeFilled />
                  </IconContext.Provider>
                  {selected.time}
                </span>
                <span>
                  <IconContext.Provider value={{ className: "icon", style: { color: 'var(--red)' } }}>
                    <MdLocationOn />
                  </IconContext.Provider>
                  {selected.place}
                </span>
              </div>
              <p>{selected.description}</p>
            </div>
            <div className={style.detail_cta}>
              <button onClick={() => { setShow({ value: true, type: 'edit', title: 'Edit Event' }); setFormData(selected) }}>Edit</button>
              <button className='button_secondary' onClick={() => { setShow({ value: true, type: 'remove', title: null }); setFormData(selected) }}>Remove</button>
            </div>
          </Col>
        </Row>
      </section>
      <section className="mb-5">
        <div className={style.subheader_layout}>
          <h3>Tickets</h3>
          <button onClick={() => { setShow({ value: true, type: 'add ticket', title: 'Add Ticket' }); setFormData(plainTicket) }}>
            <IconContext.Provider value={{ className: "icon" }}>
              <MdAdd />
            </IconContext.Provider>
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Type</th>
              <th>Price</th>
              <th className="hide_mobile">Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets?.map((ticket, index) => (
              <tr key={`data ${index}`}>
                <td>{index + 1}.</td>
                <td>{ticket.type_ticket}</td>
                <td>{ticket.price}</td>
                <td className="hide_mobile">{ticket.status}</td>
                <td className="action_table">
                  <div className={style.edit_button} onClick={() => { setShow({ value: true, type: 'edit ticket', title: 'Edit Ticket' }); setFormData(ticket); }}>
                    <IconContext.Provider value={{ className: "icon" }}>
                      <FiEdit />
                    </IconContext.Provider>
                  </div>
                  <div className={style.delete_button} onClick={() => { setShow({ value: true, type: 'remove ticket', title: null }); setFormData(ticket); }}>
                    <IconContext.Provider value={{ className: "icon" }}>
                      <RiDeleteBin6Line />
                    </IconContext.Provider>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <Modal setShow={setShow} isShow={isShow} >
        {isShow.type === 'edit' && <FormEdit data={formData} setData={setFormData} handler={handleEdit} version={selected.version} />}
        {isShow.type === 'remove' && <ConfirmationRemove data={formData} handler={handleDelete} version={selected.version} />}
        {isShow.type === 'add ticket' && <FormAddTicket data={formData} setData={setFormData} handler={handleAddTicket} />}
        {isShow.type === 'edit ticket' && <FormEditTicket data={formData} setData={setFormData} handler={handleEditTicket} />}
        {isShow.type === 'remove ticket' && <ConfirmationRemoveTicket data={formData} setData={setFormData} handler={handleDeleteTicket} />}
      </Modal>
    </section>
  );
}

function FormEdit({ data, setData, handler, version }) {
  function getImage(image) {
    setData({ ...data, thumbnail: image, version })
  }

  return (
    <Form className={style.form_access} onSubmit={(event) => handler(event, data)}>
      <Row>
        <Col className="col-sm-6 col-12 my-2">
          <Form.Group>
            <Form.Control placeholder="Event Name" value={data.event} onChange={(e) => setData({ ...data, event: e.target.value })} type="text" required />
          </Form.Group>
        </Col>
        <Col className="col-sm-6 col-12 my-2">
          <Form.Group>
            <Form.Control placeholder="Location" value={data.place} onChange={(e) => setData({ ...data, place: e.target.value })} type="text" required />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col className="col-sm-4 col-12 my-2">
          <Form.Group>
            <Form.Control placeholder="Date" value={data.date} onChange={(e) => setData({ ...data, date: e.target.value })} type="date" required />
          </Form.Group>
        </Col>
        <Col className="col-sm-4 col-12 my-2">
          <Form.Group>
            <Form.Group>
              <Form.Control placeholder="Time" value={data.time} onChange={(e) => setData({ ...data, time: e.target.value })} type="time" required />
            </Form.Group>
          </Form.Group>
        </Col>
        <Col className="col-sm-4 col-12 my-2">
          <Form.Group>
            <Form.Select defaultValue={data.type} placeholder="Type" value={data.type} onChange={(e) => setData({ ...data, type: e.target.value })} type="text" required>
              <option value="Main Event">Main Event</option>
              <option value="Pre Event">Pre Event</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col className="col-12 my-2">
          <Form.Group>
            <Form.Control placeholder="Description" value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} type="text" required />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col className="mt-3">
          <InputImage getData={getImage} currentData={data.thumbnail} />
        </Col>
      </Row>
      <Row >
        <Col className="righted">
          <button type="submit">Edit</button>
        </Col>
      </Row>
    </Form>
  )
}

function ConfirmationRemove({ data, handler, version }) {
  return (
    <div className="centered flex-horizontal" style={{ flexDirection: 'colomn' }}>
      <span style={{ fontWeight: '600', fontSize: '1.3em', textAlign: 'center' }}>Are you sure want to delete "{data.event}" from event list?</span>
      <div className="mt-4">
        <button className="button_secondary mx-3" onClick={() => handler(data._id, version)}>Yes</button>
        <button className="mx-3" onClick={() => handler(null)}>No</button>
      </div>
    </div>
  )
}

function FormAddTicket({ data, setData, handler }) {
  return (
    <Form className={style.form_access} onSubmit={(event) => handler(event, data)}>
      <Row>
        <Col className="col-sm-6 col-12 my-2">
          <Form.Group>
            <Form.Control placeholder="Type Ticket" value={data.type_ticket} onChange={(e) => setData({ ...data, type_ticket: e.target.value })} type="text" required />
          </Form.Group>
        </Col>
        <Col className="col-sm-6 col-12 my-2">
          <Form.Group>
            <Form.Select defaultValue="Available" placeholder="Type" value={data.status} onChange={(e) => setData({ ...data, status: e.target.value })} type="text" required>
              <option value="Available">Available</option>
              <option value="Sold Out">Sold Out</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col className="col-sm-6 col-12 my-2">
          <Form.Group>
            <Form.Control placeholder="Ticket Price" value={data.price} onChange={(e) => setData({ ...data, price: e.target.value })} type="number" required />
          </Form.Group>
        </Col>
        <Col className="col-sm-6 col-12 my-2">
          <Form.Group>
            <Form.Control placeholder="Ticket Order Link" value={data.order_link} onChange={(e) => setData({ ...data, order_link: e.target.value })} type="text" required />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col className="col-12 my-2">
          <Form.Group>
            <Form.Control placeholder="Description" value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} type="text" required />
          </Form.Group>
        </Col>
      </Row>
      <Row >
        <Col className="righted mt-3">
          <button type="submit">Add</button>
        </Col>
      </Row>
    </Form>
  )
}

function FormEditTicket({ data, setData, handler }) {
  return (
    <Form className={style.form_access} onSubmit={(event) => handler(event, data)}>
      <Row>
        <Col className="col-sm-6 col-12 my-2">
          <Form.Group>
            <Form.Control placeholder="Type Ticket" value={data.type_ticket} onChange={(e) => setData({ ...data, type_ticket: e.target.value })} type="text" required />
          </Form.Group>
        </Col>
        <Col className="col-sm-6 col-12 my-2">
          <Form.Group>
            <Form.Select defaultValue="Available" placeholder="Type" value={data.status} onChange={(e) => setData({ ...data, status: e.target.value })} type="text" required>
              <option value="Available">Available</option>
              <option value="Sold Out">Sold Out</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col className="col-sm-6 col-12 my-2">
          <Form.Group>
            <Form.Control placeholder="Ticket Price" value={data.price} onChange={(e) => setData({ ...data, price: e.target.value })} type="number" required />
          </Form.Group>
        </Col>
        <Col className="col-sm-6 col-12 my-2">
          <Form.Group>
            <Form.Control placeholder="Ticket Order Link" value={data.order_link} onChange={(e) => setData({ ...data, order_link: e.target.value })} type="text" required />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col className="col-12 my-2">
          <Form.Group>
            <Form.Control placeholder="Description" value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} type="text" required />
          </Form.Group>
        </Col>
      </Row>
      <Row >
        <Col className="righted mt-3">
          <button type="submit">Edit</button>
        </Col>
      </Row>
    </Form>
  )
}

function ConfirmationRemoveTicket({ data, handler }) {
  return (
    <div className="centered flex-horizontal" style={{ flexDirection: 'colomn' }}>
      <span style={{ fontWeight: '600', fontSize: '1.3em', textAlign: 'center' }}>Are you sure want to delete "{data.type_ticket}" from ticket list?</span>
      <div className="mt-4">
        <button className="button_secondary mx-3" onClick={() => handler(data._id)}>Yes</button>
        <button className="mx-3" onClick={() => handler(null)}>No</button>
      </div>
    </div>
  )
}
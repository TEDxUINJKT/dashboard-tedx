import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Form, Row, Col } from 'react-bootstrap'

import { GetEvents, AddEvent } from '../state/events/middleware'
import InputImage from "../components/InputImage";
import Modal from '../components/Modal'
import EventCard from "../components/EventCard";
import { isoConverter } from "../utils/dateConverter";

import { IconContext } from "react-icons";
import { MdAdd } from "react-icons/md";

import style from '../styles/pages/Event.module.css'

export default function Event() {
  const plain = { event: null, description: null, date: null, time: null, place: null, version: null, type: 'Main Event', thumbnail: null }
  const { events = [] } = useSelector(state => state)
  const [isShow, setShow] = useState({ value: false, type: null, title: null })
  const [formData, setFormData] = useState(plain)
  const [version, setVersion] = useState(2)
  const dispatch = useDispatch()

  function handleAdd(event, data) {
    event.preventDefault()
    dispatch(AddEvent(data))
    setShow({ value: false, type: null, title: null })
  }

  useEffect(() => {
    dispatch(GetEvents(version))
  }, [dispatch, version])

  return (
    <section>
      <div className={style.header_layout}>
        <div className="centered gap-3">
          <h1>Event</h1>
          <div style={{ minWidth: '60px' }}>
            <Form.Select placeholder="Type" value={version} onChange={(e) => setVersion(e.target.value)} type="text" required>
              <option value="1">1.0</option>
              <option value="2">2.0</option>
              <option value="3">3.0</option>
              <option value="4">4.0</option>
            </Form.Select>
          </div>
        </div>
        <button onClick={() => { setShow({ value: true, type: 'add', title: 'Add New Event' }); setFormData(plain) }}>
          <IconContext.Provider value={{ className: "icon" }}>
            <MdAdd />
          </IconContext.Provider>
        </button>
      </div>
      {events.length > 0 ? (
        <section className={style.card_container}>
          {events.map((event, index) => (
            <EventCard data={event} key={`card ${index}`} />
          ))}
        </section>
      ) : (
        <section className='centered'>
          <h5>No Item Found</h5>
        </section>
      )}
      <Modal setShow={setShow} isShow={isShow} >
        {isShow.type === 'add' && <FormCreate data={formData} setData={setFormData} handler={handleAdd} version={version} />}
      </Modal>
    </section>
  );
}

function FormCreate({ data, setData, handler, version }) {
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
            <Form.Control placeholder="Date" value={data.date} onChange={(e) => setData({ ...data, date: isoConverter(e.target.value) })} type="date" required />
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
            <Form.Select placeholder="Type" value={data.type} onChange={(e) => setData({ ...data, type: e.target.value })} type="text" required>
              <option selected value="Main Event">Main Event</option>
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
          <button type="submit">Add</button>
        </Col>
      </Row>
    </Form>
  )
}
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Form, Row, Col } from 'react-bootstrap'

import { GetPartners, AddPartner, EditPartner, DeletePartner } from '../state/partners/middleware'
import InputImage from "../components/InputImage";
import Modal from '../components/Modal'

import { IconContext } from "react-icons";
import { MdAdd } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

import style from '../styles/pages/Partner.module.css'

export default function Partner() {
  const plain = { organization: null, version: null, type: null, logo: null }
  const { partners = { medpart: [], sponsor: [] } } = useSelector(state => state)
  const [isShow, setShow] = useState({ value: false, type: null, group: null, title: null })
  const [formData, setFormData] = useState(plain)
  const [version, setVersion] = useState(2)
  const dispatch = useDispatch()

  function handleAdd(event, data) {
    event.preventDefault()
    dispatch(AddPartner(data))
    setShow({ value: false, type: null, group: null, title: null })
  }

  function handleEdit(event, data) {
    event.preventDefault()
    dispatch(EditPartner(data))
    setShow({ value: false, type: null, group: null, title: null })
  }

  function handleDelete(id = null, version) {
    if (id !== null) {
      dispatch(DeletePartner(id, version))
    }

    setShow({ value: false, type: null, group: null, title: null })
  }

  useEffect(() => {
    dispatch(GetPartners(version))
  }, [dispatch, version])

  return (
    <section>
      <div className={style.header_layout}>
        <h1>Partners</h1>
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
          <h3>Sponsors</h3>
          <button onClick={() => { setShow({ value: true, type: 'add', group: 'sponsor', title: 'Add Sponsor' }); setFormData(plain) }}>
            <IconContext.Provider value={{ className: "icon" }}>
              <MdAdd />
            </IconContext.Provider>
          </button>
        </div>
        {partners.sponsor.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Organization</th>
                <th>Version</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {partners.sponsor?.map((sponsor, index) => (
                <tr key={`data ${index}`}>
                  <td>{index + 1}.</td>
                  <td>{sponsor.organization}</td>
                  <td>{sponsor.version}</td>
                  <td className="action_table">
                    <div className={style.edit_button} onClick={() => { setShow({ value: true, type: 'edit', group: 'sponsor', title: 'Edit Access' }); setFormData(sponsor); }}>
                      <IconContext.Provider value={{ className: "icon" }}>
                        <FiEdit />
                      </IconContext.Provider>
                    </div>
                    <div className={style.delete_button} onClick={() => { setShow({ value: true, type: 'remove', group: 'sponsor', title: null }); setFormData(sponsor); }}>
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
          <h3>Media Partner</h3>
          <button onClick={() => { setShow({ value: true, type: 'add', group: 'medpart', title: 'Add Media Partner' }); setFormData(plain) }}>
            <IconContext.Provider value={{ className: "icon" }}>
              <MdAdd />
            </IconContext.Provider>
          </button>
        </div>
        {partners.medpart.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Organization</th>
                <th>Version</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {partners.medpart?.map((medpart, index) => (
                <tr key={`data ${index}`}>
                  <td>{index + 1}.</td>
                  <td>{medpart.organization}</td>
                  <td>{medpart.version}</td>
                  <td className="action_table">
                    <div className={style.edit_button} onClick={() => { setShow({ value: true, type: 'edit', group: 'medpart', title: 'Edit Access' }); setFormData(medpart); }}>
                      <IconContext.Provider value={{ className: "icon" }}>
                        <FiEdit />
                      </IconContext.Provider>
                    </div>
                    <div className={style.delete_button} onClick={() => { setShow({ value: true, type: 'remove', group: 'medpart', title: null }); setFormData(medpart); }}>
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
    setData({ ...data, logo: image, version, type: group })
  }

  return (
    <Form className={style.form_access} onSubmit={(event) => handler(event, data)}>
      <Row>
        <Col className="col-12 my-3">
          <Form.Group>
            <Form.Control placeholder="Organization Name" value={data.username} onChange={(e) => setData({ ...data, organization: e.target.value })} type="text" required />
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
              <option value="medpart">Media Partner</option>
              <option value="sponsor">Sponsor</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col className="mt-4">
          <InputImage getData={getImage} currentData={data.logo} />
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
    setData({ ...data, logo: image, version, type: group })
  }

  return (
    <Form className={style.form_access} onSubmit={(event) => handler(event, data)}>
      <Row>
        <Col className="col-12 my-3">
          <Form.Group>
            <Form.Control placeholder="Organization Name" value={data.username} onChange={(e) => setData({ ...data, organization: e.target.value })} type="text" required />
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
              <option value="medpart">Media Partner</option>
              <option value="sponsor">Sponsor</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col className="mt-4">
          <InputImage getData={getImage} currentData={data.logo} />
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
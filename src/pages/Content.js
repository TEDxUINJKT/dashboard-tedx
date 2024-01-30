import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Form, Row, Col } from 'react-bootstrap'

import { GetContents, AddContent, EditContent, DeleteContent } from '../state/contents/middleware'

import InputImage from "../components/InputImage";
import Modal from '../components/Modal'

import { IconContext } from "react-icons";
import { MdAdd } from "react-icons/md";

import style from '../styles/pages/Content.module.css'

export default function Content() {
  const plain = { type: 'teaser', data: {} }
  const { contents = [] } = useSelector(state => state)
  const [isShow, setShow] = useState({ value: false, type: null, title: null })
  const [formData, setFormData] = useState(plain)
  const [version, setVersion] = useState(2)
  const dispatch = useDispatch()


  function handleAdd(event, data) {
    event.preventDefault()
    dispatch(AddContent(data))
    console.log(data)
    setShow({ value: false, type: null, title: null })
  }

  function handleEdit(event, data) {
    event.preventDefault()
    dispatch(EditContent(data))
    console.log(data)
    setShow({ value: false, type: null, title: null })
  }

  function handleDelete(id = null, version) {
    if (id !== null) {
      dispatch(DeleteContent(id, version))
    }

    setShow({ value: false, type: null, title: null })
  }

  useEffect(() => {
    dispatch(GetContents(version))
  }, [dispatch, version])

  return (
    <section >
      <div className={style.header_layout}>
        <div className="centered gap-3">
          <h1>Content</h1>
          <div style={{ minWidth: '60px' }}>
            <Form.Select placeholder="Type" value={version} onChange={(e) => setVersion(e.target.value)} type="text" required>
              <option value="1">1.0</option>
              <option value="2">2.0</option>
              <option value="3">3.0</option>
              <option value="4">4.0</option>
            </Form.Select>
          </div>
        </div>
        <button onClick={() => { setShow({ value: true, type: 'add', title: 'Add New Content' }); setFormData(plain) }}>
          <IconContext.Provider value={{ className: "icon" }}>
            <MdAdd />
          </IconContext.Provider>
        </button>
      </div>
      {contents.length > 0 ? (
        <section className={style.content_card_container}>
          {contents.map((content, index) => (
            <div className={style.content_card} key={`content ${index}`}>
              <h5>{content.type}</h5>
              {content?.data.image?.url ? (<img src={content?.data.image?.url} alt={content?.type} width="80%" />) : null}
              {content?.data.link ? (<iframe src={content?.data.link} title="YouTube video player" />) : null}
              <div className={style.content_cta}>
                <button onClick={() => { setShow({ value: true, type: 'edit', title: "Edit Content" }); setFormData(content) }}>Edit</button>
                <button onClick={() => { setShow({ value: true, type: 'remove', title: null }); setFormData(content) }}>Delete</button>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <section className="centered">
          <h5>No Item Found</h5>
        </section>
      )}
      <Modal setShow={setShow} isShow={isShow} >
        {isShow.type === 'add' && <FormCreate data={formData} setData={setFormData} handler={handleAdd} version={version} />}
        {isShow.type === 'edit' && <FormEdit data={formData} setData={setFormData} handler={handleEdit} version={version} />}
        {isShow.type === 'remove' && <ConfirmationRemove data={formData} handler={handleDelete} version={version} />}
      </Modal>
    </section>
  );
}

function FormTheme({ data, setData, version }) {
  function getImage(image) {
    setData({ ...data, data: { ...data.data, image }, version })
  }
  return (
    <>
      <Row>
        <Col className="col-12 my-2">
          <Form.Group>
            <Form.Control placeholder="Theme Title" value={data.data.title} onChange={(e) => setData({ ...data, data: { ...data.data, title: e.target.value } })} type="text" required />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col className="col-12 my-2">
          <Form.Group>
            <Form.Control placeholder="Theme Description" value={data.data.description} onChange={(e) => setData({ ...data, data: { ...data.data, description: e.target.value } })} type="text" required />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col className="mt-3">
          <InputImage getData={getImage} currentData={data.data.image} />
        </Col>
      </Row>
    </>

  )
}

function FormImage({ data, setData, version }) {
  function getImage(image) {
    setData({ ...data, data: { ...data.data, image }, version })
  }
  return (
    <Row>
      <Col className="mt-3">
        <InputImage getData={getImage} currentData={data.data.image} />
      </Col>
    </Row>
  )
}

function FormUrl({ data, setData, version }) {
  return (
    <Row>
      <Col className="col-12 my-2">
        <Form.Group>
          <Form.Control placeholder="Iframe URL" value={data.data.link} onChange={(e) => setData({ ...data, data: { link: e.target.value }, version })} type="text" required />
        </Form.Group>
      </Col>
    </Row>
  )
}

function FormAds({ data, setData, version }) {
  function getImage(image) {
    setData({ ...data, data: { ...data.data, image }, version })
  }
  return (
    <>
      <Row>
        <Col className="col-12 my-2">
          <Form.Group>
            <Form.Control placeholder="Iframe URL" value={data.data.link} onChange={(e) => setData({ ...data, data: { ...data.data, link: e.target.value }, version })} type="text" />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col className="mt-3">
          <InputImage getData={getImage} currentData={data.data.image} />
        </Col>
      </Row>
    </>
  )
}

function FormCreate({ data, setData, handler, version }) {
  return (
    <Form className={style.form_access} onSubmit={(event) => handler(event, data)}>
      <Row>
        <Col className="col-12 my-2">
          <Form.Group>
            <Form.Select defaultValue="teaser" placeholder="Type" value={data.type} onChange={(e) => setData({ ...data, type: e.target.value })} type="text" required>
              <option value="theme">Theme</option>
              <option value="banner">Banner</option>
              <option value="teaser">Teaser</option>
              <option value="timeline">Timeline</option>
              <option value="ads">Ads</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      {data.type === 'teaser' ? <FormUrl data={data} setData={setData} version={version} /> : null}
      {data.type === 'theme' ? <FormTheme data={data} setData={setData} version={version} /> : null}
      {data.type === 'banner' || data.type === 'timeline' ? <FormImage data={data} setData={setData} version={version} /> : null}
      {data.type === 'ads' ? <FormAds data={data} setData={setData} version={version} /> : null}
      <Row >
        <Col className="righted mt-3">
          <button type="submit">Add</button>
        </Col>
      </Row>
    </Form>
  )
}

function FormEdit({ data, setData, handler, version }) {
  return (
    <Form className={style.form_access} onSubmit={(event) => handler(event, data)}>
      <Row>
        <Col className="col-12 my-2">
          <Form.Group>
            <Form.Select defaultValue="teaser" placeholder="Type" value={data.type} onChange={(e) => setData({ ...data, type: e.target.value })} type="text" required>
              <option value="theme">Theme</option>
              <option value="banner">Banner</option>
              <option value="teaser">Teaser</option>
              <option value="timeline">Timeline</option>
              <option value="ads">Ads</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      {data.type === 'teaser' ? <FormUrl data={data} setData={setData} version={version} /> : null}
      {data.type === 'theme' ? <FormTheme data={data} setData={setData} version={version} /> : null}
      {data.type === 'banner' || data.type === 'timeline' ? <FormImage data={data} setData={setData} version={version} /> : null}
      {data.type === 'ads' ? <FormAds data={data} setData={setData} version={version} /> : null}
      <Row >
        <Col className="righted mt-3">
          <button type="submit">Edit</button>
        </Col>
      </Row>
    </Form>
  )
}

function ConfirmationRemove({ data, handler, version }) {
  return (
    <div className="centered flex-horizontal" style={{ flexDirection: 'colomn' }}>
      <span style={{ fontWeight: '600', fontSize: '1.3em', textAlign: 'center' }}>Are you sure want to delete "{data.type}" from content list?</span>
      <div className="mt-4">
        <button className="button_secondary mx-3" onClick={() => handler(data._id, version)}>Yes</button>
        <button className="mx-3" onClick={() => handler(null)}>No</button>
      </div>
    </div>
  )
}
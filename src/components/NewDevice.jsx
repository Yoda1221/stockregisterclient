import axios            from 'axios'
import { useState }     from 'react'
import { useNavigate }  from 'react-router-dom'
import { Button, Container, Form, Row, Col }  from 'react-bootstrap'

const initialState = {tablename: "devices", device_name: "NOW()", buying_at: "", lang: ""}

const NewDevice = () => {
  const navigate                = useNavigate()
  const [error, setError]       = useState('')
  const [formData, setFormData] = useState(initialState)

  const toHome = () => { navigate('/') }
  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }
  const saveDevice = async (e) => {
    e.preventDefault(e)
    const { tablename, device_name, buying_at, lang } = formData
    const queryData = {
      "method" : "save",
      "data" : formData
    }
    try {
      setError('')
      const { data } = await axios.post(`${process.env.REACT_APP_SERVERURL}`, queryData)
      console.log('RESPONSE ', data)
      navigate('/')
    } catch (err) {
      console.log(`FAILED TO SAVE DATA ${err.message}`)
      setError(`FAILED TO SAVE DATA ${err.message}`)
    }
  }
  return (
    <Container >
        <h1 className='text-center mt-5'>Új eszköz mentése</h1>
        { error && <div className='alert alert-warning text-center'>{ error }</div>}
        <Row className="d-flex justify-content-center">
          <div className="col-md-8 col-sm-12 p-5">
            <Form onSubmit={ saveDevice } >
              {/* FIRST LINE */}
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Eszköz neve</Form.Label>
                <Form.Control 
                  name="device_name" 
                  size="sm" 
                  type="text" 
                  onChange={ handleChange }
                  placeholder="Mozdonykerék pumpa"
                  required 
                />
              </Form.Group>
              {/* SECOND LINE */}
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Beszerzés dátuma</Form.Label>
                  <Form.Control name="buying_at" type="datetime-local" onChange={ handleChange } />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Milyen nyelven legyen mentve</Form.Label>
                  <Form.Select name="lang" onChange={ handleChange } className="text-center">
                    <option> --- Válassz ---</option>
                    <option value="hu">Magyar</option>
                    <option value="en">Angol</option>
                    <option value="de">Német</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <div className='d-flex justify-content-between' >
                <Button size="sm" className="mt-3 px-3" variant="success" type="submit" >
                  Eszköz mentése
                </Button>
                <Button size="sm" className="mt-3 px-3" variant="info" type="submit" onClick={ toHome }>
                  Mégse
                </Button>
              </div>
            </Form>
          </div>
        </Row>
    </Container>
  )
}

export default NewDevice

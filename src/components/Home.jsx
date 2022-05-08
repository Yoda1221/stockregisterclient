import axios                    from 'axios'
import { useEffect, useState }  from 'react'
import { Container, ListGroup}  from 'react-bootstrap'
import { useNavigate }          from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const [count,   setcount]       = useState(0)
  const [devices,   setDevices]   = useState([])
  const [devicesDb, setDevicesDb] = useState([])

  /**
   * *  GET ALL DEVICES FROM DATABASE 
   */
  const geDevices = async () => {
    const queryData = {
      "method" : "getDevices",
      "data" : {
        "tablename": "devices",
        "device_name" : "",
        "user_id" : 0,
        "quality_condition" : 0,
        "buying_at": ""}
    }
    try {
      const deviceData = await axios.post(`${process.env.REACT_APP_SERVERURL}`, queryData)
      setcount(deviceData?.data.length)
      setDevices(deviceData?.data)
      setDevicesDb(deviceData?.data)
    } catch (err) {
      if (!err?.response) {
          console.error('No Server Response')
      } else {
          console.error('GET DEVICESDATA FAILED ', err?.message)
      }
    }
  }

  /**
   ** SEARCH FOR DEVICES BY DEVICENAME 
   * 
   * @param { Object } e 
   */
  const searchByName = (e) => {
    let keyw = e.target.value
    if (keyw !== '') {
      let results = devices
      .filter(dev => { return dev.device_name.toLowerCase().includes(keyw) })
      .map(dev => ({
        device_name: dev.device_name,
        user_id: dev.user_id,
        quality_condition: dev.quality_condition,
        buying_at: dev.buying_at,
      }))
      setcount(results.length)
      setDevices(results)
    } else {
      setcount(devicesDb.length)
      setDevices(devicesDb)
    }
  }
  
  /**
   * *  SORT DEVEICES BY quality_condition, buying_at
   * 
   * @param { Int } prop 
   */
  const shortDevices = (prop) => {
    let sorted
    switch (prop) {
      case 1:
        sorted = devices.sort( (a, b) => a.quality_condition - b.quality_condition )
        break;
      case 2:
        sorted = devices.sort( (a, b) => new Date(a.buying_at).getTime() - new Date(b.buying_at).getTime() )
        break;
      case 3:
        sorted = devices.sort( (a, b) => a.user_id - b.user_id )
        break;
        
        default:
          break;
    }
    console.log('S ', devices)
    setDevices(sorted)
  }

  /**
   * *  GO TO NEW DEVICES PAGE
   */
  const newDevice = () => { navigate('/newdevice') }

  useEffect(() => {
    geDevices()
  }, [])

  return (
    <Container className='p-3 mt-5'>
      <div className="row">
        <div className="col-md-12 text-center">
          <h1 className='text-center' >HOME</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
            <div className="card text-white bg-secondary">
              <div className="card-body">
                <h5 className="card-title">Eszközök listája: <small className='text-info'>{ count }db</small> </h5>
                <h6 className="card-subtitle mb-2 text-info">
                  Eszköz állapot magyarázat
                </h6>
                <ol>
                  <li>Rossz</li>
                  <li>használható</li>
                  <li>Közepes</li>
                  <li>Jó</li>
                  <li>Kíváló</li>
                </ol>
                <hr className='w-100' />
                <input
                  type="search"
                  /* value={} */
                  onChange={ searchByName }
                  className="form-control"
                  placeholder="Keresés az eszközlistában"
                />
                <hr className='w-100' />
                <h6 className="card-subtitle mb-2 text-white">
                  Lista rendezése
                </h6>
                <button 
                  className="btn btn-sm btn-outline-info w-100 mb-2 px-2"
                  onClick={ () => shortDevices(1) }
                >Eszköz állapota</button>
                <button 
                  className="btn btn-sm btn-outline-info w-100 mb-2 px-2"
                  onClick={ () => shortDevices(2) }
                >Beszerezve</button>
                <button 
                  className="btn btn-sm btn-success w-100 mb-2 px-2 mt-5"
                  onClick={ newDevice }
                >Új eszköz</button>
              </div>
            </div>
        </div>
        <div className="col-md-9">
            <ListGroup>
              <ListGroup.Item action variant="info text-center fw-bold">
                <div className="row">
                  <div className="col-md-3 text-center">Eszköz neve</div>
                  <div className="col-md-2 text-center">Állapota</div>
                  <div className="col-md-3 text-center">Vásárolva</div>
                  <div className="col-md-4 text-center">Kinél van</div>
                </div>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup style={{ maxHeight : 400, overflow: "scroll" }}>
              { devices && devices.map((item, index) => (
                <li key={index} id={item.user_id}
                  className={`list-group-item fw-light ${index % 2 ? "list-group-item-success" : "list-group-item-secondary" }`}
                >
                  <div className="row">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-3">{ item.device_name }</div>
                        <div className="col-md-2 text-center">{ item.quality_condition }</div>
                        <div className="col-md-3 text-center">{ item.buying_at }</div>
                        <div className="col-md-4 text-end">{ item.kinelvan }</div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ListGroup>
        </div>
      </div>
    </Container>
  )
}

export default Home

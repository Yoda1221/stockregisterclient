import { Home, NewDevice }  from './components'
import { Routes, Route }    from 'react-router-dom'

function App() {
  return (
    <Routes >
      <Route path="/"           element={ <Home  /> } />
      <Route path="/newdevice"  element={ <NewDevice  /> } />
    </Routes>
  );
}

export default App

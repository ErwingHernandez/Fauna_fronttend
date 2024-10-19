import { Suspense } from 'react'
import { fetchData } from './fetchData'
import './App.css'

const apiData = fetchData("https://fauna-nicaragua.onrender.com/api/faunas")

function App() {

  const data = apiData.read();
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <div className='container'>
          <ul className='card'>
            {data.map(fauna => (
              <li key={fauna._id}>
                <img src={fauna.imagen} alt={fauna.nombre} />
                <h1>{fauna.nombre}</h1>
                <h2>{fauna.nombreCientifico}</h2>
                <p>{fauna.descripcion}</p>
                <h3>{fauna.habitat}</h3>
                <h3>{fauna.ubicacion}</h3>
                <hr />
              </li>
            ))}
          </ul>
        </div>
      </Suspense>
    </div>
  )
}

export default App

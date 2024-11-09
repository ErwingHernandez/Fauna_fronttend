import { useState, Suspense } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { fetchData } from './fetchData';
import './App.css';

const apiData = fetchData("https://fauna-nicaragua.onrender.com/api/faunas");

function App() {
  const data = apiData.read();
  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="carousel">
          <ul className="card">
            {data.map((fauna) => {
              const isExpanded = expandedId === fauna._id;

              // Animación para la imagen expandida (escala y posicionamiento detrás de otras imágenes)
              const expandAnimation = useSpring({
                transform: isExpanded ? 'scale(3.2)' : 'scale(1)',
                config: { mass: 1, tension: 200, friction: 10 },
              });

              return (
                <li key={fauna._id} className="animal-card">
                  
                  <animated.img
                    src={fauna.imagen}
                    alt={fauna.nombre}
                    className= "animal-image" 
                    onClick={() => handleToggle(fauna._id)}
                    style={expandAnimation}
                  />
                   {isExpanded && (
                    <div style={expandAnimation} className="animal-details">
                      <button className="close-button" onClick={() => setExpandedId(null)}>X</button>
                      <h1>{fauna.nombre}</h1>
                      <h2>{fauna.nombreCientifico}</h2>
                      <p>{fauna.descripcion}</p>
                      <h3>Hábitat: {fauna.habitat}</h3>
                      <h3>Ubicación: {fauna.ubicacion}</h3>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </Suspense>
    </div>
  );
}

export default App;

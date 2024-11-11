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
                transform: isExpanded ? `translateY(50px) scale(1.5)` : 'translateY(0) scale(1)',
                opacity: isExpanded ? 1 : 0.8,
                zindex: isExpanded ? 1 : -1,
                config: { mass: 1, tension: 100, friction: 10, duration: 300 },
              });

              // Animación de entrada para animal-details
              const detailsAnimation = useSpring({
                opacity: isExpanded ? 1 : 0,
                transform: isExpanded ? 'translateY(0)' : 'translateY(20px)',
                config: { tension: 120, friction: 14 },
              });


              return (
                <li key={fauna._id} className="animal-card">
                  <div className="imagen-container">
                    <animated.img
                      src={fauna.imagen}
                      alt={fauna.nombre}
                      className="animal-image"
                      onClick={() => handleToggle(fauna._id)}
                      style={expandAnimation}
                    />

                  </div>

                  {isExpanded && (
                    <animated.div style={detailsAnimation} className="animal-details">
                      <button className="close-button" onClick={() => setExpandedId(null)}>X</button>

                      <div className='animal-title'>
                        <h1>{fauna.nombre}</h1>
                      </div>

                      <div className='animal-subtitles'>
                        <div className='animal-subtitle-container'>
                          <h3>{fauna.nombreCientifico}</h3>
                          <h3>Hábitat</h3>
                          <h3>Ubicación</h3>
                        </div>
                      </div>

                      <div className='animal-info'>
                        <div className='animal-info-container'>
                          <p id='descripcion'>{fauna.descripcion}</p>
                          <p id='habitat'>{fauna.habitat}</p>
                          <p id='ubicacion'>{fauna.ubicacion}</p>
                        </div>

                      </div>
                    </animated.div>
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

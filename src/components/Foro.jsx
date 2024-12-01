import React, { useState, useEffect } from "react";
import "/src/components/Styles/Foro.css"



const Foro = () => {
    
    const [name, setName] = useState("");
    const [suggestion, setSuggestion] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [message, setMessage] = useState("");
    const [filter, setFilter] = useState("recientes"); // Estado para el filtro

    // Función para cargar sugerencias desde el backend
    const fetchSuggestions = async () => {
        try {
            const response = await fetch("https://fauna-nicaragua.onrender.com/api/faunas/Allsugestion");
            const data = await response.json();
            setSuggestions(data);
        } catch (error) {
            console.error("Error al cargar sugerencias:", error);
        }
    };

    // Llamar la función al cargar el componente
    useEffect(() => {
        fetchSuggestions();
    }, []);

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !suggestion) {
            setMessage("Por favor, completa todos los campos.");
            return;
        }

        try {
            const response = await fetch("https://fauna-nicaragua.onrender.com/api/faunas/Sendsugestion", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, suggestion }),
            });

            if (response.ok) {
                setMessage("¡Gracias! Tu sugerencia ha sido enviada.");
                setName("");
                setSuggestion("");
                fetchSuggestions();
            } else {
                setMessage("Ocurrió un error al enviar la sugerencia. Inténtalo de nuevo.");
            }
        } catch (error) {
            console.error("Error al enviar la sugerencia:", error);
            setMessage("Ocurrió un error. Inténtalo de nuevo.");
        }
    };


    const filteredSuggestions = [...suggestions].sort((a, b) => {
        if (filter === "recientes") {
            return new Date(b.createdAt) - new Date(a.createdAt);
        } else {
            return new Date(a.createdAt) - new Date(b.createdAt);
        }
    });

    return (
        <div className="container">
            <header>
                <h1>Foro de Sugerencias</h1>
                <p>¡Comparte tus ideas para agregar nuevos animales a la fauna de Nicaragua!</p>
            </header>

            {/* Formulario de sugerencias */}
            <form onSubmit={handleSubmit} className="suggestion-form">
                <div>
                    <label htmlFor="name">Tu Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Escribe tu nombre"
                    />
                </div>
                <div>
                    <label htmlFor="suggestion">Sugerencia:</label>
                    <textarea
                        id="suggestion"
                        value={suggestion}
                        onChange={(e) => setSuggestion(e.target.value)}
                        placeholder="Escribe tu sugerencia aquí..."
                    ></textarea>
                </div>
                <div className="button-container">
                <button type="submit">Enviar</button>
                </div>
               
            </form>

            {message && <p className="message">{message}</p>}

            {/* Filtro de sugerencias */}
            <div className="filter-section">
                <label htmlFor="filter">Ordenar sugerencias:</label>
                <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="recientes">Más recientes</option>
                    <option value="antiguas">Más antiguas</option>
                </select>
            </div>
            <h2>Sugerencias Recientes</h2>

            {/* Lista de sugerencias */}
            <section>
                
                {filteredSuggestions.length > 0 ? (
                    filteredSuggestions.map((item) => (
                        <div key={item._id} className="suggestion-card">
                            <h3>{item.name}</h3>
                            <p>{item.suggestion}</p>
                            <small>Fecha: {new Date(item.createdAt).toLocaleDateString()}</small>
                        </div>
                    ))
                ) : (
                    <p>No hay sugerencias aún. ¡Sé el primero en sugerir un animal!</p>
                )}
            </section>
        </div>
    );
};

export default Foro;

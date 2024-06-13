import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Biblioteca pentru a face cereri HTTP
import Restaurant from '../components/restaurant'; // Componentă pentru afișarea detaliilor unui restaurant
import { TimePicker } from 'antd'; // Componentă pentru selector de timp din Ant Design
import dayjs from 'dayjs'; // Biblioteca pentru manipularea datelor și timpului
import customParseFormat from 'dayjs/plugin/customParseFormat'; // Plugin pentru dayjs pentru a parsa formatele personalizate

const Homesceen = () => {
  const [restaurants, setRestaurants] = useState([]); // Stare pentru lista de restaurante
  const [loading, setLoading] = useState(false); // Stare pentru a indica încărcarea datelor
  const [error, setError] = useState(false); // Stare pentru a indica dacă a apărut o eroare

  // Funcție pentru a schimba timpul selectat
  const onChange = (time, timeString) => {
    console.log(time, timeString); // Afișează timpul selectat în consolă
  };

  // useEffect pentru a încărca datele de la server la montarea componentei
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Setează starea de încărcare la true
        const response = await axios.get('/api/restaurants/getallrestaurants'); // Cerere GET pentru a obține toate restaurantele
        console.log(response.data); // Afișează datele obținute în consolă
        setRestaurants(response.data.restaurants); // Setează lista de restaurante în starea componentei
        setLoading(false); // Setează starea de încărcare la false
      } catch (error) {
        setError(true); // Setează starea de eroare la true
        setLoading(false); // Setează starea de încărcare la false
        console.error(error.message); // Afișează eroarea în consolă
      }
    };

    fetchData(); // Apelează funcția de încărcare a datelor
  }, []);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-3'>
          {/* Spațiu pentru alte componente sau filtre */}
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1>Loading...</h1> // Afișează mesajul de încărcare dacă datele sunt încă în proces de încărcare
        ) : error ? (
          <h1>Error</h1> // Afișează mesajul de eroare dacă a apărut o eroare la încărcarea datelor
        ) : Array.isArray(restaurants) ? (
          // Afișează lista de restaurante dacă datele sunt disponibile
          restaurants.map((restaurant, index) => {
            return (
              <div className="col-md-9 mt-2" key={index}>
                <Restaurant restaurant={restaurant} /> {/* Afișează componenta Restaurant pentru fiecare restaurant */}
              </div>
            );
          })
        ) : (
          <h1>No data available</h1> // Afișează mesajul dacă nu sunt date disponibile
        )}
      </div>
    </div>
  );
};

export default Homesceen;

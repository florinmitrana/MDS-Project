import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Hook pentru a obține parametrii din URL
import axios from 'axios'; // Biblioteca pentru a face cereri HTTP
import { TimePicker } from 'antd'; // Componentă pentru selectarea timpului
import dayjs from 'dayjs'; // Bibliotecă pentru manipularea datelor și timpului
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePicker, Space } from 'antd'; // Componente pentru selectarea datei

function Bookingscreen() {
  let { restaurantid } = useParams(); // Obține ID-ul restaurantului din URL
  const [loading, setLoading] = useState(true); // Stare pentru afișarea încărcării
  const [error, setError] = useState(false); // Stare pentru erori
  const [restaurant, setrestaurant] = useState(); // Stare pentru detalii restaurant
  const [user, setUser] = useState(null); // Stare pentru utilizatorul curent
  const [date, setDate] = useState(null); // Stare pentru data rezervării
  const [hour, setHour] = useState(null); // Stare pentru ora rezervării
  const [maxCount, setMaxCount] = useState(150); // Stare pentru numărul maxim de persoane la rezervare

  // Funcție pentru setarea orei selectate
  const onChange = (time, timeString) => {
    const formattedTime = dayjs(time).format('HH:mm:ss');
    setHour(formattedTime);
  };

  // Funcție pentru setarea datei selectate
  const onChangeDate = (date, dateString) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    setDate(formattedDate);
  };

  // Hook pentru a obține detalii despre restaurant la încărcarea componentului
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Cerere HTTP pentru a obține toate restaurantele
        const response = await axios.get('/api/restaurants/getallrestaurants');
        const restaurants_list = response.data.restaurants;
        console.log(restaurants_list);

        // Găsește restaurantul selectat pe baza ID-ului din URL
        const selectedRestaurant = restaurants_list.find(
            (rest) => rest._id === restaurantid
          );
  
        console.log(selectedRestaurant);
        setrestaurant(selectedRestaurant);
        setLoading(false);

      } catch (error) {
        setError(true);
        setLoading(false);
        console.error("Eroare la API:", error.message);
      }
    };

    fetchData();
  }, [restaurantid]); // Rulăm efectul doar când restaurantid se schimbă

  // Hook pentru a obține utilizatorul curent din localStorage la încărcarea componentului
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      try {
        setUser(JSON.parse(currentUser));
      } catch (error) {
        console.error("Failed to parse currentUser from localStorage", error);
        setUser(null); // Clear user state if parsing fails
      }
    }
  }, []);

  // Funcție pentru a efectua rezervarea
  async function bookRoom() {
    const bookingDetails = {
      restaurant,
      name: user.name,
      date,
      hour,
      maxCount,
    }
    try {
      const result = await axios.post('/api/bookings/addbooking', bookingDetails);
      console.log(result.data);
    } catch (error) {
      console.error("Eroare la rezervare:", error);
    }
  }

  // Afișează mesaj de încărcare
  if (loading) {
    return <div>Loading...</div>;
  }

  // Afișează mesaj de eroare
  if (error) {
    return <div>Error loading restaurant information.</div>;
  }

  // Afișează mesaj dacă restaurantul nu este găsit
  if (!restaurant) {
    return <div>Restaurant not found.</div>;
  }

  return (
    <div className='row justify-content-center mt-5 bs'>
      <div className='row'>
        <div className='col-md-5'>
          <h1>{restaurant.name}</h1>
          <img src={restaurant.imageurls[0]} className='smallimg' alt={restaurant.name} />
        </div>
        <div>
          <h1>Booking details</h1>
          <b>
            <p>Name: {user ? user.name : 'Guest'} </p>
            <p>Date: <DatePicker onChange={onChangeDate} /> </p>
            <p>Hour: <TimePicker onChange={onChange} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} /></p>
            <p>Max Count: 8</p>
          </b>

          <div style={{ textAlign: 'left' }}>
            <button className='btn btn-primary' onClick={bookRoom}>Reserve Now</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Bookingscreen;

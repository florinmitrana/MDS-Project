import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd'; // Componentă pentru taburi din Ant Design
import axios from 'axios'; // Biblioteca pentru a face cereri HTTP

function Profilescreen() {
  const [activeTab, setActiveTab] = useState('1'); // Stare pentru tab-ul activ
  const user = JSON.parse(localStorage.getItem('currentUser')) // Obține utilizatorul curent din localStorage
  const [bookings, setbookings] = useState([]); // Stare pentru rezervările utilizatorului

  // Verifică dacă utilizatorul este autentificat
  useEffect(() => {
    if (!user) {
      window.location.href = '/login'; // Redirecționează la pagina de autentificare dacă utilizatorul nu este autentificat
    }
  }, []);

  // Fetch rezervările utilizatorului
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id });
        setbookings(response.data); // Setează rezervările în starea componentului
      } catch (error) {
        console.log(error);
      }
    };

    fetchReservations(); // Apelează funcția asincronă
  }, [user]);

  // Definește taburile și conținutul lor
  const items = [
    {
      key: '1',
      label: 'Profile',
      children:  <div> 
        <h2>Profile details</h2>
        <h1>Name: {user.name}</h1>
        <h1>Email: {user.email}</h1>
      </div>,
    },
    {
      key: '2',
      label: 'Reservation',
      children: <div> 
        <h1>Bookings</h1>
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <div key={index}>
              <h2>{booking.restaurant.name}</h2>
              <p>Date: {booking.date}</p>
              <p>Hour: {booking.hour}</p>
            </div>
          ))
        ) : (
          <p>No bookings found</p>
        )}
      </div>,
    },
  ];

  // Funcție pentru schimbarea tabului activ
  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <div className='ml-3 mt-3'>
      <Tabs defaultActiveKey="1" items={items} onChange={handleTabChange}>
        {activeTab === '1' && (
          <div>
            <h2>Profile Details</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        )}
        {activeTab === '2' && (
          <div>
            <h2>Bookings</h2>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <div key={index}>
                  <h2>{booking.restaurant.name}</h2>
                  <p>Date: {booking.date}</p>
                  <p>Hour: {booking.hour}</p>
                </div>
              ))
            ) : (
              <p>No bookings found</p>
            )}
          </div>
        )}
      </Tabs>
    </div>
  );
}

export default Profilescreen;

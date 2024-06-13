import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import axios from 'axios'; 


function Profilescreen() {
  const [activeTab, setActiveTab] = useState('1');
  const user = JSON.parse(localStorage.getItem('currentUser'))
  const [bookings, setbookings] = useState([])
  useEffect(() =>{

    if(!user){
        window.location.href='/login'
    }


  },[]);
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id });
      } catch (error) {
        console.log(error);
      }
    };

    fetchReservations(); // Apelează funcția asincronă
  }, [user]); 
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
        </div>,
    },
  ];

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
            
            
          </div>
        )}
      </Tabs>
    </div>
  );
}

export default Profilescreen;

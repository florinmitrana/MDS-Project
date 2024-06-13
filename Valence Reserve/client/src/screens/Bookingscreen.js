import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePicker, Space } from 'antd';

function Bookingscreen() {
  let {restaurantid} = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [restaurant, setrestaurant] = useState();
  const [user, setUser] = useState(null);
  const [date, setDate] = useState(null);
  const [hour, setHour] = useState(null);
  const [maxCount, setMaxCount] = useState(150);
  const onChange = (time, timeString) => {
    const formattedTime = dayjs(time).format('HH:mm:ss');
    setHour(formattedTime);
  };
  const onChangeDate = (date, dateString) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    setDate(formattedDate);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get('/api/restaurants/getallrestaurants');
        const restaurants_list = response.data.restaurants;
        console.log(restaurants_list);

        const selectedRestaurant = restaurants_list.find(
            (rest) => rest._id === restaurantid
          );
  
        console.log(selectedRestaurant);
        setrestaurant(selectedRestaurant);
        setLoading(false);

      } catch(error){
        setError(true);
        setLoading(false);
        console.error("Eroare la API :", error.message);
    }
};

fetchData();
}, [restaurantid]);



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

async function bookRoom(){
  const bookingDetails = {
    restaurant,
    name: user.name,
    date,
    hour,
    maxCount,
  }
  try{
      const result = await axios.post('/api/bookings/addbooking', bookingDetails);
      console.log(result.data);
  }catch(error){console.error("Eroare la rezervare:", error);}
}

if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading restaurant information.</div>;
  }

  if (!restaurant) {
    return <div>Restaurant not found.</div>;
  }

  return (
    <div className=' row justify-content-center mt-5 bs'>
      <div className='row'>
        <div className='col-md-5'>
          <h1>{restaurant.name}</h1>
          <img src={restaurant.imageurls[0]} className='smallimg' alt={restaurant.name} />
        </div>
        <div>
            <h1>Booking details</h1>
            <b>
            <p>Name: {user ? user.name : 'Guest'} </p>
            <p>Date: <DatePicker onChangeDate={onChangeDate} /> </p>
            <p>Hour: <TimePicker onChange={onChange} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} /></p>
            <p>Max Count: 8</p>
            </b>

            <div style= {{textAlign: 'left'}}>
                <button className='btn btn-primary' onClick={bookRoom}>Reserve Now</button>
            </div>

        </div>
        </div>
      </div>
    
  );
}

export default Bookingscreen;

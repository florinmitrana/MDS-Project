import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Bookingscreen() {
  let {restaurantid} = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [restaurant, setrestaurant] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post('/api/restaurants/getrestaurantbyid', {restaurantid });
        setrestaurant(response.data.restaurants);
        setLoading(false);

      } catch(error){
        setError(true);
        setLoading(false);
        console.error("Error fetching restaurant data:", error.message);
    }
};

fetchData();
}, []);

    return (
        <div>
            <h1>Booking screen</h1>
            <h1>Restaurant id = {restaurantid}</h1>
        </div>
    );
}

export default Bookingscreen;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Restaurant from '../components/restaurant';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
const Homesceen = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const onChange = (time, timeString) => {
    console.log(time, timeString);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/restaurants/getallrestaurants');
        console.log(response.data);
        setRestaurants(response.data.restaurants);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='container'>
      <div className='row'>

        <div className='col-md-3'>



        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>Error</h1>
        ) : Array.isArray(restaurants) ? (
          restaurants.map((restaurant, index) => {
            return <div className="col-md-9 mt-2">
              <Restaurant restaurant={restaurant} />
            </div>;
            <h1 key={index}>{restaurant.name}</h1>
          })
        ) : (
          <h1>No data available</h1>
        )}
      </div>
    </div>
  );
};

export default Homesceen;

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import {Link} from 'react-router-dom';
function Restaurant({ restaurant }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className='row bs'>
            <div className='col-md-4'>
                {restaurant.imageurls && restaurant.imageurls[0] ? (
                    <img src={restaurant.imageurls[0]} className='smallimg' />
                ) : (
                    <p>No image available</p>
                )}
            </div>
            <div className='col-md-7 '>
                <h1>{restaurant.name}</h1>
                <b> <p>Speciality: {restaurant.speciality}</p>
                    <p>Capacity: {restaurant.capacity}</p>
                    <p>Phone Number: {restaurant.phonenumber}</p> </b>
                <div style={{ float: 'right' }}>
                    <Link to ={`/book/${restaurant._id}`}>
                    <button className='btn btn-primary m-2'> Book now</button>
                    </Link>
                    <button className='btn btn-primary' onClick={handleShow}> View Details </button>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} size ='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>{restaurant.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel>
                        {restaurant.imageurls.map(url =>{
                            return <Carousel.Item>
                                <img
                                className='d-block w-100 bigimg'
                                src={url}
                                />
                            </Carousel.Item>
                        })}
                    </Carousel>
                    <p>{restaurant.description}</p>
                    </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Restaurant;

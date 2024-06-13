import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'; // Importă componenta Button din React Bootstrap
import Modal from 'react-bootstrap/Modal'; // Importă componenta Modal din React Bootstrap
import Carousel from 'react-bootstrap/Carousel'; // Importă componenta Carousel din React Bootstrap
import { Link } from 'react-router-dom'; // Importă componenta Link pentru rutare în interiorul aplicației

function Restaurant({ restaurant }) {
    const [show, setShow] = useState(false); // Starea pentru afișarea/ascunderea modalului

    const handleClose = () => setShow(false); // Funcție pentru închiderea modalului
    const handleShow = () => setShow(true); // Funcție pentru deschiderea modalului

    return (
        <div className='row bs'>
            <div className='col-md-4'>
                {restaurant.imageurls && restaurant.imageurls[0] ? (
                    <img src={restaurant.imageurls[0]} className='smallimg' alt={restaurant.name} /> // Afișează prima imagine a restaurantului sau un mesaj dacă nu există imagini
                ) : (
                    <p>No image available</p>
                )}
            </div>
            <div className='col-md-7 '>
                <h1>{restaurant.name}</h1> {/* Afișează numele restaurantului */}
                <b>
                    <p>Speciality: {restaurant.speciality}</p> {/* Afișează specialitatea restaurantului */}
                    <p>Capacity: {restaurant.capacity}</p> {/* Afișează capacitatea restaurantului */}
                    <p>Phone Number: {restaurant.phonenumber}</p> {/* Afișează numărul de telefon al restaurantului */}
                </b>
                <div style={{ float: 'right' }}>
                    <Link to={`/book/${restaurant._id}`}> {/* Rutare către pagina de rezervare a restaurantului */}
                        <button className='btn btn-primary m-2'> Book now</button> {/* Buton pentru rezervare */}
                    </Link>
                    <button className='btn btn-primary' onClick={handleShow}> View Details </button> {/* Buton pentru deschiderea modalului cu detalii */}
                </div>
            </div>

            <Modal show={show} onHide={handleClose} size='lg'> {/* Modal pentru afișarea detaliilor restaurantului */}
                <Modal.Header closeButton>
                    <Modal.Title>{restaurant.name}</Modal.Title> {/* Titlul modalului este numele restaurantului */}
                </Modal.Header>
                <Modal.Body>
                    <Carousel> {/* Carousel pentru imagini multiple */}
                        {restaurant.imageurls.map(url => { // Mapare și afișare imagini din lista imageurls a restaurantului
                            return <Carousel.Item key={url}>
                                <img
                                    className='d-block w-100 bigimg'
                                    src={url}
                                    alt={`Slide ${url}`} // Text alternativ pentru imagine
                                />
                            </Carousel.Item>
                        })}
                    </Carousel>
                    <p>{restaurant.description}</p> 
                    <div className='bigimg'><img src = "{restaurant.imageurls[3]}" /></div>
                    {/* Afișează descrierea restaurantului */}
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

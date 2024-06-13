import React, { useState } from 'react';
import axios from "axios"; // Biblioteca pentru a face cereri HTTP

function Loginscreen() {
    const [email, setemail] = useState(''); // Stare pentru email
    const [password, setpassword] = useState(''); // Stare pentru parolă

    // Funcție asincronă pentru autentificare
    async function login() {
        const user = {
            email,
            password,
        };
        try {
            const result = await axios.post('/api/users/login', user); // Cerere POST pentru autentificare
            localStorage.setItem('currentUser', JSON.stringify(result.data)); // Salvează utilizatorul autentificat în localStorage
            // Trigger custom event
            window.dispatchEvent(new Event('storageChange')); // Declanșează un eveniment personalizat pentru a notifica alte părți ale aplicației despre schimbare
            window.location.href = '/home'; // Redirecționează utilizatorul către pagina principală
        } catch (error) {
            console.log(error); // Afișează eroarea în consola
        }
    }

    return (
        <div>
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5">
                    <div>
                        <h1>Login</h1>
                        {/* Input pentru email */}
                        <input 
                            type="text" 
                            className='form-control' 
                            placeholder='email' 
                            value={email} 
                            onChange={(e) => { setemail(e.target.value) }} 
                        />
                        {/* Input pentru parolă */}
                        <input 
                            type="text" 
                            className='form-control' 
                            placeholder='password'
                            value={password} 
                            onChange={(e) => { setpassword(e.target.value) }} 
                        />
                        {/* Buton pentru autentificare */}
                        <button className='btn btn-primary' onClick={login}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Loginscreen;

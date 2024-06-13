import React, { useState } from 'react';
import axios from "axios"; // Biblioteca pentru a face cereri HTTP
import Success from "../components/success"; // Componentă pentru afișarea mesajului de succes

function Registerscreen() {
    const [name, setname] = useState(''); // Stare pentru numele utilizatorului
    const [email, setemail] = useState(''); // Stare pentru emailul utilizatorului
    const [password, setpassword] = useState(''); // Stare pentru parola utilizatorului
    const [cpassword, setcpassword] = useState(''); // Stare pentru confirmarea parolei
    const [success, setsuccess] = useState(false); // Stare pentru a afișa mesajul de succes

    // Funcție asincronă pentru înregistrare
    async function register() {
        // Verifică dacă parolele se potrivesc
        if (password === cpassword) {
            const user = {
                name,
                email,
                password,
                cpassword
            };
            try {
                // Cerere POST pentru înregistrare
                const result = await axios.post('/api/users/register', user).data;
                setsuccess(true); // Setează starea pentru afișarea mesajului de succes
                // Resetează câmpurile formularului
                setname('');
                setemail('');
                setpassword('');
                setcpassword('');
            } catch (error) {
                console.log(error); // Afișează eroarea în consola
            }
            console.log(user);
        } else {
            alert("Passwords are not the same"); // Afișează alertă dacă parolele nu se potrivesc
        }
    }

    return (
        <div>
            {success && (<Success message='Registration Success' />)} {/* Afișează mesajul de succes dacă înregistrarea a reușit */}
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5">
                    <div>
                        <h1>Register</h1>
                        {/* Input pentru nume */}
                        <input
                            type="text"
                            className='form-control'
                            placeholder='name'
                            value={name}
                            onChange={(e) => { setname(e.target.value) }}
                        />
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
                        {/* Input pentru confirmarea parolei */}
                        <input
                            type="text"
                            className='form-control'
                            placeholder='confirm password'
                            value={cpassword}
                            onChange={(e) => { setcpassword(e.target.value) }}
                        />
                        {/* Buton pentru înregistrare */}
                        <button className='btn btn-primary' onClick={register}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registerscreen;

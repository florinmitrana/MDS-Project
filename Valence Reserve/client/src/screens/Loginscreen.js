import React, {useState, useEffect} from 'react'
import axios from "axios";

function Loginscreen() {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    async function login() {
        const user = {
            email,
            password,
        };
        try {
            const result = await axios.post('/api/users/login', user);
            localStorage.setItem('currentUser', JSON.stringify(result.data));
            // Trigger custom event
            window.dispatchEvent(new Event('storageChange'));
            window.location.href = '/home';
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <div className="row justify-content-center mt-5">
                <div className = "col-md-5 mt-5">
                    <div>
                        <h1>Login</h1>
                        
                        <input type="text" className='form-control' placeholder='email' 
                        value={email} onChange={(e)=>{setemail(e.target.value)}}/>
                        <input type="text" className='form-control' placeholder='password'
                        value={password} onChange={(e)=>{setpassword(e.target.value)}} />
                    

                        <button className='btn btn-primary' onClick={login}>Login</button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Loginscreen
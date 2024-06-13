import React, {useState, useEffect} from 'react'
import axios from "axios";
import Success from "../components/success"
function Registerscreen() {
    const[name, setname] = useState('')
    const[email, setemail] =useState('')
    const[password, setpassword] =useState('')
    const[cpassword, setcpassword] =useState('')
    const [success, setsuccess]= useState();

    async function register(){
        if(password == cpassword){
        const user = {
            name,
            email,
            password,
            cpassword
        }
        try{
            const result = await axios.post('/api/users/register', user).data;
            setsuccess(true);
            setname('')
            setemail('')
            setpassword('')
            setcpassword('')

        }catch (error){ console.log(error)}
        console.log(user)
    }
    else{ alert("Passwords are not the same")}
    }
    return (
        <div>

            {success && (<Success message = 'Registration Success' />)}
            <div className="row justify-content-center mt-5">
                <div className = "col-md-5 mt-5">
                    <div>
                        <h1>Register</h1>
                        <input type="text" className='form-control' placeholder='name' 
                        value={name} onChange={(e)=>{setname(e.target.value)}}/>
                        <input type="text" className='form-control' placeholder='email' 
                        value={email} onChange={(e)=>{setemail(e.target.value)}}/>
                        <input type="text" className='form-control' placeholder='password'
                        value={password} onChange={(e)=>{setpassword(e.target.value)}} />
                        <input type="text" className='form-control' placeholder='confirm password'
                        value={cpassword} onChange={(e)=>{setcpassword(e.target.value)}} />

                        <button className='btn btn-primary' onClick={register}>Register</button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Registerscreen
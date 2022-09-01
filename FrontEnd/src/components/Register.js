import React, { useEffect, useRef } from 'react'
import { Button } from 'react-bootstrap'
import { Link, Redirect, Switch, useHistory } from 'react-router-dom'
import axios from 'axios'

export default function Register(props) {

    const history = useHistory();
  const goLogin = () => history.push('login');

  useEffect(() => {
    props.tellstate('register')
  }, [])
    const name=useRef();
    const email=useRef();
    const password=useRef();
    const submitt=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:5000/api/users/register",{
        name:name.current.value,
        email:email.current.value,
        password:password.current.value,
    }).then((res)=>{
       console.log(res);
       if(res){
           localStorage.setItem('id2','');
            goLogin();
       }
    },(err)=>{
        console.log(err)
    })
    ;
    }
    
    return (
        <div>
             <div className="Loginandregister">
                <h2>Register</h2>
                <p>Join me and my friends on this application!</p>
                <form onSubmit={submitt}>
                <input type="text" placeholder="Name" ref={name}/>
                <input type="email" placeholder="Email" ref={email}/>
                <input type="password" placeholder="Password" ref={password}/>

                <input type="submit" className="greenbtn"/>
                <p>Already have an account?<Link to="/login"><span className="linkgreen">Login</span></Link></p>
                </form>
            </div>
        </div>
    )
}

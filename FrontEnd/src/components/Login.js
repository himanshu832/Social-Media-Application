import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
//import { Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
//import jwt_decode from "jwt-decode";

export default function Login(props) {

    const [user, setuser] = useState({
        name:'',
        id:'',
        refreshToken:'',
        accessToken:'',
    });
    const history = useHistory();
    const allpost = () => history.push('all_posts');
    const refreshToken=async ()=>{
       try {
           console.log(localStorage.getItem('id2'));
           const res=await axios.post("http://localhost:5000/api/users/refresh",
               {token:localStorage.getItem('id2')});
               setuser({
                   //...user,
                   name:localStorage.getItem('name'),
                   id:localStorage.getItem('id'),
                   accessToken:res.data.accessToken,
                   refreshToken:res.data.refreshToken,
               });
               allpost();
               return res.data;

           }
       catch (error) {
           console.log(error);
       }
   }
    
//  useEffect(() => {
//     if(Object.keys(localStorage).includes('id2')){
       
//     //   setuser({
//     //     name:(localStorage.getItem('name')),
//     //     id:(localStorage.getItem('id')),
//     //     refreshToken:(localStorage.getItem('id2')),
//     //     //accessToken
//     // })
//    console.log(localStorage.getItem('id2'));
// }
    
// }, [])

useEffect(() => {
      console.log(user);
    if(localStorage.getItem('id2')!='')
    refreshToken();
    props.tellstate('login')
}, [])
    
 
    const email=useRef();
    const password=useRef();
    const submitt=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:5000/api/users/login",{
            email:email.current.value,
            password:password.current.value,
        }).then((res)=>{
            
            console.log(res);
            setuser(res.data);
            localStorage.setItem('name',res.data.name);
            localStorage.setItem('id',res.data.id);
            localStorage.setItem('id2',res.data.refreshToken);
            if(res.status=='200')
            {//props.sendidtoapp(res.data.id);
             //   props.sendusernametoapp(res.data.name);
                console.log(res.data.name);
            allpost();
            }
        },(err)=>{
            console.log(err);
        })
        //setheader();
    }
    return (
        <div>
            <div className="Loginandregister">
                <h2>Login</h2>
                <p>Login to this awesome application!</p>

                
                <input type="email" placeholder="Email" ref={email}/>
                <input type="password" placeholder="Password" ref={password}/>

                <button onClick={submitt} className="greenbtn"><span style={{textDecoration:"none",color:"white"}}>LOGIN</span></button>
                <p>Don't have an account?<Link to="/register"><span className="linkgreen">Register</span></Link></p>

            </div>
            
        </div>
    )
}

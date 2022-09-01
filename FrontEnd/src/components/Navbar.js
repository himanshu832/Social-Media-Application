
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

export default function Navbar(props) {
  const [state, setstate] = useState(localStorage.getItem('state'));
  
// const updatelog=(props)=>{
//     setstate(props.state);
// }
useEffect(() => {
  setstate(props.state);

}, [props.state])
    return (
        <div>
             <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
        <div className="container">
          <a href="#" className="navbar-brand">
            &lt;/&gt;The Social Media App
          </a>
          <ul className="nav">
              {/* <li className="nav-item"><Link className="nav-link text-white" to="/">Home</Link></li> */}
              {(state=='login'||state=='landing'||state=='register') &&<li className="nav-item"><Link className="nav-link text-white" to="/register">Register</Link></li>}
              {(state=='login'||state=='landing'||state=='register') &&<li className="nav-item"><Link className="nav-link text-white" to="/login">Login</Link></li>}
              {state=='showposts' &&<li className="nav-item"><Link className="nav-link text-white" to="/login" onClick={()=>{
                localStorage.setItem('id2','');
              }}>Log Out</Link></li>}
              {/* <li className="nav-item"><Link className="nav-link text-white" to="/weather">Weather App</Link></li> */}
                   </ul>
        </div>
      </nav>
             
        </div>
    )
}

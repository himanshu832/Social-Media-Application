import React, { useEffect } from 'react'
import {Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Posts from './Posts'
export default function Landing(props) {

    useEffect(()=>{
        props.tellstate('landing')
    })
    return (<>
    
    <div className="landing">
        <div id="land">
        <div className="landingtext"> 
          <h1>The Social Media App</h1>
          <p>A fun place for devlopers and friends to share ideas on technology. Plenty of cool discussions!</p>
        </div>
        <div className="landingbutton">
            <Link to="/register"><Button className="bg-white text-primary">REGISTER</Button></Link>
           <Link to="/login"><Button className="bg-primary text-white">LOGIN</Button></Link>
        </div>
        </div>
        </div>
        </>
    )
}

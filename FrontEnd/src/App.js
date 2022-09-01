
import { useState } from 'react';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Posts from './components/Posts';
import Singlepost from './components/Singlepost';
import Register from './components/Register';
import Showposts from './components/Showposts';



// import LogIn from './components/LogIn';

function App (){
  
  const[currstate,setcurrstate]=useState();
  //const[username,setusername]=useState();
  const getstatefromchildren=(incomingstate)=>{//text recieved here is the argument set for this parameter "textfromchild" in child;
  
   setcurrstate(incomingstate)
  }
  // const getusernamefromlogin=(idd)=>{//text recieved here is the argument set for this parameter "textfromchild" in child;
  
  //   setusername(idd)
  //  }


    return (
    <div className="App">
        
        
        <BrowserRouter>
        <Navbar state={currstate}/>
        <Switch>
        
                <Route exact path="/" component={()=> <Landing tellstate={getstatefromchildren} />}/>
                <Route path="/register" component={()=> <Register tellstate={getstatefromchildren} />}/>
                <Route path="/login" component={()=> <Login tellstate={getstatefromchildren} />}/>
                {/* if(password==) */}
                <Route path="/all_posts" component={() => <Showposts tellstate={getstatefromchildren}/>}/>
                <Route path="/post" component={Singlepost}/>
        
        {/* <div className="landin"><Landing /></div> */}
          </Switch>
          
        </BrowserRouter>
    </div>
          
    );
}

export default App;

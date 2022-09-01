import axios from "axios";
import {useState} from "react"
import React from 'react'
import jwt_decode from 'jwt-decode';

//function axioss() {
    


// const [user, setuser] = useState({
//     name:localStorage.getItem('name'),
//     id:localStorage.getItem('id'),
//     refreshToken:'',
//     accessToken:'',
// });
var accessToken="";
const refreshToken=async ()=>{
    try {
        const res=await axios.post("http://localhost:5000/api/users/refresh",
            {token:localStorage.getItem('id2')});
            // setuser({
            //     name:localStorage.getItem('name'),
            //     id:localStorage.getItem('id'),
            //     accessToken:res.data.accessToken,
            //     refreshToken:res.data.refreshToken,
            // });
            //allpost();
            accessToken=res.data.accessToken;
            localStorage.setItem('id2',res.data.refreshToken);
            return res.data;

        }
    catch (error) {
        
    }
}

var secaxios=axios.create();
var thiaxios=axios.create();

//headers
 secaxios.interceptors.request.use(
     async(config)=>{
         
         let currdate=new Date();
         let decodedToken;
        // if(user.accessToken!=null)
        let access=accessToken;
        //console.log(access);
        if(access=='')
            {access=await refreshToken();
            access=access.accessToken;}
            console.log(access);
          decodedToken=jwt_decode(access);
          let data=access;
          //data.accessToken=access;
         if(decodedToken.exp*1000<currdate.getTime()){
             console.log("new access built");
            // console.log(access);
              data=await refreshToken();
             data=data.accessToken;}
             config.headers["authorization"]="Bearer "+ data;
            // console.log(data);
            accessToken=data;
         return config;
     },(error)=>{
         return Promise.reject(error);
     }
 );
  //  };
  var a={
      get:secaxios.get,
      post:secaxios.post,
  }
export default a;
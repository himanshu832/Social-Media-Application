import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import Posts from './Posts';
import jwt_decode from 'jwt-decode';

export default function Showposts(props) {


    const [state, setstate] = useState([]);

    const [user, setuser] = useState({
        name:localStorage.getItem('name'),
        id:localStorage.getItem('id'),
        refreshToken:'',
        accessToken:'',
    });

const updatestateliked=(index,newobject)=>{
      state[index].likes.push(newobject);
      setstate([...state]);
}

     const refreshToken=async ()=>{
        try {
            const res=await axios.post("http://localhost:5000/api/users/refresh",
                {token:localStorage.getItem('id2')});
                setuser({
                    name:localStorage.getItem('name'),
                    id:localStorage.getItem('id'),
                    accessToken:res.data.accessToken,
                    refreshToken:res.data.refreshToken,
                });
                //allpost();
                localStorage.setItem('id2',res.data.refreshToken);
                return res.data;
 
            }
        catch (error) {
            
        }
    }
   // let countrec=0;
     useEffect(() => {
         recieve(); props.tellstate('showposts')
     }, [])

    //  useEffect(() => {
       
    // }, [])
   
    
   var secaxios=axios.create();
   var thiaxios=axios.create();

   //headers
    secaxios.interceptors.request.use(
        async(config)=>{
            
            let currdate=new Date();
            let decodedToken;
           // if(user.accessToken!=null)
           let access=user.accessToken;
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
               user.accessToken=data;
            return config;
        },(error)=>{
            return Promise.reject(error);
        }
    );
    

    const postt = useRef();
   
    const recieve=(async()=>{
        //countrec++;
        if(state.length==0){
           // console.log("aaaaaaaaaaaaaaaaaa");
        thiaxios.get("http://localhost:5000/api/posts/theposts").then((res)=>{
                setstate(res.data)
            },(err)=>{
                console.log(err);
            })
            

            postt.current.value="";
        }
    })

  
    const sendPost=(()=>{
            //setuser(props.userid);
            //setusername(props.username);
            // let postid;
            if(postt.current.value!=""){
             secaxios.post("http://localhost:5000/api/posts/setpost",{
                posttext:postt.current.value,
                username:localStorage.getItem('name'),
                user:localStorage.getItem('id'),

            }).then((res)=>{
                //console.log(res.data)
                 //postid= res.data;
                 let currdat=new Date()
                 let currmonth=currdat.getMonth()+1;
                 const newadd={
                     username:localStorage.getItem('name'),
                     text:postt.current.value,
                     createdAt:currdat.getFullYear()+"-"+ currmonth +"-"+currdat.getDate()  ,
                     likes:[],
                    _id:res.data,
                 }
                 console.log(newadd);
                 setstate([...state,newadd]);
                 postt.current.value="";
                console.log(res.data);
            },(err)=>{
                alert("Error while sending data")
                console.log(err)
            })
            // recieve();
           
        } 
         
        })

     //deleting the post   
    const deletepost =async(postid)=>{
        try{
        var a=await secaxios.post("http://localhost:5000/api/posts/deletepost",{
            id:postid.id,
            user:postid.username,
        });
        console.log(a);
        
            //console.log(olddata)
			const updated=state.filter((currdata, indx) => currdata._id !== postid.id);
               // console.log(updated);
            setstate(updated);
                  
           
    }catch(error){
             console.log(error);
    }
    }

    const addlike=(postid)=>{
        const tobeliked=state.find(curr=>{
            console.log(curr);
         return  curr._id==postid 
        });
        console.log(tobeliked);
    //    if(!tobeliked.likes.includes(
    //        {
    //            user:user.id,
    //            username:user.name,
    //        }
    //        )){
        let already=false;
        for(let i in tobeliked.likes){
            if(tobeliked.likes[i].username==user.name)
            {
                already=true;
                break;
            }
        }
        if(already==false){
         secaxios.post("http://localhost:5000/api/posts/addlikes",{
             postid,
             id:user.id,
             username:user.name,
         }).then((res)=>{
             console.log(res);
         },(err)=>{
             console.log(err);
         });
        let likedindex;
         for(let curr in state){
             // console.log(curr);
             if(state[curr]._id==postid)
             {
                 likedindex= curr; 
                 break;
             }
            
         }

         updatestateliked(likedindex,{ 
            user:user.id,
            username:user.name,
        });

        // tobeliked.likes.push({username:user.name,});
        //  console.log(tobeliked);
         //setstate([...state,tobeliked]);
        }
    }

    return (
        <div className="Loginandregister mt-3">
            <h2>
                Welcome to a thriving tech community!
            </h2>
            <p>
                Discuss the latest on technology and trends. Be civil and supportive!
            </p>
            <div className="textareaflex">
                <div style={{border:"1px black solid",backgroundColor:"grey"}}>
                    <img style={{border:"white solid 3px"}} src="background.png" alt="" width="40px" height="auto"/>
           
                </div>
                <textarea style={{padding:"5px",width:"90%",minWidth:"200px",marginRight:"15%"}}placeholder="What's on your mind" rows="2" ref={postt}></textarea> 
            </div>
            
            <Button className="bg-dark text-white py-1 px-3 mt-3 mb-3" onClick={sendPost}>Post</Button>
{console.log(state)}
            {
                
            state.length!==0 && state.slice(0).reverse().map((element,index)=>{
               // console.log(element);
                   return (
                   <div className="postmargin">
                         <Posts deletepost={deletepost} 
                                addlike={addlike}

                                key={index}
                                id={element._id}
                                curruser={user.name} 
                                description={element.text} 
                                username={element.username} 
                                user={element.user} 
                                date={element.createdAt}
                                likes={element.likes}
                                access={user.accessToken}
                                />
                          
                           </div>)
                })
            }
        </div>
    )
}

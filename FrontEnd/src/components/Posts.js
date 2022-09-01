import React from 'react'
import { Link, useHistory } from 'react-router-dom';

export default function Posts(props) {
    const deletePost=()=>{
        //console.log(props);
        props.deletepost(props);
    }

    const iliked=()=>{
        props.addlike(props.id);

    } 
    //const history=useHistory();
    // const commentspage=()=>{
    //    history.push('post',[props]);

    // }
    return (
        <div className="postflex">
            <div style={{padding:"5px"}}>
                <img src="background.png" alt="" width="70px" height="auto"/>
                <p style={{textAlign:"center",fontSize:"10px"}} >{props.username}</p>
            </div>
            <div className="description">
                <p style={{margin:"0px"}} >{props.description}</p>
                <p style={{marginBottom:"5px"}} >{props.date.substring(0,10)}</p>
                <div className="buttonflex">
                    <button className="like" onClick={iliked}>
                      Likes {props.likes.length}
                    </button>
                    <button className="dislike">
                        dislike
                    </button>
                    <Link to={{
                        pathname:`/post`,
                        aboutprops:{
                            props,
                           
                        }
                    }} className="discussions"> Discussions
                    </Link>
                    {props.username== props.curruser && 
                    <button onClick={deletePost} className="delete">
                        delete
                    </button>
                    }
                    
                </div>
            </div>
        </div>
    )
}

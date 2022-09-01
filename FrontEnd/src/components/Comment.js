import React from 'react'

export default function Comment(props) {
    console.log(props);
    const deleteComment=()=>{
        props.deletecomment(props.id);
    }
    return (
        <div className="postflex">
        <div style={{padding:"5px"}}>
            <img src="background.png" alt="" width="70px" height="auto"/>
            <p style={{textAlign:"left",fontSize:"10px"}} >{props.username}</p>
        </div>
        <div className="description">
            <p style={{margin:"0px"}} >{props.description}</p>
            <p style={{marginBottom:"5px"}} >{props.date.substring(0,10)}</p>
            <div className="buttonflex">
                
                {(props.username== props.curruser||props.postowner==props.curruser) && 
                <button onClick={deleteComment} className="delete">
                    x
                </button>
                }
                
            </div>
        </div>
    </div>
    )
}

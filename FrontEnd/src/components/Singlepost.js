import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import Comment from "./Comment";
//import axioss from './axios'
import jwt_decode from "jwt-decode";

export default function Singlepost(props) {
  const [allcomments, setallcomments] = useState([]);

  var accessToken = props.location.aboutprops.props.access;
  const refreshToken = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/users/refresh", {
        token: localStorage.getItem("id2"),
      });
      // setuser({
      //     name:localStorage.getItem('name'),
      //     id:localStorage.getItem('id'),
      //     accessToken:res.data.accessToken,
      //     refreshToken:res.data.refreshToken,
      // });
      //allpost();
      accessToken = res.data.accessToken;
      localStorage.setItem("id2", res.data.refreshToken);
      return res.data;
    } catch (error) {}
  };

  var secaxios = axios.create();
  //var thiaxios=axios.create();

  //headers
  secaxios.interceptors.request.use(
    async (config) => {
      let currdate = new Date();
      let decodedToken;
      // if(user.accessToken!=null)
      let access = accessToken;
      //console.log(access);
      if (access == "") {
        access = await refreshToken();
        access = access.accessToken;
      }
      console.log(access);
      decodedToken = jwt_decode(access);
      let data = access;
      //data.accessToken=access;
      if (decodedToken.exp * 1000 < currdate.getTime()) {
        console.log("new access built");
        // console.log(access);
        data = await refreshToken();
        data = data.accessToken;
      }
      config.headers["authorization"] = "Bearer " + data;
      // console.log(data);
      accessToken = data;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const commentt = useRef();

  props = props.location.aboutprops.props;
  console.log(props);
  //sending comments
  const sendComment = () => {
    secaxios
      .post("http://localhost:5000/api/comments/addcomment", {
        text: commentt.current.value,
        postid: props.id,
        username: props.curruser,
      })
      .then(
        (res) => {
          //only id
          //console.log(res);
          let currdat = new Date();
          let currmonth = currdat.getMonth() + 1;
          const newadd = {
            user: localStorage.getItem("name"),
            text: commentt.current.value,
            date:
              currdat.getFullYear() + "-" + currmonth + "-" + currdat.getDate(),

            _id: res.data,
          };
          console.log(newadd);
          setallcomments([...allcomments, newadd]);
          commentt.current.value = "";
        },
        (err) => {
          console.log(err);
        }
      );
  };
  useEffect(() => {
    recieveComments();
  }, []);

  const recieveComments = async () => {
    axios
      .get(`http://localhost:5000/api/comments/getcomments?id=${props.id}`)
      .then(
        (res) => {
          setallcomments(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
  };

  const deletecomment = async (deleteme) => {
    try {
      await secaxios.delete(
        `http://localhost:5000/api/comments/deletecomment`,
        {
          data: {
            postid: deleteme,
            username: props.curruser,
          },
        }
      );
      const updated = allcomments.filter((elements, count) => {
        console.log(elements._id + " " + deleteme);
        return elements._id != deleteme;
      });
      setallcomments(updated);
    } catch (err) {}
  };

  return (
    <>
      <div className="Loginandregister mt-3 commentbox">
        <div className="postflex" style={{ backgroundColor: "transparent" }}>
          <div style={{ padding: "5px", backgroundColor: "transparent" }}>
            <img src="background.png" alt="" width="70px" height="auto" />
            <p style={{ textAlign: "center", fontSize: "10px" }}>
              {props.username}
            </p>
          </div>
          <div className="description">
            <p style={{ margin: "0px", paddingTop: "10px" }}>
              {props.description}
            </p>
            {/* <p style={{marginBottom:"5px"}} >{props.date.substring(0,10)}</p> */}
          </div>
        </div>
        <div className="textareaflex">
          <div style={{ border: "1px black solid", backgroundColor: "grey" }}>
            <img
              style={{ border: "white solid 3px" }}
              src="background.png"
              alt=""
              width="40px"
              height="auto"
            />
          </div>
          <textarea
            style={{
              padding: "5px",
              width: "90%",
              minWidth: "200px",
              marginRight: "20%",
            }}
            placeholder="What's on your mind"
            rows="2"
            ref={commentt}
          ></textarea>
        </div>

        <Button
          className="bg-dark text-white py-1 px-3 mt-3 mb-3"
          onClick={sendComment}
        >
          Comment
        </Button>

        {allcomments.length !== 0 &&
          allcomments.reverse().map((element, ind) => {
            console.log(element);
            return (
              <div className="postmargin">
                {" "}
                <Comment
                  deletecomment={deletecomment}
                  postowner={props.username}
                  key={ind}
                  id={element._id}
                  curruser={localStorage.getItem("name")}
                  description={element.text}
                  username={element.user}
                  //  user={element.user}
                  date={element.date}
                />
              </div>
            );
          })}
      </div>
    </>
  );
}

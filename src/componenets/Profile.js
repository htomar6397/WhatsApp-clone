import React, { useEffect, useState } from 'react'
import { query,onSnapshot,collection,where } from 'firebase/firestore';
import blank from '../blank.png';
import { db } from '../firebase.config';
const Profile = (x) => {
  
  const [user, setUser] = useState({});
  let docid;
  if(x.user!==null){ if(x.user.uid===x.x.uid.uid) docid = x.x.id.id;
  else docid = x.x.uid.uid; }
  const q = query(collection(db, "users"),where("uid", "==", `${docid}`));
  useEffect(()=>{
    xyz()
    
  },[x])
  const xyz = async () => {
    // console.log(docid, "user");
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log("doc.data",doc.data(),x.suser)
        setUser(doc.data());
        
      });
    });
  };
  useEffect(()=>{
   user.name&&  UserSearch();
  },[user])
  const UserSearch=()=>{
  
  // {  console.log(user.name.split(''));}
  
  }
  const options = { hour: "numeric", minute: "numeric" };
  // console.log(user, "FREFRF",x);
   
  return (
    <>
      {user.name && user.name.search(x.suser) !== -1 ? (
        <>
          <div className="bannerimg">
            <img src={user.file || blank} alt="" />
          </div>
          <div
            style={{
              display: user.time === "online" ? "block" : "none",
              height: "5px",
              width: "5px",
              borderRadius: "50%",
              backgroundColor: "#33f06c",
              position: "absolute",
              top: "10%",
              left: "13%",
              filter: "blur(2px)",
            }}
          ></div>
          <div className="namewrap">
            <div className="time">
              <div className="name">{user.name}</div>
              <div className="lasttime">
                {x.x.time !== null && x.x.time !== ""
                  ? x.x.time
                      .toDate()
                      .toLocaleTimeString([], options)
                      .toLowerCase()
                  : null}
              </div>
            </div>
            <div className="lastmes">
              {x.x.uid.uid === user.uid ? (
                x.x.uid.type ? (
                  <span style={{ color: "#008069", fontWeight: "500" }}>
                    typing..
                  </span>
                ) : x.x.lastMes.senderId !== user.uid && x.x.lastMes!=="" ? (
                  <span> me: {x.x.lastMes.message}</span>
                ) : (
                  x.x.lastMes.message
                )
              ) : x.x.id.type ? (
                <span style={{ color: "#008069", fontWeight: "500" }}>
                  typing..
                </span>
              ) : x.x.lastMes.senderId !== user.uid ? (
                <span> me: {x.x.lastMes.message}</span>
              ) : (
                x.x.lastMes.message
              )}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default Profile
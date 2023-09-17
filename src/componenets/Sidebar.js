import React, { useEffect, useState } from "react";
import { useAuth } from "../Layout";
import Users from "./Users";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { RiUserSearchFill, RiUserSearchLine } from "react-icons/ri";
import {IoArrowBackSharp} from 'react-icons/io5'
import {AiOutlineExport} from 'react-icons/ai'
import { doc,collection,setDoc,getDoc,query,orderBy,onSnapshot, where,or,and, serverTimestamp,updateDoc } from "firebase/firestore";
import { db,auth } from "../firebase.config";
import { LOGIN } from "../routes";
import Profile from "./Profile";
import {MdEdit} from 'react-icons/md'
import {BsCheck2} from 'react-icons/bs'
import blank from "../blank.png";
import Time from "./ChatBar/Chats/Time";

const Sidebar = ({setFriend,lastMes}) => {
  // const { user, isLoading } = useAuth();
  const [all, setAll] = useState(false);
  const [chat,setChat]= useState([]);
 const [view,setView]=useState(false);
 const [Nedit,setNedit]=useState(false);
  const [Aedit,setAedit]=useState(false);
  const [un,setUn]=useState("");
  const [ua, setUa] = useState("");
  const { user, isLoading } = useAuth(un, ua);
  const [userSearch,setUserSearch]= useState("");
  
  
  const { users, xyz } = Users();
//   console.log(users.length, "users");

useEffect(()=>{
  setUn(user && user.name);
  setUa(user && user.about);},[Aedit,Nedit])
  const len = users.length;
const citiesRef = collection(db, "chatrooms");
const navigate= useNavigate();
const logOut=() => {signOut(auth); navigate(LOGIN)}
     const options = { hour: "numeric", minute: "numeric" };
const handleChat= async(x)=>{
if(user&&x){  setFriend(x);

const ref = doc(db, "chatrooms", x.uid + user.uid);
const docSnap = await getDoc(ref);
let docId;
if (docSnap.exists()) {
  docId = x.uid + user.uid;
} else {
  docId = user.uid + x.uid;
}

try {
  await setDoc(doc(citiesRef, docId), {
    roomId: docId,
    lastMes: "",
    uid: {
      uid:x.uid,
    type:false},
    id: {id:user.uid,
    type:false},
    time: serverTimestamp(),
  });
} catch (err) {
  console.log(err);
}}
}

// if (len && users[2].time!==null) console.log(users[2].time.seconds);
useEffect(()=>{chatrom()},[user])
const chatrom=async()=>{  
  
if(user!==null){  
    const q = query(
      collection(db, "chatrooms"),
      orderBy("time","desc"),
      or(
        and(where("uid.uid", "==", `${user.uid}`)),
        where("id.id", "==", `${user.uid}`)
      )
    );

    onSnapshot(q, (querySnapshot) => {
  
      const cities = [];
      querySnapshot.forEach((doc) => {
        cities.push(doc.data());
      });
      setChat([...cities]);
    });
}




}



const updName=async()=>{
   if (user !== null) {
     const lastmes = doc(db, "users", user.uid);
    //  console.log(x);
     await updateDoc(lastmes, {
       name: un,
     });
   }
}
const updAbout = async () => {
  if (user !== null) {
    const lastmes = doc(db, "users", user.uid);
    //  console.log(x);
    await updateDoc(lastmes, {
      about: ua,
    });
  }
};



  return (
    <div
      className="side"
      style={{
        width: "29.95%",
        height: "100%",
        backgroundColor: "#ffffff",
        overflowY: "scroll",
        overflowX: "hidden",
        flexShrink: "0",
      }}
    >
      <div
        style={{
          height: "59px",
          display: "flex",
          width: "414px",
          padding: "0px 17px",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#f0f2f5",
        }}
      >
        <div
          onClick={() => setView(true)}
          style={{
            display: "flex",
            height: "40px",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              height: "40px",
              width: "40px",
              border: "1px solid #0003",
              borderRadius: "50%",
              overflow: "hidden",
              flexShrink: "0",
            }}
          >
            <img height={"100%"} src={(user && user.file) || blank} alt="" />
          </div>
          <div style={{ width: "30%", fontSize: "18px", fontWeight: "500" }}>
            {user && user.name}
          </div>
        </div>
        <div
          className="log"
          onClick={() => {
            logOut();
            lastMes(serverTimestamp());
          }}
        >
          <AiOutlineExport style={{ fontSize: "28px", color: "#0009" }} />
        </div>
      </div>
      <div className="input">
        <input
          onChange={(e) => setUserSearch(e.target.value)}
          placeholder="Search or start new chat"
          type="text"
          value={userSearch}
        />

        <div
          className="Alll"
          onClick={() => {
            setAll(!all);
            xyz();
          }}
        >
          {!all ? (
            <RiUserSearchLine
              style={{ fontSize: "26px", color: "#0009", zIndex: "99" }}
            />
          ) : (
            <RiUserSearchFill
              style={{ fontSize: "26px", color: "#0009", zIndex: "99" }}
            />
          )}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "0",
          width: view ? "29.95%" : "0px",
          height: "100%",
          backgroundColor: "#fff",
          transition: "0.3s",
          overflow: "hidden",
          zIndex: "9",
        }}
      >
        <div
          style={{
            height: "108px",
            width: "100%",
            backgroundColor: "#008069",
          }}
        >
          <div
            style={{
              position: "relative",
              fontSize: "18px",
              left: "4%",
              top: "75px",
              color: "#fff",
              display: "flex",
              gap: "20px",
              alignItems: "center",
              fontWeight: "550",
              height: "20px",
              transitionTimingFunction: "ease-in-out",
            }}
          >
            <div
              onClick={() => {
                setView(!view);
                setAedit(false);
                setNedit(false);
              }}
              style={{
                cursor: "pointer",
                fontSize: "20px",
                height: "20px",
                width: "20px",
                borderRadius: "50%",
              }}
            >
              <IoArrowBackSharp />
            </div>
            <div> Profile </div>
          </div>
        </div>
        <div
          style={{
            height: "37%",
            width: "100%",
            backgroundColor: "#f0f2f5",
            position: "relative",
          }}
        >
          <div
            style={{
              height: "200px",
              width: "200px",
              borderRadius: "50%",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              overflow: "hidden",
            }}
          >
            <img
              style={{
                height: "100%",
              }}
              src={(user && user.file) || blank}
              alt=""
            />
          </div>
        </div>
        <div
          style={{
            height: "8%",
            width: "84%",
            backgroundColor: "#fff",
            padding: "3% 8%",
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: "15%",
              left: "8%",
              fontSize: "12px",
              color: "#008069",
            }}
          >
            Your Name
          </span>
          {Nedit ? (
            <div
              style={{
                height: "5%",
                width: "100%",
                borderBottom: "2px solid #008069",
                position: "relative",
                top: "100%",
              }}
            >
              <input
                onChange={(e) => setUn(e.target.value)}
                style={{
                  position: "absolute",
                  bottom: "15%",
                  left: "0%",
                  outline: "none",
                  border: "none",
                  width: "85%",
                }}
                type="text"
                value={un}
              />
              <span
                onClick={() => {
                  setNedit(false);
                  updName();
                }}
                style={{
                  position: "absolute",
                  bottom: "15%",
                  right: "0%",
                  cursor: "pointer",
                }}
              >
                <BsCheck2 />
              </span>
            </div>
          ) : (
            <>
              <span
                style={{
                  position: "absolute",
                  bottom: "15%",
                  left: "8%",
                  color: "#008069",
                }}
              >
                {user && user.name}
              </span>
              <span
                onClick={() => setNedit(true)}
                style={{
                  position: "absolute",
                  bottom: "15%",
                  right: "8%",
                  cursor: "pointer",
                  color: "#0007",
                }}
              >
                <MdEdit />
              </span>
            </>
          )}
        </div>
        <div
          style={{
            height: "8%",
            width: "84%",
            backgroundColor: "#f0f2f5",
            padding: "3% 8%",
            textAlign: "left",
            fontSize: "14px",
            color: "#0008",
            lineHeight: "20px",
          }}
        >
          This is not your username or pin. This name will be visible to your
          WhatsApp contacts.
        </div>
        <div
          style={{
            height: "8%",
            width: "84%",
            backgroundColor: "#fff",
            padding: "3% 8%",
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: "15%",
              left: "8%",
              fontSize: "12px",
              color: "#008069",
            }}
          >
            About
          </span>
          {Aedit ? (
            <div
              style={{
                height: "5%",
                width: "100%",
                borderBottom: "2px solid #008069",
                position: "relative",
                top: "100%",
              }}
            >
              <input
                onChange={(e) => setUa(e.target.value)}
                style={{
                  position: "absolute",
                  bottom: "15%",
                  left: "0%",
                  outline: "none",
                  border: "none",
                  width: "85%",
                }}
                type="text"
                value={ua}
              />
              <span
                onClick={() => {
                  setAedit(false);
                  updAbout();
                }}
                style={{
                  position: "absolute",
                  bottom: "15%",
                  right: "0%",
                  cursor: "pointer",
                  color: "0007",
                }}
              >
                <BsCheck2 />
              </span>
            </div>
          ) : (
            <>
              <span
                style={{
                  position: "absolute",
                  bottom: "15%",
                  left: "8%",
                  color: "#008069",
                }}
              >
                {user && user.about}
              </span>
              <span
                onClick={() => setAedit(true)}
                style={{
                  position: "absolute",
                  bottom: "15%",
                  right: "8%",
                  cursor: "pointer",
                }}
              >
                <MdEdit />
              </span>
            </>
          )}
        </div>
        <div
          style={{
            height: "9%",
            width: "84%",
            backgroundColor: "#f0f2f5",
            padding: "3% 8%",
          }}
        ></div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "0",
          width: all ? "29.95%" : "0px",
          height: "100%",
          backgroundColor: "#fff",
          transition: "0.3s",
          overflow: "hidden",
          zIndex: "9",
        }}
      >
        <>
          <div
            style={{
              height: "108px",
              width: "100%",
              backgroundColor: "#008069",
            }}
          >
            <div
              style={{
                position: "relative",
                fontSize: "18px",
                left: "4%",
                top: "75px",
                color: "#fff",
                display: "flex",
                gap: "20px",
                alignItems: "center",
                fontWeight: "550",
                height: "20px",
                transitionTimingFunction: "ease-in-out",
              }}
            >
              <div
                onClick={() => {
                  setAll(!all);
                }}
                style={{
                  cursor: "pointer",
                  fontSize: "20px",
                  height: "20px",
                  width: "20px",
                  borderRadius: "50%",
                }}
              >
                <IoArrowBackSharp />
              </div>
              <div> New Chat </div>
            </div>
          </div>
          <div style={{ position: "relative" }} className="input">
            <input
              style={{ width: "88%" }}
              placeholder="Search or start new chat"
              type="text"
            />
          </div>
          {users.map((x) =>
            x.uid !== user.uid ? (
              <div
                className="chatbanner"
                onClick={() => {
                  setFriend(x);
                  handleChat(x);
                }}
              >
                <div className="bannerimg">
                  <img src={x.file} alt="" />
                </div>
                <div className="namewrap">
                  <div className="time">
                    <div className="name">{x.name}</div>
                    <div className="lasttime">
                      {x.time !== "online" && x.time !== "" ? (
                        x.time !== null ? (
                          <Time friend ={x}/>
                        ) : null
                      ) : (
                        x.time
                      )}
                    </div>
                  </div>
                  <div className="lastmes">{x.about}.</div>
                </div>
              </div>
            ) : null
          )}
        </>
      </div>

      <div style={{ position: "relative", top: "49px" }}>
        {chat.map((x) => (
          <div
            className="chatbanner"
            onClick={() => {
              let docid;
              if (user !== null) {
                if (user.uid === x.uid.uid) docid = x.id.id;
                else docid = x.uid.uid;
                const q = query(
                  collection(db, "users"),
                  where("uid", "==", `${docid}`)
                );

                onSnapshot(q, (querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    setFriend(doc.data());
                  });
                });
              }
            }}
          >
            <Profile x={x} user={user} suser={userSearch} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

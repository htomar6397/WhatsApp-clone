import React, { useEffect, useState } from "react";
import ChatBar from "./ChatBar/ChatBar";
import Sidebar from "./Sidebar";
import { useAuth } from "../Layout";
import {
  collection,
  onSnapshot,
  query,
  getDoc,
  doc,
  orderBy,
  updateDoc,
  Timestamp,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import {
  getDatabase,
  ref,
  set,
  onDisconnect,
  onValue,
  serverTimestamp as SV,
} from "firebase/database";
import { db } from "../firebase.config";
import ViewProfile from "./ViewProfile";
import { usePageVisibility } from "./visible";
import { database } from "../firebase.config";
const Home = () => {
  const { user, loading } = useAuth();
  const [friend, setFriend] = useState("");
  const [load, setLoad] = useState(true);
  const [obbb, setObbb] = useState([]);
  const [type, setType] = useState(false);
  const [viewProfilee, setViewProfilee] = useState(false);
  const isVisible = usePageVisibility();
 
  const lastMes = async (x) => {
    if (user !== null) {
      const lastmes = doc(db, "users", user.uid);
      // console.log(x);
      await updateDoc(lastmes, {
        time: x,
      });
    }
  };

  if (user !== null) {
    set(ref(database, "status/" + user.uid), "online");
    onDisconnect(ref(database, "status/" + user.uid))
      .set({last:SV()})
      
   
  }
  

  useEffect(() => {
    if (isVisible) {
      lastMes("online");
    } else {
      lastMes(serverTimestamp());
    }
  }, [isVisible]);
  useEffect(() => {
    
      lastMessage();
    
  }, [obbb, type]);
  const lastMessage = async () => {
    if (user && friend) {
      const ref = doc(db, "chatrooms", friend.uid + user.uid);
      const docSnap = await getDoc(ref);
      let docId;
      if (docSnap.exists()) {
        docId = friend.uid + user.uid;
        const citiesRef = doc(db, "chatrooms", docId);
      if(obbb.length){  await updateDoc(citiesRef, {
          lastMes: obbb[0],
          time: obbb[0].createdAt,
          uid: { uid: user.uid, type: type },
        });}
        else { await updateDoc(citiesRef, {
          lastMes: "",
          time: "",
          uid: { uid: user.uid, type: type },
        });}
      } else {
        docId = user.uid + friend.uid;
        const citiesRef = doc(db, "chatrooms", docId);
       if(obbb.length) {await updateDoc(citiesRef, {
          lastMes: obbb[0],
          time: obbb[0].createdAt,
          id: { id: user.uid, type: type },
        });}
        else {
          await updateDoc(citiesRef, {
            lastMes: "",
            time: "",
            id: { id: user.uid, type: type },
          });
        }
      }
    }
  };

  const fetchChat = async () => {
    setLoad(true);
    if (user && friend) {
      const ref = doc(db, "chatrooms", friend.uid + user.uid);
      const docSnap = await getDoc(ref);
      let docId;
      if (docSnap.exists()) {
        docId = friend.uid + user.uid;
      } else {
        docId = user.uid + friend.uid;
      }
      const q = query(
        collection(db, "chatrooms", docId, "messages"),
        orderBy("createdAt", "desc")
      );

      onSnapshot(q, (querySnapshot) => {
        const cities = [];
        querySnapshot.forEach((doc) => {
          cities.push(doc.data());
        });

        setObbb([...cities]);
        setLoad(false);
      });
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        className="Login"
        style={{
          height: "127px",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          textAlign: "center",
          backgroundColor: "rgb(0,167,131)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "19px",
            left: "19px",
            height: "95vh",
            width: "97.5vw",
            display: "flex",
            // padding: "2vh 2vw",
            backgroundColor: "#f0f2f5",
          }}
        >
          <Sidebar setFriend={setFriend} lastMes={lastMes}  />
          {friend ? (
            <>
              <ChatBar
                friend={friend}
                obbb={obbb}
                fetchchat={fetchChat}
                load={load}
                setType={setType}
                setViewProfilee={setViewProfilee}
                            />

              <ViewProfile
                friend={friend}
                viewProfilee={viewProfilee}
                setViewProfilee={setViewProfilee}
              />
            </>
          ) : (
            <div
              style={{
                width: "69.5%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <h1>Welcome To WhatsApp-Clone</h1>
              <h3>select user to start chat</h3>
              <h5>happy journey</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

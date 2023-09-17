import React, { useState, useEffect } from "react";

import { collection, doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase.config";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../Layout";
import { HiOutlineSearch } from "react-icons/hi";
import { RxDotsVertical } from "react-icons/rx";

import Input from "./input";
import Chats from "./Chats/Chats";
import {
  getDatabase,
  ref,
  set,
  onDisconnect,
  onValue,
} from "firebase/database";
import { database } from "../../firebase.config";
import Time from "./Chats/Time";
const ChatBar = ({
  friend,
  fetchchat,
  obbb,
  load,
  setType,
  setViewProfilee,
  
}) => {
  const [xy, setXy] = useState("");
  const { user, loading } = useAuth();
  const [offline, setOffline] = useState("");
  setInterval(function () {
    if (friend !== null) {
      onValue(ref(database, "status/" + friend.uid), (snapshot) => {
        const data = snapshot.val();

        if (data.last !== null&&data!==null) {
          // console.log(new Date(data.last), "value");
          if (data === "online") {
            setOffline(data);
          } else {
            if (
              new Date(data.last).toTimeString().split(" ")[0].split(":")[0] >
              11
            )
              setOffline(
                `${
                  new Date(data.last)
                    .toTimeString()
                    .split(" ")[0]
                    .split(":")[0] -
                  12 +
                  ":" +
                  new Date(data.last)
                    .toTimeString()
                    .split(" ")[0]
                    .split(":")[1] +
                  " pm"
                }`
              );
            else if (
              new Date(data.last).toTimeString().split(" ")[0].split(":")[0] ===
              12
            ) {
              setOffline(
                `${
                  new Date(data.last)
                    .toTimeString()
                    .split(" ")[0]
                    .split(":")[0] +
                  ":" +
                  new Date(data.last)
                    .toTimeString()
                    .split(" ")[0]
                    .split(":")[1] +
                  " pm"
                }`
              );
            } else
              setOffline(
                `${
                  new Date(data.last)
                    .toTimeString()
                    .split(" ")[0]
                    .split(":")[0] +
                  ":" +
                  new Date(data.last)
                    .toTimeString()
                    .split(" ")[0]
                    .split(":")[1] +
                  " am"
                }`
              );
          }
        }
      });
      // console.log(offline, "okkk");
    }
  }, 5000);
  useEffect(() => {
    fetchchat();
  }, [friend]);
  useEffect(() => {
    if (xy !== "") xyz();
    setXy("");
  }, [xy]);

  const xyz = async () => {
    if (user && friend) {
      const ref = doc(db, "chatrooms", friend.uid + user.uid);
      const docSnap = await getDoc(ref);
      let docId;
      if (docSnap.exists()) {
        docId = friend.uid + user.uid;
      } else {
        docId = user.uid + friend.uid;
      }
      let messId = uuidv4();
      const citiesRef = collection(db, "chatrooms", docId, "messages");
      await setDoc(doc(citiesRef, messId), {
        message: xy,
        senderId: user.uid,
        reciverId: friend.uid,
        createdAt: Timestamp.fromDate(new Date()),
        messId
      });
    }

    fetchchat();
  };
  // console.log(obbb[0].createdAt.toDate().toLocaleTimeString([],options).toLowerCase(), "FREFRF");

  return (
    <div
      className="backimg"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "70.1%",
        backgroundColor: "#eae6df",
      }}
    >
      <div
        style={{
          width: "calc(96% - 1px)",
          height: "59px",
          display: "flex",
          alignItems: "center",
          padding: "0px 2%",
          justifyContent: "space-between",
          borderLeft: "1px solid #0002",
          // position: "absolute",
          left: "0",
          top: "0",
          zIndex: "5",
          backgroundColor: "#f0f2f5",
          flexShrink: "0",
        }}
      >
        <div
          onClick={() => setViewProfilee(true)}
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "50%",
              overflow: "hidden",
              objectFit: "cover",
            }}
          >
            <img
              style={{ objectFit: "cover", objectPosition: "center" }}
              width={"100%"}
              height={"100%"}
              src={friend && friend.file}
              alt=""
            />
          </div>
          <div
            style={{
              width: "30%",
              fontSize: "16px",
              whiteSpace: "nowrap",
              color: "rgba(0,0,0,0.790)",
              lineHeight: "16px",
            }}
          >
            {friend && friend.name} <br />
            <span style={{ fontSize: "13px", fontWeight: "300" }}>
             <Time friend={friend} offline={offline}/>
            </span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          <div>
            <HiOutlineSearch style={{ fontSize: "22px" }} />
          </div>
          <div>
            <RxDotsVertical style={{ fontSize: "22px" }} />
          </div>
        </div>
      </div>
      <div
        className="chatbox"
        style={{
          position: "relative",
          padding: " 0px 0vh 15px 0vh",
          display: "flex",
          flexDirection: "column-reverse",
          height: "calc(100% - 118px)",
          overflowX: "scroll",
        }}
      >
        <Chats obbb={obbb} user={user} load={load} fetchchat={fetchchat} />
      </div>

      <Input setXy={setXy} setType={setType} />
    </div>
  );
};

export default ChatBar;

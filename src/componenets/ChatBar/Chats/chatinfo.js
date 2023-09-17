import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase.config";
const Chatinfo = ({ x, user, fetchchat }) => {
  const [info, setInfo] = useState(false);
  const [del, setDel] = useState(false);
  const options = { hour: "numeric", minute: "numeric" };
//   console.log(x, "xsd");
  const mssDelete = async (x) => {
    let xy = x.senderId + x.reciverId;
    let yx = x.reciverId + x.senderId;

    await deleteDoc(doc(db, "chatrooms", xy, "messages", x.messId)).then(
        fetchchat()
    );
    await deleteDoc(doc(db, "chatrooms", yx, "messages", x.messId)).then(
     fetchchat()
    );
  };
  return (
    <>
      {x.senderId === user.uid ? (
        <div
          style={{
            position: "relative",
            padding: "0px 20px",
            color: "#fff",
            marginBottom: "10px",
          }}
        >
          <span
            onMouseEnter={() => setInfo(true)}
            onMouseLeave={() => setInfo(false)}
            style={{
              maxWidth: "50%",
              textAlign: "left",
              padding: "5px 45px 5px 15px",
              backgroundColor: "#d9fdd3",
              position: "relative",

              float: "right",
              borderRadius: "5px 0 5px 5px",
              color: "#000",
              boxShadow: "0 1px 2px #0003",
              overflow: "hidden",
            }}
          >
            {x.message}
            <span
              style={{
                fontSize: "9px",
                position: "absolute",
                bottom: "2px",
                right: "5px",
                color: "#0007",
              }}
            >
              {x.createdAt
                .toDate()
                .toLocaleTimeString([], options)
                .toLowerCase()}
            </span>
            <span
              onClick={() => {
                setDel(!del);
              }}
              style={{
                position: "absolute",
                right: info ? "7px" : "-24px",
                backgroundColor: "#d9fdd3",
                height: "20px",
                top: "1px",
                borderRadius: "50%",
                boxShadow: "0 0 13px 13px #d9fdd3",
                transition: "0.2s",
                cursor: "pointer",
              }}
            >
              <FiChevronDown
                style={{
                  fontSize: "22px",
                  color: "#0007",
                  padding: "1px",
                }}
              />
            </span>
          </span>
          <div
            style={{
              position: "absolute",
              color: "black",
              backgroundColor: "#fff",
              height: "30px",
              width: "100px",
              top: "20px",
              zIndex: "5",
              right: "40px",
              borderRadius: "5px",
              transform: `scale(${del ? "1" : "0"})`,
            }}
          >
            <div
              onClick={() => {
                mssDelete(x);
              }}
            >
              Delete
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            position: "relative",
            padding: "0px 20px",
            color: "#000",
            marginBottom: "10px",
          }}
        >
          <span
            onMouseEnter={() => setInfo(true)}
            onMouseLeave={() => setInfo(false)}
            style={{
              maxWidth: "50%",
              textAlign: "left",
              padding: "5px 45px 5px 15px",
              backgroundColor: "#fff",
              position: "relative",
              float: "left",
              borderRadius: "0 5px 5px 5px",
              boxShadow: "0 1px 2px #0003",
              overflow: "hidden",
            }}
          >
            {x.message}
            <span
              style={{
                fontSize: "9px",
                position: "absolute",
                bottom: "2px",
                right: "5px",
                color: "#0007",
              }}
            >
              {x.createdAt
                .toDate()
                .toLocaleTimeString([], options)
                .toLowerCase()}
            </span>
            <span
              onClick={() => {
                setDel(!del);
              }}
              style={{
                position: "absolute",
                right: info ? "7px" : "-24px",
                backgroundColor: "#fff",
                height: "20px",
                top: "1px",
                borderRadius: "50%",
                boxShadow: "0 0 13px 13px #fff",
                transition: "0.2s",
                cursor: "pointer",
              }}
            >
              <FiChevronDown
                style={{
                  fontSize: "22px",
                  color: "#0007",
                  padding: "1px",
                }}
              />
            </span>
          </span>
          <div
            style={{
              position: "absolute",
              color: "black",
              backgroundColor: "#fff",
              height: "30px",
              width: "100px",
              top: "20px",
              zIndex: "5",
              left: "70px",
              borderRadius: "5px",
              transform: `scale(${del ? "1" : "0"})`,
            }}
          >
            <div
              onClick={() => {
                mssDelete(x);
              }}
            >
              Delete
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatinfo;

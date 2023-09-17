import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { query, collection, onSnapshot, where } from "firebase/firestore";
import { db } from "../firebase.config";
const ViewProfile = ({ setViewProfilee, viewProfilee, friend }) => {
  const [user, setUser] = useState("");

  const q = query(collection(db, "users"), where("uid", "==", `${friend.uid}`));
  useEffect(() => {
    xyz();
  }, [friend]);
  const xyz = async () => {
    // console.log(docid, "user");
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log("doc.data",doc.data(),x.suser)
        setUser(doc.data());
      });
    });
  };

  return (
    <div
      style={{
        position: "relative",
        width: viewProfilee ? "30%" : "0",
        height: "100%",
        flexShrink: "0",
        transition: "0.2s",
        overflow: "hidden",
        backgroundColor: "f0f2f5",
      }}
    >
      <div
        style={{
          height: "59px",
          width: "100%",
          position: "relative",
          backgroundColor: "#f0f2f5",
          borderLeft: "1px solid #0003",
        }}
      >
        <span
          onClick={() => {
            setViewProfilee(false);
          }}
          style={{ position: "absolute", left: "20px", top: "17px" }}
        >
          <RxCross2 style={{ fontSize: "20px", color: "#0007" }} />
          Contact
        </span>
      </div>

      <div
        className="side"
        style={{
          overflowX: "hidden",
          overflowY: "scroll",
          height: "calc(100% - 60px)",
          width: "100%",
        }}
      >
        <div
          style={{
            height: "50%",
            width: "100%",
            position: "relative",
            backgroundColor: "#fff",
            boxShadow: "0 1px 12px -8px #0008",
          }}
        >
          <div
            style={{
              height: "300px",
              width: "300px",
              gap: "10px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                height: "200px",
                width: "200px",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <img
                style={{
                  height: "100%",
                }}
                src={user && user.file}
                alt=""
              />
            </div>
            <div>
              <div style={{ fontSize: "25px" }}>{friend.name}</div>
              <div style={{ color: "#0008" }}> {friend.email}</div>
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: "10px",
            backgroundColor: "#fff",
            height: "90px",
            width: "100%",
            boxShadow: "0 1px 12px -8px #0008",
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: "17px",
              left: "30px",
              color: "#0008",
              lineHeight: "18px",
            }}
          >
            About
          </span>
          <span style={{ position: "absolute", bottom: "20px", left: "30px" }}>
            {friend.about}
          </span>
        </div>
        <div
          style={{
            marginTop: "10px",
            backgroundColor: "#fff",
            height: "170px",
            width: "100%",
            boxShadow: "0 1px 12px -8px #0008",
            position:"relative"
          }}
        >
          <span
            style={{
              position: "absolute",
              top: "17px",
              left: "30px",
              color: "#0008",
              lineHeight: "18px",
            }}
          >
            Media, links and docs
          </span>
          <span style={{ position: "absolute", bottom: "50px", left: "30px" }}>
            Nothing to Show
          </span>
        </div>
        <div
          style={{
            marginTop: "10px",
            backgroundColor: "#fff",
            height: "455px",
            width: "100%",
            boxShadow: "0 1px 12px -8px #0008",
          }}
        ></div>
        <div
          style={{
            marginTop: "10px",

            height: "18px",
            width: "100%",
          }}
        ></div>
      </div>
    </div>
  );
};

export default ViewProfile;

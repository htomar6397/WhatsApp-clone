import React, { useState } from "react";
import Main from "./Main";
import Login from "./login";
import {ImWhatsapp} from 'react-icons/im'
import Profileinfo from "./profileinfo";

const MainHome = () => {
  const [method, setMethod] = useState("");
  
  return (
    <>
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
        <div>
          <div className="op"
            style={{
              position: "absolute",
              top: "19px",
              left: "19px",
              height: "95vh",
              width: "97.5vw",
              // padding: "2vh 2vw",
              backgroundColor: "rgb(240,242,245)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: method === "email" ? "50%" : "47%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                height: method === "email" ? "85vh" : "60vh",
                width: "20vw",
                backgroundColor: "rgb(0,167,131)",
                borderRadius: "3vh",
                padding: "2vh 2vw",
                boxShadow: "0 2px 5px  #0007",
              }}
            >
              <div>
                <ImWhatsapp
                  style={{
                    color: "#fff",
                    fontSize: "80px",
                    position: "relative",
                    top: "16px",
                  }}
                />
                <h1 style={{ color: "#fff", fontSize: "25px" }}>
                  Welcome to WhatsApp!
                </h1>
              </div>

              <div
                style={{
                  color: "rgb(0,167,131)",
                  backgroundColor: "#fff",
                  width: "100%",
                  height: method === "email" ? "70%" : "50%",

                  position: "absolute",
                  top: method === "email" ? "60%" : "70%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  borderRadius: "10px",
                  boxShadow: "0 2px 15px  #0005",
                  padding: "0 3vw",
                }}
              >
                {method === "" ? (
                  <>
                    <h1>
                      <span>1.</span> Select SignIN Method
                    </h1>
                    <h4 style={{ color: "#0007" }}>
                      tap on any button <br />
                      to start your login process
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        gap: "1vw",
                        width: "100%",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        style={{
                          padding: " 2vh 3vw",
                          backgroundColor: "#33f06c",
                          color: "#fff",
                          fontSize: "18px",
                          fontFamily: "Segoe UI,Helvetica Neue",
                          border: "none",
                          borderRadius: "10px",
                          cursor: "pointer",
                          minWidth: "9.5vw",
                          boxShadow: "0 2px 5px  #0005",
                        }}
                        onClick={() => setMethod("number")}
                      >
                        Number
                      </button>
                      <button
                        style={{
                          padding: " 2vh 3vw",
                          backgroundColor: "#33f06c",
                          color: "#fff",
                          fontSize: "18px",
                          fontFamily: "Segoe UI,Helvetica Neue",
                          border: "none",
                          borderRadius: "10px",
                          cursor: "pointer",
                          minWidth: "9.5vw",
                          boxShadow: "0 2px 5px  #0005",
                        }}
                        onClick={() => setMethod("email")}
                      >
                        Gmail
                      </button>
                    </div>
                  </>
                ) : method === "number" ? (
                  <Main />
                ): <Login/> }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainHome;

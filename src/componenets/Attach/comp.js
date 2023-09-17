import React, { useState } from 'react'

const Comp = ({e}) => {
    const [hover,setHover]=useState(false)
  return (
    <>
      <div
        style={{
          left:hover? "55px":"0",
          top:"13px",
          position: "absolute",
          padding: "5px 20px 5px 20px",
          // Width: !hover ? "100px" : "0",
          color: "#fff",
          backgroundColor: "#000",
          borderRadius: "15px",
          whiteSpace: "nowrap",
          fontSize: "10px",
          transform: `scale(${hover ? "1" : "0"})`,
          transition:"0.3s"
        }}
      >
        {e.name}
      </div>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          height: "50px",
          width: "50px",
          borderRadius: "50%",
          overflow: "hidden",
          position: "relative",
          marginBottom: "15px",
          boxShadow: "0px 12px 15px -6px #0004",
        }}
      >
        <div
          style={{
            height: "50%",
            width: "100%",
            backgroundColor: e.clr,
          }}
        ></div>
        <div
          style={{
            height: "50%",
            width: "100%",
            backgroundColor: e.clr2,
          }}
        ></div>
        {e.logo}
      </div>
    </>
  );
}

export default Comp
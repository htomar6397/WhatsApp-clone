import React from 'react'

const Profileinfo = ({setProf}) => {
  return (
    <div style={{ height: "100%", width: "100%", background: "transparent" }}>
      <h1>
        <span>3.</span> Profile Info
      </h1>
      <h4 style={{ color: "#0007" }}>
        please provise optional details
        <br />
        <span>
          Profile Photo
          <br />
          About Yourself
        </span>
      </h4>
      <div
        className="prof"
        style={{
          height: "20vh",
          width: "20vh",
          borderRadius: "50%",
          overflow: "hidden",
          objectFit: "contain",
          position:"relative"
        }}
      >
      
        <input style={{position:"absolute",height:"100%",width:"100%",zIndex:"-1"}} type="text" />
        <img
          height={"100%"}
          src="https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png
            "
          alt=""
        />
      </div>

      <input type="text" placeholder="Enter About Yourself" />
      <button onClick={() => setProf(true)}> FINISH</button>
    </div>
  );
}

export default Profileinfo
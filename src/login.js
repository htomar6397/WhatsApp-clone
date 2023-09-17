import React, { useState,useRef, useEffect } from 'react'
import{ signInWithEmailAndPassword,
  createUserWithEmailAndPassword} from 'firebase/auth'
import { auth,db } from './firebase.config';
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  setDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from './firebase.config';
import { DASHBOARD } from './routes';
const Login = () => { 
     const navigate = useNavigate();
    const [email,setEmail]=useState("");
    const [password, setPassword] = useState("");
    const [Name, setName] = useState("");
    const [reg, setReg] = useState(false);
    const [profile,setProfile]=useState([]);
    const [about,setAbout]=useState("");
    const [file, setFile] = useState("");
     const [prof, setProf] = useState(false);
      const hiddenFileInput = useRef(null);
      const handleClick = (event) => {
        console.log("fff")
        hiddenFileInput.current.click();
      };
    const users = collection(db, "users");
    const handleLogin=async(email,password)=>{
          try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate(DASHBOARD);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
    }
      function handleAddPost() {
        console.log("profile");

        const storageRef = ref(storage, `/files/${profile.name}` + uuidv4());
        const uploadTask = uploadBytesResumable(storageRef, profile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            // setPercent(percent);
          },
          (err) => console.log(err),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
             setFile(downloadURL);

            
            });
          }
        );
      }
     useEffect(()=>{
      if(file!=="") handleRegister(Name, email, password, file, about);
     },[file])

    const handleRegister = async (name, email, password,file,about) => {
      try {
       const res = await createUserWithEmailAndPassword(auth, email, password);
       const user = res.user;

       try {
         await setDoc(doc(users, user.uid), {
           uid: user.uid,
           name,
           authProvider: "local",
           email,
           file,
           about,
           
         });
         setReg(!reg);
         setProf(false)
       } catch (err) {
         console.log(err);
         alert(err);
       }
     } catch (err) {
       console.error(err);
       alert(err.message);
     }
    
    };
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        background: "transparent",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!prof ? (
        <>
          <h1>
            <span>2.</span> By Email Password
          </h1>
          <h4 style={{ color: "#0003" }}>
            whatsapp will check your email is registered with us <br />
            <span style={{ color: "#0007" }}>
              Enter Your Email and Password
            </span>
          </h4>
          <input
            style={{
              display: reg ? "block" : "none",
              padding: "10px",
              width: "90%",
              borderRadius: "5px",
            }}
            placeholder="Enter Name"
            type="text"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            style={{
              padding: "10px",
              width: "90%",
              marginTop: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
            }}
            placeholder="Enter Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={{ padding: "10px", width: "90%", borderRadius: "5px" }}
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            style={{
              padding: " 2vh 3vw",
              backgroundColor: "#33f06c",
              color: "#fff",
              fontSize: "18px",
              fontFmily: "Segoe UI,Helvetica Neue",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              width: "26vw",
              boxShadow: "0 2px 5px  #0005",
              marginTop: "25px",
              marginBottom: "5px",
            }}
            onClick={
              !reg ? () => handleLogin(email, password) : () => setProf(true)
            }
          >
            {!reg ? "Log In" : "Register"}
          </button>
          <div
            onClick={() => setReg(!reg)}
            style={{ textDecoration: "underLine", cursor: "pointer" }}
          >
            {reg ? "already have account.... Sign In" : "New User.... Sign Up"}
          </div>
        </>
      ) : (
        <>
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
              height: "10vh",
              width: "10vh",
              borderRadius: "50%",
              overflow: "hidden",
              objectFit: "contain",
              position: "relative",
              border:"1px solid #0007",
              cursor:"pointer"
            }}
            onClick={handleClick}
          
            >
            <input
              style={{
                display: "none",
              }}
              type="file"
              ref={hiddenFileInput}
              onChange={(e) => setProfile(e.target.files[0])}
            />
            <img
              height={"100%"}
              src="https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png
            "
              alt=""
            />
          </div>

          <input
            style={{ padding: "10px", width: "90%", borderRadius: "5px" }}
            type="text"
            placeholder="Enter About Yourself"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
          <button
            onClick={handleAddPost
              
            }
          >
            FINISH
          </button>
        </>
      )}
    </div>
  );
}

export default Login
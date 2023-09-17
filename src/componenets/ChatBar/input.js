import React,{useEffect, useRef, useState} from 'react'
import { GrEmoji } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
import { ImAttachment } from "react-icons/im";
import Attach from "../Attach/Attach";
import EmojiPicker from "emoji-picker-react";
import Inp from './inp';

const Input = ({setXy,setType}) => {
   
    const [value, setValue] = useState("");
     const [value2, setValue2] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const [attach, setAttach] = useState(false);
   
  // useEffect(()=>{setValue("");},[value2])
 
  return (
    <>
      <div
        style={{
          width: "100%",
          height: showPicker ? "45%" : "0",
          transition: "0.2s",
        }}
      >
        <EmojiPicker
          onEmojiClick={(e) => {
            setValue(e.emoji);
            setValue2(value2+e.emoji)
          }}
          width={"100%"}
          height={"100%"}
        />
      </div>
      <div
        style={{
          height: "59px",
          backgroundColor: "#f0f2f5",
          display: "flex",
          padding: "0px 15px",
          alignItems: "center",
          zIndex: "5",

          bottom: "0",
          flexShrink: "0",
        }}
      >
        {showPicker ? (
          <div
            style={{
              padding: "20px",
              borderRadius: "50%",
              color: "#000",
              fontWeight: "800",
            }}
            onClick={() => setShowPicker(false)}
          >
            <RxCross2 />
          </div>
        ) : (
          <div
            style={{ padding: "20px", borderRadius: "50%", color: "#0009" }}
            onClick={() => setShowPicker(true)}
          >
            <GrEmoji style={{ fontWeight: "1000", transform: "scale(1.2)" }} />
          </div>
        )}
        <div
          style={{
            padding: "20px",
            borderRadius: "50%",
            color: "#0008",
            fontWeight: "100",
          }}
          onClick={() => setAttach(!attach)}
        >
          <ImAttachment />
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "59px",
            left: "68px",
            width: "180px",
            // backgroundColor: "red",
            height: attach ? "400px" : "0px",
            transition: "0.4s ",
            overflow: "hidden",
            paddingInline: "10px",
            transitionTimingFunction: "ease",
            
          }}
        >
          <Attach />
        </div>
        <Inp setType={setType} setXy={setXy} value={value} setValue2={setValue2}  value2={value2} />

       
      </div>
    </>
  );
}

export default Input
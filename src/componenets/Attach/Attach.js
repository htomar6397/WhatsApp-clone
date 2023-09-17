import React,{useState} from 'react'
import { HiPhoto } from 'react-icons/hi2';
import {FaPoll} from 'react-icons/fa'
import { BsFillPersonFill } from "react-icons/bs";
import { IoMdDocument } from "react-icons/io";
import { TbSticker } from "react-icons/tb";

import { IoMdCamera } from "react-icons/io";
import Comp from './comp';

const Attach = () => {
   const [hover, setHover] = useState(false);
  const Style = {
    fontSize: "23px",
    color: "#fff",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    transitionTimingFunction: "cubic-bezier(.22,.68,0,1.71)",
  };
   const obbb = [
      {
        name: "Poll",
        clr: "#059182",
        clr2: "#02a698",
        logo: <FaPoll style={Style} />,
      },
      {
        name: "Contact",
        clr: "#0795dc",
        clr2: "#0eabf4",
        logo: <BsFillPersonFill style={Style} />,
      },
      {
        name: "Document",
        clr: "#5157ae",
        clr2: "#5f66cd",
        logo: <IoMdDocument style={Style} />,
      },
      {
        name: "Camera",
        clr: "#d3396d",
        clr2: "#ec407a",
        logo: <IoMdCamera style={Style} />,
      },
      {
        name: "New Sticker",
        clr: "#0063cb",
        clr2: "#0070e6",
        logo: <TbSticker style={Style} />,
      },
      {
        name: "Photos & Videos",
        clr: "#ac44cf",
        clr2: "#bf69cf",
        logo: <HiPhoto style={Style} />,
      },
    ];
  return (
    <>
      {obbb.map((e) => (
        <div style={{position:"relative"}} >
          
         <Comp e={e} />
          
        </div>
      ))}
    </>
  );
}

export default Attach
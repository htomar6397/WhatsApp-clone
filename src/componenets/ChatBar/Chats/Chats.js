import React, { useState } from "react";
import Loading from "../../Loading";

import Chatinfo from "./chatinfo";
import ChatTime from "./chatTime";
import moment from "moment";
import { useEffect } from "react";
const Chats = ({ obbb, load, user, fetchchat }) => {
  const [arr,setArr]=useState([]);
    let ar = [];
useEffect(()=>{ var x;
  
  obbb.reverse().forEach((e) => {
   
    //  console.log(
    //    ar,
    //    obbb,
    //    "ssssss",
    //    moment(e.createdAt.toDate(), "DD.MM.YYYY").format("DD.MM.YYYY")
    //  );
    if (x === moment(e.createdAt.toDate(), "DD.MM.YYYY").format("DD.MM.YYYY"))
      ar.push(0);
      else ar.push(1);
    x = moment(e.createdAt.toDate(), "DD.MM.YYYY").format("DD.MM.YYYY");
   
    
  });
   setArr(ar.reverse())
   obbb.reverse();
},[obbb])
 
  return (
    <>
      {!load && user !== null ? (
        obbb.map((x,i=0) => (
          <> 
            <Chatinfo x={x} user={user} fetchchat={fetchchat}  />
            <ChatTime x={x} arr={arr[i++]} />
          </>
        ))
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Chats;

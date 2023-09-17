import React, { useEffect } from 'react'
import moment from "moment";
import { useState } from 'react';
const Time = ({friend,offline}) => {
    const [day,setDay]=useState("")
    const [date, setDate] = useState("");
      const options = { hour: "numeric", minute: "numeric" };
 
 setInterval(function(){
setDate(new Date())
//  console.log(date)
 },1000)
  
  const findDay=()=>{
     
      var endDate = moment(date, "DD.MM.YYYY");
    if (friend.time !== "online") {
      var startDate = moment(
        friend.time.toDate(),
        "DD.MM.YYYY"
      );
      
      var result = endDate.diff(startDate, "days");
      // console.log(date,result, friend.time.toDate().getDay(),startDate,endDate);
      if (result === 0) setDay("today");
      else if (result === 1) setDay("yesterday");
      else if (result > 1 && result < 6) {
        if (friend.time.toDate().getDay() === 1) setDay("monday");
        else if (friend.time.toDate().getDay() === 2) setDay("tuesday");
        else if (friend.time.toDate().getDay() === 3) setDay("wednusdy");
        else if (friend.time.toDate().getDay() === 4) setDay("thursday");
        else if (friend.time.toDate().getDay() === 5) setDay("friday");
        else if (friend.time.toDate().getDay() === 6) setDay("saturday");
        else if (friend.time.toDate().getDay() === 0) setDay("sunday");
      } else if(result>=6) setDay(startDate.format("DD/MM/YYYY"));
    }
  
  }
//   setInterval(findDay(), 1000);
useEffect(()=>{findDay()},[friend,offline,date])
 return (
    <div>
     
      {
      day!==""?
      (friend.time !== "online"
        ? `last seen ${day} at ${friend.time.toDate().toLocaleTimeString([], options).toLowerCase()}`
        : offline === "online" || offline === ""
        ? offline === ""
          ? " "
          : friend.time
        : offline):null}
    </div>
  );
}

export default Time
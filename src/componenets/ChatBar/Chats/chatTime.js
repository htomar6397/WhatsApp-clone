import React,{useEffect,useState} from 'react'
import moment from "moment";
const ChatTime = ({x,arr,setArr}) => {    const [day, setDay] = useState("");
const [date, setDate] = useState("");

const options = { hour: "numeric", minute: "numeric" };

setInterval(function () {
  setDate(new Date());
  //  console.log(date)
}, 1000);
console.log(arr,x.createdAt.toDate())
const findDay = () => {
   
      var endDate = moment(date, "DD.MM.YYYY");
      if (x.createdAt !== "online") {
        var startDate = moment(
          new Date(x.createdAt.toDate().toDateString()),
          "DD.MM.YYYY"
        );

        var result = endDate.diff(startDate, "days");
        console.log(
          // date,
          result,
          // x.createdAt.toDate().getDay(),
          startDate,
          "yuj",
          endDate
        );
        if (result === 0) setDay("today");
        else if (result === 1) setDay("yesterday");
        else if (result > 1 && result < 6) {
          if (x.createdAt.toDate().getDay() === 1) setDay("monday");
          else if (x.createdAt.toDate().getDay() === 2) setDay("tuesday");
          else if (x.createdAt.toDate().getDay() === 3) setDay("wednesday");
          else if (x.createdAt.toDate().getDay() === 4) setDay("thursday");
          else if (x.createdAt.toDate().getDay() === 5) setDay("friday");
          else if (x.createdAt.toDate().getDay() === 6) setDay("saturday");
          else if (x.createdAt.toDate().getDay() === 0) setDay("sunday");
        } else if (result >= 6) setDay(startDate.format("DD/MM/YYYY"));
      }
  
};

//   setInterval(findDay(), 1000);
useEffect(() => {
  findDay();
}, [x,date]);
  return (
    <>
      {arr === 1 ? (
        <div
          style={{
            position: "relative",
            // padding: "0px 20px",
            color: "#fff",
            marginBottom: "10px",

            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize:"12px",
              backgroundColor: "#fff",
              color: "#0009",
              padding: "7px 10px 7px 10px",
              borderRadius: "5px",
              boxShadow: "0 1px 2px #0003",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            {day.toUpperCase()}
          </span>
        </div>
      ) : null}
    </>
  );
}

export default ChatTime
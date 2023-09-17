import React, { useRef,useState,useEffect } from "react";

const Inp = ({ setType, value, setXy,value2 }) => {
  const [arr, setArr] = useState([]);
  const [arrr, setArrr] = useState([]);
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    // console.log(e, "dddddddd");
    setInputValue(inputRef.current.value);
    // setValue(inputRef.current.value);
  };
  useEffect(() => {
    setInputValue(inputValue + value);
    
  }, [value2]);
  useEffect(() => {
    //  setInputValue(inputValue + value);
    arrr.push(1);
    setType(true);
    setTimeout(function () {
      arr.push(1);
      if (arr.length === arrr.length) {
        setType(false);
      }
    }, 2000);
    // console.log(arr, "derd", arrr);
  }, [inputValue, value]);

  return (
    <>
      <input
        ref={inputRef}
        style={{
          width: "80%",
          fontSize: "16px",
          padding: "10px 2vh",
          borderRadius: "10px",
          outline: "none",
          border: "none",
          fontSize: "15px",
        }}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setXy(inputValue);
            setInputValue("");
          }
        }}
      />
      <button
        onClick={() => {
          setXy(inputValue);
          setInputValue("");
        }}
        style={{
          padding: " 1.8vh 2.5vw",
          backgroundColor: "#33f06c",
          color: "#fff",
          fontSize: "13px",
          fontFmily: "Segoe UI,Helvetica Neue",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          marginLeft: "10px",
          boxShadow: "0 2px 5px  #0005",
          whiteSpace: "nowrap",
        }}
      >
        Send Message
      </button>
    </>
  );
};
export default Inp;